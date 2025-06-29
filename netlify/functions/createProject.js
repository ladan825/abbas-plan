const admin = require("firebase-admin");

if (!admin.apps.length) admin.initializeApp();

const db = admin.firestore();

exports.handler = async (event, context) => {
  try {
    const { title, content, authorId, authorFirstName, authorLastName } = JSON.parse(event.body);
    const createdAt = admin.firestore.Timestamp.now();

    const projectRef = await db.collection("projects").add({
      title,
      content,
      authorId,
      authorFirstName,
      authorLastName,
      createdAt
    });

    await db.collection("notifications").add({
      message: `${authorFirstName} ${authorLastName} added a new project`,
      time: createdAt
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, id: projectRef.id })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
