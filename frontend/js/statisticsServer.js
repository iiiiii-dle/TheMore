// 웹소켓 서버에 연결
var socket = new WebSocket("ws://127.0.0.1:9000");

// WebSocket 연결이 열렸을 때 실행되는 함수
socket.onopen = function(event) {
    console.log("WebSocket 연결 성공");
    // 서버로 사용자 정보 요청 메시지 전송
    socket.send("getUserInfo");
};

class UserStatProcessor {
    constructor() {
        this.expenditures = [];
    }

    processEvent(event) {
        console.log("서버로부터 메시지 수신: " + event.data);
        var userStatInfo = JSON.parse(event.data); // 받은 JSON 데이터 파싱
        var expenditure = userStatInfo.money; // 지출 정보
        var type = userStatInfo.type; // 수입/지출 유형

        // 'type'이 0인 경우에만 지출 정보를 배열에 추가하여 합산
        if (type === 0) {
            this.expenditures.push(expenditure); // 배열에 지출 정보 추가

            // 배열에 있는 지출 정보를 반복하여 합산
            var totalExpenditure = this.expenditures.reduce(function(total, amount) {
                return total + amount;
            }, 0);

            // 지출의 합을 화면에 출력
            document.getElementById("expendCon").innerText = "Total Expenditure: " + totalExpenditure;
        }
        
    }
};



// WebSocket 연결이 닫혔을 때 실행되는 함수
socket.onclose = function(event) {
    console.log("WebSocket 연결 종료");
};