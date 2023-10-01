import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthGoogleContext } from "../contexts/authGoogle";
import logo from "../imagens/logo.svg";
import "../css/style.css";

const Entrar = () => {
    const { signInGoogle, signed } = useContext(AuthGoogleContext);
    async function handleLoginFromGoogle() {
        await signInGoogle();
    }
   
    if (!signed) {
        return (
            <>
                <div>
                    <div id="wrapper-login">
                        <img src={logo} alt="" id="logo-login"/>
                            <div id="container-login">
                                <a id="logar" onClick = { handleLoginFromGoogle }>Entrar</a>
                            </div>
                    </div>
                </div>
            </>
        );
    }
    else {
        return <Navigate to="/LinkMinds" />;
    }
}
export default Entrar;