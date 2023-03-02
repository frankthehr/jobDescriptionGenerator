import './styles/styles.css';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './views/home';
import NotFound from './views/notfound';
import FrenchHome from './views/frenchhome';
import NewHome from './views/newhome';

export const AppContext = React.createContext();

function App() {

  const [random, setRandom] = useState(false);

  return (
    <AppContext.Provider value={{ random, setRandom }}>
      <Routes>
        <Route exact path='/' element={<NewHome />} />
        <Route exact path='french' element={<FrenchHome />} />
        <Route exact path='old' element={<Home />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
