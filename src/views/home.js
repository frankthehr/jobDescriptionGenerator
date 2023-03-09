import styles from '../styles/home.module.css';
import { useRef, useState, useContext } from 'react';
import { AppContext } from '../App';

const Home = () => {

  const { random } = useContext(AppContext);

  const [title, setTitle] = useState(undefined);
  const [years, setYears] = useState(undefined);
  const [location, setLocation] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [answer, setAnswer] = useState(false);
  const [loading, setLoading] = useState(undefined);
  const [buttonURL, setButtonURL] = useState('');
  const [filename, setFilename] = useState('');

  const downloadPDFRef = useRef(null);

  const triggerDownload = () => {
    downloadPDFRef.current.click();
  }

  // Create unique hash for use in filename
  const randomHash = () => {
    let hash = (Math.random() + 1).toString(36).substring(7);
    console.log(hash);
    return hash;
  }

  // Function to create POST request, call backend and create PDF from response
  const sendPrompt = async () => {

    try {
      console.log('Starting')
      setLoading(true);

      // Create POST request with body containing state data
      const request = {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
          title,
          years,
          location,
          email
        })
      };

      // Call backend with above request
      const response = await fetch("http://localhost:5000/jobdescription", request);

      console.log('Reponse fetched');

      // Throw error if request fails
      if (!response.ok) {
        console.log('Response not OK')
        throw new Error("Something went wrong pal!")
      }

      // Reads response stream and returns a promise which resolves with an Array Buffer (An array buffer is a low-level data structure in programming that represents a fixed-length, contiguous memory area of raw binary data. It is a type of buffer that is commonly used for handling large amounts of data efficiently, especially when dealing with multimedia data such as images, audio, and video.)
      const responseBuffer = await response.arrayBuffer();

      // Create blob with PDF MIME type from response array buffer. A blob (binary short object) is a data type used to represent large binary data like images or files.
      const pdfBlob = new Blob([responseBuffer], {type: 'application/pdf'});

      // Create URL to reference PDF blob
      const href = URL.createObjectURL(pdfBlob);

      // Create unique hash
      const hash = randomHash();

      // Create filename
      const hashedFilename = `jobdescription.${hash}.pdf`

      // Set filename to hashedFilename & buttonURL to PDF blob URL
      setFilename(hashedFilename);
      setButtonURL(href);

      setTimeout(() => {
        
      }, 100);

      setLoading(false);
      setAnswer(true);

      triggerDownload();

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

        { !loading && 
          <button onClick={sendPrompt}>
            <span>Create Job Description</span>
          </button>
        }

        { loading && 
          <button>
            <span>Creating</span>
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path fill="none" stroke="currentColor" strokeDasharray="15" strokeDashoffset="15" strokeLinecap="round" strokeWidth="2" d="M12 3C16.9706 3 21 7.02944 21 12">
                <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"/>
                <animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/>
              </path>
            </svg>
          </button>
        }

        <a 
          className={styles.downloadButton} 
          href={buttonURL}
          ref={downloadPDFRef}
          download={filename}>
        </a>
      </div>
    </div>
  )
}

export default Home;