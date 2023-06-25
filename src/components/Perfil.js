import { useContext } from "react";
import { AuthGoogleContext } from "../contexts/authGoogle";
import { useNavigate } from "react-router-dom";
import casa from "../imagens/Casa.png";
import criar from "../imagens/Criar.png";
import pessoaColorida from "../imagens/PessoaColorida.png";

const Perfil = () => {
    const { signOut } = useContext(AuthGoogleContext);
    const navigate = useNavigate();

    function handleClickHome() {
        navigate('/Home');
    };
    function handleClickCreate() {
        navigate('/Criar');
    };
    function handleClickPerfil() {
        navigate('/Perfil');
    };

    return (
        <>
            <div className="Fundo">
                <div className="navbar">
                    <img className="imgCasa" src={casa} onClick={handleClickHome} />
                    <img className="imgCriar" src={criar} onClick={handleClickCreate} />
                    <img className="imgPessoa" src={pessoaColorida} onClick={handleClickPerfil} />
                </div>
                <button onClick={() => signOut()}>sair</button>
            </div>
        </>
    );
}
export default Perfil;