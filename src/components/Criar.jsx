import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../css/style-criar.css";
import Cookies from 'js-cookie';

const Criar = (props) => {
    const navigate = useNavigate();
    const [evento, setEvento] = useState('');
    const [dataEUA, setDataEUA] = useState('');
    const [hora, setHora] = useState('');
    const [local, setLocal] = useState('');
    const [preencha, setPreencha] = useState('');
    const [nome, setNome] = useState('');
    const [foto, setFoto] = useState('');
    const [posts, setPosts] = useState([]);
    const [postExistente, setPostExistente] = useState(false);
    const [email, setEmail] = useState('');
    const [dataBrasil, setDataBrasil] = useState('');
    const [tipoEvento, setTipoEvento] = useState('');
    const [imagemEvento, setImagemEvento] = useState('');
    const [precisaLocal, setPrecisaLocal] = useState(false);
    const [execucoes, setExecucoes] = useState(0);
    const [contador, setContador] = useState(0);
    const [descricao, setDescricao] = useState('');
    const [podeCriar, setPodeCriar] = useState(false);

    useEffect(() => {
        const checkInput = async () => {
            const dataBr = dataEUA.split('-');
            const data = `${dataBr[2]}/${dataBr[1]}/${dataBr[0]}`;
            setDataBrasil(data);
            setPostExistente(false);
            posts.map((post) => {
                if (evento == post.evento && dataBrasil == post.data && hora == post.hora && local == post.local) {
                    setPostExistente(true);
                }
            });
            if (precisaLocal == true) {
                if (dataEUA == '' || hora == '' || local == '') {
                    setPreencha('Você não preencheu todos os campos');
                    setPodeCriar(false);
                    setPostExistente(false);
                } else {
                    setPreencha('');
                    setPodeCriar(true);
                }
            } else {
                if (dataEUA == '' || hora == '') {
                    setPreencha('Você não preencheu todos os campos');
                    setPodeCriar(false);
                    setPostExistente(false);
                } else {
                    setPreencha('');
                    setPodeCriar(true);
                }
            }
                if (postExistente == true) {
                    setPreencha('Você já criou este post');
                    setPodeCriar(false);
                }else{
                    setPodeCriar(true);
                    setPreencha('');
                }
            };
            checkInput();
        });

    useEffect(() => {
        const getUser = async () => {
            const token = Cookies.get('token');
            const response = await axios.post('http://localhost:3001/usuarioInfo', { token });
            setNome(response.data.nome);
            setFoto(response.data.foto);
            setEmail(response.data.email);
        };
        getUser();
    }, []);

    useEffect(() => {
        const getPost = async () => {
            const token = Cookies.get('token');
            const response = await axios.post('http://localhost:3001/postsInfo', { token, email });
            setPosts(response.data);
        };
        getPost();
    });

    useEffect(() => {
        const tipoInteresse = async () => {
            setTipoEvento(props.interesseSelecionado.tipoEvento);
            setImagemEvento(props.interesseSelecionado.imagem);
            setEvento(props.interesseSelecionado.nome);
            if (tipoEvento == 'Esporte') {
                setPrecisaLocal(true);
            }
            if (tipoEvento == 'Jogo') {
                setPrecisaLocal(false);
            }
            if (tipoEvento == 'Festa') {
                setPrecisaLocal(true);
            }
        };
        tipoInteresse();
    }, [execucoes]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (podeCriar == false) {
            setPreencha('Você já criou este post ou não preencheu todos os campos');
        } else {
            const dataBr = dataEUA.split('-');
            const data = `${dataBr[2]}/${dataBr[1]}/${dataBr[0]}`;
            const presenca = 0;
            const token = Cookies.get('token');
            axios.post('http://localhost:3001/posts', { token, email, nome, evento, tipoEvento, descricao, data, hora, local, presenca, foto, imagemEvento });
            navigate('/');
        }
    };

    useEffect(() => {
        if (contador < 15) {
            setExecucoes(execucoes + 1);
            setContador(contador + 1);
        }
    }, [contador]);

    if (precisaLocal == true) {
        return (
            <>
                <div className="main-criar">
                    <h1 id="criar-header" data-text="Criar Post">Criar Post</h1>
                    <div id="wrapper-criar">
                        <div className="body-inp">
                            <p className="inp-header">Descrição do evento</p>
                            <p>Opcional</p>
                            <input type="text" maxlength="100" placeholder="Digite Aqui" className="inp-criar" onChange={(e) => setDescricao(e.target.value)} />
                        </div>
                        <div className="body-inp">
                            <p className="inp-header">Data</p>
                            <input type="date" placeholder="Digite Aqui" className="inp-criar" onChange={(e) => setDataEUA(e.target.value)} />
                        </div>
                        <div className="body-inp">
                            <p className="inp-header">Horário</p>
                            <input type="time" placeholder="Digite Aqui" className="inp-criar" onChange={(e) => setHora(e.target.value)} />
                        </div>
                        <div className="body-inp">
                            <p className="inp-header">Local do evento</p>
                            <input type="text" placeholder="Digite Aqui" className="inp-criar" onChange={(e) => setLocal(e.target.value)} />
                        </div>
                        <p className="preencha">{preencha}</p>
                        <button id="btn-criar" onClick={handleSubmit}>Criar Evento</button>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="main-criar">
                    <h1 id="criar-header" data-text="Criar Post">Criar Post</h1>
                    <div id="wrapper-criar">
                        <div className="body-inp">
                            <p className="inp-header">Descrição do evento</p>
                            <p>Opcional</p>
                            <input type="text" placeholder="Digite Aqui" className="inp-criar" onChange={(e) => setDescricao(e.target.value)} />
                        </div>
                        <div className="body-inp">
                            <p className="inp-header">Data</p>
                            <input type="date" placeholder="Digite Aqui" className="inp-criar" onChange={(e) => setDataEUA(e.target.value)} />
                        </div>
                        <div className="body-inp">
                            <p className="inp-header">Horário</p>
                            <input type="time" placeholder="Digite Aqui" className="inp-criar" onChange={(e) => setHora(e.target.value)} />
                        </div>
                        <p className="preencha">{preencha}</p>
                        <button id="btn-criar" onClick={handleSubmit}>Criar Evento</button>
                    </div>
                </div>
            </>
        );
    }
}
export default Criar;