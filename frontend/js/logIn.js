import { Socket } from './socket/Socket';

class LoginSocket {
    constructor(host, port) {
        this.socket = new LoginSocket(host, port, this.callback.bind(this));
    }

    submitForm(data) {
        // 폼을 제출할 때 실행될 함수
        const form = document.getElementById('logInForm');
        const formData = new FormData(form);
        // FormData를 JSON으로 변환

        const jsonData = JSON.stringify(Object.fromEntries(formData));

        //WebSocket을 통해 서버로 데이터 전송
        this.socket.sendMessage(jsonData);
    }

    callback(data) {
        const json = JSON.parse(data);

        const state = json['state'];

        if (!state) {
            // 로그인 실패
            Swal.fire({
                icon: "warning",
                title: "로그인 실패",
                text: "email과 비밀번호를 확인하세요",
                showConfirmButton: false,
                timer: 1000 // 확인 버튼 표시
            })
            
        } else {
            const userId = json['userId'];
            sessionStorage.setItem('userId', userId);
            // 메인 페이지 화면으로 이동
            Swal.fire({
                icon: "success",
                title: "로그인 성공",
                text: "환영합니다",
                showConfirmButton: true,
                timer: 1000 // 확인 버튼 표시
            }).then((result) => {
                if (result.isConfirmed) {// 확인 버튼 표시
                    // 페이지 이동
                    window.location.href = "account.html";
                }
            });
        }
    }
}

function initailize() {}
