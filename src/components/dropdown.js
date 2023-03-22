import styles from '../styles/home.module.css';
import { useState } from 'react';
import AnimateHeight from 'react-animate-height';

const Dropdown = ({ competency, description, name, state, set, change }) => {

  const open = 'auto';
  const closed = 0;
  const [height, setHeight] = useState(closed);

  return (
    <div className={styles.dropdown}>
          <label 
            htmlFor={name}
            onClick={() => setHeight(height === closed ? open : closed)}
          >
            { competency }
          </label>

          <AnimateHeight className={styles.description} height={height} duration={300}>
            <span>{ description }</span>
          </AnimateHeight>

          <select 
            id={name}
            value={state} 
            onChange={(e) => change(e, set)}
          >
            <option value={0}>None</option>
            <option value={1}>Level 1</option>
            <option value={2}>Level 2</option>
            <option value={3}>Level 3</option>
            <option value={4}>Level 4</option>
            <option value={5}>Level 5</option>
          </select>
        </div>
  )
}

export default Dropdown;