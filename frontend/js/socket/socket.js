class Socket {
    /**
     * host: 호스트 주소
     * port: 포트 번호
     * callback: 메시지 수신 처리 콜백 함수
     */
    constructor(host, port, callback) {
        this.host = host;
        this.port = port;
        this.callback = callback;

        this.socket = new WebSocket(`ws://${host}:${port}`);

        this.socket.addEventListener('open', () => {
            console.log('[Websocket Open] : Connect Server');
        });

        this.socket.addEventListener('close', (event) => {
            console.log(`[WebSocket Close] : Disconnect Server/ Error code: ${event.code}`);
        });

        this.socket.addEventListener('error', (event) => {
            console.log(`${event.error}`);
        });

        this.socket.addEventListener('message', (event) => {
            console.log('test');
            this.callback(event.data);
        });
    }

    sendMessage(message) {
        this.socket.send(message);
    }
}

export { Socket };