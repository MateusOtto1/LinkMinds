import { useEffect, useState } from "react";
import axios from "axios";
import "../css/style-pesquisa.css";
import seta from "../imagens/seta.svg";
import Cookies from 'js-cookie';

const Interesses = (props) => {
    const [usuarios, setUsuarios] = useState([]);
    const [busca, setBusca] = useState('');
    const [Pesquisa, setPesquisa] = useState([]);
    const [email, setEmail] = useState('');
    const [interesses, setInteresses] = useState([]);
    const [execucoes, setExecucoes] = useState(0);
    const [contador, setContador] = useState(0);

    useEffect(() => {
        const getEmail = async () => {
            const token = Cookies.get('token');
            const response = await axios.post('http://localhost:3001/usuarioInfo', { token });
            setEmail(response.data.email);
            setInteresses(response.data.interesses);
        };
        getEmail();
    },[execucoes]);

    useEffect(() => {
        const getUsuarios = async () => {
            const token = Cookies.get('token');
            const response = await axios.post('http://localhost:3001/pesquisaUsuario', { token });
            setUsuarios(response.data);
            if (busca == '') {
                setPesquisa(response.data);
            }
        };
        getUsuarios();
    }, []);

    useEffect(() => {
        const pesquisaInput = async () => {
            const usuariosPesquisa = usuarios.filter((usuario) => usuario.nome.toLowerCase().includes(busca.toLowerCase()));
            setPesquisa(usuariosPesquisa);
        };
        pesquisaInput();
    }, [busca]);

    useEffect(() => {
        if (contador < 25) {
            setExecucoes(execucoes + 1);
            setContador(contador + 1);
        }
    }, [contador]);

    return (
        <>
            <input type="text" placeholder="Ache usuários..." className="pesquisar" value={busca} onChange={(e) => setBusca(e.target.value)} />
            <h1 className="header-pesquisa">
                Usuários com Interesses Semelhantes
            </h1>
            <div className="user-container">
                {Pesquisa.map((usuario, index) => {
                    if (usuario.email != email) {
                        const interessesComuns = usuario.interesses.filter((interesse) => interesses.includes(interesse));
                        if (interessesComuns.length > 0) {
                            return (
                                <div className="user-body" onClick={(e) => props.handleClickPesquisaUsuario(e, usuario)} key={index}>
                                    <img src={usuario.foto} alt="" />
                                    <h1 className="username">{usuario.nome}</h1>
                                    <button className="user-btn"><img src={seta} alt="" /></button>
                                </div>
                            )
                        }
                    }
                })}
            </div>
        </>
    );
}
export default Interesses;
