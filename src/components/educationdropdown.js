import styles from '../styles/home.module.css';

const EducationDropdown = ({ state, set, change }) => {

  return (
    <div className={styles.dropdown}>
          <label htmlFor="education-dropdown">Education Required</label>
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