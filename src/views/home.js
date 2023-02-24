import styles from '../styles/home.module.css';
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../App';

const Home = () => {

  const { random } = useContext(AppContext);

  const [prompt, setPrompt] = useState('');

  const sendPrompt = async (event) => {
    if (event.key !== "Enter") return;

    console.log('Prompt:', prompt);
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
      </div>
    </div>
  )
}

export default Home;