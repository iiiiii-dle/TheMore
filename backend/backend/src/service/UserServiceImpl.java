package service;

import java.util.Map;

import org.java_websocket.WebSocket;
import org.json.JSONObject;

import DAO.ExpensesDAO;
import DAO.UsersDAO;
import DB.DBConnection;
import DTO.Users;

public class UserServiceImpl implements UserService {

	@Override
	public void parse(WebSocket socket, JSONObject json, Map<Integer, Users> session) {
		String cmd2 = json.getString("cmd2");
		
		if(cmd2.equals("Login"))
			this.login(socket, json, session);
		else if(cmd2.equals("updateUser"))
			this.updateUser(socket,json,session);
		else if(cmd2.equals("getUserData"))
			this.getUserData(socket, json, session);
		else if(cmd2.equals("membership"))
			this.membership(socket, json);
	}

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
			System.out.println("error");
			e.printStackTrace();
		}
		
		JSONObject response = new JSONObject();
		response.put("cmd", "Login");
		
		if(user == null || !password.equals(user.getPassword())) {
			response.put("state", false);
		}
		
		else {
			response.put("state", true);
			response.put("userId", user.getUserId());
			response.put("nickName", user.getNickName());
			session.put(user.getUserId(), user);
		}
		
		System.out.print(response.toString());
		socket.send(response.toString());
		System.out.println("Login Send");
	}

	@Override
	public void updateUser(WebSocket socket, JSONObject json, Map<Integer, Users> session) {
		int userId = json.getInt("userId");
		int result = 0;
		
		Users newUser = session.get(userId);
		newUser.setNickName(json.getString("nickName"));
		newUser.setPassword(json.getString("password"));
		newUser.setIsHidden(json.getBoolean("isHidden"));
		
		try {
			result = UsersDAO.updateUser(DBConnection.getConnection(), newUser);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		JSONObject response = new JSONObject();
		
		if(result == 0) {
			response.put("cmd", "updateUser");
			response.put("state", false);
		}
		
		if(result == 1) {
			response.put("cmd", "updateUser");
			response.put("state", true);
		}
		
		socket.send(response.toString());
			
	}

	@Override
	public void getUserData(WebSocket socket, JSONObject json, Map<Integer, Users> session) {
		int userId = json.getInt("userId");
		
		Users user = session.get(userId);
		
		JSONObject response = new JSONObject(user);
		response.put("cmd", "getUserData");
		
		socket.send(response.toString());
		
	}



	@Override
	public void membership(WebSocket socket, JSONObject json) {
		String nickName = json.getString("nickName");
		String email = json.getString("email");
		String password = json.getString("password");
		boolean isHidden = json.getBoolean("isHidden");
		
		Users memberUser = new Users(email, password, "salt", nickName, isHidden);
		int result = 0;
		
		try {
			result = UsersDAO.insertUser(DBConnection.getConnection(), memberUser);
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		JSONObject response = new JSONObject();
		
		if(result == 0) {
			response.put("cmd", "membership");
			response.put("state", false);
			
		}
		else {
			response.put("cmd", "membership");
			response.put("state", true);
		}
		
		socket.send(response.toString());
	}
	
}
