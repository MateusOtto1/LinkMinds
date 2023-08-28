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
  const [foto, setFoto] = useState('');
  const [nome, setNome] = useState('');
  const [apelido, setApelido] = useState('');
  const [idade, setIdade] = useState('');
  const [interesses, setInteresses] = useState('');
  const [descricao, setDescricao] = useState('');

  useEffect(()=>{
    const loadStorage = ()=>{
      const emailStorage = localStorage.getItem('email');
      if(emailStorage){
        setEmail(emailStorage);
      }
    };
    loadStorage();
  }, [])

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
        const foto = user.photoURL;
        setFoto(foto);
        localStorage.setItem('email', email);
        axios.post('https://server-linkme.onrender.com/usuario', { email, nome, foto, apelido, idade, interesses, descricao }).then(result => result).catch(err => console.log(err));

        setTimeout(()=>{
          localStorage.removeItem('email');
        }, 259200000);
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
    setEmail(null);
    return <Navigate to="/" />;
  }

  return (
    <AuthGoogleContext.Provider value={{signed: !!email, email, signInGoogle, signOut, nome}}>
      {children}
    </AuthGoogleContext.Provider>
  );
};