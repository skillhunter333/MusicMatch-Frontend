import { useAuthContext } from "../context/AuthContext";
import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios'
import getUserById from '../utils.js/getUserById'
import { useNavigate } from 'react-router-dom';
import { Card, Dropdown } from 'flowbite-react';
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";




const Matching = () => {
    const navigate = useNavigate();

    const [matches, setMatches] = useState(null)
    const [matchedUser, setMatchedUser] = useState(null)
    const [matchesIndex, setMatchesIndex] = useState(0)
    const [dropDown, setDropDown] = useState(false)


    async function handleGetMatchBtn(){
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users/getmatches`,
                {
                    withCredentials: true,
                }
            )
        console.log(data)
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
    
    <div className={`${matchedUser?'bg-slate-800':'bg-mmOrange'} h-full`}>
      
        <div className="flex flex-col items-center  h-full justify-center">

            
            <div>
                {/* <img src="src\images\logo.png" alt="asdfasdf"></img>  */}
                <h1 className='text-3xl font-semibold mb-8'>{matchedUser?'':'Finde dein MusicMatch!'}</h1>
            </div>
       
            <div className="flex flex-col items-center w-96 border-solid border-2 rounded-lg bg-mmOrange">
                      

                <div className={`flex w-full ${matchedUser?'':'hidden'}`}>
                 
                    <div className="flex flex-col items-center w-full text-white text-1xl mx-5 ">
                        
                        <div className="flex items-center justify-around ">
                            <BiChevronLeft className={`text-4xl  ${matchesIndex? 'cursor-pointer' : 'text-mmOrange '}`} onClick={handlePrevBtn}/>
                            <img className={`w-2/5 rounded-full mt-6 mb-4 ${matchedUser?'':'hidden'}`} src={matchedUser && matchedUser.imgUrl} alt="user img"></img>
                            <BiChevronRight className={`text-4xl  ${matchedUser && matchesIndex < matches.length -1 ?'cursor-pointer':'text-mmOrange '}`} onClick={handleNextBtn}/>
                        </div>
                        <div>
                            <span className="text-2xl  dark:text-white">{matchedUser && matchedUser.firstName} </span>
                            <span className="text-2xl">{matches? `(${matchesIndex +1 }/${matches.length})`: ''}</span> 
                        </div>
                        {matchedUser ? <div><span className="bg-mmOrange rounded">{matches[matchesIndex].user.matches.length}</span>  <span>Gemeinsamkeit(en)</span></div>  : '' }

                        <p className="border-y py-2 mt-3 ">{matchedUser && matchedUser.userDescription}</p>
                    </div>

                </div>

              
                <div className={` flex h-12 w-full text-white text-1xl ${matchedUser?'':'hidden'}`} >
                    <button onClick={handleChatBtn} className="w-4/12  text-white text-1xl  ">
                        {matchedUser && 'Chat'} 
                    </button>
                    <button onClick={handleProfileBtn} className="w-4/12  text-white text-1xl  ">
                        {matchedUser && 'Profil'} 
                    </button>
                    <button onClick={handleSaveBtn} className="w-4/12  text-white text-1xl  ">
                        {matchedUser && 'Speichern'} 
                    </button>
                </div>

                <button onClick={handleGetMatchBtn} className={`w-full h-12 text-white text-1xl bg-black ${matchedUser?'rounded-b-lg':'rounded-lg'}`} >
                        get match
                </button>

            </div>

            {/* <button onClick={()=>setDropDown(true)} >dropdown</button>
            {dropDown
            ? (
                <ul>
                    <li>2 km</li>
                    <li>5 km</li>
                    <li>8 km</li>
                    <li>10 km</li>
                    <li>15 km</li>
                    <li>25 km</li>
                </ul>
            )
            : null
        } */}
           
        </div>

    </div>



    );
};

export default Matching;
