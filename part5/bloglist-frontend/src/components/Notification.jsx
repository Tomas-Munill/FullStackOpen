const Notification = ({ message, isSuccessful }) => {
  if (message === null) {
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

  if (isSuccessful === false) {
    styles.color = 'red';
    styles.backgroundColor = 'lightCoral';
    styles.borderColor = 'red';
  }

  return <div style={styles}>{message}</div>;
};

export default Notification;