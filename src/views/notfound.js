import styles from '../styles/notfound.module.css';
import { useEffect, useContext } from 'react';
import { AppContext } from '../App';

const NotFound = () => {

  const { random } = useContext(AppContext);

  return (
    <div>
      Error 404
    </div>
  )
}

export default NotFound;