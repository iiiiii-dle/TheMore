import { LoginSocket } from "./socket/loginSocket.js";

class Save {
    constructor(host, port) {
        this.socket = new LoginSocket(host, port, this.callback.bind(this));

        this.elements = {
            save_button: document.querySelector('#button > #save_btn'),
        };

        this.elements.save_button.addEventListener('click', () => {
            this.submitForm();
        });
        this.socket.socket.addEventListener("open", () => {
            this.sendForm();
        });

        // 비밀번호 확인(input) 필드의 값이 변경될 때마다 비밀번호 일치 여부 확인
        document.getElementById("checkPassword").addEventListener("input", this.checkPasswordMatch);
        document.getElementById("cancel_btn").addEventListener("click", this.cancle);
        document.getElementById("disclosure").addEventListener("click", (event) =>{
            if(event.target.value === "true"){
                event.target.value = "false"
            }else{
                event.target.value = "true";
            }
            
        })
    }
    sendForm(){
        const form = document.getElementById('sendForm');

        const formData = {
            cmd: "User",
            cmd2: "getUserData",
            userId: sessionStorage.getItem('userId')
        }
        const jsonData = JSON.stringify(formData);

        this.socket.sendMessage(jsonData);
    }
    submitForm() {
        const form = document.getElementById('modifyInForm');

        const formData = {
            cmd: "User",
            cmd2: "updateUser",
            userId: sessionStorage.getItem('userId'),
            nickName: form.querySelector('#nickName').value,
            password: form.querySelector('#password').value,
            isHidden: form.querySelector('#disclosure').value ==="true" ? true : false,

        }
        const jsonData = JSON.stringify(formData);
        
        this.socket.sendMessage(jsonData);
    }
    callback(data) {
        const json = JSON.parse(data);

        const state = json['state']

        document.getElementById("email").value = json['email']
        document.getElementById("nickName").value = json['nickName']
        document.getElementById("disclosure").value = json['disclosure']


        if (state) {
            Swal.fire({
                icon: "question",
                title: "수정",
                text: "수정하시겠습니까?",
                showConfirmButton: true,
                confirmButtonText: "myPage 이동"
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "myPage.html";
                }
            });
        }

    }
    
    checkPasswordMatch() {

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
    
    cancle() {
        Swal.fire({
            icon: "question",
            title: "취소",
            text: "취소하시겠습니까?",
            showConfirmButton: true,
            confirmButtonText: "myPage 이동"
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "myPage.html";
            }
        });
    }

}
function initailize() {
    const save = new Save('192.168.0.73', 9000);
}

initailize();