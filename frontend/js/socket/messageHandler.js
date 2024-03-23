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
    const chat_log = new Chat_log(host, port1);
    const expenseAdd = new ExpenseAdd(mainSocket);
    const expensesBox = new ExpensesBox(mainSocket, expenseAdd);
    const calendar = new Calendar(mainSocket, expensesBox);
    calendar.displayExpenseBox();

    // 서버에서 받은 데이터 Controller
    function messageHandler(data) {
        console.log('test2');
        const jsonData = JSON.parse(data);
        const cmd = jsonData['cmd'];

        if (cmd == 'insertExpenses') expenseAdd.insertHandler(jsonData);
        // else if (cmd = 'deleteExpenses')
        //     expenseAdd.deleteHandler(jsonData);
        // else if (cmd = 'updateExpenses')
        //     expenseAdd.updateHandler(jsonData);
        else if ((cmd = 'getExpensesList')) {
            expensesBox.listHandler(jsonData);
        }
    }
    mainSocket.setCallback(messageHandler);
}

initialize();
