import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthGoogleContext } from "../contexts/authGoogle";
import axios from "axios";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";

export const PrivateRoutes = () => {
  const { signed } = useContext(AuthGoogleContext);  
  const [cadastro, setCadastro] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getCadastro = async () => {
      const token = Cookies.get('token');
      const headers = {
        "x-access-token": token
      }
      const response = await axios.get('https://server-link-minds.vercel.app/usuarioInfo', { headers });
      setCadastro(response.data);
      if (cadastro.apelido == "") {
        navigate('/Cadastro');
      }
    };
    getCadastro();
  }, [cadastro.apelido == '']);
  return signed ? <Outlet /> : <Navigate to="/" />;
};