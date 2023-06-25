import { useNavigate } from "react-router-dom";
import casaColorida from "../imagens/CasaColorida.png";
import criar from "../imagens/Criar.png";
import pessoa from "../imagens/Pessoa.png";

const Home = () =>{
    const navigate = useNavigate();

    function handleClick(){
        navigate('/Descricao');
    };
    function handleClickHome(){
        navigate('/Home');
    };
    function handleClickCreate(){
        navigate('/Criar');
    };
    function handleClickPerfil(){
        navigate('/Perfil');
    };

    return(
        <>
            <div className="Fundo">
                <h1 className="homeNome">Mateus Otto</h1>
                <h3 className="HomePreparamos"><span className="spanTexto">Veja</span> o que <span className="spanTexto">preparamos</span> para <span className="spanTexto">você</span></h3>
                <div className="bordaHome">
                    <div className="fundoMenorHome">
                        <h2 className="todosPostsHome">Todos os <span className="spanTexto">Posts</span></h2>
                        <button className="post" onClick={handleClick}>
                            <h1 className="nomeJogo">Vôlei</h1>
                            <h3 className="dataJogo">17/07/2023 - 15:30</h3>
                            <h3 className="criadorJogo">Criado por: Mateus Otto</h3>
                        </button>
                        <button className="post" onClick={handleClick}>
                            <h1 className="nomeJogo">Basquete</h1>
                            <h3 className="dataJogo">20/07/2023 - 14:30</h3>
                            <h3 className="criadorJogo">Criado por: Mateus Otto</h3>
                        </button>
                        <button className="post" onClick={handleClick}>
                            <h1 className="nomeJogo">Valorant</h1>
                            <h3 className="dataJogo">10/07/2023 - 20:30</h3>
                            <h3 className="criadorJogo">Criado por: Mateus Otto</h3>
                        </button>                      
                    </div>
                </div>
                <div className="navbar">
                    <img className="imgCasa" src={casaColorida} onClick={handleClickHome}/>
                    <img className="imgCriar" src={criar} onClick={handleClickCreate}/>
                    <img className="imgPessoa" src={pessoa} onClick={handleClickPerfil}/>
                </div>
            </div>    
        </>
    );
}
export default Home;