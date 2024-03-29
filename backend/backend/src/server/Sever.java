package server;

import java.net.InetSocketAddress;
import java.util.HashMap;
import java.util.Map;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;
import org.json.JSONObject;

import DTO.Users;
import service.BudgetServicelmpl;
import service.ExpensesServiceImpl;
import service.UserServiceImpl;

public class Sever extends WebSocketServer {

	Map<Integer, Users> sessionUser = new HashMap<Integer, Users>();
	ExpensesServiceImpl expensesService = new ExpensesServiceImpl();
	UserServiceImpl userService = new UserServiceImpl();
	BudgetServicelmpl budgetService = new BudgetServicelmpl();

	public static void main(String[] args) {
		String host = "192.168.0.73";
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

		JSONObject msg = new JSONObject(message);
		

		String cmd = msg.getString("cmd");

		System.out.println("메시지 수신: " + message);
		System.out.println(cmd);

		
		if (cmd.equals("User")) {
			userService.parse(conn, msg, sessionUser);

		} else if (cmd.equals("Expenses")) {
			expensesService.parse(conn, msg);

		} else if (cmd.equals("Budget")) {
			budgetService.parse(conn, msg);
			
		} else if (cmd.equals("grap")) {
			expensesService.parse(conn, msg);
		}
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