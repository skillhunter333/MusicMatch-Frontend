import { Button } from "flowbite-react";
import { useAuthContext } from "../context/AuthContext";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { AddressAutofill } from "@mapbox/search-js-react";
import ReactDOM from "react-dom";

const SetupProfile = () => {
  const { user } = useAuthContext();

  const [
    { firstName, lastName, street, city, country, postalCode, radius },
    setForm,
  ] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    country: "",
    postalCode: "",
    radius: "",
  });

  useEffect(() => {
    setForm({
      firstName: user.firstName && user.firstName,
      lastName: user.lastName && user.lastName,
      street: user.address.street && user.address.street,
      city: user.address.city && user.address.city,
      country: user.address.country && user.address.country,
      postalCode: user.postalCode && user.postalCode,
      radius: user.settings.radius && user.settings.radius / 1000,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`${name}:  (${value})`);
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit() {
    try {
      console.log(
        `firstName: (${firstName}) lastName: (${lastName}) street: (${street}) city: (${city}) country: (${country}) postalCode: (${postalCode}) radius: (${radius})`
      );
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/me/`,
        {
          firstName,
          lastName,
          address: {
            street: street,
            city: city,
            country: country,
          },
          postalCode,
          settings: {
            radius: radius * 1000,
          },
        },
        {
          withCredentials: true,
        }
      );
      console.log(data);
      console.log("blub");
    } catch (error) {
      // if (error.response.status !== 400) toastError(error.message);
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
              type="text"
              placeholder="Vorname"
              name="firstName"
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

          {/* <input
              className="mt-4 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Adresse"
              name="adress"
              defaultValue={user && user.adress}
              onChange={handleChange}
            ></input> */}

          <form>
            <AddressAutofill accessToken={`${import.meta.env.VITE_MAPBOX_KEY}`}>
              <input
                autoComplete="street-address"
                type="text"
                placeholder="Straße, Hausnummer"
                name="street"
                defaultValue={user && user.address.street}
                onChange={handleChange}
              />

              {/* <input
                autoComplete="address-line1"
                type="text"
                placeholder="Straße, Hausnummer"
                name="street"
                defaultValue={user.adress && user.address.street}
                onChange={handleChange}
              /> */}

              <input
                name="city"
                placeholder="Stadt"
                type="text"
                autoComplete="address-level2"
                defaultValue={user && user.address.city}
                onChange={handleChange}
              />
              <input
                name="country"
                placeholder="Land"
                type="text"
                autoComplete="country"
                defaultValue={user && user.address.country}
                onChange={handleChange}
              />
              <input
                name="postalCode"
                placeholder="Postleitzahl"
                type="text"
                autoComplete="postal-code"
                defaultValue={user && user.postalCode}
                onChange={handleChange}
              />
            </AddressAutofill>
          </form>

          <p className="mt-4 pl-1 block uppercase tracking-wide text-gray-700 text-xs font-bold">
            Suchradius (km)
          </p>
          <input
            className=" appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder="Suchradius in km"
            name="radius"
            defaultValue={user && user.settings.radius}
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
