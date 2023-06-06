import { useNavigate } from "react-router-dom";
import { HiChatAlt2, HiMap, HiOutlineStar, HiSparkles } from "react-icons/hi";
import { HiUserCircle } from "react-icons/hi2";
import { useAuthContext } from "../context/AuthContext";
import { SlRocket } from "react-icons/sl";

const Dashboard = () => {
  const navigate = useNavigate();

  const { user } = useAuthContext();

  return (
    <div className="h-screen bg-slate-800 ">
      <div className="flex flex-col bg-slate-800 pt-20 pb-8 items-center  ">
        <div className="flex flex-wrap gap-y-4 gap-x-4 justify-center">
          <div
            onClick={() => navigate("/auth/chat")}
            className="max-w-xs rounded overflow-hidden shadow-lg bg-slate-50"
          >
            <img
              className="w-full h-80"
              src="/public/assets/images/dashboard_chat.png"
              alt="Sunset in the mountains"
            ></img>
            {/* '/public/assets/images/hero.png' */}
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Chat</div>
              <p className="text-gray-700 text-base">
                Sprich mit deinen Matches und organisiere Treffen und Events via
                Gruppenchats...
              </p>
            </div>
          </div>

          <div
            onClick={() => navigate("/auth/map")}
            className="max-w-xs rounded overflow-hidden shadow-lg bg-slate-50"
          >
            <img
              className="w-full h-80"
              src="/public/assets/images/dashboard_map.png"
              alt="Sunset in the mountains"
            ></img>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Map</div>
              <p className="text-gray-700 text-base">
                Welche Musiker sind in deiner Nähe? Schau dir an wer in deiner
                Nähe wohnt und villeicht offen für gemeinsame JamSessions oder
                anderen Aktivitäten ist.
              </p>
            </div>
          </div>

          <div
            onClick={() => navigate("/auth/matching")}
            className="max-w-xs rounded overflow-hidden shadow-lg bg-slate-50"
          >
            <img
              className="w-full h-80"
              src="/public/assets/images/dashboard_matching.png"
              alt="Music match logo"
            ></img>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">MusicMatch</div>
              <p className="text-gray-700 text-base">
                Unser Algorithmus schlägt dir Personen zum gemeinsamen
                Musizieren, voneinander Lernen und allgemeinem Austausch vor.
                Einfach Suchradius anpassen und Kontakt aufnehmen!
              </p>
            </div>
          </div>

          <div
            onClick={() => navigate(`/auth/profile/${user._id}`)}
            className="max-w-xs rounded overflow-hidden shadow-lg bg-slate-50"
          >
            <img
              className="w-full h-80"
              src="/public/assets/images/dashboard_profile.png"
              alt="Music match logo"
            ></img>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Profil</div>
              <p className="text-gray-700 text-base">
                Bearbeite dein Profil. Füge eine kleine Beschreibung über dich
                selbst, die Instrumente die du spielst und zu deinen Interessen
                hinzu.
              </p>
            </div>
          </div>

          <div
            onClick={() => navigate(`/auth/skills/`)}
            className="max-w-xs rounded overflow-hidden shadow-lg bg-slate-50"
          >
            <img
              className="w-full h-80"
              src="/public/assets/images/dashboard_interests.png"
              alt="Music match logo"
            ></img>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Interessen / Skills</div>
              <p className="text-gray-700 text-base">
                Passe jederzeit deine Interessen an. Willst du ein neues
                Instrument lernen? Basierend auf deinen Angaben werden dir dann
                auch neue Leute vorgeschlagen.
              </p>
            </div>
          </div>

          <div
            onClick={() => navigate(`/auth/profilesetup/`)}
            className="max-w-xs rounded overflow-hidden shadow-lg bg-slate-50"
          >
            <img
              className="w-full h-80"
              src="/public/assets/images/dashboard_settings.png"
              alt="Music match logo"
            ></img>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Einstellungen</div>
              <p className="text-gray-700 text-base">
                Bearbeite deine Profilangaben, ändere deinen Wohnort und passe
                den Suchradius fürs Matching an.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
