import { useAuthContext } from "../context/AuthContext";
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios'

import { useState, useEffect, useContext } from 'react';

import * as React from 'react';
import ReactMapGL, {Source, Layer, Marker} from 'react-map-gl';

import meMarker from '../images/redMarker.png'
import othersMarker from '../images/greyMarker.png'





const Map = () => {

    const { user } = useAuthContext();

    const [viewPort, setViewPort] = useState({
        latitude: user.latitude,
        longitude: user.longitude,
        width: '50vw',
        height: '50vh',
        zoom: 12
    })

    const [usersAround, setUsersAround] = useState([])
    
        
    useEffect(() => {
        getUsersAround()
    },[])

    const getUsersAround = async () => {
        const { data } = await axios(
            `${import.meta.env.VITE_API_URL}/users/all`,
            {
              withCredentials: true,
            }
          );
          //filter authUser
          const filteredData = data.filter(u => u._id != user._id)
          setUsersAround(filteredData)
    }

    function getRndInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
      }
        
  
    return (
        <>  <h1>Find musicians around...</h1>
           
           <ReactMapGL 
                {...viewPort}
                style={{width: 700, height: 400}}
                onMove={evt => setViewPort(evt.viewPort)}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={import.meta.env.VITE_MAPBOX_KEY}>
                markers here
                
                <Marker longitude={user.longitude} latitude={user.latitude} anchor="bottom" offset={[getRndInt(-5,5), getRndInt(-5,5)]} >
                        <img src={meMarker} className='w-10 h-10'/>
                </Marker>

                { usersAround.map(u => (
                        <Marker longitude={u.longitude} latitude={u.latitude} anchor="bottom" offset={[getRndInt(-5,5), getRndInt(-5,5)]}  >
                            <img src={othersMarker} className='w-10 h-10'/>
                        </Marker>
                 ))
                }

                
                
           </ReactMapGL>
        </>
    
    );
};

export default Map;



