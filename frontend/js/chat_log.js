class Chat_log {
    constructor() {
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
            resize: () => {},
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
            this.postMessage(true);
        });
    }

    show() {
        this.elements.chat_log_wrapper.className = '';
    }

    hide() {
        this.elements.chat_log_wrapper.className = 'hide';
    }

    postMessage(isMe) {
        const text = this.elements.chat_log_message_input.value;

        const message = new Message(text, isMe);

        this.elements.chat_log_body_chat_ul.appendChild(message.chatFormat());
        this.elements.chat_log_message_input.value = '';
        this.scrollDown();
    }

    scrollDown() {
        this.elements.chat_log_body_chat.scrollTop = this.elements.chat_log_body_chat.scrollHeight; // 자동으로 스크롤 하단으로 내리기
    }
}

class Message {
    constructor(message, isMe) {
        this.message = message;
        this.isMe = isMe;
    }

    format() {
        const format = document.createElement('li');

        const sender = document.createElement('div');
        sender.className = 'sender';
        const message = document.createElement('div');
        message.className = 'message';

        const senderSpan = document.createElement('span');
        const messageSpan = document.createElement('span');

        senderSpan.textContent = 'sender';
        messageSpan.textContent = this.message;

        sender.appendChild(senderSpan);
        message.appendChild(messageSpan);

        format.appendChild(sender);
        format.appendChild(message);

        return format;
    }

    chatFormat() {
        // html의 format 복사
        const format = this.format();

        format.className = this.isMe ? 'me' : 'other';

        return format;
    }
}

function initialize() {
    const chat_log = new Chat_log();
}

initialize();

// chat_log.show(); -> 함수 창 보이기 함수
