import { useNavigate, Navigate } from "react-router-dom";
import casaColorida from "../imagens/CasaColorida.png";
import criar from "../imagens/Criar.png";
import pessoa from "../imagens/Pessoa.png";
import esportes from "../imagens/Esportes.png";
import lupa from "../imagens/lupa.png";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Home = (props) => {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [posts, setPosts] = useState([]);
    const [usuarios, setUsuarios] = useState({});
    const [busca, setBusca] = useState('');
    const [Pesquisa, setPesquisa] = useState([]);

    useEffect(() => {
        const getUsuario = async () => {
            const email = localStorage.getItem('email');
            const response = await axios.post('http://localhost:3001/usuarioInfo', { email });
            setUsuarios(response.data);
            setNome(response.data.nome);
        };
        getUsuario();
    }, []);

    useEffect(() => {
        const getPosts = async () => {
            const response = await axios.post('http://localhost:3001/postsHome');
            setPosts(response.data);
            if (busca == '') {
                setPesquisa(response.data);
            }
        };
        getPosts();
    }, []);

    useEffect(() => {
        const pesquisaInput = async () => {
            const postsPesquisa = posts.filter((post) => post.evento.toLowerCase().includes(busca.toLowerCase()));
            setPesquisa(postsPesquisa);
        };
        pesquisaInput();
    }, [busca]);

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

    if (usuarios.apelido == "") {
        return <Navigate to="/Bio" />
    }
    else {
        return (
            <>
                <div className="FundoHome">
                    <div className="homeNome">
                        <h1>{nome}</h1>
                    </div>
                    <div className="fundoMenor">
                        <h3 className="HomePreparamos"><span className="spanTexto">Veja</span> o que <span className="spanTexto">preparamos</span> para <span className="spanTexto">você!</span></h3>

                        <input type="text" className="inputPesquisaHome" placeholder="Busque eventos aqui!" value={busca} onChange={(e) => setBusca(e.target.value)} />
                        <div className="todosPostsHome">
                            <h2>Todos os <span className="spanTexto">Posts</span></h2>
                        </div>
                        <div className="bordaHome">
                            <div className="fundoMenorHome">
                                {Pesquisa.map((post, index) => {
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
                                    )
                                })}
                            </div>
                        </div>
                        <div className="navbar">
                            <img className="imgCasa" src={casaColorida} onClick={handleClickHome} />
                            <img className="imgCriar" src={criar} onClick={handleClickCreate} />
                            <img className="imgLupa" src={lupa} onClick={handleClickPesquisa} />
                            <img className="imgPessoa" src={pessoa} onClick={handleClickPerfil} />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
export default Home;