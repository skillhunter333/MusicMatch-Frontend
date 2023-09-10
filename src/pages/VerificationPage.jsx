import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function VerificationPage() {
  console.log("Verification page opened");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const [verificationStatus, setVerificationStatus] = useState('verifying');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      axios
        .put(`${import.meta.env.VITE_API_URL}/verify?token=${token}`)
        .then(() => {
          setVerificationStatus('success');
        })
        .catch((error) => {
          setVerificationStatus('error');
          console.error('Error verifying email:', error);
        });
    } else {
      // Handle the case where 'token' is null (no token provided in the query parameter)
      setVerificationStatus('no-token');
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {verificationStatus === 'verifying' ? (
        <div>
          <p className="text-2xl font-bold">Verifiziere...</p>
          <div className="spinner-border text-primary mt-4" role="status">
            <span className="sr-only">Lädt...</span>
          </div>
        </div>
      ) : verificationStatus === 'success' ? (
        <div>
          <p className="text-2xl font-bold">Email erfolgreich verifiziert!</p>
          <button
            onClick={() => navigate('/login')} // Redirect to login page on button click
            className="text-blue-500 hover:underline mt-4 block"
          >
            Login
          </button>
        </div>
      ) : verificationStatus === 'no-token' ? (
        <div>
          <p className="text-2xl font-bold">Wir haben dir eine mail geschickt um deine Registrierung zu bestätigen.</p>
        </div>
      ) : (
        <div>
          <p className="text-2xl font-bold">Fehler beim Verifizieren deiner Mail. Bitte versuche es erneut.</p>
        </div>
      )}
    </div>
  );
}

export default VerificationPage;
