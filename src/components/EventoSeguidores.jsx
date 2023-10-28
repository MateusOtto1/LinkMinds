import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import "../css/style-home.css";
import Cookies from 'js-cookie';

const EventoSeguidores = (props) => {
    const [posts, setPosts] = useState([]);
    const [email, setEmail] = useState('');
    const [usuarios, setUsuarios] = useState({});
    const [seguindo, setSeguindo] = useState([]);
    const [seguidores, setSeguidores] = useState([]);
    const [postsSeguindo, setPostsSeguindo] = useState([]);
    const [postsSeguidores, setPostsSeguidores] = useState([]);

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
                setSeguindo(response.data.usuariosSeguindo);
                setSeguidores(response.data.usuariosSeguidores);
            }else{
                setUsuarios({});
                setEmail('');
                setSeguindo([]);
            }
            const response2 = await axios.get('https://server-link-minds.vercel.app/postsHome', { headers }).then((response2) => {return response2;});
            setPosts(response2.data.reverse());
            const postsSeguindo = posts.filter((post) => {return seguindo.includes(post.email);});
            setPostsSeguindo(postsSeguindo);
            const postsSeguidores = posts.filter((post) => {return seguidores.includes(post.email);});
            setPostsSeguidores(postsSeguidores);
        };
        getUsuario();
    }, [posts.length == 0]);

    if (usuarios.apelido == "") {
        return <Navigate to="/Cadastro" />
    }
    else {
        return (
            <>
                <div id="wrapper">
                    <h1 id="bv">Aqui está</h1>
                    <h1 id="nome">{usuarios.apelido}</h1>
                </div>
                <h1 id="posts-recomendados">Posts de quem você segue</h1>
                <div id="posts">

                    {postsSeguindo.map((post, index) => {
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
                <h1 id="posts-recomendados">Posts dos seus seguidores</h1>
                <div id="posts">

                    {postsSeguidores.map((post, index) => {
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
export default EventoSeguidores;