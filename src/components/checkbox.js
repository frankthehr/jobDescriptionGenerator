import styles from '../styles/checkbox.module.css';
import { useEffect, useContext, useState } from 'react';
import { AppContext } from '../App';

const Checkbox = ({ requirement }) => {

  const [checked, setChecked] = useState(false);

  return (
    <div className={styles.checkbox}>
      <input checked={checked} onChange={() => setChecked(!checked)} type="checkbox" id={requirement} name={requirement} />
      <label htmlFor={requirement}>{ requirement }</label>
    </div>
  )
}

export default Checkbox;