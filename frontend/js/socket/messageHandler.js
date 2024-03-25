import { Socket } from './socket.js';
import { Chat_log, Message } from '../chat_log.js';
import { ExpenseAdd, ExpensesBox, Calendar } from '../account.js';

function initialize() {
    const host = '192.168.0.73';
    const port1 = 8080;
    const port2 = 9000;

    const mainSocket = new Socket(host, port2, () => {});

    const chat_log = new Chat_log(host, port1);
    const expenseAdd = new ExpenseAdd(mainSocket);
    const expensesBox = new ExpensesBox(mainSocket, expenseAdd);
    const calendar = new Calendar(mainSocket, expensesBox);
    calendar.displayExpenseBox();

    function messageHandler(data) {
        const jsonData = JSON.parse(data);
        const cmd = jsonData['cmd'];

        if (cmd == 'insertExpenses') expenseAdd.insertHandler(jsonData);
        else if (cmd == 'deleteExpenses') expensesBox.deleteHandler(jsonData);
        else if (cmd == 'getExpensesList') expensesBox.listHandler(jsonData);
    }
    mainSocket.setCallback(messageHandler);
}

initialize();
