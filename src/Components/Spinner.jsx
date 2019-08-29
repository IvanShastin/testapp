import React from "react";

export default function Spinner() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <span className="mr-2">Searching</span>
      {[0, 1, 2].map(val => {
        return (
          <div key={val} className="spinner-grow text-secondary" role="status">
            <span className="sr-only"></span>
          </div>
        );
      })}
    </div>
  );
}
