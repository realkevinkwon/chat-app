import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatHome from './components/ChatHome';
import ChatPage from './components/ChatPage';

const { io } = require('socket.io-client');

const socket = io('http://localhost:8080');

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
