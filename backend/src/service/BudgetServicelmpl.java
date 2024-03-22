package service;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

import org.java_websocket.WebSocket;
import org.json.JSONObject;

import DAO.BudgetDAO;
import DB.DBConnection;
import DTO.Budget;

public class BudgetServicelmpl implements BudgetService {
	/**
	 * @author 최병민<br>
	 * 			parseDate: String 객체를 java.sql.Date타입으로 파싱하는 메소드
	 * @param dateString: DB에 날짜로 넣고 싶은 String 객체
	 * @return java.sql.Date 타입
	 */
	private Date parseDate(String dateString) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		try {
			java.util.Date parsedDate = dateFormat.parse(dateString);
			return new java.sql.Date(parsedDate.getTime());
		} catch (ParseException e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public void parse(WebSocket conn, JSONObject json) {
		String cmd2 = json.getString("cmd2");
		
		if(cmd2.equals("insertBudget"))
			this.insertBudget(conn, json);
		else if(cmd2.equals("deleteBudget"))
			this.deleteBudget(conn, json);
		else if(cmd2.equals("updateBudget"))
			this.updateBudget(conn, json);
		else if(cmd2.equals("getTotalBudget"))
			this.getTotalBudget(conn, json);
		}

	@Override
	public void insertBudget(WebSocket conn, JSONObject json) {
		
		Integer userId = json.getInt("userId");
		Integer budgetId = json.getInt("budgetId");
		Integer amount = json.getInt("amount");
		String dateString = json.getString("budgetDate");
		Date budgetDate = parseDate(dateString);
		
		Budget budget = new Budget(userId, budgetId, amount, budgetDate);
		
		int result = 0;
		try {
			result = BudgetDAO.insertBudget(DBConnection.getConnection(), budget);
		}catch (Exception e) {
			e.printStackTrace();
		}
		JSONObject inputObj = new JSONObject();
		
		if(result == 0) {
			// insert 실패시
			inputObj.put("cmd","insertBudget");
			inputObj.put("insert", "fail");
		}
		else {
			// insert 성공시
			inputObj.put("cmd", "insertBudget");
			inputObj.put("insert", "success");
		}
		
		conn.send(inputObj.toString());
		
	}

	@Override
	public void deleteBudget(WebSocket conn, JSONObject json) {
		Integer userId = json.getInt("userId");
		Integer budgetId = json.getInt("budgetId");
		
		Budget budget = new Budget(userId, budgetId);
		
		int result = 0;
		try {
			result = BudgetDAO.deleteBudget(DBConnection.getConnection(), budget);
		}catch (Exception e) {
			e.printStackTrace();
		}
		JSONObject inputObj = new JSONObject();
		
		if(result == 0) {
			// insert 실패시
			inputObj.put("cmd","deleteBudget");
			inputObj.put("delete", "fail");
		}
		else {
			// insert 성공시
			inputObj.put("cmd", "deletBudget");
			inputObj.put("delete", "success");
		}
		
		conn.send(inputObj.toString());
		
	}


	@Override
	public void updateBudget(WebSocket conn, JSONObject json) {
		Integer userId = json.getInt("userId");
		Integer budgetId = json.getInt("budgetId");
		Integer amount = json.getInt("amount");
		
		Budget budget = new Budget(userId, budgetId, amount);
		
		int result = 0;
		try {
			result = BudgetDAO.updateBudget(DBConnection.getConnection(), budget);
		}catch (Exception e) {
			e.printStackTrace();
		}
		JSONObject inputObj = new JSONObject();
		
		if(result == 0) {
			// insert 실패시
			inputObj.put("cmd","updateBudget");
			inputObj.put("update", "fail");
		}
		else {
			// insert 성공시
			inputObj.put("cmd", "updateBudget");
			inputObj.put("update", "success");
		}
		
		conn.send(inputObj.toString());
		
	}

	@Override
	public void getTotalBudget(WebSocket conn, JSONObject json) {
		Integer userId = json.getInt("userId");
		Integer budgetId = json.getInt("budgetId");
		Integer amount = json.getInt("amount");
		String dateString = json.getString("budgetDate");
		Date budgetDate = parseDate(dateString);
		
		Budget budget = new Budget(userId, budgetId, amount, budgetDate);
		List<Budget> result = null;
		
		try {
			result = BudgetDAO.bringBudget(DBConnection.getConnection(), userId, budgetDate);
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		JSONObject inputObj = new JSONObject();
		
		if(result == null) {
			// insert 실패시
			inputObj.put("cmd","getTotalBudget");
			inputObj.put("insert", "fail");
		}
		else {
			// insert 성공시
			inputObj.put("cmd", "getTotalBudget");
			inputObj.put("insert", "success");
		}
		
		conn.send(inputObj.toString());
	}

}
