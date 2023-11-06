import { useEffect, useState } from "react";
import axios from "axios";
import seta from "../imagens/seta.svg";
import Cookies from 'js-cookie';

const SeguidoresPP = (props) => {
    const [seguindo, setSeguindo] = useState([]);
    const [usuariosSeguindo, setUsuariosSeguindo] = useState([]);
    const [verificaSeguindo, setVerificaSeguindo] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
        const getUsuario = async () => {
            const token = Cookies.get('token');
            const headers = {
                "x-access-token": token
            }
            const response = await axios.get('https://server-link-minds.vercel.app/usuarioInfo', { headers });
            setEmail(response.data.email);
            console.log(email);
        };
        getUsuario();
    }, [email == '']);

    useEffect(() => {
        const getUsuario = async () => {
            setSeguindo(props.usuarioSelecionado.usuariosSeguindo);
        };
        getUsuario();
    }, [verificaSeguindo]);

    useEffect(() => {
        const verificaSeguindo = async () => {
            if (seguindo.length == 0) {
                setVerificaSeguindo(false);
            } else {
                setVerificaSeguindo(true);
            }
        };
        verificaSeguindo();
    }, [verificaSeguindo]);

    useEffect(() => {
        const getSeguindo = async () => {
            const token = Cookies.get('token');
            const headers = {
                "x-access-token": token
            }
            const response = await axios.get('https://server-link-minds.vercel.app/pesquisaUsuario', { headers });
            setUsuariosSeguindo([]);
            seguindo.map((seguidor) => {
                const email = seguidor;
                response.data.map((usuario) => {
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