//Websocket 서버에 연결
var socket = new WebSocket("ws://localhost:9000");

// WebSocket 연결이 열렸을 때 실행되는 함수
socket.onopen = function(event){
    console.log("WebSocket 연결 성공");
    // 서버로 사용자 정보 요청 메시지 전송
    socket.send("getUserInfo");
};

// WebSocket으로부터 메시지를 받았을 때 실행되는 함수
socket.onmessage = function(event){
    console.log("서버로부터 메시지 수신: " + event.data);
    var userInfo = JSON.parse(event.data);//받은 JSON 데이터 파싱
    // 사용자 정보를 화면에 표시
    document.getElementById("email").value = userInfo.email;
    document.getElementById("nickName").value = userInfo.nickName;
    document.getElementById("joinDate").value = userInfo.joinDate;
    // isHidden 값에 따라 공개/비공개 라디오 버튼 선택
    if(userInfo.isHidden){
        document.getElementById("disclosure").checked = true;
    }else{
        document.getElementById("non_disclosure").checked = true;
    }
};

// WebSocket 연결이 닫혔을 때 실행되는 함수
socket.onclose = function(event){
    console.log("WebSocket 연결 종료");
};