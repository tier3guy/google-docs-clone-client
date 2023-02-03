import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import UserProvider from './contexts/userContext';

ReactDOM.createRoot(document.getElementById('root')).render(
    <UserProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </UserProvider>
);
