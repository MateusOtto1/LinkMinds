import { useContext } from "react";
import { AuthGoogleContext } from "../contexts/authGoogle";
import { useNavigate } from "react-router-dom";
import casa from "../imagens/Casa.png";
import criar from "../imagens/Criar.png";
import pessoaColorida from "../imagens/PessoaColorida.png";

const Perfil = () => {
    const { signOut } = useContext(AuthGoogleContext);
    const navigate = useNavigate();

    function handleClick(){
        navigate('/Descricao');
    };
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
                <h1 className="homeNome"><span className="spanTexto">Seu </span>perfil</h1>
            <div className="bordaHome">
                    <div className="fundoMenorHome">
                        <h2 className="todosPostsHome">Todos seus <span className="spanTexto">Posts</span></h2>
                        <button className="post" onClick={handleClick}>
                            <h1 className="nomeJogo">Vôlei</h1>
                            <h3 className="dataJogo">17/07/2023 - 15:30</h3>
                            <h3 className="criadorJogo">Criado por: Mateus</h3>
                        </button>
                        <button className="post" onClick={handleClick}>
                            <h1 className="nomeJogo">Basquete</h1>
                            <h3 className="dataJogo">20/07/2023 - 14:30</h3>
                            <h3 className="criadorJogo">Criado por: Mateus</h3>
                        </button>
                        <button className="post" onClick={handleClick}>
                            <h1 className="nomeJogo">Valorant</h1>
                            <h3 className="dataJogo">10/07/2023 - 20:30</h3>
                            <h3 className="criadorJogo">Criado por: Mateus</h3>
                        </button>                      
                    </div>
                </div>
                {/* <button onClick={() => signOut()}>sair</button> */}
                <div className="navbar">
                    <img className="imgCasa" src={casa} onClick={handleClickHome} />
                    <img className="imgCriar" src={criar} onClick={handleClickCreate} />
                    <img className="imgPessoa" src={pessoaColorida} onClick={handleClickPerfil} />
                </div>
            </div>
        </>
    );
}
export default Perfil;