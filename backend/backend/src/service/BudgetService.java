package service;

import org.java_websocket.WebSocket;
import org.json.JSONObject;

public interface BudgetService {
	void parse(WebSocket conn, JSONObject json);
	void insertBudget(WebSocket conn, JSONObject json);
	void deleteBudget(WebSocket conn, JSONObject json);
	void updateBudget(WebSocket conn, JSONObject json);
}
