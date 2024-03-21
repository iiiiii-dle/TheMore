package service;

import java.util.Map;

import org.java_websocket.WebSocket;
import org.json.JSONObject;

import DTO.Users;

public interface UserService {
	void login(WebSocket socket,JSONObject json, Map<Integer, Users> session);
}
