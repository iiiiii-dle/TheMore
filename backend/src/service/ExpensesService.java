package service;

import java.util.List;

import org.java_websocket.WebSocket;
import org.json.JSONObject;

import DTO.Expenses;

public interface ExpensesService {
	void parse(WebSocket conn, JSONObject json);
	void insertExpenses(WebSocket conn, JSONObject json);
	void deleteExpenses(WebSocket conn, JSONObject json);
	void updateExpenses(WebSocket conn, JSONObject json);
	List<Expenses> getExpensesList(WebSocket conn, JSONObject json);
}
