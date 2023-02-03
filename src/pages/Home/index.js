import { Navbar } from "../../components";
import { auth, provider } from "../../firebase";
import { signInWithPopup  } from "firebase/auth";
import { useUser } from "../../contexts/userContext";

const Home = () => {

    const { user, setUser } = useUser();

    const signUpHandler = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                setUser(result.user.email);
                localStorage.setItem("user", result.user.email);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    console.log(user);

    return (
        <div className="home-wrapper">
            <Navbar />
            <div className="main">
                <h1>Build your best ideas together, in Google Docs Clone</h1>
                <h2>Create and collaborate on online documents in real-time and from any device. </h2>
                <button className="btn btn-primary">Go to Docs</button>
                <div className="login-wrapper">
                    <p style={{ color: "var(--dark)", marginRight: "10px" }}>Don't have an account?</p>
                    <p className="anchor-button" onClick={signUpHandler}>Sign up for free</p>
                </div>
            </div>
        </div>
    );
}

export default Home;