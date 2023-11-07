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

    useEffect(() => {
        const getEmail = async () => {
            const token = Cookies.get('token');
            const headers = {
                "x-access-token": token
            }
            const response = await axios.get('https://server-link-minds.vercel.app/usuarioInfo', { headers });
            setEmail(response.data.email);
            setInteresses(response.data.interesses);

            const response2 = await axios.get('https://server-link-minds.vercel.app/pesquisaUsuario', { headers });
            setUsuarios(response2.data);
            if (busca == '') {
                setPesquisa(response2.data);
            }
        };
        getEmail();
    },[email == '']);

    useEffect(() => {
        const pesquisaInput = async () => {
            const usuariosPesquisa = usuarios.filter((usuario) => usuario.nome.toLowerCase().includes(busca.toLowerCase()));
            setPesquisa(usuariosPesquisa);
        };
        pesquisaInput();
    }, [busca]);

    return (
        <>
            <input type="text" placeholder="Procurar usuários..." className="pesquisar" value={busca} onChange={(e) => setBusca(e.target.value)} />
            <h1 className="header-pesquisa">
                Usuários com Interesses Semelhantes
            </h1>
            <div className="user-container-inter">
                {Pesquisa.map((usuario, index) => {
                    if (usuario.email != email) {
                        const interessesComuns = usuario.interesses.filter((interesse) => interesses.includes(interesse));
                        if (interessesComuns.length > 0) {
                            return (
                                <div className="container-pesquisar"key={index}>
                                    <div className="user-body" onClick={(e) => props.handleClickPesquisaUsuario(e, usuario)} >
                                        <img src={usuario.foto} alt="" />
                                        <h1 className="username">{usuario.nome}</h1>

                                    </div>
                                    <button className="user-btn" onClick={(e) => props.handleClickPesquisaUsuario(e, usuario)}>&gt;</button>
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