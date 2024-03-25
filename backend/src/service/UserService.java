package service;

import java.util.Map;

import org.java_websocket.WebSocket;
import org.json.JSONObject;

import DTO.Users;

public interface UserService {
	void parse(WebSocket socket,JSONObject json, Map<Integer, Users> session);
	void login(WebSocket socket,JSONObject json, Map<Integer, Users> session);
	void updateUser(WebSocket socket,JSONObject json, Map<Integer, Users> session);
	void getUserData(WebSocket socket,JSONObject json, Map<Integer, Users> session);
	void membership(WebSocket socket,JSONObject json);
}
