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
        } else {
            const userId = json['userId'];
            sessionStorage.setItem('userId', userId);
            // 메인 페이지 화면으로 이동
        }
    }
}

function initailize() {}
