import React  from "react";
import './Error.css';


function Error() {
    return (
      <div className="error-background">
        <h1 className="error-title">404 ERROR</h1>
        <p className="error-description">Page not found.</p>
      </div>
  );
}

export default Error;