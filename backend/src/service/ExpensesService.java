package service;

import java.util.List;

import org.java_websocket.WebSocket;

import DTO.Expenses;

public interface ExpensesService {
	void insertExpenses(WebSocket conn, String message);
	void deleteExpenses(WebSocket conn, String message);
	void updateExpenses(WebSocket conn, String message);
	List<Expenses> getExpensesList(WebSocket conn, String message);
}
