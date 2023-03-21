import styles from '../styles/home.module.css';

const Dropdown = ({ competency, name, state, set, change }) => {

  return (
    <div className={styles.dropdown}>
          <label htmlFor={name}>{ competency }</label>
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