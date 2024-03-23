import { Socket } from "../js/socket/socket.js";

// 서버로부터 받은 데이터를 처리할 콜백 함수 정의
function handletotalServer(data) {
    console.log('Received from server:', data);
    const json = JSON.parse(data);
    const totalExpenses = json.total;

    // 받은 지출 합계를 화면에 표시
    document.getElementById('expendCon').value = "Total Expenses: " + totalExpenses;
}

// Socket 클래스의 인스턴스 생성
const socket = new Socket('localhost', 9000, handletotalServer);

// 페이지 로드 시 getTotalAmount 명령 전송
document.addEventListener('DOMContentLoaded', () => {
    console.log('Connected to server');

    const cmd = {
        cmd: "Expenses",
        cmd2: "getTotalAmount",
        userId: 1,
        type: false,
        expensesDate: '2024-3-20'
    };
    socket.sendMessage(JSON.stringify(cmd));
});

// 소켓 연결 종료 시 로그 표시
socket.socket.addEventListener('close', () => {
    console.log('Disconnected from server');
});




///////////////////////////////////////////////////
// const socket = new WebSocket('ws://localhost:9000');

// socket.onopen = function () {
//     console.log('Connected to server');

//     // 서버에 getTotalAmount 명령 전송
//     const cmd = {
//         cmd: "Expenses",
//         cmd2: "getTotalAmount",
//         userId: 1,
//         // userId: sessionStorage.getItem('userId'),
//         type: false, // 수입형 지출형 2가지로
//         expensesDate: '2024-3-20' // json 형식으로 변경
//     };
//     socket.send(JSON.stringify(cmd));
// };

// socket.onmessage = function (event) {
//     console.log('Received from server: %s', event.data);
//     const json = JSON.parse(event.data);
//     const totalExpenses = json.total;

//     // 받은 지출 합계를 화면에 표시
//     document.getElementById('expendCon').value = "Total Expenses: " + totalExpenses;
// };

// socket.onclose = function () {
//     console.log('Disconnected from server');
// };
