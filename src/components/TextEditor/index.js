import { useCallback, useEffect, useState } from 'react';
import Navbar from './Navbar';
import TOOLBAR_OPTIONS from './ToolbarOptions';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { useUser } from '../../contexts/userContext';

// Quill 
import Quill from 'quill';
import 'quill/dist/quill.snow.css';


const SAVE_INTERVAL_MS = 2000;
const SERVER_LINK = 'https://google-docs-clone-server-8cep.onrender.com/';

const TextEditor = () => {

    const { user } = useUser();
    const GOOGLE_IMAGE_LINK = "https://cdn.telanganatoday.com/wp-content/uploads/2022/04/Google-multisearch-tool-to-help-users-search-with-photos.jpg";
    
    const [socket, setSocket] = useState(null);
    const [quill, setQuill] = useState(null);
    const [ boardName, setBoardName ] = useState('Untitled Document');
    
    const { id: documentId } = useParams();

    useEffect(() => {

        if(socket == null || quill == null) return;
        socket.emit('get-document', documentId);

        socket.once('load-document', (document) => {
            quill.setContents(document);
            quill.enable();
        });

    }, [socket, quill, documentId]);
    
    useEffect(() => {
        const skt = io.connect(SERVER_LINK);
        setSocket(skt);
    }, []);

    useEffect(() => {
        if(socket == null || quill == null) return;
    
        const interval = setInterval(() => {
            socket.emit('save-document', quill.getContents());
        }, SAVE_INTERVAL_MS);
    
        return () => {
            clearInterval(interval);
        }
    }, [quill, socket]);

    const editorContainerRef = useCallback((wrapper) => {
        if (wrapper == null) return;

        wrapper.innerHTML = '';
        const editor = document.createElement('div');
        wrapper.append(editor);

        const ql = new Quill(editor, { theme: 'snow', modules: { toolbar: TOOLBAR_OPTIONS } });
        ql.disable();
        ql.setText('Loading...');
        setQuill(ql);
    }, []);

    useEffect(() => {

        if(socket == null || quill == null) return;

        quill.on('text-change', (delta, oldDelta, source) => {
            if(source !== 'user') return;
            socket.emit('send-changes', delta);
        });

    }, [socket, quill]);

    useEffect(() => {

        if(socket == null || quill == null) return;

        socket.on('receive-changes', (delta) => {
            quill.updateContents(delta);
        });

    }, [socket, quill]);

    if(user == null) return (
        <div className='main-container' style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "100vh",
            width: "100vw",
            backgroundColor: "var(--white)"
        }}>
            <img
                src={GOOGLE_IMAGE_LINK}
                style={{
                    width: "300px",
                }}
                alt="Google Logo"
            />
            <h1 style={{fontSize: "35px", fontFamily: "var(--poppins)", width: "80%", textAlign: "center"}}>Sorry but you are not LoggedIn to access the board</h1>
            <p style={{
                fontSize: "14px",
                fontFamily: "var(--poppins)",
                width: "80%",
                textAlign: "center",
                marginTop: "20px",
                color: "grey"
            }}>To access Google Docs Clone you need to login first. You can login from the <a style={{fontFamily: "var(--poppins)"}} href="/" >Home Page</a></p>
        </div>
    );

    return (
        <div className='main-container'>
            <Navbar boardName={boardName} setBoardName={setBoardName}/>
            <div id="editor-container" ref={editorContainerRef}>
            </div>
        </div>
    );
}

export default TextEditor;