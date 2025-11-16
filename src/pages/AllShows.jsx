import { useState, useEffect } from 'react';
import { Link } from 'react-router'
import { getAllShows } from '../requests';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ShowList from '../components/ShowList';
import SingleShow from '../components/SingleShow';

export default function AllShows({ alertProps }) {
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [viewValue, setViewValue] = useState('card');
  const views = [
    { name: 'List View', value: 'list' },
    { name: 'Card View', value: 'card' },
    { name: 'Table View', value: 'table' },
  ];

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

  useEffect(() => {
    const retreiveTvShows = async () => {
      try {
        // throw new Error("This is a forced error");
        const response = await getAllShows();
        console.log(response);
        setTvShows(response);
      } catch (err) {
        alertProps.setAlertVariant("danger");
        alertProps.setAlertMessage('Failed to retreive TV Shows');
        alertProps.showAlert();
        setError('Failed to retreive TV Shows');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    retreiveTvShows();
  }, [alertProps]);

  if (loading) return <div>Loading TV Shows ...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <ButtonGroup>
        {views.map((view, idx) => (
          <ToggleButton
            key={idx}
            id={`view-${idx}`}
            type="radio"
            name="radio-view"
            value={view.value}
            checked={viewValue === view.value}
            onChange={(e) => setViewValue(e.currentTarget.value)}
          >
            {view.name}
          </ToggleButton>
        ))}
      </ButtonGroup>

      {/* <ButtonGroup>
        {columns.map((sort, idx) => (
          <Button
            key={idx}
            id={`sort-${idx}`}
            type="button"
            name="btn-sort"
            onClick={() => sortFunction(sort.value)}
          >
            Sort by {sort.name}
          </Button>
        ))}
      </ButtonGroup> */}

      {(viewValue === 'card') && <Row xs={1} sm={2} md={3} lg={4} xl={5} xxl={6}>
        {tvShows.map((data, index) => (
          <Col>
            <SingleShow key={index} showData={data} alertProps={alertProps}/>
          </Col>
        ))}
      </Row>}

      {(viewValue === 'list') && <ListGroup className="bg-dark text-white">
        {tvShows.map((data, index) => (
          <ShowList key={index} showData={data} />
        ))}
      </ ListGroup>}

      {(viewValue === 'table') && <Table striped bordered hover responsive variant="dark">
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx}>{col.name} {" "}
                {(sortCol === col.value) && ((sortOrder === "asc") ? "up" : "down")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tvShows.map((data, idx1) => (
            <tr key={idx1}>
              {columns.map((col, idx2) => (
                <td key={idx2}>
                  {(( "ShowTitle" === col.value) ? <Link to={`/tvshow/${data.ShowId}/`}>{data[col.value]}</Link> : `${data[col.value]}`)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>}
    </>
  )
}
