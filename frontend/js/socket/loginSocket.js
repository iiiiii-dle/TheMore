class LoginSocket {
    /**
     * host: 호스트 주소
     * port: 포트 번호
     * callback: 메시지 수신 처리 콜백 함수
     */
    constructor(host, port, callback) {
        this.host = host;
        this.port = port;
        this.callback = callback;

        this.chatSocket = new WebSocket(`ws://${host}:${port}`);

        this.chatSocket.addEventListener('open', () => {
            console.log('[Websocket Open] : Connect Server');
        });

        this.chatSocket.addEventListener('close', (event) => {
            console.log(`[WebSocket Close] : Disconnect Server/ Error code: ${event.code}`);
        });

        this.chatSocket.addEventListener('error', (event) => {
            console.log(`${event.error}`);
        });

        // 메시지 수신 이벤트
        this.chatSocket.addEventListener('message', (event) => {
            this.callback(event.data);
        });
    }

    // 메시지 전송 함수
    sendMessage(message) {
        this.chatSocket.send(message);
    }
}

export { LoginSocket };
