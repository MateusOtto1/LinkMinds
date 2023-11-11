import { useEffect, useState } from "react";
import axios from "axios";
import seta from "../imagens/seta.svg";
import Cookies from 'js-cookie';

const Participantes = (props) => {
    const [participantes, setParticipantes] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [usuariosParticipantes, setUsuariosParticipantes] = useState([]);
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
        const getParticipantes = async () => {
            const evento = props.postSelecionado.evento;
            const data = props.postSelecionado.data;
            const hora = props.postSelecionado.hora;
            const local = props.postSelecionado.local;
            const nome = props.postSelecionado.nome;
            const token2 = Cookies.get('token');
            const response = await axios.post('https://server-link-minds.vercel.app/postsPresencaInfo', { token2, evento, data, hora, local, nome });
            setParticipantes(response.data.usuariosPresenca);
        };
        getParticipantes();
    }, [participantes.length == 0]);

    useEffect(() => {
        const getUsuarios = async () => {
            const token = Cookies.get('token');
            const headers = {
                "x-access-token": token
            }
            const response = await axios.get('https://server-link-minds.vercel.app/pesquisaUsuario', { headers });
            setUsuarios(response.data);
            setUsuariosParticipantes([]);
            participantes.map((participante) => {
                const email = participante;
                usuarios.map((usuario) => {
                    if (usuario.email == email) {
                        setUsuariosParticipantes((usuariosParticipantes) => [...usuariosParticipantes, usuario]);
                    }
                });
            });
        };
        getUsuarios();
    }, [participantes]);

    return (
        <>
            <div className="main-participantes">
                <h1 className="participantes">
                    Participantes
                </h1>
                <div className="user-container">
                    {usuariosParticipantes.map((usuario, index) => {
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
export default Participantes;