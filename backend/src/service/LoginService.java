package service;

import java.util.Map;

import org.java_websocket.WebSocket;
import org.json.JSONObject;

import DAO.UsersDAO;
import DB.DBConnection;
import DTO.Users;

public class LoginService {
	

	public void login(WebSocket socket,JSONObject json, Map<Integer, Users> session) {
	
		String email = json.getString("email");
		String password = json.getString("password");
		
		Users user = null;
		try {
			user = UsersDAO.getUserByEmail(DBConnection.getConnection(), email);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		JSONObject response = new JSONObject();
		
		response.append("cmd", "Login");
		
		if(user == null || password != user.getPassword()) {
			response.append("state", false);
		}
		
		else {
			response.append("state", true);
			response.append("userId", user.getUserId());
			session.put(user.getUserId(), user);
		}
		
		socket.send(response.toString());
		
		
	}
	
	
	
	
}
