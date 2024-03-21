package service;

import java.util.Map;

import org.java_websocket.WebSocket;
import org.json.JSONObject;

import DAO.UsersDAO;
import DB.DBConnection;
import DTO.Users;

public class UserServiceImpl implements UserService {
	
	/**
	 * @author 이경석<br>
	 *         login: 로그인
	 */
	@Override
	public void login(WebSocket socket,JSONObject json, Map<Integer, Users> session) {
	
		System.out.println("login Function");
		
		String email = json.getString("email");
		String password = json.getString("password");
		
		Users user = null;
		try {
			user = UsersDAO.getUserByEmail(DBConnection.getConnection(), email);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			System.out.println("error");
			e.printStackTrace();
		}
		
		
		JSONObject response = new JSONObject();
		response.put("cmd", "Login");
		
		System.out.println(user);
		System.out.println(user.getPassword());
		
		if(user == null || !password.equals(user.getPassword())) {
			response.put("state", false);
		}
		
		else {
			response.put("state", true);
			response.put("userId", user.getUserId());
			session.put(user.getUserId(), user);
		}
		
		socket.send(response.toString());
		System.out.println("Login Send");
	}

}
