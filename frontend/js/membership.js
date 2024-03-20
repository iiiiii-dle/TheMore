
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
    // 비동기적으로 compareData 함수 호출
    compareData(email, nickName).then(function(result){
        if(result){
            var form = document.getElementById("registerForm");
            var formData = new FormData(form);
            // FormData를 JSON으로 변환
            var jsonData = JSON.stringify(Object.fromEntries(formData));
            //WebSocket을 통해 서버로 데이터 전송
            socket.send(jsonData);
        }
    });
}
// testData 생성해서 회원가입하는 정보와 비교하기 위함
const testData = {
    email : ["123@a.com"],
    nickName : ["min"],
}
// 회원 가입 시 회원이 입력한 정보와 testData 비교 함수
function compareData(email, nickName){
    return new Promise(function(resolve, reject) {
        if(testData.email.includes(email)){
            showSwal1("회원가입 실패", "email을 확인하세요", "warning").then(function() {
                resolve(false); // 회원 가입 실패
            });
        } else if(testData.nickName.includes(nickName)){
            showSwal2("회원가입 실패", "닉네임을 확인하세요", "warning").then(function() {
                resolve(false); // 회원 가입 실패
            });
        } else {
            showSwal3("회원가입 성공", "환영합니다!", "success").then(function() {
                resolve(true); // 회원 가입 성공
            });
        }
    });
}

function showSwal1(title, text, icon){
    Swal.fire({
        icon: "warning",
        title: title,
        text: text,
        showConfirmButton: true,

    });
}
function showSwal2(title, text, icon){
    Swal.fire({
        icon: "warning",
        title: title,
        text: text,
        showConfirmButton: true,

    });
}
function showSwal3(title, text, icon){
    Swal.fire({
        icon: "success",
        title: title,
        text: text,
        showConfirmButton: true,

    });
}
