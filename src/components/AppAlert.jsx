import Alert from 'react-bootstrap/Alert'

export default function AppAlert({alertVariant, alertMessage}) {
  return (
      <Alert variant={alertVariant} dismissible>
        <Alert.Heading>{alertMessage}</Alert.Heading>
      </Alert>
  )
}