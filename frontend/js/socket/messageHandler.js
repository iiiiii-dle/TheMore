import { Socket } from './socket.js';
// import { ExpenseAdd } from '../account.js';
import { Chat_log, Message } from '../chat_log.js';
import { ExpenseAdd, ExpensesBox, Calendar } from '../account.js';

// 실시간 Socket event 처리 파일

function initialize() {
    const host = 'localhost';
    const port1 = 8080;
    const port2 = 9000;

    // const chat_log = new Chat_log(host, port1);

    // 소켓 선언
    const mainSocket = new Socket(host, port2, () => {
        console.log('set1');
    });

    // 각종 기능 선언
    const expenseAdd = new ExpenseAdd(mainSocket);
    const expensesBox = new ExpensesBox(mainSocket, expenseAdd);
    const calendar = new Calendar(mainSocket, expensesBox);
    calendar.displayExpenseBox();

    // 서버에서 받은 데이터 Controller
    function messageHandler(data) {
        console.log('test2');
        const jsonData = JSON.parse(data);
        const cmd = jsonData['cmd'];
        if (cmd == 'insertExpenses') 
            expenseAdd.insertHandler(jsonData);
        else if ((cmd = 'getExpensesList')) {
            expenseAdd.listHandler(jsonData);
        }
    }
    mainSocket.setCallback(messageHandler);

}

// 메시지 핸들러 함수. 메시지를 받아오는 것
// function messageHandler(data) {
//     const jsonData = JSON.parse(data);

//     switch (jsonData['cmd']) {             
//         // case 'deleteExpenses':
//         //     this.expenseAdd.resultHandler(jsonData);
//         // case 'updateExpenses':
//         //     this.expenseAdd.resultHandler(jsonData);
//     }
// }

initialize();
