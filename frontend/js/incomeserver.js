const socket = new WebSocket('ws://localhost:9000');

ws.on('open', function open() {
    console.log('Connected to server');

    // 서버에 getTotalAmount 명령 전송
    const cmd = {
        cmd: "getTotalAmount",
        userId: 1,
        type: 0,
        month: 3,
        year: 2024
    };
    ws.send(JSON.stringify(cmd));
});

ws.on('message', function incoming(message) {
    console.log('Received from server: %s', message);
    const json = JSON.parse(message);
    const totalExpenses = json.total;

    // 받은 지출 합계를 화면에 표시
    document.getElementById('expendCon').value = "Total Expenses: " + totalExpenses;
});

ws.on('close', function close() {
    console.log('Disconnected from server');
});
