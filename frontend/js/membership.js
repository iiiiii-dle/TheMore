
import { LoginSocket } from "./socket/loginSocket.js";

class membership {
    constructor(host, port) {
        this.socket = new LoginSocket(host, port, this.callback.bind(this));

        this.elements = {
            save_button: document.querySelector('#button > #membership')
        };

        this.elements.save_button.addEventListener('click', () => {
            this.submitForm();
        });

        document.getElementById("membership").addEventListener("click", this.membership);
        document.getElementById("checkPassword").addEventListener("input", this.checkPasswordMatch);
        document.getElementById("disclosure").addEventListener("click", (event) =>{
            if(event.target.value === "true"){
                event.target.value = "false"
            }else{
                event.target.value = "true";
            }
            
        })
    }
    
    submitForm() {
        const form = document.getElementById('membershipInForm')
        const formData = {
            cmd: "User",
            cmd2: "membership",
            nickName: form.querySelector('#nickName').value,
            password: form.querySelector('#password').value,
            email: form.querySelector('#email').value,
            isHidden: form.querySelector('#disclosure').value ==="false" ? false : true,
        }

        const jsonData = JSON.stringify(formData);

        this.socket.sendMessage(jsonData);

    }
    callback(data) {
        const json = JSON.parse(data);

        const state = json['state'];

        if(state){
            Swal.fire({
                icon: "success",
                title: "회원 가입",
                text: "회원 가입하시겠습니까?",
                showConfirmButton: true,
                confirmButtonText: "홈페이지 이동"
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "index.html";
                }
            });
        } else{
            Swal.fire({
                icon: "question",
                title: "실패",
                text: "값을 확인해주세요",
                showConfirmButton: false,
                timer: 1000
            })
        }
    }

    checkPasswordMatch() {

        // 비밀번호 확인(input) 필드의 값이 변경될 때마다 비밀번호 일치 여부 확인
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("checkPassword").value;
        const warn = document.getElementById("pwConfirm");

        if (password !== confirmPassword) {
            warn.textContent = "비밀번호가 일치하지 않습니다.";
            warn.style.color = "red";
        } else {
            warn.textContent = "비밀번호가 일치합니다.";
            warn.style.color = "green";
        }
    }
}

function initailize() {
    const member = new membership("localhost", 9000);
} 

initailize();
