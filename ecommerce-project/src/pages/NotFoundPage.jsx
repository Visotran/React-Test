import {Header} from '../components/Header'
import './NotFoundPage.css';

export function NotFoundPage({cart}) {
  return (
    <>
      <Header cart={cart}></Header>
      <div className="not-found-container">
        <p className="not-found-text">The page you're looking for could not be found.</p>
      </div>
    </>
  );
}