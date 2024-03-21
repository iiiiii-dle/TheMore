const socket = new WebSocket('ws://localhost:9000');

socket.onopen = function() {
    console.log('Connected to server');

    // 서버에 getTotalAmount 명령 전송
    const cmd = {
        cmd: "Expenses",
        cmd2: "getTotalAmount",
        userId: 1,
        type: false,
        expensesDate: 2024-MM-DD,
        expensesDate: YYYY-3-DD,
    };
    socket.send(JSON.stringify(cmd));
};

socket.onmessage = function(event) {
    console.log('Received from server: %s', event.data);
    const json = JSON.parse(event.data);
    const totalExpenses = json.total;

    // 받은 지출 합계를 화면에 표시
    document.getElementById('expendCon').value = "Total Expenses: " + totalExpenses;
};

socket.onclose = function() {
    console.log('Disconnected from server');
};
