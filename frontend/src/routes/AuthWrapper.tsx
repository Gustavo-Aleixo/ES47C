import React, { useEffect } from 'react';
import Routes from './Routes';
import { useStore } from '../store/useStore';

const AuthWrapper: React.FC = () => {

  useEffect(() => {
    const { tokenResponse, setLogout } = useStore.getState();

    if (tokenResponse) {
      const currentTime = Date.now();
      const expirationTime = tokenResponse.expirationTime;

      if (expirationTime <= currentTime) {
        setLogout();
      }
    }
  }, []);


  return <Routes />;
};

export default AuthWrapper;