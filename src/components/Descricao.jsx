import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import '../css/style-detalhes.css';
import boneco from "../imagens/basil-user-solid.svg";
import fotoCimol from "../imagens/rectangle-108.svg";
import Cookies from 'js-cookie';

const Descricao = (props) => {
    const navigate = useNavigate();
    const [emailUsuariosPresenca, setEmailUsuariosPresenca] = useState('');
    const [verificaPresenca, setVerificaPresenca] = useState([false]);
    const [usuarioPosts, setUsuarioPosts] = useState([]);
    const [posts, setPosts] = useState([]);
    const [presencaPost, setPresencaPost] = useState('');
    const [meuPost, setMeuPost] = useState([false]);
    const [execucoes, setExecucoes] = useState(0);
    const [contador, setContador] = useState(0);

    useEffect(() => {
        const getUsuario = async () => {
            const token = Cookies.get('token');
            const response = await axios.post('http://localhost:3001/usuarioInfo', { token });
            setEmailUsuariosPresenca(response.data.email);
        };
        getUsuario();
    }, []);

    useEffect(() => {
        const getPostPresenca = async () => {
            const evento = props.postSelecionado.evento;
            const data = props.postSelecionado.data;
            const hora = props.postSelecionado.hora;
            const local = props.postSelecionado.local;
            const nome = props.postSelecionado.nome;
            const token = Cookies.get('token');
            const response = await axios.post('http://localhost:3001/postsPresencaInfo', { token, evento, data, hora, local, nome });
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
    },[execucoes]);

    useEffect(() => {
        if (contador < 15) {
            setExecucoes(execucoes + 1);
            setContador(contador + 1);
        }
    }, [contador]);

    function handleClickPresenca() {
        const presenca = presencaPost + 1;
        const evento = props.postSelecionado.evento;
        const data = props.postSelecionado.data;
        const hora = props.postSelecionado.hora;
        const local = props.postSelecionado.local;
        const nome = props.postSelecionado.nome;
        const usuariosPresenca = props.postSelecionado.usuariosPresenca;
        usuariosPresenca.push(emailUsuariosPresenca);
        const token = Cookies.get('token');
        axios.put('http://localhost:3001/postsPresenca', { token, presenca, evento, data, hora, local, nome, usuariosPresenca }).then(result => console.log(result)).catch(err => console.log(err));
        navigate('/');
    };

    function handleClickDesmarcarPresenca() {
        const presenca = presencaPost - 1;
        const evento = props.postSelecionado.evento;
        const data = props.postSelecionado.data;
        const hora = props.postSelecionado.hora;
        const local = props.postSelecionado.local;
        const nome = props.postSelecionado.nome;
        const usuariosPresenca = props.postSelecionado.usuariosPresenca;
        const index = usuariosPresenca.indexOf(emailUsuariosPresenca);
        if (index > -1) {
            usuariosPresenca.splice(index, 1);
        }
        const token = Cookies.get('token');
        axios.put('http://localhost:3001/postsPresenca', { token, presenca, evento, data, hora, local, nome, usuariosPresenca }).then(result => console.log(result)).catch(err => console.log(err));
        navigate('/');
    }

    function handleClickExcluirPost() {
        const evento = props.postSelecionado.evento;
        const data = props.postSelecionado.data;
        const hora = props.postSelecionado.hora;
        const local = props.postSelecionado.local;
        const nome = props.postSelecionado.nome;
        const token = Cookies.get('token');
        axios.delete('http://localhost:3001/excluirPost', { data: { token, evento, data, hora, local, nome }}).then(result => console.log(result)).catch(err => console.log(err));
        navigate('/');
    }
    return (
        <>
            <div className='main-detalhes'>
                <header>
                    <img src={props.postSelecionado.imagemEvento} alt="" className="header-img-detalhes" />
                    <h1 className="header-title-detalhes">{props.postSelecionado.evento}</h1>
                </header>

                <div className="detalhes-container">
                    <div className="top-detalhes">
                        <div className="foto-container">
                             <img src={props.postSelecionado.foto} alt="" className="foto" />
                        </div>
                       
                        <div className="top-text-detalhes">
                            <h1 className="criado">Criado por <span className="username-span">{props.postSelecionado.nome}</span></h1>
                            <h2 className="marcado">Marcado para o dia {props.postSelecionado.data} as {props.postSelecionado.hora}</h2>
                            <h2 className="participantes-top"><img src={boneco} alt="" />{presencaPost} participantes</h2>
                        </div>
                    </div>
                    <div className="local-detalhes">
                        <h1 className="localizacao">LOCALIZAÇÃO</h1>
                        <img src={fotoCimol} alt="" className="local-img" />
                        <h1 className="nome-local">{props.postSelecionado.local}</h1>
                    </div>
                </div>

                <button className="btnParticipantes" onClick={(e) => props.handleClickVerParticipantes(e, posts)}>Ver Participantes</button>

                {
                    meuPost == true ? <button className="participar-detalhes" onClick={handleClickExcluirPost}>Excluir evento</button> :
                        verificaPresenca == false ? <button className="participar-detalhes" onClick={handleClickPresenca}>Marcar presença</button> : <button className="participar-detalhes" onClick={handleClickDesmarcarPresenca}>Desmarcar presença</button>
                }
            </div>

        </>
    );
}
export default Descricao;