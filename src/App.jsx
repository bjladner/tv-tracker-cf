import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router";
import Topbar from './components/Topbar'
import AppAlert from './components/AppAlert';
import AllShows from './pages/AllShows';
import OneShow from './pages/OneShow';
import SearchResults from './pages/SearchResults';
// import OneShowSearch from './pages/OneShowSearch';

export default function App() {
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  
  const showAlert = ()=> {
    setVisibleAlert(true)
    setTimeout( () => {
      setVisibleAlert(false)
    }, 5000);
  }
  
  const alertProps = { 
     setAlertVariant, 
     setAlertMessage,
     showAlert
  };

  return (
    <div className="bg-dark text-white" style={{ minHeight: '100vh' }}>
      <BrowserRouter>
        <Topbar />
        {visibleAlert && <AppAlert alertVariant={alertVariant} alertMessage={alertMessage} />}
        <Routes>
          <Route path="/" element={<AllShows />} />
          <Route path="/tvshow/:showID" element={<OneShow alertProps={alertProps} />} />
          <Route path="/search/:showName" element={<SearchResults alertProps={alertProps} />} />
          {/* <Route path="/search/show/:showID" element={<OneShowSearch alertProps={alertProps} />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}
