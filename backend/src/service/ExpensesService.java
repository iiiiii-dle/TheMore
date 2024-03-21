package service;

import java.util.List;

import org.java_websocket.WebSocket;
import org.json.JSONObject;

import DTO.Expenses;

public interface ExpensesService {
	void insertExpenses(WebSocket conn, JSONObject json, String message);
	void deleteExpenses(WebSocket conn, JSONObject json, String message);
	void updateExpenses(WebSocket conn, JSONObject json, String message);
	List<Expenses> getExpensesList(WebSocket conn, JSONObject json, String message);
}
