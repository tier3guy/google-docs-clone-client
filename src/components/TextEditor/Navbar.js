/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useUser } from "../../contexts/userContext";

const DropDown = ({show, setShow}) => {

    const { setUser } = useUser();
    const handler = () => setShow(false);

    useEffect(() => {
        const scrollHandler = window.addEventListener("scroll", handler);
        return scrollHandler;
    }, []);

    const logoutHandler = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <div className="dropdown" style={{display: show ? "block" : "none"}}>
            <div className="profile">
                <img 
                    src={JSON.parse(localStorage.getItem("user")).photo} 
                    alt="user-img" 
                    referrerpolicy="no-referrer"
                    style={{
                        width : "60px",
                        height: "60px",
                        borderRadius: "50%",
                        marginRight: "10px",
                        objeftFit: "cover",
                    }}
                />
                <div className="details">
                    <p>{JSON.parse(localStorage.getItem("user")).name}</p>
                    <p style={{color: "grey", fontSize: "14px"}}>{JSON.parse(localStorage.getItem("user")).email}</p>
                </div>
            </div>

            <div
                style={{
                    position: "absolute",
                    bottom: "0px",
                    left: "0px",
                    width: "100%",
                }}
            >
                <div onClick={logoutHandler} style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    padding: "15px 30px",
                    cursor: "pointer",
                    color: "grey"
                }}>
                    <i style={{marginRight: "15px"}} className="fa-solid fa-arrow-right-from-bracket"></i>
                    Sign out of all accounts
                </div>
                <p
                    style={{ 
                        textAlign: "center",
                        padding: "10px 0px",
                        borderTop: "1px solid lightgrey",
                        width: "100%",
                        fontSize: "12px",
                        color: "grey",
                    }}>Privacy Policy | Terms of Service</p>
            </div>
        </div>
    );
}

const Navbar = ({boardName, setBoardName}) => {

    const photo = JSON.parse(localStorage.getItem("user")).photo;
    const width = "40px";

    const [show, setShow] = useState(false);

    return (
        <div className="editor-navbar">
            <DropDown show={show} setShow={setShow} />
            <div className="editor-navbar-left-alignment">
                <input value={boardName} onChange={(e) => setBoardName(e.target.value)} />
                <div className="options">
                    <p>File</p>
                    <p>Edit</p>
                    <p>Help</p>
                    <p className="last-edited">Last edit was a few seconds ago</p>
                </div>
            </div>
            <div className="editor-navbar-right-alignment">
                <button className="btn btn-primary" style={{ marginRight: "10px", height: "40px", width: "fit-content", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <i className="fa-solid fa-lock" style={{color: "white"}}></i>
                    <p style={{ fontSize: "0.8em", color: "white", padding: "0px 10px" }}>Share</p>
                </button>
                <img  
                    style={{width, height: width, cursor: "pointer"}} 
                    src={photo} 
                    alt="user-img" 
                    referrerpolicy="no-referrer"
                    onClick={() => setShow(!show)}
                />
            </div>
        </div>
    );
}

export default Navbar;
