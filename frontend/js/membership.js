
var socket = new WebSocket("ws://localhost:9000");

// WebSocket이 열렸을 때 실행될 함수
socket.onopen = function (event) {
    console.log("WebSocket 연결 성공");
};

// WebSocket으로부터 메시지를 받았을 때 실행될 함수
socket.onmessage = function (event) {
    console.log("서버로부터 메시지 수신: " + event.data);
    // 받은 메시지 처리 코드 추가
};


// 폼을 제출할 때 실행될 함수
function submitForm() {
        //e.prevetnDefault(); // 기본 동작 중단
        var form = document.getElementById("registerForm");
        var formData = new FormData(form);
        // FormData를 JSON으로 변환
        var jsonData = JSON.stringify(Object.fromEntries(formData));
        //WebSocket을 통해 서버로 데이터 전송
        socket.send(jsonData);

}

// testData 생성해서 회원가입하는 정보와 비교하기 위함
const testData = {
    email: ["123@a.com"],
    nickName: ["min"],
}

// 회원 가입 시 회원이 입력한 정보와 testData 비교 함수
function checkDuplicate(field) {
    var value = document.getElementById(field).value;
    if (value.trim() === "") {
        Swal.fire({
            icon: "error",
            title: "입력 오류",
            text: field === "email" ? "email을 입력하세요" : "닉네임을 입력하세요",
            showConfirmButton: false,
            timer: 1000
        });
        return;
    }

    // 서버에서 중복 확인 로직 수행
    // 예시로 alert를 사용하여 결과 보여주기
    if (field === "email") {
        if (testData.email.includes(value)) {
            Swal.fire({
                icon: "warning",
                title: "중복 확인",
                text: "이미 사용 중인 email입니다.",
                showConfirmButton: false,
                timer: 1000
            });
        } else {
            Swal.fire({
                icon: "success",
                title: "중복 확인",
                text: "사용 가능한 email입니다.",
                showConfirmButton: false,
                timer: 1000
            });
        }
    } else if (field === "nickName") {
        if (testData.nickName.includes(value)) {
            Swal.fire({
                icon: "warning",
                title: "중복 확인",
                text: "이미 사용 중인 닉네임입니다.",
                showConfirmButton: false,
                timer: 1000
            });
        } else {
            Swal.fire({
                icon: "success",
                title: "중복 확인",
                text: "사용 가능한 닉네임입니다.",
                showConfirmButton: false,
                timer: 1000
            });
        }
    }
}
function login(){
    var emailValue = document.getElementById('email').value;
    var nickNameValue = document.getElementById('nickName').value;

    // 이메일 중복 확인
    if (testData.email.includes(emailValue)) {
        Swal.fire({
            icon: "warning",
            title: "중복 확인",
            text: "이미 사용 중인 email입니다.",
            showConfirmButton: false,
            timer: 1000
        });
    } else if (testData.nickName.includes(nickNameValue)) { // 닉네임 중복 확인
        Swal.fire({
            icon: "warning",
            title: "중복 확인",
            text: "이미 사용 중인 닉네임입니다.",
            showConfirmButton: false,
            timer: 1000
        });
    } else { // 이메일과 닉네임 중복이 아닌 경우 회원가입 성공
        Swal.fire({
            icon: "success",
            title: "회원가입 성공",
            text: "환영합니다",
            showConfirmButton: true,
            timer: 10000 // 확인 버튼 표시
        }).then((result) => {
            if (result.isConfirmed) {// 확인 버튼 표시
                // 페이지 이동
                window.location.href = "index.html";
            }
        });
    }
}

