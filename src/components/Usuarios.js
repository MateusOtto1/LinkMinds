import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import casa from "../imagens/Casa.png";
import criar from "../imagens/Criar.png";
import pessoa from "../imagens/Pessoa.png";
import axios from "axios";
import lupaColorida from "../imagens/lupaColorida.png";

const Usuarios = (props) => {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);
    const [busca, setBusca] = useState('');
    const [Pesquisa, setPesquisa] = useState([]);

    useEffect(() => {
        const getUsuarios = async () => {
            const response = await axios.post('http://localhost:3001/pesquisaUsuario');
            setUsuarios(response.data);
            if (busca == '') {
                setPesquisa(response.data);
            }
        };
        getUsuarios();
    }, []);

    useEffect(() => {
        const pesquisaInput = async () => {
            const usuariosPesquisa = usuarios.filter((usuario) => usuario.nome.toLowerCase().includes(busca.toLowerCase()));
            setPesquisa(usuariosPesquisa);
        };
        pesquisaInput();
    }, [busca]);

    function handleClickHome() {
        navigate('/Home');
    };
    function handleClickCreate() {
        navigate('/Criar');
    };
    function handleClickPerfil() {
        navigate('/Perfil');
    };
    function handleClickPesquisa() {
        navigate('/Usuarios');
    };
    function handleClick(e,usuario) {
        e.stopPropagation();
        props.setUsuarioSelecionado(usuario);
        navigate('/PerfilPesquisa');
    };

    return (
        <>
            <div className="FundoPesquisa">
                <h1 className="pesquisaEncontre">Encontre outras <span className="spanTexto">pessoas</span></h1>
                <div className="fundoMenor">
                    <input type="text" className="inputPesquisa" placeholder="Busque usuários aqui!" value={busca} onChange={(e) => setBusca(e.target.value)} />
                    <div className="bordaPesquisa">
                        <div className="fundoMenorPesquisa">
                            {Pesquisa.map((usuario, index) => {
                                return (
                                    <button className="pesquisaUsuario" onClick={(e) => handleClick(e, usuario)} key={index}>
                                        <div className="fundoUsuario">
                                            <img className="imgUsuario" src={usuario.foto} />
                                            <div className="descricaoUsuario">
                                                <h2 className="nomeUsuario">{usuario.nome}</h2>
                                            </div>
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="navbar">
                    <img className="imgCasa" src={casa} onClick={handleClickHome} />
                    <img className="imgCriar" src={criar} onClick={handleClickCreate} />
                    <img className="imgPesquisa" src={lupaColorida} onClick={handleClickPesquisa} />
                    <img className="imgPessoa" src={pessoa} onClick={handleClickPerfil} />
                </div>
            </div>
        </>
    );
}
export default Usuarios;