import { useCallback, useEffect, useState } from 'react';
import TOOLBAR_OPTIONS from './ToolbarOptions';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';

// Quill 
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const SAVE_INTERVAL_MS = 2000;

const TextEditor = () => {

    const [socket, setSocket] = useState(null);
    const [quill, setQuill] = useState(null);
    
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
        const skt = io.connect('http://localhost:4000');
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

    return (
        <div id="editor-container" ref={editorContainerRef}>
        </div>
    );
}

export default TextEditor;