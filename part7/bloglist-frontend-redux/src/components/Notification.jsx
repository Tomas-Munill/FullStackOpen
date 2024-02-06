import { useSelector } from 'react-redux';

const Notification = ({ message, isSuccessful }) => {
  const notification = useSelector((state) => state.notification);

  if (notification.message === '') {
    return null;
  }

  const styles = {
    color: 'green',
    backgroundColor: 'lightgreen',
    padding: 15,
    border: 2,
    borderRadius: 10,
    borderColor: 'green',
    marginBottom: 10,
    borderStyle: 'solid',
  };

  if (notification.isSuccessful === false) {
    styles.color = 'red';
    styles.backgroundColor = 'lightCoral';
    styles.borderColor = 'red';
  }

  return (
    <div className="error" style={styles}>
      {notification.message}
    </div>
  );
};

export default Notification;
