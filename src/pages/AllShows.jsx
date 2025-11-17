import { useContext } from 'react';
import { Link } from 'react-router';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ShowList from '../components/ShowList';
import SingleShow from '../components/SingleShow';
import { AlertContext, TvShowContext, ViewContext } from '../contexts/Contexts.js';

export default function AllShows() {
  const alertProps = useContext(AlertContext);
  const dataProps = useContext(TvShowContext);
  const viewProps = useContext(ViewContext);

  return (
    <>
      {(viewProps.viewValue === 'card') && <Row xs={1} sm={2} md={3} lg={4} xl={5} xxl={6}>
        {dataProps.tvShows.map((data, index) => (
          <Col>
            <SingleShow key={index} showData={data} alertProps={alertProps}/>
          </Col>
        ))}
      </Row>}

      {(viewProps.viewValue === 'list') && <ListGroup className="bg-dark text-white">
        {dataProps.tvShows.map((data, index) => (
          <ShowList key={index} showData={data} />
        ))}
      </ ListGroup>}

      {(viewProps.viewValue === 'table') && <Table striped bordered hover responsive variant="dark">
        <thead>
          <tr>
            {dataProps.columns.map((col, idx) => (
              <th key={idx}>{col.name} {" "}
                {(dataProps.sortCol === col.value) && ((dataProps.sortOrder === "asc") ? "up" : "down")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataProps.tvShows.map((data, idx1) => (
            <tr key={idx1}>
              {dataProps.columns.map((col, idx2) => (
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
