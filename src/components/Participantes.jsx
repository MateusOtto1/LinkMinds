import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import seta from "../imagens/seta.svg";
import Cookies from 'js-cookie';

const Participantes = (props) => {
    const navigate = useNavigate();
    const [participantes, setParticipantes] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [usuariosParticipantes, setUsuariosParticipantes] = useState([]);
    const [email, setEmail] = useState('');

    useEffect(() => {
        const getUsuario = async () => {
            const token = Cookies.get('token');
            const response = await axios.post('http://localhost:3001/usuarioInfo', { token });
            setEmail(response.data.email);
        };
        getUsuario();
    });

    useEffect(() => {
        const getParticipantes = async () => {
            const evento = props.postSelecionado.evento;
            const data = props.postSelecionado.data;
            const hora = props.postSelecionado.hora;
            const local = props.postSelecionado.local;
            const nome = props.postSelecionado.nome;
            const token = Cookies.get('token');
            const response = await axios.post('http://localhost:3001/postsPresencaInfo', { token, evento, data, hora, local, nome });
            setParticipantes(response.data.usuariosPresenca);
        };
        getParticipantes();
    }, []);

    useEffect(() => {
        const getUsuarios = async () => {
            const token = Cookies.get('token');
            const response = await axios.post('http://localhost:3001/pesquisaUsuario', { token });
            setUsuarios(response.data);
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
                                <div className="user-body" onClick={(e) => props.handleClickPerfil(e)} key={index}>
                                    <img src={usuario.foto} alt="" />
                                    <h1 className="username">{usuario.nome}</h1>
                                    <button className="user-btn"><img src={seta} alt="" /></button>
                                </div>
                            )
                        } else {
                            return (
                                <div className="user-body" onClick={(e) => props.handleClickPesquisaUsuario(e, usuario)} key={index}>
                                    <img src={usuario.foto} alt="" />
                                    <h1 className="username">{usuario.nome}</h1>
                                    <button className="user-btn"><img src={seta} alt="" /></button>
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