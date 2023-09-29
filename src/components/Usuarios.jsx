import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/style-pesquisa.css";
import seta from "../imagens/seta.svg";
import Cookies from 'js-cookie';

const Usuarios = (props) => {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);
    const [busca, setBusca] = useState('');
    const [Pesquisa, setPesquisa] = useState([]);
    const [pesquisaPost, setPesquisaPost] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getUsuarios = async () => {
            const token = Cookies.get('token');
            const response = await axios.post('http://localhost:3001/pesquisaUsuario', { token });
            setUsuarios(response.data);
            if (busca == '') {
                setPesquisa(response.data);
            }
        };
        getUsuarios();
    }, []);

    useEffect(() => {
        const getPosts = async () => {
            const token = Cookies.get('token');
            const response = await axios.post('http://localhost:3001/postsHome', { token });
            setPosts(response.data);
            if (busca == "") {
                setPesquisaPost(response.data);
            }
        };
        getPosts();
    }, []);

    useEffect(() => {
        const pesquisaInput = async () => {
            const usuariosPesquisa = usuarios.filter((usuario) => usuario.nome.toLowerCase().includes(busca.toLowerCase()));
            const postsPesquisa = posts.filter((post) => post.evento.toLowerCase().includes(busca.toLowerCase()));
            setPesquisa(usuariosPesquisa);
            setPesquisaPost(postsPesquisa);
        };
        pesquisaInput();
    }, [busca]);

    return (
        <>
            <input type="text" placeholder="O que desejas procurar?" className="pesquisar" value={busca} onChange={(e) => setBusca(e.target.value)} />
            <h1 className="header-pesquisa">
                Usuários
            </h1>
            <div className="user-container">
                {Pesquisa.map((usuario, index) => {
                    return (
                        <div className="user-body" onClick={(e) => props.handleClickPesquisaUsuario(e, usuario)} key={index}>
                            <img src={usuario.foto} alt="" />
                            <h1 className="username">{usuario.nome}</h1>
                            <button className="user-btn"><img src={seta} alt="" /></button>
                        </div>
                    )
                })}
            </div>

            <h1 className="header-pesquisa">
                Eventos
            </h1>

            <div className="eventos-container">
            {pesquisaPost.map((post, index) => {
                        const dia = new Date().getDate();
                        const mes = new Date().getMonth() + 1;
                        const ano = new Date().getFullYear();
                        const dataPost = post.data.split('/');
                        if (dataPost[1] >= mes && dataPost[2] >= ano) {
                            return (
                            <div className="card-body" key={index}>
                                <div className="card">
                                    <div className="card-top">
                                        <img src={post.foto} alt="" className="pfp" />
                                        <div className="textos-card">
                                            <p className="nome-card">{post.nome}</p>
                                            <p className="info">Bora {post.evento} as <span>{post.hora} do dia {post.data}</span></p>
                                        </div>
                                    </div>
                                </div>
                                <button className="participar" onClick={(e) => props.handleClickAtivaDescricao(e, post)}>Descrição</button>
                            </div>
                            )
                        } else {
                            return (
                                <div></div>
                            )
                        }
                    })}
            </div>
        </>
    );
}
export default Usuarios;