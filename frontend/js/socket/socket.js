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

    // sendMessage(message) {
    //     this.socket.send(message);
    // }
    // 소켓 연결되기전에 서버에 보내려고 해서 추가했습니다. - 김강현
    sendMessage(message) {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(message);
        } else {
            console.log('[sendMessage] 소켓이 열리지 않았습니다. 메시지가 대기열에 추가되었습니다.');
            this.socket.addEventListener('open', () => {
                this.socket.send(message);
            });
        }
    }
    
}

export { Socket };