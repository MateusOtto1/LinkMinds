import { Navigate } from "react-router-dom";
import "../css/style.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';

const TesteCadastro = () => {
    const navigate = useNavigate();
    const [cadastro, setCadastro] = useState({});
    const [teste, setTeste] = useState(false);
    useEffect(() => {
        const getCadastro = async () => {
            const token = Cookies.get('token');
            const headers = {
                "x-access-token": token
            }
            const response = await axios.get('https://server-link-minds.vercel.app/usuarioInfo', { headers });
            setCadastro(await response.data);
            if (await cadastro.apelido == "") {
                setTeste(true);
            }else{
                setTeste(false);
            }
        };
        getCadastro();
    });
    
    if(teste == true){
        return <Navigate to="/Cadastro" />;
    }else{
        return <Navigate to="/LinkMinds" />;
    }
}
export default TesteCadastro;