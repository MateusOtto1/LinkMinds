import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import '../css/style-detalhes.css';
import fundoCard from '../imagens/fundo-card.svg';
import boneco from "../imagens/basil-user-solid.svg";
import fotoCimol from "../imagens/rectangle-108.svg";

const Descricao = (props) => {
    const navigate = useNavigate();
    const [emailUsuariosPresenca, setEmailUsuariosPresenca] = useState('');
    const [verificaPresenca, setVerificaPresenca] = useState([false]);
    const [usuarioPosts, setUsuarioPosts] = useState([]);
    const [posts, setPosts] = useState([]);
    const [presencaPost, setPresencaPost] = useState('');
    const [meuPost, setMeuPost] = useState([false]);

    useEffect(() => {
        const getUsuario = async () => {
            setEmailUsuariosPresenca(localStorage.getItem('email'));
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
            const response = await axios.post('https://server-linkme.onrender.com/postsPresencaInfo', { evento, data, hora, local, nome });
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

    function handleClickPresenca() {
        const presenca = presencaPost + 1;
        const evento = props.postSelecionado.evento;
        const data = props.postSelecionado.data;
        const hora = props.postSelecionado.hora;
        const local = props.postSelecionado.local;
        const nome = props.postSelecionado.nome;
        const usuariosPresenca = props.postSelecionado.usuariosPresenca;
        usuariosPresenca.push(emailUsuariosPresenca);
        axios.put('https://server-linkme.onrender.com/postsPresenca', { presenca, evento, data, hora, local, nome, usuariosPresenca }).then(result => console.log(result)).catch(err => console.log(err));
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
        axios.put('https://server-linkme.onrender.com/postsPresenca', { presenca, evento, data, hora, local, nome, usuariosPresenca }).then(result => console.log(result)).catch(err => console.log(err));
    }

    function handleClickExcluirPost() {
        const evento = props.postSelecionado.evento;
        const data = props.postSelecionado.data;
        const hora = props.postSelecionado.hora;
        const local = props.postSelecionado.local;
        const nome = props.postSelecionado.nome;
        axios.delete('https://server-linkme.onrender.com/excluirPost', { data: { evento, data, hora, local, nome } }).then(result => console.log(result)).catch(err => console.log(err));
        navigate('/');
    }
    return (
        <>
            <div className='main-detalhes'>
                <header>
                    <img src={fundoCard} alt="" className="header-img-detalhes" />
                    <h1 className="header-title-detalhes">{props.postSelecionado.evento}</h1>
                </header>

                <div className="detalhes-container">
                    <div className="top-detalhes">
                        <img src={props.postSelecionado.foto} alt="" className="foto" />
                        <div className="top-text-detalhes">
                            <h1 className="criado">Criado por <span class="username-span">{props.postSelecionado.nome}</span></h1>
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