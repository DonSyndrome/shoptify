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
type Props = {
  type: string,
  id: any,
  label: string,
  error: any,
  value: any,
  onChange: any,
  className?: any,
  placeholder:string,
  onBlur?:()=>void,
}

const TextInput = ({
  type,
  id,
  label,
  error,
  value,
  onChange,
  className,
  ...props
}:Props) => {
  return (
    <div className="input-group">
      <Label htmlFor={id} error={error}>
        {label}
      </Label>
      <input
        id={id}
        className="text-input"
        type={type}
        value={value}
        onChange={onChange}
        {...props}
      />
      <InputFeedback error={error} />
      <style jsx>{`

      .text-input {
        padding: .5rem;
        font-size: 16px;
        width: 100%;
        display: block;
        border-radius: 4px;
        border: 1px solid #ccc;
      }


      .text-input:focus {
        border-color: #007eff;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 0 3px rgba(0, 126, 255, 0.1);
        outline: none;
      }
      .input-group {
        margin-bottom: 1rem;
      }
      
      
      `}</style>
    </div>
  );
};

export default TextInput