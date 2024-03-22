import { LoginSocket } from "./socket/loginSocket.js";

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
        console.log(jsonData);
        this.socket.sendMessage(jsonData);
    }
    submitForm() {
        // 폼을 수정하고 제출할 때 실행될 함수(클라이언트에서 서버로 보낼때)
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

        console.log(jsonData);
        // WebSocket을 통해 서버로 데이터 전송
        this.socket.sendMessage(jsonData);
    }
    callback(data) {
        const json = JSON.parse(data);

        const state = json['state']

        console.log(json);
        document.getElementById("email").value = json['email']
        document.getElementById("nickName").value = json['nickName']
        document.getElementById("disclosure").value = json['disclosure']


        if (state) {
            // 수정 성공
            Swal.fire({
                icon: "question",
                title: "수정",
                text: "수정하시겠습니까?",
                showConfirmButton: true,// 확인 버튼 표시
                confirmButtonText: "myPage 이동"
            }).then((result) => {
                if (result.isConfirmed) {
                    // 페이지 이동
                    window.location.href = "myPage.html";
                }
            });
        }

    }

    // 비밀번호 확인에서 비밀번호가 같은지 확인하는 기능
    checkPasswordMatch() {


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
    cancle() {
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

}
function initailize() {
    const save = new Save('localhost', 9000);
}

initailize();






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