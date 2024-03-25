import { LoginSocket } from '../js/socket/loginSocket.js';

class Login {
    constructor(host, port) {
        this.socket = new LoginSocket(host, port, this.callback.bind(this));

        this.elements = {
            login_button: document.querySelector('#button > input'),
        };

        this.elements.login_button.addEventListener('click', () => {
            this.submitForm();
        });
    }

    submitForm() {
        const form = document.getElementById('logInForm');
        const formData = new FormData(form);
        
        formData.append('cmd', 'User');
        formData.append('cmd2', 'Login');
        const jsonData = JSON.stringify(Object.fromEntries(formData));

        this.socket.sendMessage(jsonData);
    }

    callback(data) {
        const json = JSON.parse(data);

        const state = json['state'];

        if (!state) {
            Swal.fire({
                icon: 'warning',
                title: '로그인 실패',
                text: 'email과 비밀번호를 확인하세요',
                showConfirmButton: false,
                timer: 1000,
            });
        } else {
            const userId = json['userId'];
            const nickName = json['nickName'];
            sessionStorage.setItem('userId', userId); 
            sessionStorage.setItem('nickName', nickName); 
            // 메인 페이지 화면으로 이동
            Swal.fire({
                icon: 'success',
                title: '로그인 성공',
                text: '환영합니다',
                showConfirmButton: true,
                
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = 'account.html';
                }
            });
        }
    }
}

function initailize() {
    const login = new Login('localhost', 9000);
}

initailize();
