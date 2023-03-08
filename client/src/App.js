import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatHome from './components/ChatHome';
import ChatPage from './components/ChatPage';

const { io } = require('socket.io-client');

const SERVER_PORT = 8080;
const socket = io(`http://localhost:${SERVER_PORT}`);

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<ChatHome socket={socket} />}></Route>
          <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
