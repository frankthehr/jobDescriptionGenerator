import styles from '../styles/home.module.css';
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../App';

const Home = () => {

  const { random } = useContext(AppContext);

  const [prompt, setPrompt] = useState(undefined);
  const [answer, setAnswer] = useState(false);
  const [loading, setLoading] = useState(undefined);

  useEffect(() => {
    if (prompt != null && prompt.trim() === "") {
      setAnswer(undefined);
    }
  }, [prompt]);

  const sendPrompt = async (event) => {
    if (event.key !== "Enter") return;

    try {
      console.log('Starting')
      setLoading(true);

      const request = {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({prompt})
      }

      const response = await fetch("http://localhost:5000/ask", request);

      console.log('Reponse fetched');

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
        <input
          type="text"
          placeholder="Ask me anything..."
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => sendPrompt(e)}
        />
        <span>{ loading ? loading : " "}</span>
        { answer && <span>{ answer }</span>}
      </div>
    </div>
  )
}

export default Home;