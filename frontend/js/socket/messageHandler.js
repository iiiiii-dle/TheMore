import { ChatSocket, ChatSocket } from './chatSocket.js';
import { Chat_log, Message } from '../chat_log.js';

// 실시간 Socket event 처리 파일

function initialize() {
    const host = 'ws://localhost';
    const port = 8080;

    const chatSocket = new ChatSocket(host, port);
    const chat_log = new Chat_log();
}

initialize();
