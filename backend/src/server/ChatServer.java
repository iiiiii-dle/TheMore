package server;

import java.net.InetSocketAddress;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;
import org.json.JSONObject;

public class ChatServer extends WebSocketServer{

	
	public static void main(String[] args) {
		final String host = "192.168.0.73";
		final int port = 8080;
		
		
		
		ChatServer chatServer = new ChatServer(new InetSocketAddress(host, port));
		chatServer.run();
		
	}
	
	public ChatServer(InetSocketAddress inetAddr) {
		super(inetAddr);
	}
	
	@Override
	public void onClose(WebSocket conn, int code, String reason, boolean remote) {
	
		System.out.println(conn + "is Disconnected :" + code);
	}

	@Override
	public void onError(WebSocket conn, Exception ex) {
	
		System.out.println(ex.getMessage());
	}

	@Override
	public void onMessage(WebSocket conn, String message) {
	
		System.out.println(message);
		for(WebSocket con : this.getConnections()) {
			if(!con.equals(conn))
				con.send(message);
		}
		
		
	}

	@Override
	public void onOpen(WebSocket conn, ClientHandshake handshake) {
		// TODO Auto-generated method stub
		String hostIp = conn.getRemoteSocketAddress().getAddress().getHostAddress().toString();
		System.out.println(hostIp + " connected");
	}

	@Override
	public void onStart() {
		// TODO Auto-generated method stub
		System.out.println("Chatting Server Start!!");
		
	}

}
