import { io } from 'socket.io-client';

const socket = io('http://localhost:3000/socket.io'); // Adjust URL if needed

export default socket;
