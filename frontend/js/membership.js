
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
    var passValue = document.getElementById('password').value;
    var disclosure = document.getElementById('disclosure').checked;
    var non_disclosure = document.getElementById('non_disclosure').checked;

    // 이메일 값 확인
    if (emailValue.trim() === '') {
        Swal.fire({
            icon: "warning",
            title: "email 확인",
            text: "email을 입력하세요",
            showConfirmButton: false,
            timer: 1000
        });
    } else if (nickNameValue.trim() === '') { // 닉네임 값 확인
        Swal.fire({
            icon: "warning",
            title: "닉네임 확인",
            text: "닉네임을 입력하세요",
            showConfirmButton: false,
            timer: 1000
        });
    } else if(passValue.trim() === ''){ // password 값 확인
        Swal.fire({
            icon: "warning",
            title: "비밀번호 확인",
            text: "비밀번호를 입력하세요",
            showConfirmButton: false,
            timer: 1000
        });
    } else if(!disclosure && !non_disclosure){
        Swal.fire({
            icon: "warning",
            title: "내 정보 확인",
            text: "공개, 비공개를 체크하세요",
            showConfirmButton: false,
            timer: 1000
        });
    } else { // 이메일과 닉네임, password가 null이 아닌 경우 회원가입 성공
        Swal.fire({
            icon: "success",
            title: "회원가입 성공",
            text: "환영합니다",
            showConfirmButton: true,// 확인 버튼 표시
        }).then((result) => {
            if (result.isConfirmed) {
                // 페이지 이동
                window.location.href = "index.html";
            }
        });
    }
}




function checkPasswordMatch() {

    // 비밀번호 확인(input) 필드의 값이 변경될 때마다 비밀번호 일치 여부 확인
document.getElementById("checkPassword").addEventListener("input", checkPasswordMatch);
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("checkPassword").value;
    const warn = document.getElementById("pwConfirm");
    console.log(password);
    console.log(confirmPassword);
    console.log(warn);
    

    if (password !== confirmPassword) {
        // 비밀번호와 확인 비밀번호가 일치하지 않을 때 경고 메시지 표시
        warn.textContent = "비밀번호가 일치하지 않습니다.";
        warn.style.color = "red"; // 일치하지 않을 때 텍스트 색상을 빨간색으로 변경
    } else {
        // 비밀번호와 확인 비밀번호가 일치할 때는 경고 메시지 표시
        warn.textContent = "비밀번호가 일치합니다.";
        warn.style.color = "green"; // 일치할 때 텍스트 색상을 초록색으로 변경
    }
}


