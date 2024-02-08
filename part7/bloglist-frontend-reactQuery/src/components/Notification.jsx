import { useAppState } from '../AppContext';

const Notification = () => {
  const { notification } = useAppState();

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
