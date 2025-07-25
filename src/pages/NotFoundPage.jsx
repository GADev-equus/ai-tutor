/**
 * NotFoundPage component for 404 errors
 */
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="container py-5 text-center">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <h1 className="display-1 fw-bold">404</h1>
          <h2 className="mb-4">Page Not Found</h2>
          <p className="lead mb-5">
            We couldn't find the page you're looking for. It might have been
            moved, deleted, or never existed in the first place.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link to="/" className="btn btn-primary btn-lg px-4 gap-3">
              Return Home
            </Link>
            <Link to="/chat" className="btn btn-outline-secondary btn-lg px-4">
              Go to Chat
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
