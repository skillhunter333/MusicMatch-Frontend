import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { toastError } from "../lib/toastify";
import { useAuthContext } from "../context/AuthContext";

const inputStyles =
  "w-3/5 mb-2 sm:mb-4 lg:mb-8 p-2 outline-none border-b border-transparent focus:border-slate-400 dark:focus:border-slate-100 dark:bg-slate-500 rounded transition-all";

const Register = () => {
  const { isAuth, setGotCookie } = useAuthContext();
  const navigate = useNavigate();
  const [{ email, password, firstName, lastName, postalCode }, setForm] =
    useState({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      postalCode: "",
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { status } = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/register`,
        { email, password, firstName, lastName, postalCode },
        { withCredentials: true }
      );
      if (status === 201) setGotCookie(true);
    } catch (error) {
      toastError(error.message || "No cookie back");
    }
  };

  if (isAuth) return <Navigate to="/auth/dashboard" />;
  else
    return (
      <main className="bg-slate-800 mt-[-1px] w-full h-screen flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-between dark:bg-slate-600 pt-4 bg-slate-100 rounded overflow-hidden mx-auto my-0 w-2/3 sm:w-1/2 lg:w-1/3 transition-all"
        >
          <h1 className="mt-2 mb-8 lg:mb-16 text-xl font-semibold dark:text-white">
            Register
          </h1>
          <div className="flex flex-col items-center justify-around h-2/3 w-full">
            <input
              type="text"
              placeholder="Vorname"
              name="firstName"
              value={firstName}
              onChange={handleChange}
              className={inputStyles}
            />
            <input
              type="text"
              placeholder="Nachname"
              name="lastName"
              value={lastName}
              onChange={handleChange}
              className={inputStyles}
            />
            <input
              type="text"
              placeholder="Postleitzahl"
              name="postalCode"
              value={postalCode}
              onChange={handleChange}
              className={inputStyles}
            />
            <input
              type="text"
              placeholder="E-mail"
              name="email"
              value={email}
              onChange={handleChange}
              className={inputStyles}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleChange}
              className={inputStyles}
            />
          </div>
          <br />
          <div className="flex w-full">
            <button
              onClick={() => navigate("/login")}
              className="w-1/2 bg-zinc-300 hover:bg-sky-500 dark:bg-zinc-300 dark:hover:bg-sky-500 p-1"
            >
              Log in
            </button>
            <button className="w-1/2 text-black bg-mmOrange hover:bg-green-400 dark:bg-gray-900 dark:hover:bg-sky-500 p-1">
              Register
            </button>
          </div>
        </form>
      </main>
    );
};

export default Register;
