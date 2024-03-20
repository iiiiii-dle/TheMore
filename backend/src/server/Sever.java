package server;

import java.net.InetSocketAddress;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;
import org.json.JSONObject;

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
		
		// 클라이언트로브터 받은 JSON 형식의 데이터를 파싱
		JSONObject json = new JSONObject(message);
		
		// 데이터베이스 업데이트 등의 작업 수행
		String email = json.getString("email");
		String nickName = json.getString("nickName");
		String password = json.getString("password");
		boolean isHidden = json.getBoolean("isHidden");
		
		conn.send("정보가 성공적으로 업데이트되었습니다.");
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
