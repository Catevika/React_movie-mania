import { useRouteError } from 'react-router-dom';
import './ErrorBoundary.css';

export default function ErrorBoundary() {
  let error = useRouteError();

  return (
    <div className='error-container'>
      <p>Ooops! Something went wrong...</p>
      <p>{error.message}</p>
    </div>
  );
}
