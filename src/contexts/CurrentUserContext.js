import axios from 'axios';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { axiosReq, axiosRes } from '../api/axiosDefaults';
import { useNavigate } from 'react-router';


export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const navigate = useNavigate

  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get('dj-rest-auth/user/');
      setCurrentUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  useMemo(() => {
    axiosReq.interceptors.request.use(
      async (config) => {
        try {
          await axios.post('/dj-rest-auth/token/refresh/');
        } catch(err) {
          setCurrentUser((prevCurrentUser) => {
            if (prevCurrentUser) {
              navigate.push('/signin');
            }
            return null;
          });
          return config;
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            await axios.post('/dj-rest-auth/token/refresh/');
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                navigate('/signin');
              }
              return null;
            });
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      });
    }, [navigate]);
    return (
      <CurrentUserContext.Provider value={currentUser}>
        <SetCurrentUserContext.Provider value={setCurrentUser}>
          {children}
        </SetCurrentUserContext.Provider>
      </CurrentUserContext.Provider>
    )
  }