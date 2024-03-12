/* eslint-disable no-unused-vars */

/* eslint-disable no-unused-vars */

import { useEffect } from "react";
import { useFormik } from "formik";
import { Link,useNavigate } from "react-router-dom";

import useSignup from "../hooks/useSignup";
import useAuthContext from '../hooks/useAuthContext';
import { genderDetails, passwordError } from "../constants/constants";

const Signup = () => {
  const navigate = useNavigate();
  const {authUser} = useAuthContext();

  const { loading, signup } = useSignup();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
    },
    onSubmit: async (values) => {
      await signup(values);
      navigate("/",{replace:true});
    },
    validate: (values) => {
      let errors = {};

      if (!values.fullName) {
        errors.fullName = "Fullname is Required";
      } else if (values.fullName.length < 3) {
        errors.fullName = "Fullname must be at least 3 characters";
      }

      if (!values.email) {
        errors.email = "Email Is Required";
      } else if (!isValidEmail(values.email)) {
        errors.email = "Invalid email address";
      }

      if (!values.password) {
        errors.password = "Password is required";
      } else if (values.password.length < 8) {
        errors.password = "Password should be at least 8 characters";
      } else if (!isValidPassword(values.password)) {
        errors.password = passwordError;
      }

      if (!values.confirmPassword) {
        errors.confirmPassword = "confirm password is required";
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "passwords doesn't match";
      }

      if (!values.gender) {
        errors.gender = "Gender is Required";
      }
      return errors;
    },
  });

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRegex = /[0-9]/;
    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    return (
      password.length >= 8 &&
      symbolRegex.test(password) &&
      numberRegex.test(password) &&
      upperCaseRegex.test(password) &&
      lowerCaseRegex.test(password)
    );
  };

  function renderInput(name, label, type) {
    return (
      <div>
        <label htmlFor={name} className="block text-sm font-bold leading-6 text-black">
          {label}
        </label>
        <div className="mt-2">
          <input
            id={name}
            name={name}
            type={type}
            required
            value={formik.values[name]}
            placeholder={`Enter ${label}`}
            className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
      </div>
    );
  }

  function renderError(error) {
    return <div style={{color:"red"}}>{error}</div>;
  }

  useEffect(() => {
    if(authUser && authUser){
      navigate("/",{replace:true});
    }
  },[authUser,navigate])

  return (
    <div className="flex max-h-full overflow-y-scroll flex-1 flex-col backdrop-blur-sm bg-opacity-0 justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form autoComplete="off" className="space-y-3" onSubmit={formik.handleSubmit}>
          {renderInput("fullName", "Full Name", "text")}
          {formik.errors.fullName && renderError(formik.errors.fullName)}

          {renderInput("email", "Email Address", "email")}
          {formik.errors.email && renderError(formik.errors.email)}

          {renderInput("password", "Password", "password")}
          {formik.errors.password && renderError(formik.errors.password)}

          {renderInput("confirmPassword", "Confirm Password", "password")}
          {formik.errors.confirmPassword && renderError(formik.errors.confirmPassword)}

          <div>
            <label htmlFor="gender" className="block text-sm font-bold leading-6 text-black">
              Gender
            </label>
            <div className="mt-2">
              <select
                id="gender"
                name="gender"
                required
                value={formik.values.gender}
                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                {genderDetails.map((gender) => (
                  <option key={gender.id} value={gender.value}>
                    {gender.value}
                  </option>
                ))}
              </select>
            </div>
            {formik.errors.gender && renderError(formik.errors.gender)}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {loading ? <span className="loading loading-spinner"></span> : "Sign Up"}
            </button>
          </div>
        </form>

        <p className="mt-5 text-center font-bold text-sm text-black">
          Already Had an Account?{' '}
          <Link to={"/login"} className="font-bold leading-6 text-indigo-900 hover:text-indigo-500">
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );

};

export default Signup;
