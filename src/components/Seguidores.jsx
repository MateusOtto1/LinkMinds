import { useEffect, useState } from "react";
import axios from "axios";
import seta from "../imagens/seta.svg";
import Cookies from 'js-cookie';

const Seguidores = (props) => {
    const [seguidores, setSeguidores] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [usuariosSeguidores, setUsuariosSeguidores] = useState([]);

    useEffect(() => {
        const getUsuario = async () => {
            const token = Cookies.get('token');
            const headers = {
                "x-access-token": token
            }
            const response = await axios.get('https://server-link-minds.vercel.app/usuarioInfo', { headers });
            setSeguidores(response.data.usuariosSeguidores);
        };
        getUsuario();
    }, [seguidores.length == 0]);

    useEffect(() => {
        const getSeguidores = async () => {
            const token = Cookies.get('token');
            const headers = {
                "x-access-token": token
            }
            const response = await axios.get('https://server-link-minds.vercel.app/pesquisaUsuario', { headers });
            setUsuarios(response.data);
            setUsuariosSeguidores([]);
            seguidores.map((seguidor) => {
                const email = seguidor;
                usuarios.map((usuario) => {
                    if (usuario.email == email) {
                        setUsuariosSeguidores((usuariosSeguidores) => [...usuariosSeguidores, usuario]);
                    }
                });
            });
        };
        getSeguidores();
    }, [seguidores]);

    return (
        <>
            <div className="main-participantes">
                <h1 className="participantes">
                    Seguidores
                </h1>
                <div className="user-container">
                    {usuariosSeguidores.map((usuario, index) => {
                        return (
                            <div className="user-body" onClick={(e) => props.handleClickPesquisaUsuario(e, usuario)} key={index}>
                                <img src={usuario.foto} alt="" />
                                <h1 className="username">{usuario.nome}</h1>
                                <button className="user-btn"><img src={seta} alt="" /></button>
                            </div>
                        )
                    })}
                </div>
            </div>

        </>
    );
}
export default Seguidores;