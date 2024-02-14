import { useAppState } from '../AppContext';
import { Alert } from 'react-bootstrap'; 

const Notification = () => {
  const { notification } = useAppState();

  if (notification.message === '') {
    return null;
  }

  if (notification.isSuccessful) {
    return (
      <Alert variant='success'>{notification.message}</Alert>
    )
  }

  return (
    <Alert variant='danger'>{notification.message}</Alert>
  )
};

export default Notification;
