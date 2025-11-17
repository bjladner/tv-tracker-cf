import { useState, useEffect, useReducer } from 'react';
import { MyProviders } from './contexts/Providers';
import { BrowserRouter, Routes, Route } from "react-router";
import Topbar from './components/Topbar';
import AppAlert from './components/AppAlert';
import AllShows from './pages/AllShows';
import OneShow from './pages/OneShow';
import SearchResults from './pages/SearchResults';
import OneShowSearch from './pages/OneShowSearch';
import { getAllShows } from './requests';
import { showsReducer } from './reducers/ShowsReducers';

export default function App() {
  // AlertProps states ----------
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  
  const showAlert = ()=> {
    setVisibleAlert(true)
    setTimeout( () => {
      setVisibleAlert(false)
    }, 5000);
  };
  
  const alertProps = { 
     setAlertVariant, setAlertMessage, showAlert,
  };
  //-----------------------------

  // View states ----------------
  const [viewValue, setViewValue] = useState('card');
  const views = [
    { name: 'List View', value: 'list' },
    { name: 'Card View', value: 'card' },
    { name: 'Table View', value: 'table' },
  ];

  const viewProps = {
    views, viewValue, setViewValue,
  };
  //-----------------------------

  // Data states ----------------
  const [tvShows, setTvShows] = useState([]);tvShows
  const [tvShows2, showsDispatch] = useReducer(showsReducer, []);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortCol, setSortCol] = useState("");
  const columns = [
    { name: "Show Title", value: "ShowTitle" },
    { name: "Platform", value: "Platform" },
    { name: "Next Episode", value: "NextEpisode" },
    { name: "Previous Episode", value: "PrevEpisode" },
  ];

  const sortFunction = col => {
    if (col === sortCol) {
      setSortOrder((sortOrder === "asc") ? "desc" : "asc");
    } else {
      setSortCol(col);
      setSortOrder("asc");
    }
    const sorted = [...tvShows].sort((a, b) => {
      const multi = (sortOrder === "asc") ? 1 : -1;
      return multi * (a[sortCol] > b[sortCol]);
    });
    setTvShows(sorted);
  };

  const dataProps = {
    tvShows, setTvShows, sortOrder, sortCol, columns, sortFunction,
  };
  //-----------------------------

  useEffect(() => {
    const retreiveTvShows = async () => {
      try {
        // throw new Error("This is a forced error");
        const response = await getAllShows();
        console.log(response);
        setTvShows(response);
      } catch (err) {
        setAlertVariant("danger");
        setAlertMessage('Failed to retreive TV Shows');
        showAlert();
        console.error(err);
      }
    };
    retreiveTvShows();
  }, []);

  return (
    <div className="bg-dark text-white" style={{ minHeight: '100vh' }}>
      <BrowserRouter>
        <MyProviders alertProps={alertProps} dataProps={dataProps} showsDispatch={showsDispatch} viewProps={viewProps}>
          <Topbar />
          {visibleAlert && <AppAlert alertVariant={alertVariant} alertMessage={alertMessage} />}
          <Routes>
            <Route path="/" element={<AllShows />} />
            <Route path="/tvshow/:showID" element={<OneShow />} />
            <Route path="/search/:showName" element={<SearchResults />} />
            <Route path="/search/show/:showID" element={<OneShowSearch />} />
          </Routes>
        </MyProviders>
      </BrowserRouter>
    </div>
  )
}
