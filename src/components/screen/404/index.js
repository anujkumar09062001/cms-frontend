import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1>404</h1>
        <h3 className="mt-3">The page you are looking for was not found</h3>

        <Link to="/" className="text-decoration-none">
          <h5 className="text-primary mt-3">Back to home</h5>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
