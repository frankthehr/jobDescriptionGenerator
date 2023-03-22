import styles from '../styles/home.module.css';
import { useState } from 'react';
import AnimateHeight from 'react-animate-height';

const EducationDropdown = ({ state, set, change }) => {

  const open = 'auto';
  const closed = 0;
  const [height, setHeight] = useState(closed);

  return (
    <div className={styles.dropdown}>

          <label 
            htmlFor="education-dropdown" 
            onClick={() => setHeight(height === closed ? open : closed)}
          >
            Education Required
          </label>

          <AnimateHeight className={styles.description} height={height} duration={300}>
            <span>Select the level of education required for this role</span>
          </AnimateHeight>

          <select 
            id="education-dropdown"
            value={state} 
            onChange={(e) => change(e, set)}
          >
            <option value={0}>None</option>
            <option value={1}>Junior Certificate</option>
            <option value={2}>Leaving Certificate</option>
            <option value={3}>Undergraduate Degree</option>
            <option value={4}>Postgraduate Degree</option>
          </select>

        </div>
  )
}

export default EducationDropdown;