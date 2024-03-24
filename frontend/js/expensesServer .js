import { Socket } from "./socket/socket.js";

// 서버로부터 받은 데이터를 처리할 콜백 함수 정의
class AllTotal {
    constructor(host,port) {
        this.socket = new Socket(host, port, this.callback.bind(this));
        this.today = new Date();
        this.nowYear = this.today.getFullYear();
        this.nowMonth = this.today.getMonth() + 1;
        this.nowDay = this.today.getDate();
        this.expendCon = document.querySelector("#expendCon");

    }

    totalHandler() {
        const cmd = {
            'cmd': "Expenses",
            'cmd2': "getTotalAmount",
            'userId': sessionStorage.getItem('userId'),
            'type': true,
            'expensesDate': `${this.nowYear}-${this.nowMonth}-${this.nowDay}`
        };
        const totalData = JSON.stringify(cmd);
        this.socket.sendMessage(totalData);
    }

    callback(data) {
        console.log('Received from server:',data);
        const json = JSON.parse(data);
        const totalExpenses = json.total;

        document.getElementById('expendCon').value = "Total : " + totalExpenses;
    }
}
function initialize() {
    const allTotal = new AllTotal('localhost', 9000);
    allTotal.totalHandler();
}
initialize();
