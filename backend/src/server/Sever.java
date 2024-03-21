package server;

import java.net.InetSocketAddress;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;
import org.json.JSONObject;

import DTO.Expenses;
import DTO.Users;
import service.ExpensesServiceImpl;
import service.UserServiceImpl;

public class Sever extends WebSocketServer {
   
   Map<Integer, Users> sessionUser = new HashMap<Integer, Users>();
   ExpensesServiceImpl expensesService = new ExpensesServiceImpl();
   UserServiceImpl userService = new UserServiceImpl();
   
   public static void main(String[] args) {
      String host = "localhost";
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
      JSONObject json = new JSONObject();
      
      String cmd = msg.getString("cmd");
      
      System.out.println("메시지 수신: " + message);
      System.out.println(cmd);
      
      // 경석--------------------------------------------------
      if(cmd.equals("Login")) {
         userService.login(conn, msg, sessionUser);
         
      // 혜리--------------------------------------------------
      } else if (cmd.equals("Expenses")) {
    	  expensesService.parse(conn, msg);
      }
//
//      // 민재--------------------------------------------------
//      // 데이터베이스 업데이트 등의 작업 수행
//      String email = msgObj.getString("email");
//      String nickName = msgObj.getString("nickName");
//      String password = msgObj.getString("password");
//      boolean isHidden = msgObj.getBoolean("isHidden");
//
//      conn.send("정보가 성공적으로 업데이트되었습니다.");
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