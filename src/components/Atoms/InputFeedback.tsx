import React from "react";

const InputFeedback = ({ error }) =>
  error ? (
    <div className="input-feedback">
      {error}
      <style jsx>{`
      .input-feedback {
        color: #999;
        margin-top: .25rem;
        color: red;
      }
      `}</style>
    </div>
  ) : null;
  
export default InputFeedback