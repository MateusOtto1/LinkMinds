import { useState, createContext, useEffect } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../services/firebaseConfig";
import { Navigate } from "react-router-dom";
import axios from "axios";
const provider = new GoogleAuthProvider();

export const AuthGoogleContext = createContext({});

export const AuthGoogleProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');

  // useEffect(() => {
  //   const checkUserLogged = async () => {
  //     try{
  //       const response = await axios.post('http://localhost:3001/usuario', {email}).then(result => console.log(result)).catch(err => console.log(err));
  //       setUser(response);
  //     }catch(err){
  //       console.log(err);
  //     }
  //   };
  //   checkUserLogged();
  // });

  function signInGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setUser(user);
        const email = user.email;
        setEmail(email);
        const nome = user.displayName;
        setNome(nome);
        axios.post('http://localhost:3001/usuario', { email, nome }).then(result => console.log(result)).catch(err => console.log(err));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  function signOut() {
    localStorage.clear();
    setUser(null);
    return <Navigate to="/" />;
  }

  return (
    <AuthGoogleContext.Provider value={{signed: !!email, email, signInGoogle, signOut, nome}}>
      {children}
    </AuthGoogleContext.Provider>
  );
};