import { useAuthContext } from "../context/AuthContext";
import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import getUserById from '../utils.js/getUserById'
import axios from 'axios'
import { Button } from 'flowbite';


const Skills = () => {

  const { user, setUser } = useAuthContext();
  //characteristics
  const [chars, setChars] = useState([])
  const [searchInput, setSearchInput] = useState('')

  useEffect(()=>{
    updateChars()
  },[])

  useEffect(()=>{
    updateChars()
  },[user, searchInput])

  async function handleSearchInput(event){
    try {
        
        setSearchInput(event.target.value)
        
    } catch (error) {
        if (error.response.status !== 400) toastError(error.message);
        console.log(error)
    }
  }
  
  
  async function handleAddSkill(event){
   
    const skill = event.target.textContent.trim()
    console.log(`skill: (${skill})`)
    
    try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/users/me/skills/`,{
              skill: skill
            },
          {
            withCredentials: true,            
          }
        );
        console.log(data)
        updateUser()  
      } catch (error) {
        if (error.response.status !== 400) toastError(error.message);
        console.log(error)
    }
    }

  async function handleDeleteSkill(event){
   
    const skill = event.target.closest('span').textContent.trim()
    
    console.log(`handleDeleteSkill skill: (${skill})`)
    
    try {
        const { data } = await axios.put(
          `${import.meta.env.VITE_API_URL}/users/me/skills/delete`,{
            skill: skill
          },
          {
              withCredentials: true,            
            }
            );
            console.log(data)
            
            updateUser()  
            
        } catch (error) {
        if (error.response.status !== 400) toastError(error.message);
        console.log(error)
    }

    }


    async function updateUser(){
    try {
        const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/users/me`,
        {
            withCredentials: true,
        }
        );
        setUser(data);
        
    } catch (error) {
        if (error.response.status !== 400) toastError(error.message);
    }
    };

    
    async function updateChars(){
      try {
        console.log('updateChars fired')
        const { data } = await axios.get('http://localhost:4000/characteristics', 
        {
            withCredentials: true,            
        }
        )
        let characteristics = data
        const { skills } = user
        
        //filter for skills that are not already been set
        skills.forEach(s => characteristics = characteristics.filter(c=> c.de !== s.name))  

        //filter after keyword 
        characteristics = characteristics.filter(c => c.de.toLowerCase().includes(searchInput))
                    
        setChars(characteristics)
         
      } catch (error) {
          if (error.response.status !== 400) toastError(error.message);
          console.log(error)
      }
    }

    return (
    <>
    {/* <Button.Group>
        <Button color="gray">
            Profile
        </Button>
        <Button color="gray">
            Settings
        </Button>
        <Button color="gray">
            Messages
        </Button>
    </Button.Group> */}


    <p className="text-3xl font-semibold ml-2 mb-2" >Skills</p>
    {/*ROW-1*/}
    <div className="mb-8">
        
        <div className=" border-solid border-2 border-gray-300 rounded-lg p-2  ">
            {user.skills.map((s,index) => (
            <span key={index} id="badge-dismiss-green" class="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-green-800 bg-green-100 rounded dark:bg-green-900 dark:text-green-300">
                {s.name}
                {/*flowbite badge*/}
                <button onClick={handleDeleteSkill} type="button" class="inline-flex items-center p-0.5 ml-2 text-sm text-green-400 bg-transparent rounded-sm hover:bg-green-200 hover:text-green-900 dark:hover:bg-green-800 dark:hover:text-green-300" data-dismiss-target="#badge-dismiss-green" aria-label="Remove">
                    <svg aria-hidden="true" class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only"></span>
                </button>
            </span>
            ))}
            
        </div>
    </div>

    
    
    <p className="text-3xl font-semibold ml-2 mb-2" >Skills Pool</p>
    {/* Searchbar */}
    <form class="flex items-center mb-2">   
        <label for="simple-search" class="sr-only">Search</label>
        <div class="relative w-full">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
            </div>
            <input onChange={handleSearchInput} type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Wähle Skills aus dem Skillpool..." required></input>
        </div>
        <button type="submit" class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <span class="sr-only">Search</span>
        </button>
    </form>
 

    {/*ROW-1*/}
    <div>
        <div className=" border-solid border-2 border-gray-300 rounded-lg p-2  ">
            {chars.map((c, index) => (
                <>
                {/*flowbite badge*/}
                <button onClick={handleAddSkill} key={index}  class="bg-yellow-100 text-yellow-800 text-l font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300 hover:bg-green-200 hover:text-green-900">{c.de}</button>
                </>
            ))}
            
        </div>
    </div>
    
  </>


  )
}

export default Skills;
