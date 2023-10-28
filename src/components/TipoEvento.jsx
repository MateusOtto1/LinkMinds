import seta from "../imagens/seta.svg";
import Cookies from 'js-cookie';
import axios from "axios";
import { useEffect, useState } from "react";

const TipoEvento = (props) => {
    const [listaInteresse, setListaInteresse] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [interesses, setInteresses] = useState([]);
    const [listaInteresseUsuario, setListaInteresseUsuario] = useState([]);
    const [listaEsporte, setListaEsporte] = useState([]);
    const [listaJogos, setListaJogos] = useState([]);
    const [listaFesta, setListaFesta] = useState([]);

    useEffect(() => {
        const getUsuario = async () => {
            const token = Cookies.get('token');
            const headers = {
                "x-access-token": token
            }
            const response = await axios.get('https://server-link-minds.vercel.app/usuarioInfo', { headers });
            setUsuarios(response.data);
            setInteresses(response.data.interesses);
        };
        getUsuario();
    }, [interesses.length == 0]);

    useEffect(() => {
        const getInteresse = async () => {
            const token = Cookies.get('token');
            const headers = {
                "x-access-token": token
            }
            const response = await axios.get('https://server-link-minds.vercel.app/listaInteresse', { headers });
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
    },[interesses]);

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
                                            <button className="btnInteresse" onClick={(e) => props.handleClickCreate(e, interesse)}>{interesse.nome}</button>
                                        </div>
                                    )
                                })
                            }
                            <label >Esportes</label>
                            {
                                listaEsporte.map((interesse, index) => {
                                    return (
                                        <div key={index}>
                                            <button className="btnInteresse" onClick={(e) => props.handleClickCreate(e, interesse)}>{interesse.nome}</button>
                                        </div>
                                    )
                                })
                            }
                            <label >Jogos</label>
                            {
                                listaJogos.map((interesse, index) => {
                                    return (
                                        <div key={index}>
                                            <button className="btnInteresse" onClick={(e) => props.handleClickCreate(e, interesse)}>{interesse.nome}</button>
                                        </div>
                                    )
                                })
                            }
                            <label >Festa</label>
                            {
                                listaFesta.map((interesse, index) => {
                                    return (
                                        <div key={index}>
                                            <button className="btnInteresse" onClick={(e) => props.handleClickCreate(e, interesse)}>{interesse.nome}</button>
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