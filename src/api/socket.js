import { io } from "socket.io-client";

const socket = io('https://lh30mlhb-3000.asse.devtunnels.ms', {
    autoConnect: false,
});

export default socket;