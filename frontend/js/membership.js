var socket = new WebSocket("ws://localhost:9000");

// WebSocket이 열렸을 때 실행될 함수
socket.onopen = function(event) {
    console.log("WebSocket 연결 성공");
};

// WebSocket으로부터 메시지를 받았을 때 실행될 함수
socket.onmessage = function(event){
    console.log("서버로부터 메시지 수신: " + event.data);
    // 받은 메시지 처리 코드 추가
};

// 폼을 제출할 때 실행될 함수
function submitForm(event){
    event.prevetnDefault(); // 기본 동작 중단

    var form = document.getElementById("registerForm");
    var formData = new FormData(form);
    // FormData를 JSON으로 변환

    var jsonData = JSON.stringify(Object.fromEntries(formData));

    //WebSocket을 통해 서버로 데이터 전송
    socket.send(jsonData);
}