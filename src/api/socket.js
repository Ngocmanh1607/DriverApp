import {io} from 'socket.io-client';

// const socket = io('https://lh30mlhb-3000.asse.devtunnels.ms', {
//     autoConnect: false,
// });
const socket = io('http://192.168.55.45:3000', {
  autoConnect: false,
});
export default socket;
