import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import casa from "../imagens/Casa.png";
import criar from "../imagens/Criar.png";
import pessoa from "../imagens/Pessoa.png";
import axios from "axios";
import esportes from "../imagens/Esportes.png";
import lupaColorida from "../imagens/lupaColorida.png";

const Perfil = (props) => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            const nome = props.usuarioSelecionado.nome;
            const response = await axios.post('http://localhost:3001/postsPerfilPesquisa', { nome });
            setPosts(response.data);
        }
        getPosts();
    },[]);

    function handleClick(e, post) {
        e.stopPropagation();
        props.setPostSelecionado(post);
        navigate('/Descricao');
    };
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
    }

    return (
        <>
            <div className="FundoPerfil">
                <h1 className="PerfilPesquisa">{props.usuarioSelecionado.nome}</h1>
                <div className="fundoMenor">
                    <h3 className="apelido">Apelido</h3>
                    <h3 className="apelidoUsuario">{props.usuarioSelecionado.apelido}</h3>
                    <div className="divNome">
                        <h2 className="nomePerfil">{props.usuarioSelecionado.nome}</h2>
                        <h4 className="idadePerfil">{props.usuarioSelecionado.idade} anos</h4>
                    </div>
                    <h3 className="apelido">Sobre {props.usuarioSelecionado.nome}</h3>
                    <h4 className="descricaoPerfil">{props.usuarioSelecionado.descricao}</h4>
                    <h3 className="meusInteresses">Interesses</h3>
                    <h4 className="interesses">{props.usuarioSelecionado.interesses}</h4>
                    <h2 className="todosPostsPerfil"><span className="spanTexto">Posts</span></h2>
                    <div className="bordaPerfil">
                        <div className="fundoMenorPerfil">
                            {posts.map((post, index) => {
                                return (
                                    <button className="post" onClick={(e) => handleClick(e, post)} key={index}>
                                        <div className="fundoPost">
                                            <img className="imgEsportes" src={esportes} />
                                            <div className="descricaoPost">
                                                <h1 className="nomeJogo">{post.evento}</h1>
                                                <h3 className="dataJogo">{post.data} * {post.hora}</h3>
                                                <h3 className="criadorJogo">Criado por: {post.nome}</h3>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <div className="navbar">
                        <img className="imgCasa" src={casa} onClick={handleClickHome} />
                        <img className="imgCriar" src={criar} onClick={handleClickCreate} />
                        <img className="imgPesquisa" src={lupaColorida} onClick={handleClickPesquisa} />
                        <img className="imgPessoa" src={pessoa} onClick={handleClickPerfil} />  
                    </div>
                </div>
            </div>
        </>
    );
}
export default Perfil;