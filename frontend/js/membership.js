
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
    // 폼을 제출할 때 실행될 함수
    submitForm() {
        const form = document.getElementById('membershipInForm')
        const formData = {
            cmd: "User",
            cmd2: "membership",
            nickName: form.querySelector('#nickName').value,
            password: form.querySelector('#password').value,
            email: form.querySelector('#email').value,
            isHidden: form.querySelector('#disclosure').value ==="true" ? true : false,
        }

        // FormData를 JSON으로 변환
        const jsonData = JSON.stringify(formData);
        console.log(jsonData);
        //WebSocket을 통해 서버로 데이터 전송
        this.socket.sendMessage(jsonData);

    }
    callback(data) {
        const json = JSON.parse(data);

        const state = json['state'];

        if(state){
            // 회원 가입 성공
            Swal.fire({
                icon: "question",
                title: "회원 가입",
                text: "회원 가입하시겠습니까?",
                showConfirmButton: true,// 확인 버튼 표시
                confirmButtonText: "홈페이지 이동"
            }).then((result) => {
                if (result.isConfirmed) {
                    // 페이지 이동
                    window.location.href = "index.html";
                }
            });
        } else{
            // 수정 실패
            Swal.fire({
                icon: "question",
                title: "실패",
                text: "값을 확인해주세요",
                showConfirmButton: false,// 확인 버튼 표시
                timer: 1000
            })
        }
    }


    checkPasswordMatch() {

        // 비밀번호 확인(input) 필드의 값이 변경될 때마다 비밀번호 일치 여부 확인
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

    

}

function initailize() {
    const member = new membership("localhost", 9000);
} 


initailize();

// // 회원 가입 시 회원이 입력한 정보와 testData 비교 함수
// function checkDuplicate(field) {
//     var value = document.getElementById(field).value;
//     if (value.trim() === "") {
//         Swal.fire({
//             icon: "error",
//             title: "입력 오류",
//             text: field === "email" ? "email을 입력하세요" : "닉네임을 입력하세요",
//             showConfirmButton: false,
//             timer: 1000
//         });
//         return;
//     }

//     // 서버에서 중복 확인 로직 수행
//     // 예시로 alert를 사용하여 결과 보여주기
//     if (field === "email") {
//         if (testData.email.includes(value)) {
//             Swal.fire({
//                 icon: "warning",
//                 title: "중복 확인",
//                 text: "이미 사용 중인 email입니다.",
//                 showConfirmButton: false,
//                 timer: 1000
//             });
//         } else {
//             Swal.fire({
//                 icon: "success",
//                 title: "중복 확인",
//                 text: "사용 가능한 email입니다.",
//                 showConfirmButton: false,
//                 timer: 1000
//             });
//         }
//     } else if (field === "nickName") {
//         if (testData.nickName.includes(value)) {
//             Swal.fire({
//                 icon: "warning",
//                 title: "중복 확인",
//                 text: "이미 사용 중인 닉네임입니다.",
//                 showConfirmButton: false,
//                 timer: 1000
//             });
//         } else {
//             Swal.fire({
//                 icon: "success",
//                 title: "중복 확인",
//                 text: "사용 가능한 닉네임입니다.",
//                 showConfirmButton: false,
//                 timer: 1000
//             });
//         }
//     }
// }


