package server;

import java.net.InetSocketAddress;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

public class Sever extends WebSocketServer{
	public static void main(String[] args) {
		String host = "127.0.0.1";	// localhost
		final int PORT = 9000;
		
		WebSocketServer server = new Sever(new InetSocketAddress(host, PORT));
		server.run();
	}
	public Sever(InetSocketAddress inetAddr) {
		super(inetAddr);
	}

	@Override
	public void onClose(WebSocket conn, int code, String reason, boolean remote) {
		System.out.println("연결 종료: " + conn.getRemoteSocketAddress());
		
	}

	@Override
	public void onError(WebSocket conn, Exception ex) {
		ex.printStackTrace();
		
	}

	@Override
	public void onMessage(WebSocket conn, String message) {
		System.out.println("메시지 수신: " + message);
		// 여기서 메시지를 처리하고 클라이언트에게 응답을 보낼 수 있습니다.
		
	}

	@Override
	public void onOpen(WebSocket conn, ClientHandshake handshake) {
		System.out.println("새로운 연결: " + conn.getRemoteSocketAddress());
		
	}

	@Override
	public void onStart() {
		System.out.println("서버 시작");
	}
	
}
