import { useNavigate } from 'react-router-dom';
import casaColorida from "../imagens/CasaColorida.png";
import criar from "../imagens/Criar.png";
import pessoa from "../imagens/Pessoa.png";
import lupa from "../imagens/lupa.png";
import axios from 'axios';
import { useState, useEffect } from 'react';

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
            const response = await axios.post('http://localhost:3001/postsPresencaInfo', { evento, data, hora, local, nome });
            setPosts(response.data);
            setPresencaPost(response.data.presenca);
            setUsuarioPosts(response.data.usuariosPresenca);
            if(emailUsuariosPresenca == posts.email){
                setMeuPost(true);
            }else{
               setMeuPost(false);
            }
            usuarioPosts.find((post) => post == emailUsuariosPresenca) ? setVerificaPresenca(true) : setVerificaPresenca(false);
        };
        getPostPresenca();
    });

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

    function handleClickPresenca() {
        const presenca = presencaPost+1;
        const evento = props.postSelecionado.evento;
        const data = props.postSelecionado.data;
        const hora = props.postSelecionado.hora;
        const local = props.postSelecionado.local;
        const nome = props.postSelecionado.nome;
        const usuariosPresenca = props.postSelecionado.usuariosPresenca;
        usuariosPresenca.push(emailUsuariosPresenca);
        axios.put('http://localhost:3001/postsPresenca', { presenca, evento, data, hora, local, nome, usuariosPresenca }).then(result => console.log(result)).catch(err => console.log(err));
    };

    function handleClickDesmarcarPresenca() {
        const presenca = presencaPost-1;
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
        axios.put('http://localhost:3001/postsPresenca', { presenca, evento, data, hora, local, nome, usuariosPresenca }).then(result => console.log(result)).catch(err => console.log(err));
    }

    function handleClickParticipantes(e, posts) {
        e.stopPropagation();
        props.setPostSelecionado(posts);
        navigate('/Participantes');
    }

    function handleClickExcluirPost() {
        const evento = props.postSelecionado.evento;
        const data = props.postSelecionado.data;
        const hora = props.postSelecionado.hora;
        const local = props.postSelecionado.local;
        const nome = props.postSelecionado.nome;
        axios.delete('http://localhost:3001/excluirPost', { data: { evento, data, hora, local, nome } }).then(result => console.log(result)).catch(err => console.log(err));
        navigate('/Home');
    }

    return (
        <>
            <div className="Fundo">
                <h2 className="TextoInfoDescricao"><span className="spanTextoDesc">Informações</span> sobre o evento</h2>
                <div className="bordaDescricao">
                    <div className="fundoMenorDescricao">
                        <h1 className="descricao">Descrição</h1>
                        <h2 className="nomeJogoDescricao">{props.postSelecionado.evento}</h2>
                        <div className="descricoes">
                            <h3 className="dataJogoDescricao"><span className="spanTexto">Data:</span> {props.postSelecionado.data}</h3>
                            <h3 className="horaJogoDescricao"><span className="spanTexto">Hora:</span> {props.postSelecionado.hora}</h3>
                            <h3 className="dataJogoDescricao"><span className="spanTexto">Local:</span> {props.postSelecionado.local}</h3>
                            <h3 className="criadorJogoDescricao"><span className="spanTexto">Criado por:</span> {props.postSelecionado.nome}</h3>
                            <h3 className="marcadosDescricao"><span className="spanTexto">{presencaPost}</span>  Pessoas já marcaram presença neste evento</h3>
                        </div>
                        <button className="btnParticipantes" onClick={(e) => handleClickParticipantes(e, posts)}>Participantes</button>
                    </div>
                </div>
                {
                    meuPost == true ? <button className="MarcarPresenca" onClick={handleClickExcluirPost}>Excluir evento</button> :
                        verificaPresenca == false ? <button className="MarcarPresenca" onClick={handleClickPresenca}>Marcar presença</button> : <button className="MarcarPresenca" onClick={handleClickDesmarcarPresenca}>Desmarcar presença</button>
                }
                <div className="navbar">
                    <img className="imgCasa" src={casaColorida} onClick={handleClickHome} />
                    <img className="imgCriar" src={criar} onClick={handleClickCreate} />
                    <img className="imgLupa" src={lupa} onClick={handleClickPesquisa} />
                    <img className="imgPessoa" src={pessoa} onClick={handleClickPerfil} />
                </div>
            </div>
        </>
    );
}
export default Descricao;