import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import "../css/style-home.css";
import Cookies from 'js-cookie';

const Presencas = (props) => {
    const [posts, setPosts] = useState([]);
    const [presencas, setPresencas] = useState([]);
    const [usuarios, setUsuarios] = useState({});

    useEffect(() => {
        const getUsuario = async () => {
            const token = Cookies.get('token');
            const headers = {
                "x-access-token": token
            }
            const response = await axios.get('https://server-link-minds.vercel.app/usuarioInfo', { headers });
            setUsuarios(response.data);
        };
        getUsuario();
    }, [usuarios.length == 0]);

    useEffect(() => {
        const getPosts = async () => {
            const token = Cookies.get('token');
            const headers = {
                "x-access-token": token
            }
            const response = await axios.get('https://server-link-minds.vercel.app/postsHome', { headers });
            setPresencas(response.data.reverse());
            const postsPresenca = presencas.filter((presenca) => {
                return presenca.usuariosPresenca.includes(usuarios.email);
            });
            setPosts(postsPresenca);
        };
        getPosts();
    }, [presencas.length == 0]);

    return (
        <>
            <div id="wrapper">
                <h1 id="bv">Presenças de</h1>
                <h1 id="nome">{usuarios.apelido}</h1>
            </div>
            <h1 id="posts-recomendados">Presenças marcadas</h1>
            <div id="posts">

                {posts.map((post, index) => {
                    const dia = new Date().getDate();
                    const mes = new Date().getMonth() + 1;
                    const ano = new Date().getFullYear();
                    const dataPost = post.data.split('/');
                    if (dataPost[1] >= mes && dataPost[2] >= ano) {
                        return (
                            <div className="card-body" key={index}>
                                <div className="card" style={{ backgroundImage: `url(${post.imagemEvento})` }}>
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
export default Presencas;