/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import useLogin from "../hooks/useLogin";
import useAuthContext from '../hooks/useAuthContext';

const Login = () => {
  const navigate = useNavigate();
  const {authUser} = useAuthContext();

  const { loading, login } = useLogin();
  const [error,setError] = useState('');

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  function renderError(error) {
    return <div style={{color:"red"}}>{error}</div>;
  }

  const formik = useFormik({
    initialValues:{
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const { error } = await login(values);
      if (error) {
        setError(error);
      } else {
        setError('');
        navigate("/", { replace: true });
      }
    },
    validate: (values) => {
      let errors = {};

      if(!values.email){
        errors.email = "Email is required";
      }else if(!isValidEmail(values.email)){
        errors.email = "Invalid email";
      }

      if(!values.password){
        errors.password = "Password is required";
      }
      return errors;
    }
  })

  useEffect(() => {
    if(authUser && authUser){
      navigate("/",{replace:true});
    }
  },[authUser,navigate])

  return(
    <div className="flex min-h-full flex-1 flex-col backdrop-blur-sm bg-opacity-0 justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        className="mx-auto h-10 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black">
        Login in to your account
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-bold leading-6 text-black">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              value={formik.values.email}
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter Email"
              className="block w-full rounded-md border-0 py-1.5 text-orange-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        {formik.errors.email && renderError(formik.errors.email)}

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-bold leading-6 text-black">
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              value={formik.values.password}
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter Password"
              className="block w-full rounded-md border-0 py-1.5 text-orange-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        {formik.errors.password && renderError(formik.errors.password)}
        {error && renderError(error)}

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {loading ? <span className="loading loading-spinner"></span> : "Login"}
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-lg text-black font-bold">
        Not a member?{' '}
        <Link to={"/signup"} className="font-bold text-lg leading-6 text-red-500 hover:text-orange-800">
          signup here
        </Link>
      </p>
    </div>
  </div>
  )
};

export default Login;
