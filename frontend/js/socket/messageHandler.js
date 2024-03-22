import { ExpenseAdd } from '../account.js';
import { Chat_log, Message } from '../chat_log.js';
import { Socket } from "../js/socket/socket.js";

// 실시간 Socket event 처리 파일

function initialize() {
    const host = 'localhost';
    const port1 = 8080;
    const port2 = 9000;

    const chat_log = new Chat_log(host, port1);
    const expenseAdd = new ExpenseAdd(socket);
    const socket = new Socket(host, port2);
}

// 메시지 핸들러 함수. 메시지를 받아오는 것
function messageHandler(data) {
    const jsonData = JSON.parse(data);

    switch (jsonData['cmd']) {
        case 'chatMessage':
            chat_log.messageReceive(jsonData);
            break;
        case 'insertExpenses':
            this.expenseAdd.resultHandler(jsonData);
        // case 'deleteExpenses':
        //     this.expenseAdd.resultHandler(jsonData);
        // case 'updateExpenses':
        //     this.expenseAdd.resultHandler(jsonData);
        // case 'getExpensesList':
        //     this.expenseAdd.resultHandler(jsonData);
        // default:
        //     break;
    }
}

initialize();
