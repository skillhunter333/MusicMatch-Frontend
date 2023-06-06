import { Button } from "flowbite-react";
import { useAuthContext } from "../context/AuthContext";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Divider, Placeholder } from 'rsuite';

const SetupProfile = () => {
  const { user, setUser } = useAuthContext();

  const [{ firstName, lastName, address, postalCode, radius }, setForm] =
    useState({
      firstName: "",
      lastName: "",
      address: "",
      postalCode: "",
      radius: ""
    });

  useEffect(()=>{
    setForm({
      firstName: user.firstName && user.firstName,
      lastName: user.lastName && user.lastName,
      address: user.address && user.address,
      postalCode: user.postalCode && user.postalCode,
      radius: user.settings.radius && user.settings.radius
    })
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(event) {
    try {
      console.log(
        `firstName: (${firstName}) lastName: (${lastName}) address: (${address}) postalCode: (${postalCode}) radius: (${radius})`
      );
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/me/`,
        {
          firstName,
          lastName,
          address,
          postalCode,
          settings: {
            radius: radius*1000
          } 
        },
        {
          withCredentials: true,
        }
      );
      console.log(data);
    } catch (error) {
      if (error.response.status !== 400) toastError(error.message);
      console.log(error);
    }
  }

  return (
    <div className="bg-slate-50 h-full">
      <div className="pt-20 px-8 w-2/3 ">
        <h1 className="text-3xl mb-4">Einstellungen</h1>

        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            {/* <input
              type='text'
              placeholder='E-mail'
              name='email'
              value={email}
              onChange={handleChange}
              className={inputStyles}
            /> */}

            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Vorname"
              name="fistName"
              defaultValue={user && user.firstName}
              onChange={handleChange}
            ></input>



            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Nachname"
              name="lastName"
              defaultValue={user && user.lastName}
              onChange={handleChange}
            ></input>
          </div>

          <input
            className="mt-4 cursor-not-allowed appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder="E-mail"
            disabled={true}
            defaultValue={user && user.email}
            onChange={handleChange}
          ></input>

          <input
            className="mt-4 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder="Adresse"
            name="adress"
            defaultValue={user && user.adress}
            onChange={handleChange}
          ></input>

          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder="Postleitzahl"
            name="postalCode"
            defaultValue={user && user.postalCode}
            onChange={handleChange}
          ></input>

          <p className="mt-4 pl-1 block uppercase tracking-wide text-gray-700 text-xs font-bold">
            Suchradius (km)
          </p>
          <input
            className=" appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder="Suchradius in km"
            name="radius"
            defaultValue={user && user.settings.radius / 1000}
            onChange={handleChange}
          ></input>
        </div>

        <Button onClick={handleSubmit} className="mt-6 " color="dark">
          Änderung übernehemen
        </Button>
      </div>
    </div>
  );
};

export default SetupProfile;
