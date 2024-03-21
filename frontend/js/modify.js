// WebSocket 서버에 연결
var socket = new WebSocket("ws://localhost:9000");

// WebSocket 연결이 열렸을 때 실행되는 함수
socket.onopen = function (event) {
    console.log("WebSocket 연결 성공");
};

// WebSocket으로부터 메시지를 받았을 때 실행되는 함수 
socket.onmessage = function (event) {
    console.log("서버로부터 메시지 수신: " + event.data);
};

// WebSocket 연결이 닫혔을 때 실행되는 함수
socket.onclose = function (event) {
    console.log("WebSocket 연결 종료");
};


// 비밀번호 확인에서 비밀번호가 같은지 확인하는 기능
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
// 취소 버튼 클릭 시 swal창 띄우고 myPage로 이동
function cancle() {
    Swal.fire({
        icon: "question",
        title: "취소",
        text: "취소하시겠습니까?",
        showConfirmButton: true,// 확인 버튼 표시
        confirmButtonText: "myPage 이동"
    }).then((result) => {
        if (result.isConfirmed) {
            // 페이지 이동
            window.location.href = "myPage.html";
        }
    });
}

import { LoginSocket } from '../js/socket/loginSocket.js';

// 저장 버튼 클릭하면 어떻게 해야할까?
class Save {
    constructor(host, port) {
        this.socket = new LoginSocket(host, port, this.callback.bind(this));

        this.elements = {
            save_button: document.querySelector('#button > #save_btn'),
        };

        this.elements.save_button.addEventListener('click', () => {
            this.submitForm();
        });
    }
    submitForm(){
        // 폼을 제출할 때 실행될 함수
        const form = document.getElementById('modifyInForm');
        const formData = new FormData(form);
        // FormData를 JSON으로 변환
        formData.append('cmd', 'Modify');
        const jsonData = JSON.stringify(object.fromEntries(formData));

        console.log(jsonData);
        // WebSocket을 통해 서버로 데이터 전송
        this.socket.sendMessage(jsonData);
    }
    callback(data){
        const json = JSON.parse(data);

        console.log(json);
        const state = json['state'];
        var nickName = document.getElementById("nickName").value;
        var password = document.getElementById("password").value;
        var disclosure = document.getElementById('disclosure').checked;
        var non_disclosure = document.getElementById('non_disclosure').checked;
    
        // 닉네임이 null 이면 
        if (nickName.trim() === '') {
            Swal.fire({
                icon: "warning",
                title: "닉네임",
                text: "닉네임을 입력하세요",
                showConfirmButton: false,// 확인 버튼 표시
                timer: 1000
            })
        } else if (password.trim() === '') {
            Swal.fire({
                icon: "warning",
                title: "비밀번호",
                text: "비밀번호를 입력하세요",
                showConfirmButton: false,// 확인 버튼 표시
                timer: 1000
            })
        } else if (!disclosure && !non_disclosure) {
            Swal.fire({
                icon: "warning",
                title: "공개여부",
                text: "공개/비공개를 체크하세요",
                showConfirmButton: false,// 확인 버튼 표시
                timer: 1000
            })
        } else {
            Swal.fire({
                icon: "question",
                title: "저장",
                text: "저장하시겠습니까?",
                showConfirmButton: true// 확인 버튼 표시
            }).then((result) => {
                if (result.isConfirmed) {
    
                    //페이지 이동
                    window.location.href = "myPage.html";
                }
            });
        }


    }

}







// // 사용자가 입력한 정보를 JSON 형식으로 변환
// var userInfo = {
//     cmd: "User",
//     cmd2: "updateUser",
//     userId: sessionStorage.getItem('userId'),
//     nickName: nickName,
//     password: password,
//     isHidden: isHidden
// };

// // 서버로 사용자 정보 전송
// socket.send(JSON.stringify(userInfo));