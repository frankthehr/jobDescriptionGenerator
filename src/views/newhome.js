import styles from '../styles/home.module.css';
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../App';

const NewHome = () => {

  const { random } = useContext(AppContext);

  const [title, setTitle] = useState(undefined);
  const [location, setLocation] = useState(undefined);
  const [answer, setAnswer] = useState(false);
  const [loading, setLoading] = useState(undefined);

  const requirements = ['Clown', 'Show', 'Lord', 'Heck', 'Yikes']

  const sendPrompt = async () => {

    try {
      console.log('Starting')
      setLoading(true);

      const request = {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({prompt})
      }

      const response = await fetch("http://localhost:5000/jobdescription", request);

      console.log('Reponse fetched');

      console.log(response);

      if (!response.ok) {
        console.log('Response not OK')
        throw new Error("Something went wrong pal!")
      }

      const responseJSON = await response.json();

      const responseCompletion = responseJSON.completion;

      console.log(responseCompletion);

      setAnswer(responseCompletion);
      setLoading(false);

    } catch (error) {
      setLoading(false);
      console.log('There was an error', error.message);
    }
  }

  return (
    <div className={styles.home}>
      <div className={styles.form}>
        <h1>Job Description Generator</h1>
        <h5>Write the job title you need below and press Enter</h5>
        <input
          type="text"
          placeholder="Job Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Job Location"
          onChange={(e) => setLocation(e.target.value)}
        />
        <ul className={styles.requirements}>
          { requirements.map((requirement, i) => (
            <li>
              <input type="checkbox" id={requirement} name={requirement} />
              <label for={requirement}>{ requirement }</label>
            </li>
          ))}
        </ul>
        <button onClick={sendPrompt}></button>
      </div>
      <div className={styles.answer}>
        { loading &&
            <div className={styles.loading}>
              <span>Your job description is being generated</span>
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" strokeDasharray="15" strokeDashoffset="15" strokeLinecap="round" strokeWidth="2" d="M12 3C16.9706 3 21 7.02944 21 12">
                  <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"/>
                  <animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/>
                </path>
              </svg>
            </div>
          }
          { answer && <span>{ answer }</span>}
      </div>
    </div>
  )
}

export default NewHome;