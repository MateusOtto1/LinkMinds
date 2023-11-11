import { useEffect, useState } from "react";
import axios from "axios";
import seta from "../imagens/seta.svg";
import Cookies from 'js-cookie';

const SeguidoresPP = (props) => {
    const [seguidores, setSeguidores] = useState([]);
    const [usuariosSeguidores, setUsuariosSeguidores] = useState([]);
    const [verificaSeguidores, setVerificaSeguidores] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
        const getUsuario = async () => {
            const token = Cookies.get('token');
            const headers = {
                "x-access-token": token
            }
            const response = await axios.get('https://server-link-minds.vercel.app/usuarioInfo', { headers });
            setEmail(response.data.email);
        };
        getUsuario();
    }, [email == '']);
    
    useEffect(() => {
        const getUsuario = async () => {
            setSeguidores(props.usuarioSelecionado.usuariosSeguidores);
        };
        getUsuario();
    }, [verificaSeguidores]);

    useEffect(() => {
        const verificaSeguidores = async () => {
            if (seguidores.length == 0) {
                setVerificaSeguidores(false);
            } else {
                setVerificaSeguidores(true);
            }
        };
        verificaSeguidores();
    }, [verificaSeguidores]); 
    
    useEffect(() => {
        const getSeguidores = async () => {
            const token = Cookies.get('token');
            const headers = {
                "x-access-token": token
            }
            const response = await axios.get('https://server-link-minds.vercel.app/pesquisaUsuario', { headers });
            setUsuariosSeguidores([]);
            seguidores.map((seguidor) => {
                const email = seguidor;
                response.data.map((usuario) => {
                    if (usuario.email == email) {
                        setUsuariosSeguidores((usuariosSeguidores) => [...usuariosSeguidores, usuario]);
                    }
                });
            });
        };
        getSeguidores();
    },[seguidores]);

    return (
        <>
            <div className="main-participantes">
                <h1 className="participantes">
                    Seguidores
                </h1>
                <div className="user-container">
                    {usuariosSeguidores.map((usuario, index) => {
                        if (usuario.email == email) {
                            return (
                                <div className="container-pesquisar">
                                <div className="user-body" onClick={(e) => props.handleClickPesquisaUsuario(e, usuario)} key={index}>
                                    <img src={usuario.foto} alt="" />
                                    <h1 className="username">{usuario.nome}</h1>

                                </div>
                                <button className="user-btn" onClick={(e) => props.handleClickPesquisaUsuario(e, usuario)}>&gt;</button>
                            </div>
                            )
                        } else {
                            return (
                                <div className="container-pesquisar">
                                <div className="user-body" onClick={(e) => props.handleClickPesquisaUsuario(e, usuario)} key={index}>
                                    <img src={usuario.foto} alt="" />
                                    <h1 className="username">{usuario.nome}</h1>

                                </div>
                                <button className="user-btn" onClick={(e) => props.handleClickPesquisaUsuario(e, usuario)}>&gt;</button>
                            </div>
                            )
                        }
                    })}
                </div>
            </div>

        </>
    );
}
export default SeguidoresPP;