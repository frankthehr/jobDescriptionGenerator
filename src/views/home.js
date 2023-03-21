import styles from '../styles/home.module.css';
import { useRef, useState, useContext, useEffect } from 'react';
import { AppContext } from '../App';
import Dropdown from '../components/dropdown';
import StudyDropdown from '../components/studydropdown';
import EducationDropdown from '../components/educationdropdown';

const Home = () => {

  const { random } = useContext(AppContext);

  const [title, setTitle] = useState(undefined);
  const [years, setYears] = useState(undefined);
  const [location, setLocation] = useState(undefined);
  const [email, setEmail] = useState(undefined);

  const [education, setEducation] = useState(0);
  const [study, setStudy] = useState(0);

  const [actionComp, setActionComp] = useState(0);
  const [composureComp, setComposureComp] = useState(0);
  const [convictionComp, setConvictionComp] = useState(0);
  const [creativityComp, setCreativityComp] = useState(0);
  const [ambiguityComp, setAmbiguityComp] = useState(0);
  const [integrityComp, setIntegrityComp] = useState(0);
  const [intellectualComp, setIntellectualComp] = useState(0);
  const [confidenceComp, setConfidenceComp] = useState(0);

  const [loading, setLoading] = useState(undefined);
  const [buttonURL, setButtonURL] = useState('');
  const [filename, setFilename] = useState('');

  const downloadPDFRef = useRef(null);

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
      console.log('Starting')
      setLoading(true);

      // Create POST request with body containing state data
      const request = {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
          title,
          years,
          email,
          study,
          location,
          education,
          actionComp,
          composureComp,
          convictionComp,
          creativityComp,
          ambiguityComp,
          integrityComp,
          intellectualComp,
          confidenceComp
        })
      };

      // Call backend with above request
      const response = await fetch("http://localhost:5000/jobdescription", request);

      console.log('Reponse fetched');

      // Throw error if request fails
      if (!response.ok) {
        console.log('Response not OK')
        throw new Error("Something went wrong!")
      }

      const pdfdata = await response.pdf;

      console.log(pdfdata);

      // Create unique hash
      const hash = randomHash();

      // Create filename
      const hashedFilename = `jobdescription.${hash}.pdf`;

      // Set filename to hashedFilename
      setFilename(hashedFilename);

      // Reads response stream and returns a promise which resolves with an Array Buffer (An array buffer is a low-level data structure in programming that represents a fixed-length, contiguous memory area of raw binary data. It is a type of buffer that is commonly used for handling large amounts of data efficiently, especially when dealing with multimedia data such as images, audio, and video.)
      const responseBuffer = await response.arrayBuffer();

      console.log(responseBuffer);

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

        <Dropdown
          competency={"Action Orientated"}
          name={"actionComp"}
          state={actionComp}
          set={setActionComp}
          change={changeDropdown}

        />

        <Dropdown
          competency={"Composure"}
          name={"composureComp"}
          state={composureComp}
          set={setComposureComp}
          change={changeDropdown}

        />

        <Dropdown
          competency={"Conviction and Courage"}
          name={"convictionComp"}
          state={convictionComp}
          set={setConvictionComp}
          change={changeDropdown}

        />

        <Dropdown
          competency={"Creativity"}
          name={"creativityComp"}
          state={creativityComp}
          set={setCreativityComp}
          change={changeDropdown}

        />

        <Dropdown
          competency={"Dealing with Ambiguity"}
          name={"ambiguityComp"}
          state={ambiguityComp}
          set={setAmbiguityComp}
          change={changeDropdown}

        />

        <Dropdown
          competency={"Integrity and Trustworthiness"}
          name={"integrityComp"}
          state={integrityComp}
          set={setIntegrityComp}
          change={changeDropdown}

        />

        <Dropdown
          competency={"Intellectual Horsepower"}
          name={"intellectualComp"}
          state={intellectualComp}
          set={setIntellectualComp}
          change={changeDropdown}

        />

        <Dropdown
          competency={"Self Confidence"}
          name={"confidenceComp"}
          state={confidenceComp}
          set={setConfidenceComp}
          change={changeDropdown}

        />

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