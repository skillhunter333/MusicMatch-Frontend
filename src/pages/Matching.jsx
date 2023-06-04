import { useAuthContext } from "../context/AuthContext";
import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios'
import getUserById from '../utils.js/getUserById'
import { useNavigate } from 'react-router-dom';
import { Card, Dropdown } from 'flowbite-react';




const Matching = () => {
    const navigate = useNavigate();

    const [matches, setMatches] = useState(null)
    const [matchedUser, setMatchedUser] = useState(null)
    const [matchesIndex, setMatchesIndex] = useState(0)


    async function handleGetMatchBtn(){
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users/getmatches`,
                {
                    withCredentials: true,
                }
            )
        setMatches(data)
        const user = await getUserById(data[matchesIndex].user._id)
        setMatchedUser(user)
        } catch (error) {
            console.log(error)
        }
    }

    async function handleNextBtn(){
        if(matchesIndex < (matches.length -1)){
            const newIndex = matchesIndex +1 
            setMatchesIndex(newIndex) 
            const user = await getUserById(matches[newIndex].user._id)
            setMatchedUser(user)
        } 
    }
   
    async function handlePrevBtn(){
        if(matchesIndex){
            console.log('A')
            const newIndex = matchesIndex - 1 
            setMatchesIndex(newIndex) 
            const user = await getUserById(matches[newIndex].user._id)
            setMatchedUser(user)
        } 
    }


    function handleChatBtn(){
        console.log('handleChatBtn has been clicked (hard)')
        console.log(matches[matchesIndex].user.matches)
    }

    function handleProfileBtn(){
        console.log('handleProfileBtn has been clicked (hard)')
        navigate(`/auth/profile/${matchedUser._id}`)
    }

    function handleSaveBtn(){
        console.log('handleSaveBtn has been clicked (hard)')
    }    
  
    return (
    
    <div className="bg-mmOrange h-full">

        <div className="flex flex-col items-center  bg-mmBlue">

            <h1 className='text-3xl font-semibold mb-8' >Finde dein MusicMatch!</h1>
            <h1 className='text-3xl font-semibold mb-8' >Finde dein MusicMatch!</h1>
       
            <div className="flex flex-col items-center w-6/12 border-solid border-2">

                <div className="flex h-96 w-full">
                 
                    <div className="flex flex-col items-center w-full text-white text-1xl bg-zinc-500 ">
                        {/* <h2 className="text-2xl">{matches? `Match(${matchesIndex +1 }/${matches.length})`: ''}</h2> */}
                        <img className="w-1/2 rounded-full mt-6" src={matchedUser && matchedUser.imgUrl} alt="user img"></img>
                        <p>{matchedUser && matchedUser.firstName}</p>
                        {matchedUser ? <p>Gemeinsamkeiten: {matches[matchesIndex].user.matches.length} </p> : '' }
                    </div>

                </div>


                <div className=" flex h-12 w-full text-white text-1xl bg-zinc-500" >
                    <button onClick={handleChatBtn} className="w-4/12  text-white text-1xl bg-slate-500 ">
                        {matchedUser && 'Chat'} 
                    </button>
                    <button onClick={handleProfileBtn} className="w-4/12  text-white text-1xl bg-slate-500 ">
                        {matchedUser && 'Profil'} 
                    </button>
                    <button onClick={handleSaveBtn} className="w-4/12  text-white text-1xl bg-slate-500 ">
                        {matchedUser && 'Speichern'} 
                    </button>
                </div>

                <button onClick={handleGetMatchBtn} className="w-full h-12 text-white text-1xl bg-amber-500" >
                        get match
                </button>


            </div>

                <button disabled={matchesIndex? false : true} onClick={handlePrevBtn} className="w-1/12  text-white text-1xl bg-slate-500 ">
                            {matchesIndex? 'prev':''} 
                </button>
                <button disabled={matchedUser && matchesIndex < matches.length -1 ?false:true} onClick={handleNextBtn} className=" w-1/12 text-white text-1xl bg-slate-500">
                            {matchedUser && matchesIndex < matches.length -1 ?'next':''}
                </button>
        </div>

    </div>



    );
};

export default Matching;
