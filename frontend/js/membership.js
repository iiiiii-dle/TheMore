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
    //event.prevetnDefault(); // 기본 동작 중단

    var email = document.getElementById("email").value;
    var nickName = document.getElementById("nickName").value;

    compareData(email, nickName);

    var form = document.getElementById("registerForm");
    var formData = new FormData(form);
    // FormData를 JSON으로 변환

    var jsonData = JSON.stringify(Object.fromEntries(formData));

  

    //WebSocket을 통해 서버로 데이터 전송
    socket.send(jsonData);
}


// testData 생성해서 회원가입하는 정보와 비교하기 위함
const testData = {
    email : ["123@a.com"],
    nickName : ["min"],
}
// 회원 가입 시 회원이 입력한 정보와 testData 비교 함수
function compareData(email, nickName){
    // testData와 비교
    for(let i=0;i<testData.email.length; i++){
        if(testData.email[i] === email){
            // 입력한 이메일 testData에 존재하는 경우
            alert("존재하는 email입니다.");
            return false;   // 회원 가입 실패
        }
    }
    for(let i =0;i<testData.nickName.length; i++){
        if(testData.nickName[i] === nickName){
            // 입력한 닉네임이 testData에 존재하는 경우
            alert("존재하는 닉네임입니다.");
            return false;   // 회원 가입 실패
        }
    }
    // testData에 없는 경우
    alert("회원 가입 성공");
    return true;  // 회원 가입 성공
}

