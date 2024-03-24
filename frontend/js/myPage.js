
import { LoginSocket } from '../js/socket/loginSocket.js';

class myPage {
    constructor(host, port) {
        this.socket = new LoginSocket(host, port, this.callback.bind(this));

        this.elements = {
            modify_button: document.querySelector('#button > #modify_btn'),
        };
        this.elements.modify_button.addEventListener('click', () => {
            this.modify();
        });

        this.socket.socket.addEventListener("open", () => {
            this.sendForm();
        });
        document.getElementById("modify_btn").addEventListener("click", this.modify);
    }
    callback(data) {
        const json = JSON.parse(data);

        document.getElementById("email").value = json['email']
        document.getElementById("nickName").value = json['nickName']
        document.getElementById("joinDate").value = json['joinDate']
        document.getElementById("disclosure").checked = json['isHidden'];

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

    modify() {
        Swal.fire({
            icon: "question",
            title: "수정",
            text: "수정하시겠습니까?",
            showConfirmButton: true,
            confirmButtonText: "수정화면으로 이동"
        }).then((result) => {
            if (result.isConfirmed)
                window.location.href = "modify.html";
        })
    }
}
function initailize() {
    const save = new myPage('localhost', 9000);
}
initailize();
