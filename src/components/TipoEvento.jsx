import seta from "../imagens/seta.svg";
import Cookies from 'js-cookie';
import axios from "axios";
import { useEffect, useState } from "react";
import { HashLoader } from 'react-spinners';

const TipoEvento = (props) => {
    const [listaInteresse, setListaInteresse] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [interesses, setInteresses] = useState([]);
    const [listaInteresseUsuario, setListaInteresseUsuario] = useState([]);
    const [listaEsporte, setListaEsporte] = useState([]);
    const [listaJogos, setListaJogos] = useState([]);
    const [listaFesta, setListaFesta] = useState([]);
    const [loading, setLoading] = useState(true);

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
            setTimeout(function () {
                setLoading(false);
            },1000)
        };
        getInteresse();
    }, [interesses]);

    return (
        <>
            <div className="main-tipo">
                <div className="tipo-title">
                    <h1>
                        Selecione o tipo de evento
                    </h1>
                </div>

                <div className="tipo-container">
                    <div className="header-tipo">
                        <p>Seus Interesses</p>
                        <div className="linha-tipo"></div>
                    </div>
                    <div className="seus">
                        {loading ? (
                            <HashLoader color={"#fff"} loading={true} size={45} style={{height: "0px", width:"100%", display:"flex", alignItems:"flex-start", justifyContent:"flex-start", marginTop:"0"}} />
                        ) : (
                            listaInteresseUsuario.map((interesse, index) => {
                                return (
                                    <div className="tipo-card" key={index}>
                                        <button
                                            style={{
                                                backgroundImage: `linear-gradient(to left, rgba(24, 28, 34, 0) 0%, rgba(24, 28, 34, 1) 100%), url(${interesse.imagem})`,
                                            }}
                                            className="btnInteresse"
                                            onClick={(e) => props.handleClickCreate(e, interesse)}
                                        >
                                            {interesse.nome}
                                        </button>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    <div className="header-tipo">
                        <p>Esportes</p>
                        <div className="linha-tipo"></div>
                    </div>
                    <div className="seus">
                        {
                            listaEsporte.map((interesse, index) => {
                                return (
                                    <div className="tipo-card" key={index}>
                                        <button style={{ backgroundImage: `linear-gradient(to left, rgba(24, 28, 34, 0) 0%, rgba(24, 28, 34, 1) 100%), url(${interesse.imagem})` }} className="btnInteresse" onClick={(e) => props.handleClickCreate(e, interesse)}>{interesse.nome}</button>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className="header-tipo">
                        <p>Jogos</p>
                        <div className="linha-tipo"></div>
                    </div>
                    <div className="seus">
                        {
                            listaJogos.map((interesse, index) => {
                                return (
                                    <div className="tipo-card" key={index}>
                                        <button style={{ backgroundImage: `linear-gradient(to left, rgba(24, 28, 34, 0) 0%, rgba(24, 28, 34, 1) 100%), url(${interesse.imagem})` }} className="btnInteresse" onClick={(e) => props.handleClickCreate(e, interesse)}>{interesse.nome}</button>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className="header-tipo">
                        <p>Festas</p>
                        <div className="linha-tipo"></div>
                    </div>
                    <div className="seus">
                        {
                            listaFesta.map((interesse, index) => {
                                return (
                                    <div className="tipo-card" key={index}>
                                        <button style={{ backgroundImage: `linear-gradient(to left, rgba(24, 28, 34, 0) 0%, rgba(24, 28, 34, 1) 100%), url(${interesse.imagem})` }} className="btnInteresse" onClick={(e) => props.handleClickCreate(e, interesse)}>{interesse.nome}</button>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
            </div>
        </>
    );
}
export default TipoEvento;