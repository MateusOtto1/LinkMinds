import seta from "../imagens/seta.svg";
import Cookies from 'js-cookie';
import axios from "axios";
import { useEffect, useState } from "react";

const TipoEvento = (props) => {
    const [listaInteresse, setListaInteresse] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [interesses, setInteresses] = useState([]);
    const [execucoes, setExecucoes] = useState(0);
    const [contador, setContador] = useState(0);
    const [listaInteresseUsuario, setListaInteresseUsuario] = useState([]);
    const [listaEsporte, setListaEsporte] = useState([]);
    const [listaJogos, setListaJogos] = useState([]);
    const [listaFesta, setListaFesta] = useState([]);

    useEffect(() => {
        const getUsuario = async () => {
            const token = Cookies.get('token');
            const response = await axios.post('http://localhost:3001/usuarioInfo', { token });
            setUsuarios(response.data);
            setInteresses(response.data.interesses);
        };
        getUsuario();
    }, [execucoes]);

    useEffect(() => {
        const getInteresse = async () => {
            const response = await axios.get('http://localhost:3001/listaInteresse');
            setListaInteresse(response.data);
            setListaInteresseUsuario([]);
            listaInteresse.map((interesse) => {
                interesses.map((interesseUsuario) => {
                    if (interesse.nome == interesseUsuario) {
                        setListaInteresseUsuario((listaInteresseUsuario) => [...listaInteresseUsuario, interesse]);
                    }
                });
            });
            setListaEsporte([]);
            listaInteresse.map((interesse) => {
                if (interesse.tipoEvento == "Esporte") {
                    setListaEsporte((listaEsporte) => [...listaEsporte, interesse]);
                }
            });
            setListaJogos([]);
            listaInteresse.map((interesse) => {
                if (interesse.tipoEvento == "Jogo") {
                    setListaJogos((listaJogos) => [...listaJogos, interesse]);
                }
            });
            setListaFesta([]);
            listaInteresse.map((interesse) => {
                if (interesse.tipoEvento == "Festa") {
                    setListaFesta((listaFesta) => [...listaFesta, interesse]);
                }
            });
        };
        getInteresse();
    },[execucoes]);

    useEffect(() => {
        if (contador < 15) {
            setExecucoes(execucoes + 1);
            setContador(contador + 1);
        }
    }, [contador]);

    return (
        <>
            <div className="main-participantes">
                <h1 className="participantes">
                    Crie um Evento De:
                </h1>
                <div className="user-container">
                    <div className="user-body">
                        <div className="editar-input">
                            <label >Seus Interesses</label>
                            {
                                listaInteresseUsuario.map((interesse, index) => {
                                    return (
                                        <div key={index}>
                                            <button className="btnInteresse">{interesse.nome}</button>
                                        </div>
                                    )
                                })
                            }
                            <label >Esportes</label>
                            {
                                listaEsporte.map((interesse, index) => {
                                    return (
                                        <div key={index}>
                                            <button className="btnInteresse">{interesse.nome}</button>
                                        </div>
                                    )
                                })
                            }
                            <label >Jogos</label>
                            {
                                listaJogos.map((interesse, index) => {
                                    return (
                                        <div key={index}>
                                            <button className="btnInteresse">{interesse.nome}</button>
                                        </div>
                                    )
                                })
                            }
                            <label >Festa</label>
                            {
                                listaFesta.map((interesse, index) => {
                                    return (
                                        <div key={index}>
                                            <button className="btnInteresse">{interesse.nome}</button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default TipoEvento;