import { useEffect, useState } from "react";
import axios from "axios";
import seta from "../imagens/seta.svg";
import Cookies from 'js-cookie';

const SeguidoresPP = (props) => {
    const [seguidores, setSeguidores] = useState([]);
    const [usuariosSeguidores, setUsuariosSeguidores] = useState([]);
    const [verificaSeguidores, setVerificaSeguidores] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
        const getUsuario = async () => {
            const token = Cookies.get('token');
            const response = await axios.post('http://localhost:3001/usuarioInfo', { token });
            setEmail(response.data.email);
            console.log(email);
        };
        getUsuario();
    });
    
    useEffect(() => {
        const getUsuario = async () => {
            setSeguidores(props.usuarioSelecionado.usuariosSeguidores);
        };
        getUsuario();
    }, [verificaSeguidores]);

    useEffect(() => {
        const verificaSeguidores = async () => {
            await seguidores;
            if (seguidores.length == 0) {
                setVerificaSeguidores(false);
            } else {
                setVerificaSeguidores(true);
            }
        };
        verificaSeguidores();
    }, [seguidores]); 
    
    useEffect(() => {
        const getSeguidores = async () => {
            const token = Cookies.get('token');
            const response = await axios.post('http://localhost:3001/pesquisaUsuario', { token });
            seguidores.map((seguidor) => {
                const email = seguidor;
                response.data.map((usuario) => {
                    if (usuario.email == email) {
                        setUsuariosSeguidores((usuariosSeguidores) => [...usuariosSeguidores, usuario]);
                    }
                });
            });
        };
        getSeguidores();
    },[seguidores]);

    return (
        <>
            <div className="main-participantes">
                <h1 className="participantes">
                    Seguidores
                </h1>
                <div className="user-container">
                    {usuariosSeguidores.map((usuario, index) => {
                        if (usuario.email == email) {
                            return (
                                <div className="user-body" onClick={(e) => props.handleClickPerfil(e)} key={index}>
                                    <img src={usuario.foto} alt="" />
                                    <h1 className="username">{usuario.nome}</h1>
                                    <button className="user-btn"><img src={seta} alt="" /></button>
                                </div>
                            )
                        } else {
                            return (
                                <div className="user-body" onClick={(e) => props.handleClickPesquisaUsuario(e, usuario)} key={index}>
                                    <img src={usuario.foto} alt="" />
                                    <h1 className="username">{usuario.nome}</h1>
                                    <button className="user-btn"><img src={seta} alt="" /></button>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>

        </>
    );
}
export default SeguidoresPP;