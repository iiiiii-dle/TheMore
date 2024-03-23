import { Socket } from '../js/socket/socket.js';

class Chat_log {
    constructor(host, port) {
        // 소켓 연결
        this.chatSocket = new Socket(host, port, this.receiveMessage.bind(this));
        /**
         * Dom 객체 찾기
         */

        this.elements = {
            chat_log_wrapper: document.querySelector('#chat_wrapper'),
            chat_log_header: document.querySelector('#chat_header'),
            chat_log_exit_button: document.querySelector('#chat_header > button'),
            chat_log_body_chat: document.querySelector('#chat_body > #chat'),
            chat_log_body_chat_ul: document.querySelector('#chat_body > #chat > ul'),
            chat_log_message_input: document.querySelector('#chat_send > .input-div > textarea'),
            chat_log_send_button: document.querySelector('#chat_footer > button'),
        };

        /**
         * 이벤트 기능 정의
         * RemoveEventLisner가 메서드 형식으로 작성할 경우 동작하지 않는 문제 발생하여
         * 다음과 같이 정의
         */
        this.functions = {
            onMove: (event) => {
                // 채팅 창 이동 로직
                event.preventDefault();
                const chat_log_wrapper = this.elements.chat_log_wrapper;
                const rect = chat_log_wrapper.getBoundingClientRect(); // 채팅창 위치 정보 반환

                const moveX = rect.left + event.movementX; // x축 이동 값 계산
                const moveY = rect.top + event.movementY; // y축 이동 값 계산
                chat_log_wrapper.style.left = moveX + 'px';
                chat_log_wrapper.style.top = moveY + 'px';
            },
            unMove: () => {
                // 채팅 창 이동 이벤트 삭제
                document.removeEventListener('mousemove', this.functions.onMove);
                document.removeEventListener('mouseover', this.functions.unmove);
            },
        };

        /**
         * 이벤트 정의 영역
         */
        this.elements.chat_log_header.addEventListener('mousedown', () => {
            // 마우스 다운 시 이동 기능 시작

            document.addEventListener('mousemove', this.functions.onMove);
            document.addEventListener('mouseup', this.functions.unMove);
        });

        this.elements.chat_log_exit_button.addEventListener('click', () => {
            this.hide();
        });

        this.elements.chat_log_send_button.addEventListener('click', () => {
            this.sendMessage();
        });
    }

    show() {
        this.elements.chat_log_wrapper.className = '';
    }

    hide() {
        this.elements.chat_log_wrapper.className = 'hide';
    }

    sendMessage() {
        // html에 메시지 남기고 서버에 전송
        const text = this.elements.chat_log_message_input.value;

        // message format sender 등 수정 필요
        const message = new Message(sessionStorage.getItem('userId'), text, 'Me', true);

        this.elements.chat_log_body_chat_ul.appendChild(message.chatFormat());
        this.elements.chat_log_message_input.value = '';
        this.scrollDown();

        this.chatSocket.sendMessage(JSON.stringify(message.toJson()));
    }

    receiveMessage(msg) {
        // 받은 메시지 처리
        const json = JSON.parse(msg);
        const message = new Message(json['userId'], json['message'], json['sender'], json['isMe']);

        this.elements.chat_log_body_chat_ul.appendChild(message.chatFormat());
    }

    scrollDown() {
        this.elements.chat_log_body_chat.scrollTop = this.elements.chat_log_body_chat.scrollHeight; // 자동으로 스크롤 하단으로 내리기
    }
}

class Message {
    constructor(userId, message, sender, isMe) {
        this.userId = userId;
        this.message = message;
        this.sender = sender;
        this.isMe = isMe;
    }

    format() {
        const format = document.createElement('li');
        format.setAttribute('userId', this.userId);

        const sender = document.createElement('div');
        sender.className = 'sender';
        const message = document.createElement('div');
        message.className = 'message';

        const senderSpan = document.createElement('span');
        const messageSpan = document.createElement('span');

        senderSpan.textContent = this.sender;
        messageSpan.textContent = this.message;

        sender.appendChild(senderSpan);
        message.appendChild(messageSpan);

        format.appendChild(sender);
        format.appendChild(message);

        // 상대방 정보 보기 -> (구현 필요)
        format.addEventListener('click', () => {
            console.log(format.getAttribute('userId'));
        });
        return format;
    }

    chatFormat() {
        // html의 format 복사
        const format = this.format();
        // 보내는 주체가 나, 타인 구분
        format.className = this.isMe ? 'me' : 'other';

        return format;
    }

    // 전송 Message
    toJson() {
        return {
            userId: this.userId,
            message: this.message,
            sender: this.sender,
            isMe: false,
        };
    }
}

// chat_log.show(); -> 함수 창 보이기 함수

export { Chat_log, Message };
