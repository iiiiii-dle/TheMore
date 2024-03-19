import { ChatSocket } from './chatSocket.js';
import { Chat_log, Message } from '../chat_log.js';

// 실시간 Socket event 처리 파일

function initialize() {
    const host = 'ws://localhost';
    const port = 8080;

    const chat_log = new Chat_log();
    const chatSocket = new ChatSocket(host, port);
}

// 메시지 핸들러 함수
function messageHandler(data) {
    const jsonData = JSON.parse(data);

    switch (jsonData['cmd']) {
        case 'chatMessage':
            chat_log.messageReceive(jsonData);
            break;
        default:
            break;
    }
}

initialize();
