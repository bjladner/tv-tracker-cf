// import { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert'

export default function AppAlert({alertVariant, alertMessage}) {
  // const [visibleAlert, setVisibleAlert] = useState(true);

  // useEffect(() => {
  //   setVisibleAlert(true)
  //   setTimeout( () => {
  //     setVisibleAlert(false)
  //   }, 5000);
  // }, []);

  return (
    <div>
      {
      // visibleAlert && 
      <Alert variant={alertVariant} dismissible>
        <Alert.Heading>{alertMessage}</Alert.Heading>
      </Alert>
      }
    </div>
  )
}