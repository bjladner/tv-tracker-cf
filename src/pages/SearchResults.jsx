import { useState, useEffect } from 'react';
import { tvShowResults } from '../requests';
import { useParams, useNavigate } from "react-router";
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Result from '../components/Result';

export default function SearchResults({ alertProps }) {
  const { showName } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()


  useEffect(() => {
    const retreiveTvShows = async (showName) => {
      try {
        // throw new Error("This is a forced error");
        console.log(showName);
        const response = await tvShowResults(showName);
        setSearchResults(response);
      } catch (err) {
        alertProps.setAlertVariant("danger");
        alertProps.setAlertMessage('Failed to retreive TV Show results');
        alertProps.showAlert();
        setError('Failed to retreive TV Show results');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    retreiveTvShows(showName);
  }, [alertProps, showName]);

  const returnToMenu = () => {
    navigate(`/`)
  }

  if (loading) return <div>Loading TV Show results ...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container d-flex flex-column align-items-start justify-content-center w-100 py-5 text-white">
      <h3>Search Results for {showName}</h3>
      <ListGroup className="bg-dark text-white">
        {searchResults.map((data, index) => (
          <Result key={index} showData={data} alertProps={alertProps} />
        ))}
      </ ListGroup>
      <Button variant="primary" onClick={returnToMenu}>
        All Shows
      </Button>
    </div>
  )
}
