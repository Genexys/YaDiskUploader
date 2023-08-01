import Dropzone from './components/Dropzone';
import Login from './containers/Login';
import Logout from './containers/Logout';
import { useAuthContext } from './context/authContext';
import { ToastContainer } from 'react-toastify';
import { Analytics } from '@vercel/analytics/react';
import 'react-toastify/dist/ReactToastify.css';
import styles from './App.module.css';

const App = () => {
  const { currentUser } = useAuthContext();

  return (
    <div className={styles.container}>
      {currentUser ? (
        <>
          <Dropzone token={currentUser?.access_token} />
          <Logout />
        </>
      ) : (
        <Login />
      )}

      <ToastContainer position="top-left" />
      <Analytics />
    </div>
  );
};

export default App;
