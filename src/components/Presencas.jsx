import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import "../css/style-home.css";
import Cookies from 'js-cookie';

const Presencas = (props) => {
    const [posts, setPosts] = useState([]);
    const [presencas, setPresencas] = useState([]);
    const [usuarios, setUsuarios] = useState({});
    const [execucoes, setExecucoes] = useState(0);
    const [contador, setContador] = useState(0);

    useEffect(() => {
        const getUsuario = async () => {
            const token = Cookies.get('token');
            const response = await axios.post('http://localhost:3001/usuarioInfo', { token });
            setUsuarios(response.data);
        };
        getUsuario();
    }, []);

    useEffect(() => {
        const getPosts = async () => {
            const token = Cookies.get('token');
            const response = await axios.post('http://localhost:3001/postsHome', { token });
            setPresencas(response.data);
            setPosts([]);
            const postsPresenca = presencas.filter((presenca) => {
                return presenca.usuariosPresenca.includes(usuarios.email);
            });
            setPosts(postsPresenca);
        };
        getPosts();
    }, [execucoes]);

    useEffect(() => {
        if (contador < 15) {
            setExecucoes(execucoes + 1);
            setContador(contador + 1);
        }
    }, [contador]);
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