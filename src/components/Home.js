import { useNavigate, Navigate } from "react-router-dom";
import casaColorida from "../imagens/CasaColorida.png";
import criar from "../imagens/Criar.png";
import pessoa from "../imagens/Pessoa.png";
import esportes from "../imagens/Esportes.png";
import { useContext, useEffect } from "react";
import { AuthGoogleContext } from "../contexts/authGoogle";
import axios from "axios";
import { useState } from "react";

const Home = () => {
    const navigate = useNavigate();
    const { nome } = useContext(AuthGoogleContext);
    const { email } = useContext(AuthGoogleContext);
    const [posts, setPosts] = useState([]);
    const [usuarios, setUsuarios] = useState({});
    
    useEffect(() => {
        const getUsuario = async () => {
            const response = await axios.post('http://localhost:3001/usuarioInfo', { email });
            setUsuarios(response.data);
        };
        getUsuario();
    }, []);

    useEffect(() => {
        const getPosts = async () => {
            const response = await axios.post('http://localhost:3001/postsHome');
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

    if(usuarios.apelido == ""){
        return <Navigate to="/Bio"/>
    }
    else{
        return (
            <>
                <div className="Fundo">
                    <div className="homeNome">
                        <h1>{nome}</h1>
                    </div>
                    <h3 className="HomePreparamos"><span className="spanTexto">Veja</span> o que <span className="spanTexto">preparamos</span> para <span className="spanTexto">você</span></h3>
                    <div className="todosPostsHome">
                        <h2>Todos os <span className="spanTexto">Posts</span></h2>
                    </div>
                    <div className="bordaHome">
                        <div className="fundoMenorHome">
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
                                )
                            })}
                        </div>
                    </div>
                    <div className="navbar">
                        <img className="imgCasa" src={casaColorida} onClick={handleClickHome} />
                        <img className="imgCriar" src={criar} onClick={handleClickCreate} />
                        <img className="imgPessoa" src={pessoa} onClick={handleClickPerfil} />
                    </div>
                </div>
            </>
        );
    }
}
export default Home;