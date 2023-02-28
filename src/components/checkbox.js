// import styles from '../styles/checkboxes.module.css';
import { useEffect, useContext, useState } from 'react';
import { AppContext } from '../App';

const Checkbox = ({ requirement }) => {

  const [checked, setChecked] = useState(false);

  const checkedHandler = () => {
    setChecked(!checked);
  }

  return (
    <div className={styles.checkbox}>
      <input checked={checked} onClick={setChecked} type="checkbox" id={requirement} name={requirement} />
      <label htmlFor={requirement}>{ requirement }</label>
    </div>
  )
}

export default Checkbox;