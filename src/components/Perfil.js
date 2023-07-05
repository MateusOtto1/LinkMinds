import { useContext, useEffect, useState } from "react";
import { AuthGoogleContext } from "../contexts/authGoogle";
import { useNavigate } from "react-router-dom";
import casa from "../imagens/Casa.png";
import criar from "../imagens/Criar.png";
import pessoaColorida from "../imagens/PessoaColorida.png";
import lapis from "../imagens/Lapis.png";
import axios from "axios";
import esportes from "../imagens/Esportes.png";

const Perfil = () => {
    const { signOut } = useContext(AuthGoogleContext);
    const navigate = useNavigate();
    const { email } = useContext(AuthGoogleContext);
    const [usuarios, setUsuarios] = useState({});
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getUsuario = async () => {
            const response = await axios.post('http://localhost:3001/usuarioInfo', { email });
            setUsuarios(response.data);
        };
        getUsuario();
    }, []);

    useEffect(() => {
        const getPosts = async () => {
            const response = await axios.post('http://localhost:3001/postsInfo', { email });
            setPosts(response.data);
        };
        getPosts();
    }, []);

    function handleClick() {
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
    function handleClickAlterar() {
        navigate('/Bio');
    };

    return (
        <>
            <div className="FundoPerfil">
                <h1 className="Perfil"><span className="spanTexto">Seu </span>perfil</h1>
                <div className="fundoMenor">
                    <h3 className="apelido">Apelido</h3>
                    <h3 className="apelidoUsuario">{usuarios.apelido}</h3>
                    <div className="divNome">
                        <h2 className="nomePerfil">{usuarios.nome}</h2>
                        <h4 className="idadePerfil">{usuarios.idade} anos</h4>
                        <button className="alterarPerfil" onClick={handleClickAlterar}>
                            <img className="imgLapis" src={lapis} />
                        </button>
                    </div>
                    <h3 className="apelido">Sobre Você</h3>
                    <h4 className="descricaoPerfil">{usuarios.descricao}</h4>
                    <h3 className="meusInteresses">Meus interesses</h3>
                    <h4 className="interesses">{usuarios.interesses}</h4>
                    <h2 className="todosPostsPerfil">Meus <span className="spanTexto">Posts</span></h2>
                    <div className="bordaPerfil">
                        <div className="fundoMenorPerfil">
                            {posts.map((post, index) => {
                                return (
                                    <button className="post" onClick={handleClick} key={index}>
                                        <div className="fundoPost">
                                            <img className="imgEsportes" src={esportes} />
                                            <div className="descricaoPost">
                                                <h1 className="nomeJogo">{post.evento}</h1>
                                                <h3 className="dataJogo">{post.data} - {post.hora}</h3>
                                                <h3 className="criadorJogo">Criado por: {post.nome}</h3>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    {/* <button onClick={() => signOut()}>sair</button> */}
                    <div className="navbar">
                        <img className="imgCasa" src={casa} onClick={handleClickHome} />
                        <img className="imgCriar" src={criar} onClick={handleClickCreate} />
                        <img className="imgPessoa" src={pessoaColorida} onClick={handleClickPerfil} />
                    </div>
                </div>
            </div>
        </>
    );
}
export default Perfil;