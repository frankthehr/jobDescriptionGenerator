import styles from '../styles/notfound.module.css';
import { useEffect, useContext } from 'react';
import { AppContext } from '../App';

const NotFound = () => {

  const { random } = useContext(AppContext);

  useEffect(() => {
    document.title = '404';
  }, []);

  return (
    <div>
      Error 404
    </div>
  )
}

export default NotFound;