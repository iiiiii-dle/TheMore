class ChatSocket {
    /**
     * host: 호스트 주소
     * port: 포트 번호
     * messageHandler: 메시지 수신 처리 콜백 함수
     */
    constructor(host, port) {
        this.host = host;
        this.port = port;

        this.chatSocket = new WebSocket(`${host}:${port}`);

        this.chatSocket.addEventListener('open', () => {
            console.log('[Websocket Open] : Connect Server');
        });

        this.chatSocket.addEventListener('close', (event) => {
            console.log(`[WebSocket Close] : Disconnect Server/ Error code: ${event.code}`);
        });

        this.chatSocket.addEventListener('error', (event) => {
            console.log(`${event.error}`);
        });

        this.chatSocket.addEventListener('message', (event) => {
            console.log(event.data);
        });
    }

    sendMessage(message) {
        this.chatSocket.send(message);
    }
}

export { ChatSocket };
