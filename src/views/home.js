import styles from '../styles/home.module.css';
import { useRef, useState, useEffect } from 'react';
import Dropdown from '../components/dropdown';
import LoadingButton from '../components/loadingbutton';
import StudyDropdown from '../components/studydropdown';
import EducationDropdown from '../components/educationdropdown';
import competenciesData from '../data/competencies';

const Home = () => {

  // State for input values
  const [title, setTitle] = useState(undefined);
  const [years, setYears] = useState(undefined);
  const [location, setLocation] = useState(undefined);

  // State for dropdown input values
  const [education, setEducation] = useState(0);
  const [study, setStudy] = useState(0);

  // State for loading button, hidden button URL and PDF filename
  const [loading, setLoading] = useState(undefined);
  const [buttonURL, setButtonURL] = useState('');
  const [filename, setFilename] = useState('');

  // Ref to hidden download button
  const downloadPDFRef = useRef(null);

  // State for compentencies dropdowns
  const [competencies, setCompetencies] = useState(competenciesData);

  // Function to update competency state upon individual competency changing
  function updateCompetenceValue(key, value) {
    setCompetencies(prevState => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        value: value
      }
    }));
  }

  // Function to change state of indivdual dropdowns (education and study)
  const changeDropdown = (e, set) => {
    set(e.target.value);
  }

  // UseEffect which triggers when buttonURL is changed and triggers the download of the file alongside UI changes
  useEffect(() => {
    if (!buttonURL) return;

    // Update UI state
    setLoading(false);

    // Automatically click download button
    triggerDownload();
  }, [buttonURL])

  // Function to trigger click on download element
  const triggerDownload = () => {
    downloadPDFRef.current.click();
  }

  // Create unique hash for use in filename
  const randomHash = () => {
    let hash = (Math.random() + 1).toString(36).substring(7);
    return hash;
  }

  // Function to create POST request, call backend and create PDF from response
  const sendPrompt = async () => {

    try {
      setLoading(true);

      // Create POST request with body containing state data
      const request = {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
          title,
          years,
          study,
          location,
          education,
          competencies
        })
      };

      // Call backend with above request
      const response = await fetch("http://localhost:5000/jobdescription", request);

      // Throw error if request fails
      if (!response.ok) {
        console.log('Response not OK')
        throw new Error("Something went wrong!")
      }

      // Create unique hash
      const hash = randomHash();

      // Create filename
      const hashedFilename = `jobdescription.${hash}.pdf`;

      // Set filename to hashedFilename
      setFilename(hashedFilename);

      // Reads response stream and returns a promise which resolves with an Array Buffer (An array buffer is a low-level data structure in programming that represents a fixed-length, contiguous memory area of raw binary data. It is a type of buffer that is commonly used for handling large amounts of data efficiently, especially when dealing with multimedia data such as images, audio, and video.)
      const responseBuffer = await response.arrayBuffer();

      // Create blob with PDF MIME type from response array buffer. A blob (binary short object) is a data type used to represent large binary data like images or files.
      const pdfBlob = new Blob([responseBuffer], {type: 'application/pdf'});

      // const pdfFile = new File([responseBuffer], 'jobdescriptionfile.pdf', {type: 'application/pdf', lastModified: Date.now()});

      // Create URL to reference PDF blob
      const href = URL.createObjectURL(pdfBlob);

      // Set buttonURL to the link for the PDF file (triggers useEffect)
      setButtonURL(href);

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
          <label htmlFor="jd-title">Job Title</label>
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
            min="0"
            max="100"
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

        <EducationDropdown
          state={education}
          set={setEducation}
          change={changeDropdown}
        />

        <StudyDropdown
          state={study}
          set={setStudy}
          change={changeDropdown}
        />

        { Object.keys(competencies).map(key => (
          <Dropdown
            name={key}
            value={competencies[key].value}
            competency={competencies[key].name}
            description={competencies[key].description}
            change={updateCompetenceValue}
          />
        ))
        }

        { !loading && 
          <button onClick={sendPrompt}>
            <span>Create Job Description</span>
          </button>
        }

        { loading && 
          <LoadingButton />
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