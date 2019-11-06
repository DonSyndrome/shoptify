import React from "react";

const Label = ({ error, children, ...props }) => {
  return (
    <label className="label" {...props}>
      {children}
      <style jsx>{`
        .label{
          font-weight: bold;
          display: block;
          margin-bottom: .5rem;
        }
        `}</style>
    </label>
  );
};
export default Label