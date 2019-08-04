import React from "react";
import { withFormik } from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    firstName: Yup.string()
      .min(2, "C'mon, your name is longer than that")
      .required("First name is required."),
    lastName: Yup.string()
      .min(2, "C'mon, your name is longer than that")
      .required("Last name is required."),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required!")
  }),

  mapPropsToValues: ({ user }) => ({
    ...user
  }),
  handleSubmit: (payload, { setSubmitting }) => {
    alert(JSON.stringify(payload, null, 2));
    setSubmitting(false);
  },
  displayName: "MyForm"
});

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

const Label = ({ error, className, children, ...props }) => {
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

const TextInput = ({
  type,
  id,
  label,
  error,
  value,
  onChange,
  className,
  ...props
}) => {
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
const MyForm = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    isSubmitting
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        id="firstName"
        type="text"
        label="First Name"
        placeholder="John"
        error={touched.firstName && errors.firstName}
        value={values.firstName}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <TextInput
        id="lastName"
        type="text"
        label="Last Name"
        placeholder="Doe"
        error={touched.lastName && errors.lastName}
        value={values.lastName}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <TextInput
        id="email"
        type="email"
        label="Email"
        placeholder="Enter your email"
        error={touched.email && errors.email}
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <button
        type="button"
        className="outline"
        onClick={handleReset}
        disabled={!dirty || isSubmitting}
      >
        Reset
      </button>
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
      {/* <DisplayFormikState {...props} /> */}
    </form>
  );
};

const MyEnhancedForm = formikEnhancer(MyForm);

// Helper for the demo
// import { MoreResources, DisplayFormikState } from "./formik-demo";

export default MyEnhancedForm;
// to use : <MyEnhancedForm user={{ email: "", firstName: "", lastName: "" }} />
