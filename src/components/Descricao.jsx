import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import '../css/style-detalhes.css';
import boneco from "../imagens/basil-user-solid.svg";
import Cookies from 'js-cookie';

const Descricao = (props) => {
    const navigate = useNavigate();
    const [emailUsuariosPresenca, setEmailUsuariosPresenca] = useState('');
    const [verificaPresenca, setVerificaPresenca] = useState(false);
    const [usuarioPosts, setUsuarioPosts] = useState([]);
    const [posts, setPosts] = useState([]);
    const [presencaPost, setPresencaPost] = useState('');
    const [meuPost, setMeuPost] = useState([false]);
    const [usuario, setUsuario] = useState({});
    const [nomeUsuario, setNomeUsuario] = useState('');

    useEffect(() => {
        const getUsuario = async () => {
            const token = Cookies.get('token');
            const headers = {
                "x-access-token": token
            }
            const response = await axios.get('https://server-link-minds.vercel.app/usuarioInfo', { headers });
            setEmailUsuariosPresenca(response.data.email);
            setNomeUsuario(response.data.nome);
        };
        getUsuario();
    }, [emailUsuariosPresenca == '' && nomeUsuario == '']);

    useEffect(() => {
        const getPostPresenca = async () => {
            const evento = props.postSelecionado.evento;
            const data = props.postSelecionado.data;
            const hora = props.postSelecionado.hora;
            const local = props.postSelecionado.local;
            const nome = props.postSelecionado.nome;
            const token2 = Cookies.get('token');
            const response = await axios.post('https://server-link-minds.vercel.app/postsPresencaInfo', { token2, evento, data, hora, local, nome });
            setPosts(response.data);
            setPresencaPost(response.data.presenca);
            setUsuarioPosts(response.data.usuariosPresenca);
            if (emailUsuariosPresenca == posts.email) {
                setMeuPost(true);
            } else {
                setMeuPost(false);
            }
            usuarioPosts.find((post) => post == emailUsuariosPresenca) ? setVerificaPresenca(true) : setVerificaPresenca(false);
        };
        getPostPresenca();
    });

    useEffect(() => {
        const getUsuarioSelecionado = async () => {
            const token = Cookies.get("token");
            const email = props.postSelecionado.email;
            const headers = {
                "x-access-token": token,
                email: email,
            };
            const response = await axios.get(
                "https://server-link-minds.vercel.app/usuarioSelecionado",
                { headers }
            );
            setUsuario(response.data);
        };
        getUsuarioSelecionado();
    }, [usuario.length == 0]);

    function handleClickPresenca() {
        if (verificaPresenca == false) {
            const presenca = presencaPost + 1;
            const evento = props.postSelecionado.evento;
            const data = props.postSelecionado.data;
            const hora = props.postSelecionado.hora;
            const local = props.postSelecionado.local;
            const nome = props.postSelecionado.nome;
            const email = props.postSelecionado.email;
            const usuariosPresenca = props.postSelecionado.usuariosPresenca;
            usuariosPresenca.push(emailUsuariosPresenca);
            const token2 = Cookies.get('token');
            axios.put('https://server-link-minds.vercel.app/postsMarcarPresenca', { token2, presenca, evento, data, hora, local, nome, usuariosPresenca, email, nomeUsuario }).then(result => console.log(result)).catch(err => console.log(err));
            navigate('/');
        }
    };

    function handleClickDesmarcarPresenca() {
        if (verificaPresenca == true) {
            const presenca = presencaPost - 1;
            const evento = props.postSelecionado.evento;
            const data = props.postSelecionado.data;
            const hora = props.postSelecionado.hora;
            const local = props.postSelecionado.local;
            const nome = props.postSelecionado.nome;
            const email = props.postSelecionado.email;
            const usuariosPresenca = props.postSelecionado.usuariosPresenca;
            const index = usuariosPresenca.indexOf(emailUsuariosPresenca);
            if (index > -1) {
                usuariosPresenca.splice(index, 1);
            }
            const token2 = Cookies.get('token');
            axios.put('https://server-link-minds.vercel.app/postsDesmarcarPresenca', { token2, presenca, evento, data, hora, local, nome, usuariosPresenca, email }).then(result => console.log(result)).catch(err => console.log(err));
            navigate('/');
        }
    }

    function handleClickExcluirPost() {
        const evento = props.postSelecionado.evento;
        const data = props.postSelecionado.data;
        const hora = props.postSelecionado.hora;
        const local = props.postSelecionado.local;
        const nome = props.postSelecionado.nome;
        const token2 = Cookies.get('token');
        axios.delete('https://server-link-minds.vercel.app/excluirPost', { data: { token2, evento, data, hora, local, nome } }).then(result => console.log(result)).catch(err => console.log(err));
        navigate('/');
    }

    return (
        <>
            <div className='main-detalhes'>
                <div style={{ backgroundImage: `linear-gradient(to top, #181d22, transparent), url(${props.postSelecionado.imagemEvento})` }} className="img-detalhes" />
                <div className="conteudo-detalhes">
                    <div className="header-detalhes">
                        <h1 className="header-text-det">
                            {props.postSelecionado.evento}
                        </h1>
                    </div>
                    <div className="profile-detalhes" onClick={(e) => props.postSelecionado.email === emailUsuariosPresenca ? props.handleClickPerfil(e) : props.handleClickPesquisaUsuario(e, usuario)}>
                        <img src={props.postSelecionado.foto} alt="" className="pfp-det" />
                        <div className="profile-text-det">
                            <p className="criadopor">Criado por</p>
                            <h1 className="nome-det">{props.postSelecionado.nome}</h1>
                        </div>
                    </div>
                    <div className="det-info">
                        <p className="title-info">Dia e hora</p>
                        <h1 className="text-info">{props.postSelecionado.data} <span className='verde-span'>/</span> {props.postSelecionado.hora}</h1>
                    </div>
                    {props.postSelecionado.local !== "" && (
                        <div className="det-info locale-info">
                            <p className="title-info">Localização</p>
                            <h1 className="text-info">{props.postSelecionado.local}</h1>
                            <div className="linha-sep"></div>
                            <h1 className="text-info">{props.postSelecionado.endereco}</h1>
                        </div>
                    )}
                    <div className="det-info desc">
                        <p className="title-info">Descrição</p>
                        <h1 className="text-info">{props.postSelecionado.descricao}</h1>
                    </div>
                    <button className="det-info btnParticipantes" onClick={(e) => props.handleClickVerParticipantes(e, posts)}>
                        <p className="title-info">Participantes</p>
                        <h1 className="text-info"><img src={boneco} alt="" />{presencaPost} participantes</h1>
                    </button>
                    {
                        meuPost == true ? <button className="btn-criar post-btn" onClick={handleClickExcluirPost}>Excluir evento</button> :
                            verificaPresenca == true ? <button className="btn-criar post-btn" onClick={handleClickDesmarcarPresenca}>Desmarcar presença</button> : <button className="btn-criar post-btn" onClick={handleClickPresenca}>Marcar presença</button>
                    }
                </div>
            </div>

        </>
    );
}
export default Descricao;