import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthGoogleContext } from "../contexts/authGoogle";

const Entrar = () =>{
    const { signInGoogle, signed } = useContext(AuthGoogleContext);
    async function handleLoginFromGoogle() {
        await signInGoogle();
    }
    if (!signed) {
        return(  
            <>
                <div className="Fundo">
                    <h1 className="tituloEntrar"><span className="spanTitulo">Link</span>Minds</h1>
                    <h3 className="textoInfo">"Esse é um <span className="spanTexto">aplicativo</span> feito com o intuito de melhorar a <span className="spanTexto">vida social</span> de <span className="spanTexto">pessoas</span> de uma maneira mais <span className="spanTexto">eficiente</span>"</h3>
                    <div className="bordaEntrar"> 
                        <div className="fundoMenorEntrar">
                            <h3 className="educar"><span className="spanTexto">Entre</span> através de sua conta do <span className="spanTexto">Google</span></h3>
                            <button className="Google" onClick={handleLoginFromGoogle}><span className="spanTexto">Logar</span> com Google</button>
                        </div>
                    </div>
                </div>
            </>
        );
    } 
    else {
        return <Navigate to="/Bio" />;
    }
}
export default Entrar;