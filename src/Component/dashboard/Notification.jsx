const Notification = ({ notifications }) => {
  return (
    <div className="notification center">
      <h5>Notifications</h5>
      <ul className="list">
        {notifications.map((n) => (
          <li key={n.id}>
            <span className="pink-text">{n.message}</span>
            <br />
            <span className="grey-text">{n.time.toDate().toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
