import { useEffect, useState } from "react";
import axios from "axios";
import seta from "../imagens/seta.svg";
import Cookies from 'js-cookie';

const SeguidoresPP = (props) => {
    const [seguindo, setSeguindo] = useState([]);
    const [usuariosSeguindo, setUsuariosSeguindo] = useState([]);
    const [verificaSeguindo, setVerificaSeguindo] = useState(false);
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
            setSeguindo(props.usuarioSelecionado.usuariosSeguindo);
        };
        getUsuario();
    }, [verificaSeguindo]);

    useEffect(() => {
        const verificaSeguindo = async () => {
            await seguindo;
            if (seguindo.length == 0) {
                setVerificaSeguindo(false);
            } else {
                setVerificaSeguindo(true);
            }
        };
        verificaSeguindo();
    }, [seguindo]); 
    
    useEffect(() => {
        const getSeguindo = async () => {
            const token = Cookies.get('token');
            const response = await axios.post('http://localhost:3001/pesquisaUsuario', { token });
            seguindo.map((seguidor) => {
                const email = seguidor;
                response.data.map((usuario) => {
                    if (usuario.email == email) {
                        setUsuariosSeguindo((usuariosSeguindo) => [...usuariosSeguindo, usuario]);
                    }
                });
            });
        };
        getSeguindo();
    },[seguindo]);

    return (
        <>
            <div className="main-participantes">
                <h1 className="participantes">
                    Seguindo
                </h1>
                <div className="user-container">
                    {usuariosSeguindo.map((usuario, index) => {
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