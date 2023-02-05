import { Navbar } from "../../components";
import { auth, provider } from "../../firebase";
import { signInWithPopup  } from "firebase/auth";
import { useUser } from "../../contexts/userContext";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const { setUser } = useUser();
    const navigate = useNavigate();

    const signUpHandler = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                setUser(result.user.email);
                localStorage.setItem("user", JSON.stringify({
                    email: result.user.email,
                    name: result.user.displayName,
                    photo: result.user.photoURL
                }));
                navigate(`/documents/${nanoid()}`);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const goToBoard = () => {
        const id = nanoid();
        navigate(`/documents/${id}`);
    };

    return (
        <div className="home-wrapper">
            <Navbar />
            <div className="main">
                <h1>Build your best ideas together, in Google Docs Clone</h1>
                <h2>Create and collaborate on online documents in real-time and from any device. </h2>
                <button onClick={goToBoard} className="btn btn-primary">Go to Docs</button>
                <div className="login-wrapper">
                    <p style={{ color: "var(--dark)", marginRight: "10px" }}>Don't have an account?</p>
                    <p className="anchor-button" onClick={signUpHandler}>Sign up for free</p>
                </div>
            </div>
        </div>
    );
}

export default Home;