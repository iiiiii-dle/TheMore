// WebSocket 서버에 연결
var socket = new WebSocket("ws://localhost:9000");

// WebSocket 연결이 열렸을 때 실행되는 함수
socket.onopen = function(event){
    console.log("WebSocket 연결 성공");
};

// WebSocket으로부터 메시지를 받았을 때 실행되는 함수 
socket.onmessage = function(event){
    console.log("서버로부터 메시지 수신: " + event.data);
};

// WebSocket 연결이 닫혔을 때 실행되는 함수
socket.onclose = function(event){
    console.log("WebSocket 연결 종료");
};

// 수정 버튼 클릭 시 실행되는 함수
function submitForm(){
    var email = document.getElementById("email").value;
    var nickName = document.getElementById("nickName").value;
    var password = document.getElementById("password").value;
    var isPublic = document.querySelector('input[name="public"]:checked').value;

    // 사용자가 입력한 정보를 JSON 형식으로 변환
    var userInfo = {
        email: email,
        nickName: nickName,
        password: password,
        isPublic: isPublic
    };

    // 서버로 사용자 정보 전송
    socket.send(JSON.stringify(userInfo));
}