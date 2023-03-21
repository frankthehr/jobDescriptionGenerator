import styles from '../styles/home.module.css';

const StudyDropdown = ({ state, set, change }) => {

  return (
    <div className={styles.dropdown}>
          <label htmlFor="study-dropdown">Field of Study</label>
          <select 
            id="study-dropdown"
            value={state} 
            onChange={(e) => change(e, set)}
          >
            <option value={0}>None</option>
            <option value={1}>Computer Science</option>
            <option value={2}>Health Care</option>
            <option value={3}>Primary Education</option>
            <option value={4}>Business Studies</option>
          </select>
        </div>
  )
}

export default StudyDropdown;