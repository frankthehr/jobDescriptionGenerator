import styles from '../styles/home.module.css';
import { useState } from 'react';
import AnimateHeight from 'react-animate-height';

const Dropdown = ({ competency, description, name, value, change }) => {

  const open = 'auto';
  const closed = 0;
  const [height, setHeight] = useState(closed);

  return (
    <div className={styles.dropdown}>
      <label 
        htmlFor={name}
        onClick={() => setHeight(height === closed ? open : closed)}
      >

        <span>{ competency }</span>
            
        <svg className={`${styles.dropdownArrow} ${height ? styles.arrowUp : styles.arrowDown}`} viewBox="0 0 24 24">
          <path d="m12 15.4l-6-6L7.4 8l4.6 4.6L16.6 8L18 9.4l-6 6Z"/>
        </svg>

      </label>

      { description &&
        <AnimateHeight className={styles.description} height={height} duration={300}>
          <span>{ description }</span>
        </AnimateHeight>
      }

      <select 
        id={name}
        value={value} 
        onChange={(e) => change(name, e.target.value)}
      >
        <option value={0}>None</option>
        <option value={1}>Level 1</option>
        <option value={2}>Level 2</option>
        <option value={3}>Level 3</option>
        <option value={4}>Level 4</option>
      </select>

    </div>
  )
}

export default Dropdown;

