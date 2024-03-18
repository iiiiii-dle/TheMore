const host = 'ws://localhost';
const port = 8080;

const socket = new WebSocket(`${host}:${port}`);

socket.onopen({});

class ChatSocket {
    constructor(host, port) {
        this.host = host;
        this.port = port;

        this.chatSocket = new WebSocket(`${host}:${port}`);

        this.chatSocket.op;
    }
}

function initailize(host, port) {
    const chatSocket = new ChatSocket(host, port);
}

initailize(host, port);
