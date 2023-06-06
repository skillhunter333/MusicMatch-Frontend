import React, { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import getUserById from "../utils.js/getUserById";
import axios from "axios";
import { Modal, Button, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";

const ProfilePage = () => {
  const { id } = useParams();
  //user is based on params id
  const [user, setUser] = useState(null);
  const [openModal, setOpenModal] = useState(0);
  const [openDescModal, setOpenDescModal] = useState(false);
  // const [isOpen, setIsOpen] = useState(false);
  const [charDesc, setCharDesc] = useState("");
  const [charType, setCharType] = useState("");
  const [charName, setCharName] = useState("");

  useEffect(() => {
    updateUser();
  }, []);

  function handleInterestClick() {
    try {
    } catch (error) {
      console.log(error);
    }
  }

  async function updateUser() {
    try {
      const user = await getUserById(id);
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSafeUserDesc(e){
    try {
      const newUserDesc = e.target.parentElement.parentElement.parentElement.children[1].firstChild.firstChild.firstChild.firstChild.value
      console.log(`handleSafeUserDesc: (${newUserDesc})`)
    
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/me/`,
        { userDescription: newUserDesc },
        { withCredentials: true }
      );
      console.log(data)
      updateUser();
    } catch (error) {
      if (error.response.status !== 400) toastError(error.message);
      console.log(error);
    }

  };

  function handleUserDescriptionClick(e){
    try {
      console.log(`handleUserDescriptionClick: (${e.target.textContent})`)
      setOpenDescModal(true)
    
    } catch (error) {
      console.log(error)
    }
  }

  async function handleSafeDesc(event) {
    try {
      console.log("handleSafeDesc fired");
      console.log(`charType: (${charType})`);
      console.log(`charName: (${charName})`);
      console.log(`charDesc: (${charDesc})`);
      console.log(
        `newCharDesc: (${event.target.parentElement.parentElement.parentElement.children[1].firstChild.firstChild.firstChild.firstChild.value})`
      );
      const newCharDesc =
        event.target.parentElement.parentElement.parentElement.children[1]
          .firstChild.firstChild.firstChild.firstChild.value;

      if (charDesc !== newCharDesc) {
        if (charType !== "skill" && charType !== "interest")
          throw new Error("unknown characteristics type");
        if (charType === "skill") {
          await handleDeleteSkill(charName);
          handleAddSkill(charName, newCharDesc);
        } else {
          await handleDeleteInterest(charName);
          handleAddInterest(charName, newCharDesc);
        }
      }
      setOpenModal(0);
      updateUser();
      setCharDesc("");
    } catch (error) {
      if (error.response.status !== 400) toastError(error.message);
      console.log(error);
    }
  }

  async function handleDeleteInterest(interest) {
    console.log("handleDeleteInterest: " + interest);
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/me/interests/delete`,
        { interest: interest },
        { withCredentials: true }
      );
      updateUser();
    } catch (error) {
      if (error.response.status !== 400) toastError(error.message);
      console.log(error);
    }
  }

  async function handleDeleteSkill(skill) {
    console.log(`handleDeleteSkill skill: (${skill})`);
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/me/skills/delete`,
        { skill: skill },
        { withCredentials: true }
      );
      console.log(data);
      updateUser();
    } catch (error) {
      if (error.response.status !== 400) toastError(error.message);
      console.log(error);
    }
  }

  //
  async function handleAddSkill(skill, newCharDesc) {
    console.log(`handleAddSkill skill: (${skill})`);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/me/skills/`,
        {
          skill: skill,
          description: newCharDesc,
        },
        {
          withCredentials: true,
        }
      );
      console.log(data);
      updateUser();
    } catch (error) {
      if (error.response.status !== 400) toastError(error.message);
      console.log(error);
    }
  }

  async function handleAddInterest(interest, newCharDesc) {
    console.log(`handleAddInterest: (${interest})`);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/me/interests/`,
        {
          interest: interest,
          description: newCharDesc,
        },
        { withCredentials: true }
      );
      console.log(data);
      updateUser();
    } catch (error) {
      if (error.response.status !== 400) toastError(error.message);
      console.log(error);
    }
  }

  async function handleDescClick(event) {
    try {
      console.log("handleEdit fired");

      event.target.textContent === "Beschreibung einfügen..."
        ? setCharDesc("")
        : setCharDesc(event.target.textContent);

      setCharName(event.target.parentElement.firstChild.textContent);
      setCharType(event.target.attributes.charType.value);

      setOpenModal(1);
    } catch (error) {
      if (error);
      console.log(error);
    }
  }

  const handleUploadSuccess = async (secureUrl) => {
    try {
      console.log(`this is the new imgUrl from the upload ${secureUrl}`);
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/me`,
        { imgUrl: secureUrl },
        { withCredentials: true }
      );
      updateUser();
    } catch (error) {
      if (error.response.status !== 400) toastError(error.message);
      console.log(error);
    }
  };

  function handleCloseModal() {
    try {
      setOpenModal(0);
      setOpenDescModal(false)
    } catch (error) {
      console.log(error);
    }
  }
  // function handleCloseModalProfilePic() {
  //   try {
  //     setIsOpen(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    //main container
    <main className="flex flex-col gap-4 bg-slate-50 p-5 pt-16">

      <div className="flex gap-4 flex-col ">
        {/*ROW(1) row with img, name and description*/}
        <div className="flex  h-48   ">
          {/*COL column with image*/}

          <img
            className="w-48 rounded-full"
            // className="rounded-full"
            src={user && user.imgUrl}
            alt="Profile Picture"
            id="upload_widget"
            // onClick={() => {
            //   setIsOpen(true);
            // }}
          />

          {/*COL column with name and description*/}
          <div className="flex  flex-col w-11/12 ml-4 gap-4 p-2  ">
            {/*ROW with first and lastname*/}
            {user && (
              <div className="flex  gap-4">
                <h2 className="text-4xl  dark:text-white">
                  {user.firstName ? user.firstName : "Vorname"}
                </h2>
                <h2 className="text-4xl  dark:text-white">
                  {user.lastName ? user.lastName : "Nachname"}
                </h2>
              </div>
            )}
            <div className="w-11/12  ">
              <button onClick={handleUserDescriptionClick} >{user && user.userDescription}</button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <CloudinaryUploadWidget onUploadSuccess={handleUploadSuccess} />
      </div>

      {/* ROW with interests */}
      <div className="flex flex-col gap-2 bg-slate-200 p-4 rounded ">
        <h2 className="font-bold text-mmGrey">Interessen</h2>
        {/* ROW  for single interests*/}
        {user &&
          user.interests.map((interest, index) => (
            <div key={index} className="bg-slate-100 rounded">
              <div className="flex flex-wrap p-2 ">
                <Link
                  to="/auth/skills"
                  onClick={() => {}}
                  className="bg-yellow-100 text-yellow-800 text-l font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300 hover:bg-green-200 hover:text-green-900"
                >
                  {interest.name}
                </Link>
                <button
                  charType="interest"
                  onClick={handleDescClick}
                  className={`pl-2 mt-2 text-left ${
                    interest.description === "" ? "text-slate-400" : ""
                  } `}
                >
                  {interest.description === ""
                    ? "Beschreibung einfügen..."
                    : interest.description}
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* ROW with skills */}
      <div className="flex flex-col gap-2 bg-slate-200 p-4 mb-8 rounded">
        <Link
          to="/auth/skills/"
          className="font-bold hover:text-orange-400  text-mmGrey"
        >
          Fähigkeiten
        </Link>
        {/* ROW  for single interests*/}
        {user &&
          user.skills.map((skill, index) => (
            <div key={index} className="bg-slate-100 rounded">
              <div className="flex flex-wrap p-2 ">
                <Link
                  to="/auth/skills"
                  onClick={handleInterestClick}
                  className="bg-yellow-100 text-yellow-800 text-l font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300 hover:bg-green-200 hover:text-green-900"
                >
                  {skill.name}
                </Link>
                <button
                  charType="skill"
                  onClick={handleDescClick}
                  className={`pl-2 mt-2 text-left ${
                    skill.description === "" ? "text-slate-400" : ""
                  } `}
                >
                  {skill.description === ""
                    ? "Beschreibung einfügen..."
                    : skill.description}
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Description Modal */}
      <Modal onClose={handleCloseModal} show={openDescModal ? true : false}>
        <Modal.Header>Beschreibung anpassen</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <TextInput
              defaultValue={user&&user.userDescription}
              placeholder="Schreibe einen kurzen Text über dich"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSafeUserDesc}>Änderung speichern</Button>
          <Button value={user&&user.userDescription} color="gray" onClick={handleCloseModal}>
            Abbrechen
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal onClose={handleCloseModal} show={openModal ? true : false}>
        <Modal.Header>Beschreibung anpassen</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <TextInput
              defaultValue={charDesc}
              placeholder="beschreibe dein Interesse/Skill"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSafeDesc}>Änderung speichern</Button>
          <Button color="gray" onClick={handleCloseModal}>
            <p>Abbrechen</p>
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal onClose={handleCloseModal} show={openModal ? true : false}>
        <Modal.Header>Beschreibung anpassen</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <TextInput
              defaultValue={charDesc}
              placeholder="beschreibe dein Interesse/Skill"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSafeDesc}>Änderung speichern</Button>
          <Button color="gray" onClick={handleCloseModal}>
            <p>Abbrechen</p>
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Profile Picture edit modal: */}
      {/* <Modal
          onClose={handleCloseModalProfilePic}
          show={isOpen ? true : false}
        >
          <Modal.Header>Profilbild bearbeiten</Modal.Header>
          <Modal.Body>
            <div className="space-y-6"></div>
          </Modal.Body>
          <Modal.Footer>
            <Button color="gray" onClick={handleCloseModalProfilePic}>
              <p>Abbrechen</p>
            </Button>
          </Modal.Footer>
        </Modal> */}
    </main>
  );
};

export default ProfilePage;
