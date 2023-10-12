import { useEffect, useState } from "react";
import axios from "axios";
import seta from "../imagens/seta.svg";
import Cookies from 'js-cookie';

const Seguindo = (props) => {
    const [seguindo, setSeguindo] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [usuariosSeguindo, setUsuariosSeguindo] = useState([]);
    const [verificaSeguindo, setVerificaSeguindo] = useState(false);

    useEffect(() => {
        const getUsuario = async () => {
            const token = Cookies.get('token');
            const response = await axios.post('http://localhost:3001/usuarioInfo', { token });
            setSeguindo(response.data.usuariosSeguindo);
        };
        getUsuario();
    }, [verificaSeguindo]);

    useEffect(() => {
        const verificaSeguindo = async () => {
            await seguindo;
            if (seguindo.length != 0) {
                setVerificaSeguindo(true);
            } else {
                setVerificaSeguindo(false);
            }
        };
        verificaSeguindo();
    }, [seguindo]);

    useEffect(() => {
        const getSeguindo = async () => {
            const token = Cookies.get('token');
            const response = await axios.post('http://localhost:3001/pesquisaUsuario', { token });
            setUsuarios(response.data);
            seguindo.map((seguindo) => {
                const email = seguindo;
                usuarios.map((usuario) => {
                    if (usuario.email == email) {
                        setUsuariosSeguindo((usuariosSeguindo) => [...usuariosSeguindo, usuario]);
                    }
                });
            });
        };
        getSeguindo();
    }, [seguindo]);

    return (
        <>
            <div className="main-participantes">
                <h1 className="participantes">
                    Seguindo
                </h1>
                <div className="user-container">
                    {usuariosSeguindo.map((usuario, index) => {
                        return (
                            <div className="user-body" onClick={(e) => props.handleClickPesquisaUsuario(e, usuario)} key={index}>
                                <img src={usuario.foto} alt="" />
                                <h1 className="username">{usuario.nome}</h1>
                                <button className="user-btn"><img src={seta} alt="" /></button>
                            </div>
                        )
                    })}
                </div>
            </div>

        </>
    );
}
export default Seguindo;