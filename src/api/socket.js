import {io} from 'socket.io-client';

// const socket = io('https://lh30mlhb-3000.asse.devtunnels.ms', {
//     autoConnect: false,
// });
// const socket = io('http://192.168.55.45:3000', {
//   autoConnect: false,
// });
const socket = io('http://localhost:3000', {
  autoConnect: false,
});
// const socket = io('https://sbr09801-3000.asse.devtunnels.ms', {
//   autoConnect: false,
// });
export default socket;
