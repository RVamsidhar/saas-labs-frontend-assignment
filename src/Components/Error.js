import React from "react";

export default function Error({ errorMessage }) {
  return (
    <div className="error-screen">
      <h2 className="error-title">Error Occurred</h2>
      <p className="error-message">{errorMessage}</p>
    </div>
  );
}
