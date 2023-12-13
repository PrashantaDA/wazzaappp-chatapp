import { GoogleOutlined, GithubOutlined } from '@ant-design/icons';
import firebase from 'firebase/compat/app';
import { auth } from '../firebase';

const Login = () => {
  return (
    <div id='login-page'>
      <div id='login-card'>
        <h2>Welcome to Wazzaappp</h2>
        <div
          className='login-button google'
          onClick={() => {
            auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
          }}>
          <GoogleOutlined /> Sign In with Google
        </div>
        <br />
        <br />
        <div
          className='login-button facebook'
          onClick={() => {
            auth.signInWithRedirect(new firebase.auth.GithubAuthProvider());
          }}>
          <GithubOutlined /> Sign In with Github
        </div>
      </div>
    </div>
  );
};

export default Login;
