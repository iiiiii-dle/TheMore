package server;

import java.net.InetSocketAddress;
import java.util.HashMap;
import java.util.Map;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;
import org.json.JSONException;
import org.json.JSONObject;

import DTO.Users;
import service.ExpensesServiceImpl;
import service.LoginService;

public class Sever extends WebSocketServer {
	
	Map<Integer, Users> sessionUser = new HashMap<Integer, Users>();
	ExpensesServiceImpl expensesServiceImpl = new ExpensesServiceImpl();
	LoginService loginService = new LoginService();
	
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
		
		
		if(cmd == "Login")
			loginService.login(conn, msg, sessionUser);
		
		
		
		
		
		
		
		System.out.println("메시지 수신: " + message);
		// 여기서 메시지를 처리하고 클라이언트에게 응답을 보낼 수 있습니다.

		// 혜리--------------------------------------------------
		// 클라이언트로브터 받은 JSON 형식의 데이터를 파싱
//		JSONObject msgObj;
//		try {
//			msgObj = new JSONObject(message);
//		} catch(JSONException e) {
//			System.err.println("Invalid JSON format: " + e.getMessage());
//			return;
//		}
//		String cmd = msgObj.getString("cmd");
//
//		if (cmd.equals("join")) {
//			System.out.println("----------회원가입----------");
//			
//			// 구현 내용 넣어주세요
//			
//		} else if (cmd.equals("insertExpenses")) {
//			System.out.println("----------수입/지출 내역 작성----------");
//			ExpensesServiceImpl expensesService = new ExpensesServiceImpl();
//			expensesService.insertExpenses(conn, message);
//			
//		} else if (cmd.equals("deleteExpenses")) {
//			System.out.println("----------수입/지출 내역 삭제----------");
//			ExpensesServiceImpl expensesService = new ExpensesServiceImpl();
//			expensesService.deleteExpenses(conn, message);
//			
//		} else if (cmd.equals("updateExpenses")) {
//			System.out.println("----------수입/지출 내역 수정----------");
//			ExpensesServiceImpl expensesService = new ExpensesServiceImpl();
//			expensesService.updateExpenses(conn, message);
//			
//		} else if (cmd.equals("getExpensesList")) {
//			System.out.println("----------수입/지출 내역 조회----------");
//			ExpensesServiceImpl expensesService = new ExpensesServiceImpl();
//			expensesService.getExpensesList(conn, message);
//			
//		}
//
//		// 민재--------------------------------------------------
//		// 데이터베이스 업데이트 등의 작업 수행
//		String email = msgObj.getString("email");
//		String nickName = msgObj.getString("nickName");
//		String password = msgObj.getString("password");
//		boolean isHidden = msgObj.getBoolean("isHidden");
//
//		conn.send("정보가 성공적으로 업데이트되었습니다.");
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
