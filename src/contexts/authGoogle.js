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
    const loadStorage = async () => {
      const tokenCookie = Cookies.get('token');
      const email = Cookies.get('email');
      const token2 = tokenCookie;
      if(token2){
        axios.put('https://server-link-minds.vercel.app/token', { email, token2 }).then(result => result).catch(err => console.log(err));
        setToken(token2);
      }
    };
    loadStorage();
  }, [!token]);

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
        Cookies.set('email', email);
        setTimeout(() => {
          const cookie = Cookies.get("token");
          if (cookie) {
            Cookies.remove("token");
            Cookies.remove("email");
          }
        }, 259200000);
        const token2 = token;
        axios.put('https://server-link-minds.vercel.app/token', { email, token2 }).then(result => result).catch(err => console.log(err));
        axios.post('https://server-link-minds.vercel.app/usuario', { email, nome, foto, apelido, idade, interesses, descricao, token2 }).then(result => result).catch(err => console.log(err));
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
      Cookies.remove('email');
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