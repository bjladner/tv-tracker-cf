import { useState, useEffect } from 'react';
import { getAllShows } from '../requests';
import ListGroup from 'react-bootstrap/ListGroup';
import TvShow from '../components/TvShow';

export default function AllShows() {
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const retreiveTvShows = async () => {
      try {
        const response = await getAllShows();
        console.log(response);
        setTvShows(response);
      } catch (err) {
        setError('Failed to retreive TV Shows');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    retreiveTvShows();
  }, []);


  if (loading) return <div>Loading TV Shows ...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container d-flex flex-column align-items-start justify-content-center w-100 py-5 text-white">
      <ListGroup className="bg-dark text-white">
        {tvShows.map((data, index) => (
          <TvShow key={index} showData={data} />
        ))}
      </ ListGroup>
    </div>
  )
}
