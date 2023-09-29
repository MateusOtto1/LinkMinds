import { useNavigate, Navigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import "../css/style-home.css";
import Cookies from 'js-cookie';

const Home = (props) => {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [posts, setPosts] = useState([]);
    const [usuarios, setUsuarios] = useState({});
    const [busca, setBusca] = useState('');
    const [Pesquisa, setPesquisa] = useState([]);

    useEffect(() => {
        const getUsuario = async () => {
            const token = Cookies.get('token');
            const response = await axios.post('http://localhost:3001/usuarioInfo', { token });
            setUsuarios(response.data);
            setNome(response.data.nome);
        };
        getUsuario();
    }, []);

    useEffect(() => {
        const getPosts = async () => {
            const token = Cookies.get('token');
            const response = await axios.post('http://localhost:3001/postsHome', { token });
            setPosts(response.data);
            if (busca == "") {
                setPesquisa(response.data);
            }
        };
        getPosts();
    });

    if (usuarios.apelido == "") {
        return <Navigate to="/Cadastro" />
    }
    else {
        return (
            <>
                <div id="wrapper">
                    <h1 id="bv">Bem Vindo</h1>
                    <h1 id="nome">{usuarios.apelido}</h1>
                </div>
                <h1 id="posts-recomendados">Posts recomendados</h1>
                <div id="posts">

                    {Pesquisa.map((post, index) => {
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
}
export default Home;