import { Socket } from '../js/socket/socket.js';

class Chat_log {
    constructor(host, port) {
        // 소켓 연결
        this.chatSocket = new Socket(host, port, this.receiveMessage.bind(this));
        const tmp = localStorage.getItem('chat_log');
        this.chatLog = tmp ? JSON.parse(tmp) : [];

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
            chat_log_open_button: document.querySelector('.chatImg'),
        };

        if (Array.isArray(this.chatLog))
            this.chatLog.forEach((msg) => {
                this.setMessage(msg);
            });

        /**
         * 이벤트 기능 정의
         * RemoveEventLisner가 메서드 형식으로 작성할 경우 동작하지 않는 문제 발생하여
         * 다음과 같이 정의
         */
        this.functions = {
            onMove: (event) => {
                event.preventDefault();
                const chat_log_wrapper = this.elements.chat_log_wrapper;
                const rect = chat_log_wrapper.getBoundingClientRect(); // 채팅창 위치 정보 반환

                const moveX = rect.left + event.movementX;
                const moveY = rect.top + event.movementY;
                chat_log_wrapper.style.left = moveX + 'px';
                chat_log_wrapper.style.top = moveY + 'px';
            },
            unMove: () => {
                document.removeEventListener('mousemove', this.functions.onMove);
                document.removeEventListener('mouseover', this.functions.unmove);
            },
        };

        /**
         * 이벤트 정의 영역
         */
        this.elements.chat_log_header.addEventListener('mousedown', () => {
            document.addEventListener('mousemove', this.functions.onMove);
            document.addEventListener('mouseup', this.functions.unMove);
        });

        this.elements.chat_log_exit_button.addEventListener('click', () => {
            this.hide();
        });

        this.elements.chat_log_send_button.addEventListener('click', () => {
            this.sendMessage();
        });

        this.elements.chat_log_open_button.addEventListener('click', (event) => {
            if (this.elements.chat_log_wrapper.classList.contains('hide')) this.show();
            else this.hide();
        });
        this.hide();
    }

    show() {
        this.elements.chat_log_wrapper.className = '';
    }

    hide() {
        this.elements.chat_log_wrapper.className = 'hide';
    }

    sendMessage() {
        const text = this.elements.chat_log_message_input.value;

        const message = new Message(sessionStorage.getItem('userId'), text, sessionStorage.getItem('nickName'), true);
        console.log(message);
        this.chatLog.push(message);
        localStorage.setItem('chat_log', JSON.stringify(this.chatLog));

        this.elements.chat_log_body_chat_ul.appendChild(message.chatFormat());
        this.elements.chat_log_message_input.value = '';
        this.scrollDown();

        this.chatSocket.sendMessage(JSON.stringify(message.sendtoJson()));
    }

    receiveMessage(msg) {
        const json = JSON.parse(msg);
        const message = new Message(json['userId'], json['message'], json['sender'], json['isMe']);
        console.log(message);
        this.elements.chat_log_body_chat_ul.appendChild(message.chatFormat());
        this.chatLog.push(message.toJson());
        localStorage.setItem('chat_log', JSON.stringify(this.chatLog));
    }

    scrollDown() {
        this.elements.chat_log_body_chat.scrollTop = this.elements.chat_log_body_chat.scrollHeight;
    }

    setMessage(json) {
        const message = new Message(json['userId'], json['message'], json['sender'], json['isMe']);
        this.elements.chat_log_body_chat_ul.appendChild(message.chatFormat());
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

        // 상대방 정보 보기
        format.addEventListener('click', () => {
            // 구현 필요
        });
        return format;
    }

    chatFormat() {
        const format = this.format();
        format.className = this.isMe ? 'me' : 'other';

        return format;
    }

    toJson() {
        return {
            userId: this.userId,
            message: this.message,
            sender: this.sender,
            isMe: this.isMe,
        };
    }

    sendtoJson() {
        return {
            userId: this.userId,
            message: this.message,
            sender: this.sender,
            isMe: false,
        };
    }
}

export { Chat_log, Message };
