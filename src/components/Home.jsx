import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import "../css/style-home.css";
import Cookies from 'js-cookie';

const Home = (props) => {
    const [posts, setPosts] = useState([]);
    const [email, setEmail] = useState('');
    const [usuarios, setUsuarios] = useState({});
    const [interesses, setInteresses] = useState([]);
    const [postsInteresses, setPostsInteresses] = useState([]);

    useEffect(() => {
        const getUsuario = async () => {
            const token = Cookies.get('token');
            const headers = {
                "x-access-token": token
            }
            const response = await axios.get('https://server-link-minds.vercel.app/usuarioInfo', { headers });
            if(response.data){
                setUsuarios(response.data);
                setEmail(response.data.email);
                setInteresses(response.data.interesses);
            }else{
                setUsuarios({});
                setEmail('');
                setInteresses([]);
            }
            const response2 = await axios.get('https://server-link-minds.vercel.app/postsHome', { headers }).then((response2) => {return response2;});
            setPosts(response2.data.reverse());
            if(interesses){
            const postsInteresses = posts.filter((post) => {return interesses.includes(post.evento);});
            setPostsInteresses(postsInteresses);
            }
        };
        getUsuario();
    }, [posts.length == 0 && usuarios.apelido == undefined]);

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

                    {postsInteresses.map((post, index) => {
                        const dia = new Date().getDate();
                        const mes = new Date().getMonth() + 1;
                        const ano = new Date().getFullYear();
                        const dataPost = post.data.split('/');
                        if (dataPost[1] >= mes && dataPost[2] >= ano) {
                            if (post.email != email) {
                                return (
                                    <div className="card-body" key={index}>
                                        <div className="card" style={{backgroundImage: `url(${post.imagemEvento})`}}>
                                            <div className="card-top">
                                                <img src={post.foto} alt="" className="pfp" />
                                                <div className="textos-card">
                                                    <p className="nome-card">{post.nome}</p>
                                                    <p className="info">{post.evento} as <span>{post.hora} do dia {post.data}</span></p>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="participar" onClick={(e) => props.handleClickAtivaDescricao(e, post)}>Descrição</button>
                                    </div>
                                )
                            }
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