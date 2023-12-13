import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { ChatEngine } from 'react-chat-engine';

const Chats = () => {
  console.log(process.env.REACT_APP_CHAT_ENGINE_KEY);
  const didMountRef = useRef(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();
  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  const getFile = async (url) => {
    let response = await fetch(url);
    let data = await response.blob();
    return new File([data], 'userPhoto.jpg', { type: 'image/jpeg' });
  };
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;

      if (!user || user === null) {
        navigate('/');
        return;
      }
    }
    axios
      .get('https://api.chatengine.io/users/me/', {
        headers: {
          'project-id': '630f0786-68f7-43cc-93a9-9ccded147d68',
          'user-name': user.email,
          'user-secret': user.uid,
        },
      })
      .then(() => setLoading(false))
      .catch((e) => {
        let formdata = new FormData();
        formdata.append('email', user.email);
        formdata.append('username', user.email);
        formdata.append('secret', user.uid);
        getFile(user.photoURL).then((avatar) => {
          formdata.append('avatar', avatar, avatar.name);
          axios
            .post('https://api.chatengine.io/users/', formdata, {
              headers: { 'private-key': process.env.REACT_APP_CHAT_ENGINE_KEY },
            })
            .then(() => setLoading(false))
            .catch((e) => console.log('e', e.response));
        });
      });
  }, [user, navigate]);

  if (!user || loading) {
    return 'Loading...';
  }

  return (
    <div className='chats-page'>
      <div className='nav-bar'>
        <div className='logo-tab'>Wazzaappp</div>
        <div
          className='logout-tab'
          onClick={handleLogout}>
          Logout
        </div>
      </div>
      <ChatEngine
        height='calc(100vh - 66px)'
        projectID='630f0786-68f7-43cc-93a9-9ccded147d68'
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
