const Logo = () => {
    return (
        <div className="logo" style={{width: "fit-content"}}>
            <h1><span>Google</span> Docs Clone</h1>
        </div>
    );
};

const Navbar = () => {
    return (
        <nav>
            <Logo/>
        </nav>
    );
}

export default Navbar;