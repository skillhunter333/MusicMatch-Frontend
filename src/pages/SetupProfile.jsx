import { Button } from "flowbite-react";
import { useAuthContext } from "../context/AuthContext";
import { useState, useEffect, useContext } from "react";
import axios from "axios";

const SetupProfile = () => {
  const { user, setUser } = useAuthContext();


  async function handleSubmit(event) {

    console.log(event.target.parentElement.parentElement.children[1].firstChild.firstChild.value)



    try {
      // const { data } = await axios.put(
      //   `${import.meta.env.VITE_API_URL}/users/me/`,
      //   {
      //     skill: skill,
      //   },
      //   {
      //     withCredentials: true,
      //   }
      // );

      // console.log(data);
      // updateUser();
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
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              placeholder="Vorname"
              defaultValue={user && user.firstName}
            ></input>

            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              placeholder="Nachname"
              defaultValue={user && user.lastName}
            ></input>
          </div>

          <input
            className="mt-4 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            type="text"
            placeholder="E-Mail"
            defaultValue={user && user.email}
          ></input>

          <input
            className="mt-4 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            type="text"
            placeholder="Adresse"
            defaultValue={user && user.adress}
          ></input>

          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            type="text"
            placeholder="Postleitzahl"
            defaultValue={user && user.postalCode}
          ></input>

          <p className="mt-4 pl-1 block uppercase tracking-wide text-gray-700 text-xs font-bold">
            Suchradius (km)
          </p>
          <input
            className=" appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            type="text"
            placeholder="Suchradius in km"
            defaultValue={user && user.settings.radius/1000}
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
