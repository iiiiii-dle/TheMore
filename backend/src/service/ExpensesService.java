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
	// 병민
	int getTotalAmount(WebSocket conn, JSONObject json);
	int getTotalCategoryAmount(WebSocket conn, JSONObject json);
	List<Expenses> categoryTotalList(WebSocket conn, JSONObject json);
	//김강현짱
	List<Expenses> statistics(WebSocket conn, JSONObject json);
}
