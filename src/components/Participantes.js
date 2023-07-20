import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import casaColorida from "../imagens/CasaColorida.png";
import criar from "../imagens/Criar.png";
import pessoa from "../imagens/Pessoa.png";
import axios from "axios";
import lupa from "../imagens/lupa.png";

const Participantes = (props) => {
    const navigate = useNavigate();
    const [participantes, setParticipantes] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [usuariosParticipantes, setUsuariosParticipantes] = useState([]);

    useEffect(() => {
        const getParticipantes = async () => {
            const evento = props.postSelecionado.evento;
            const data = props.postSelecionado.data;
            const hora = props.postSelecionado.hora;
            const local = props.postSelecionado.local;
            const nome = props.postSelecionado.nome;
            const response = await axios.post('http://localhost:3001/postsPresencaInfo', { evento, data, hora, local, nome });
            setParticipantes(response.data.usuariosPresenca);
        };
        getParticipantes();
    }, []);

    useEffect(() => {
        const getUsuarios = async () => {
            const response = await axios.post('http://localhost:3001/pesquisaUsuario');
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
    },[participantes]);

    function handleClickHome() {
        navigate('/Home');
    };
    function handleClickCreate() {
        navigate('/Criar');
    };
    function handleClickPerfil() {
        navigate('/Perfil');
    };
    function handleClickPesquisa() {
        navigate('/Usuarios');
    };
    function handleClick(e, usuario) {
        e.stopPropagation();
        props.setUsuarioSelecionado(usuario);
        navigate('/PerfilPesquisa');
    };

    return (
        <>
            <div className="FundoPesquisa">
                <h1 className="pesquisaEncontre"><span className="spanTexto">Participantes </span>deste evento!</h1>
                <div className="bordaPesquisa">
                    <div className="fundoMenorPesquisa">
                        {usuariosParticipantes.map((usuario, index) => {
                            return(
                                <button className="pesquisaUsuario" onClick={(e) => handleClick(e, usuario)} key={index}>
                                    <div className="fundoUsuario">
                                        <img className="imgUsuario" src={usuario.foto} />
                                        <div className="descricaoUsuario">
                                            <h2 className="nomeUsuario">{usuario.nome}</h2>
                                        </div>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>
                <div className="navbar">
                    <img className="imgCasa" src={casaColorida} onClick={handleClickHome} />
                    <img className="imgCriar" src={criar} onClick={handleClickCreate} />
                    <img className="imgPesquisa" src={lupa} onClick={handleClickPesquisa} />
                    <img className="imgPessoa" src={pessoa} onClick={handleClickPerfil} />
                </div>
            </div>
        </>
    );
}
export default Participantes;