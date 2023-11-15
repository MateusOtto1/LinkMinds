import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import "../css/style-home.css";
import Cookies from 'js-cookie';
import { BeatLoader } from 'react-spinners';
import { HashLoader } from 'react-spinners';

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
    }, [usuarios]);

    return (
        <>
            <div id="wrapper">
                <h1 id="bv">Presenças de</h1>
                <h1 id="nome">{usuarios.apelido
                    ? usuarios.apelido
                    : <BeatLoader color={"#fff"} loading={true} size={20} />
                }</h1>
            </div>
            <div className="header-perfil-container">
                <h1 className="inter-header">Presenças</h1>
                <div className="linha-verde"></div>
            </div>
            <div id="posts" className="erro-presencas">

                {posts.length > 0 ? (
                    posts.map((post, index) => {
                        const dataPost = post.data.split('/');
                        const dia = new Date().getDate();
                        const mes = new Date().getMonth() + 1;
                        const ano = new Date().getFullYear();
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
                                        <button className="participar" onClick={(e) => props.handleClickAtivaDescricao(e, post)}>Descrição</button>
                                    </div>
                                </div>
                            )

                        }
                    })
                ) : (
                    <>
                        <HashLoader color={"#fff"} loading={true} size={45} style={{ gridColumn: "1/-1", position: "absolute", alignSelf: "center", justifySelf: "center" }} />
                        {setTimeout(function () {
                            function checkErroPresencas() {
                                const erroPresencas = document.querySelector('.erro-presencas');
                                if (erroPresencas && !erroPresencas.hasChildNodes()) {
                                    erroPresencas.innerHTML = "<h3>Nenhum post encontrado.</h3>";
                                }
                            }
                            checkErroPresencas();
                        }, 1000)}
                    </>
                )}

                {/* {posts.map((post, index) => {
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
                                    <button className="participar" onClick={(e) => props.handleClickAtivaDescricao(e, post)}>Descrição</button>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div></div>
                        )
                    }
                })} */}

            </div>
        </>
    );
}
export default Presencas;