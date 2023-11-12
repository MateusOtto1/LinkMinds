import { useEffect, useState } from "react";
import axios from "axios";
import seta from "../imagens/seta.svg";
import Cookies from 'js-cookie';

const Seguindo = (props) => {
    const [seguindo, setSeguindo] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [usuariosSeguindo, setUsuariosSeguindo] = useState([]);

    useEffect(() => {
        const getUsuario = async () => {
            const token = Cookies.get('token');
            const headers = {
                "x-access-token": token
            }
            const response = await axios.get('https://server-link-minds.vercel.app/usuarioInfo', { headers });
            setSeguindo(response.data.usuariosSeguindo);
        };
        getUsuario();
    }, [seguindo.length == 0]);

    useEffect(() => {
        const getSeguindo = async () => {
            const token = Cookies.get('token');
            const headers = {
                "x-access-token": token
            }
            const response = await axios.get('https://server-link-minds.vercel.app/pesquisaUsuario', { headers });
            setUsuarios(response.data);
            setUsuariosSeguindo([]);
            seguindo.map((seguindo) => {
                const email = seguindo;
                usuarios.map((usuario) => {
                    if (usuario.email == email) {
                        setUsuariosSeguindo((usuariosSeguindo) => [...usuariosSeguindo, usuario]);
                    }
                });
            });
        };
        getSeguindo();
    }, [seguindo]);

    return (
        <>
            <div className="main-participantes">
                <div className="header-perfil-container">
                    <h1 className="inter-header">Seguindo</h1>
                    <div className="linha-verde"></div>
                </div>
                <div className="user-container-seg">
                    {usuariosSeguindo.map((usuario, index) => {
                        return (
                            <div className="container-pesquisar">
                                <div className="user-body" onClick={(e) => props.handleClickPesquisaUsuario(e, usuario)} key={index}>
                                    <img src={usuario.foto} alt="" />
                                    <h1 className="username">{usuario.nome}</h1>

                                </div>
                                <button className="user-btn" onClick={(e) => props.handleClickPesquisaUsuario(e, usuario)}>&gt;</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    );
}
export default Seguindo;