import { useState, createContext, useEffect } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../services/firebaseConfig";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';
const provider = new GoogleAuthProvider();

export const AuthGoogleContext = createContext({});

export const AuthGoogleProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [foto, setFoto] = useState('');
  const [token, setToken] = useState('');
  const [nome, setNome] = useState('');
  const [apelido, setApelido] = useState('');
  const [idade, setIdade] = useState('');
  const [interesses, setInteresses] = useState('');
  const [descricao, setDescricao] = useState('');

  useEffect(()=>{
    const loadStorage = ()=>{
      const tokenStorage = Cookies.get('token');
      if(tokenStorage){
        setToken(tokenStorage);
      }
    };
    loadStorage();
  }, [])

  function signInGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        setToken(token);
        const user = result.user;
        setUser(user);
        const email = user.email;
        setEmail(email);
        const nome = user.displayName;
        setNome(nome);
        const foto = user.photoURL;
        setFoto(foto);
        Cookies.set('token', token);
        setTimeout(() => {
          const cookie = Cookies.get("token");
          if (cookie) {
            Cookies.remove("token");
          }
        }, 259200000);
        axios.put('http://localhost:3001/token', { email, token }).then(result => result).catch(err => console.log(err));
        axios.post('http://localhost:3001/usuario', { email, nome, foto, apelido, idade, interesses, descricao, token }).then(result => result).catch(err => console.log(err));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  function signOut() {
    auth.signOut().then(() => {
      setUser(null);
      setToken('');
      Cookies.remove('token');
    }).catch((error) => {
      console.log(error);
    });
    return <Navigate to="/" />;
  }

  return (
    <AuthGoogleContext.Provider value={{signed: !!token, token, signInGoogle, signOut, nome}}>
      {children}
    </AuthGoogleContext.Provider>
  );
};