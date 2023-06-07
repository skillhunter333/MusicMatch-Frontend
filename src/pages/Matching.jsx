import { useAuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import getUserById from "../utils.js/getUserById";
import { useNavigate } from "react-router-dom";
import { Card, Dropdown } from "flowbite-react";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import { toastError, toastSuccess } from "../lib/toastify";
import { ChatState } from "../context/ChatProvider";
import ConfettiExplosion from 'react-confetti-explosion';

const Matching = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const [matches, setMatches] = useState(null);
  const [matchedUser, setMatchedUser] = useState(null);
  const [matchesIndex, setMatchesIndex] = useState(0);
  const [dropDown, setDropDown] = useState(false);
  const [bounce, setBounce] = useState(false);


  const { chats, setChats, selectedChat, setSelectedChat } = ChatState();
  const [loading, setLoading] = useState(false);

  async function handleGetMatchBtn() {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/getmatches`,
        {
          withCredentials: true,
        }
      );
      console.log(data);
      setMatches(data);
      const user = await getUserById(data[matchesIndex].user._id);
      setBounce(true);

      const timeOut = setTimeout(stopBounce, 3500);

      function stopBounce() {
        setBounce(false);
        setMatchedUser(user);
      }
  
    } catch (error) {
      console.log(error);
    }
  }

  async function handleNextBtn() {
    if (matchesIndex < matches.length - 1) {
      const newIndex = matchesIndex + 1;
      setMatchesIndex(newIndex);
      const user = await getUserById(matches[newIndex].user._id);
      setMatchedUser(user);
    }
  }

  async function handlePrevBtn() {
    if (matchesIndex) {
      console.log("A");
      const newIndex = matchesIndex - 1;
      setMatchesIndex(newIndex);
      const user = await getUserById(matches[newIndex].user._id);
      setMatchedUser(user);
    }
  }

  const accessChat = async (userId) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/chat`,
        { userId },
        { withCredentials: true }
      );

      if (!chats.find((c) => c._id === data._id)) setChats([...chats, data]);
      setSelectedChat(data);
      setLoading(false);
    } catch (error) {
      toastError(error.message || "Error fetching the chat");
    }
  };

  function handleChatBtn() {
    try {
      accessChat(matches[matchesIndex].user._id);
      toastSuccess("Nutzer zu deinen Chats hinzugefügt");
    } catch (error) {
      toastError(error.message);
      console.log(error);
    }
  }

  function handleProfileBtn() {
    console.log("handleProfileBtn has been clicked (hard)");
    navigate(`/auth/profile/${matchedUser._id}`);
  }

  function handleSaveBtn() {
    console.log("handleSaveBtn has been clicked (hard)");
  }

  return (
    <div
      className={`${
        matchedUser
          ? "bg-mmOrange  bg-contain bg-[bottom_right_-6rem] bg-no-repeat bg-[url('/assets/images/hero.png')]"
          : "bg-mmOrange  bg-contain bg-[bottom_right_-6rem] bg-no-repeat bg-[url('/assets/images/hero.png')]"
      } h-full pl-80`}
    >
      <div className="mx-auto">{matchedUser && <ConfettiExplosion />}</div>;
      <div className="flex flex-col items-left h-full justify-center">
        <div>
          {/* <img src="src\images\logo.png" alt="asdfasdf"></img>  */}
          <div className="text-3xl font-semibold mb-8"></div>

          {matchedUser ? (
            ""
          ) : (
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl pl-6 font-semibold">
                Finde dein MusicMatch!
              </span>
            </div>
          )}
        </div>

        <div
          className={`${
            bounce ? "animate-bounce" : ""
          } drop-shadow-2xl border flex flex-col items-center w-96 border-black  rounded-lg bg-slate-100`}
        >
          <div className={`flex w-full ${matchedUser ? "" : "hidden"}`}>
            <div className="flex flex-col items-center w-full text-black text-1xl mx-5 ">
              <div className="flex items-center justify-around  ">
                <BiChevronLeft
                  className={`text-4xl  ${
                    matchesIndex ? "cursor-pointer" : "text-slate-100 "
                  }`}
                  onClick={handlePrevBtn}
                />
                <img
                  className={`w-36 h-36 rounded-full  mt-6 mb-4 ${
                    matchedUser ? "" : "hidden"
                  }`}
                  src={matchedUser && matchedUser.imgUrl}
                  alt="user img"
                ></img>
                <BiChevronRight
                  className={`text-4xl  ${
                    matchedUser && matchesIndex < matches.length - 1
                      ? "cursor-pointer"
                      : "text-slate-100 "
                  }`}
                  onClick={handleNextBtn}
                />
              </div>
              <div>
                <span className="text-2xl ">
                  {matchedUser && matchedUser.firstName}{" "}
                </span>
                <span className="text-2xl">
                  {matches ? `(${matchesIndex + 1}/${matches.length})` : ""}
                </span>
              </div>
              {matchedUser ? (
                <div>
                  <span>{matches[matchesIndex].user.matches.length}</span>{" "}
                  <span>Gemeinsamkeit(en)</span>
                </div>
              ) : (
                ""
              )}
              <div className="mt-2 border-y border-slate-300 w-full">
                <p className=" py-4 h-52 ">{matchedUser && (
                  matchedUser.userDescription === null || matchedUser.userDescription === ''
                  ? 'Keine Nutzerbeschreibung ...'
                  : matchedUser.userDescription.length > 300 ? matchedUser.userDescription.slice(0, 300) + " ..." : matchedUser.userDescription
                )}

                </p>
              </div>
            </div>
          </div>

          <div
            className={` flex h-12 w-full text-mmGrey text-1xl ${
              matchedUser ? "" : "hidden"
            }`}
          >
            <button
              onClick={handleChatBtn}
              className="w-4/12  text-black text-1xl  "
            >
              {matchedUser && "Chat"}
            </button>
            <button
              onClick={handleProfileBtn}
              className="w-4/12  text-black text-1xl  "
            >
              {matchedUser && "Profil"}
            </button>
            <button
              onClick={handleSaveBtn}
              className="w-4/12  text-black text-1xl  "
            >
              {matchedUser && "Speichern"}
            </button>
          </div>

          <div className="flex w-full">
            <button
              onClick={handleGetMatchBtn}
              className={`w-full h-12 text-white text-1xl bg-black ${
                matchedUser ? "rounded-bl-lg" : "rounded-l-lg"
              }`}
            >
              get match
            </button>
           
            <select class={`${matchedUser?'rounded-br-lg': 'rounded-r'} text-slate-50 bg-black  border-y-black border-r-black text-sm  focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}>
              <option selected>{user && user.settings.radius/1000}{' km'}</option>
              <option >2 km</option>
              <option >5 km</option>
              <option >10 km</option>
              <option >15 km</option>
              <option >20 km</option>
            </select>
      

          </div>
        </div>
     
      </div>
    </div>
  );
};

export default Matching;
