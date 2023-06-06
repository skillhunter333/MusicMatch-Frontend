import { useAuthContext } from "../context/AuthContext";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import * as React from "react";
import ReactMapGL, { Source, Layer, Marker, Popup } from "react-map-gl";
import meMarker from "../images/redMarker.png";
import othersMarker from "../images/greyMarker.png";

const Map = () => {
  const { user } = useAuthContext();

  const [viewPort, setViewPort] = useState({
    latitude: user.latitude,
    longitude: user.longitude,
    // width: '50vw',
    // height: '55vh',
    zoom: 12,
  });

  const [usersAround, setUsersAround] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popUp, setPopUp] = useState(null);

  useEffect(() => {
    getUsersAround();
    user.latOff = getRndInt(-5, 5);
    user.lonOff = getRndInt(-5, 5);
  }, []);

  const getUsersAround = async () => {
    try {
      //get all Users data
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/users/all`,
        {
          withCredentials: true,
        }
      );
      //set offset to users postition
      data.forEach((u) => {
        u.latOff = getRndInt(-20, 20);
        u.lonOff = getRndInt(-20, 20);
      });
      //filter authUser
      const filteredData = data.filter((u) => u._id != user._id);
      setUsersAround(filteredData);
    } catch (error) {
      if (error.response.status !== 400) toastError(error.message);
    }
  };

  const getRndInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  };

  const othersClickHandler = (e) => {
    const targetId = e.target._element.firstChild.getAttribute("_id");

    event.stopPropagation();
    setShowPopup(true);
    setPopUp({
      lat: e.target._lngLat.lat,
      lon: e.target._lngLat.lng,
      _id: targetId,
      firstName: usersAround.find((u) => u._id == targetId).firstName,
      imgUrl: usersAround.find((u) => u._id == targetId).imgUrl,
    });
  };

  const meClickHandler = (e) => {
    event.stopPropagation();
    setShowPopup(true);
    setPopUp({
      lat: e.target._lngLat.lat,
      lon: e.target._lngLat.lng,
      _id: user._id,
      firstName: "Du",
    });
  };

  return (
    <div className="flex bg-mmOrange h-screen items-center  ">
      <div className="drop-shadow-2xl mx-auto pt-10 h-4/5 w-4/5 ">
        {/* <div className="mt-20 ml-8 mr-8 bg-slate-400 h-6/12"> */}

        <ReactMapGL
          {...viewPort}
          style={{ width: "100%", height: "100%" }}
          onMove={(evt) => setViewPort(evt.viewPort)}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_KEY}
        >
          markers here
          <Marker
            onClick={meClickHandler}
            longitude={user.longitude}
            latitude={user.latitude}
            anchor="bottom"
            offset={[user.latOff, user.lonOff]}
          >
            <img src={meMarker} className="w-10 h-10" />
          </Marker>
          {usersAround.map((u, index) => (
            <Marker
              key={index}
              AAA={u._id}
              onClick={othersClickHandler}
              longitude={u.longitude}
              latitude={u.latitude}
              anchor="bottom"
              offset={[u.latOff, u.lonOff]}
            >
              <img
                _id={u._id}
                src={othersMarker}
                className="w-10 h-10 cursor-pointer"
              />
            </Marker>
          ))}
          {showPopup && (
            <Popup
              className="  text-1xl w-36 "
              longitude={popUp.lon}
              latitude={popUp.lat}
              anchor="bottom"
              onClose={() => setShowPopup(false)}
            >
              <div className=" bg-mmOrange flex flex-col items-center">
                <img
                  className="p-2 rounded-full w-28 h-28"
                  src={popUp && popUp.imgUrl}
                ></img>
                <div className="flex flex-col items-center  text-slate-50 bg-slate-800 w-full">
                  <p className=" font-bold">
                    {popUp.firstName ? popUp.firstName : "Musiker"}
                  </p>
                  <Link to={`/auth/profile/${popUp._id}`}>Profilseite</Link>
                </div>
              </div>
            </Popup>
          )}
        </ReactMapGL>
      </div>
    </div>
  );
};

export default Map;

/*
closeOnClick = {false}
*/
