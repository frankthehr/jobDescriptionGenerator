import styles from '../styles/home.module.css';
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../App';
import Checkbox from '../components/checkbox';

const NewHome = () => {

  const { random } = useContext(AppContext);

  const [title, setTitle] = useState(undefined);
  const [years, setYears] = useState(undefined);
  const [location, setLocation] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [answer, setAnswer] = useState(false);
  const [loading, setLoading] = useState(undefined);

  const [buttonURL, setButtonURL] = useState('');

  const requirements = ['Clown', 'Show', 'Lord', 'Heck', 'Yikes']

  const sendPrompt = async () => {

    try {
      console.log('Starting')
      setLoading(true);

      const request = {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
          title,
          years,
          location,
          email
        })
      }

      const response = await fetch("http://localhost:5000/jobdescription", request);

      console.log('Reponse fetched');

      console.log(response);

      if (!response.ok) {
        console.log('Response not OK')
        throw new Error("Something went wrong pal!")
      }

      // const responseJSON = await response.json();

      // console.log(responseJSON);

      const responseBuffer = await response.arrayBuffer();

      console.log(responseBuffer);

      const pdf_file = new File([responseBuffer], 'thisisthefile.pdf', {type: 'application/pdf'});

      const pdfblob = new Blob([responseBuffer], {type: 'application/pdf'});

      const href = URL.createObjectURL(pdfblob);

      setButtonURL(href);

      // const responseCompletion = responseJSON.completion;

      // const parsed = responseJSON.parsed;

      // const parsedJSON = JSON.parse(parsed);

      // const replaced = responseJSON.replaced;

      // const replacedJSON = JSON.parse(replaced);

      // const jsonData = responseJSON.jsonData;

      // console.log(responseJSON);

      // console.log(responseCompletion);

      // console.log(parsedJSON);

      // console.log(typeof parsedJSON);

      // console.log(replacedJSON);

      // console.log(typeof replacedJSON);

      // console.log(jsonData);

      // setAnswer(responseCompletion);

      setLoading(false);
      setAnswer(true);

    } catch (error) {
      setLoading(false);
      console.log('There was an error', error.message);
    }
  }

  return (
    <div className={styles.home}>
      <div className={styles.form}>
        <h1>Job Description Generator</h1>

        <div className={styles.title}>
          <label htmlFor="jd-title">Job title</label>
          <input
            type="text"
            id="jd-title"
            placeholder="Head Chef"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className={styles.years}>
          <label htmlFor="jd-number">Years of Experience</label>
          <input
            type="number"
            id="jd-number"
            placeholder="3"
            onChange={(e) => setYears(e.target.value)}
          />
        </div>

        <div className={styles.location}>
          <label htmlFor="jd-location">Location of the role</label>
          <input
            type="text"
            id="jd-location"
            placeholder="Dublin, Ireland"
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className={styles.email}>
          <label htmlFor="jd-email">Contact Email</label>
          <input
            type="text"
            id="jd-email"
            placeholder="youremail@email.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button onClick={sendPrompt}>
          { loading ? 'Creating' : 'Create Job Description' }
        </button>

        { answer &&
          <a href={buttonURL} download="yay.pdf">
            Open PDF
          </a>
        }
      </div>
    </div>
  )
}

export default NewHome;