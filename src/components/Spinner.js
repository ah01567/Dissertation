import Spinner from 'react-bootstrap/Spinner';
import '../Design/Spinner.css'; 

function LoadingSpinner() {
  return (
        <div className="text-center">
            <Spinner animation="border" role="status" />
            <div >Loading...</div>
        </div>
  );
}

export default LoadingSpinner; 