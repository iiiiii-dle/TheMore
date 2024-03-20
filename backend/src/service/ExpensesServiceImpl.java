package service;

import java.util.List;

import org.java_websocket.WebSocket;
import org.json.JSONObject;

import DAO.ExpensesDAO;
import DB.DBConnection;
import DTO.Expenses;

public class ExpensesServiceImpl implements ExpensesService {

	/**
	 * @author 서혜리<br>
	 *         insertExpenses : 수입 지출 내역을 DB에 저장하도록 하고<br>
	 *         check을 통해 내역이 DB에 성공적으로 저장됐는지 확인하는 기능
	 */
	@Override
	public void insertExpenses(WebSocket conn, String message) {
		JSONObject msgObj = new JSONObject(message);

		Integer userId = msgObj.getInt("userId");
		Boolean type = msgObj.getBoolean("type");
		Integer money = msgObj.getInt("money");
		Integer categoryId = msgObj.getInt("categoryId");
		String memo = msgObj.getString("memo");

		Expenses expenses = new Expenses(userId, categoryId, type, money, memo, null);

		int check = 0;
		try {
			check = ExpensesDAO.insertExpenses(DBConnection.getConnection(), expenses);
		} catch (Exception e) {
			e.printStackTrace();
		}

		if (check > 0) {
			JSONObject ackObj = new JSONObject();
			ackObj.put("result", "success");
			conn.send(ackObj.toString());
		} else {
			JSONObject ackObj = new JSONObject();
			ackObj.put("result", "fail");
			conn.send(ackObj.toString());
		}
	}

	/**
	 * @author 서혜리<br>
	 *         deleteExpenses : 수입 지출 내역을 DB에 삭제하도록 하고<br>
	 *         check을 통해 내역이 DB에서 성공적으로 삭제됐는지 확인하는 기능
	 */
	@Override
	public void deleteExpenses(WebSocket conn, String message) {
		JSONObject msgObj = new JSONObject(message);

		Integer expensesId = msgObj.getInt("expensesId");
		Integer userId = msgObj.getInt("userId");

		Expenses expenses = new Expenses(expensesId, userId);

		int check = 0;
		try {
			check = ExpensesDAO.insertExpenses(DBConnection.getConnection(), expenses);
		} catch (Exception e) {
			e.printStackTrace();
		}

		if (check > 0) {
			JSONObject ackObj = new JSONObject();
			ackObj.put("result", "success");
			conn.send(ackObj.toString());
		} else {
			JSONObject ackObj = new JSONObject();
			ackObj.put("result", "fail");
			conn.send(ackObj.toString());
		}
	}

	/**
	 * @author 서혜리<br>
	 *         updateExpenses : 수입 지출 내역을 수정한 것이 DB에 업데이트 되도록 하고<br>
	 *         check을 통해 내역이 DB에 성공적으로 업데이트됐는지 확인하는 기능
	 */
	@Override
	public void updateExpenses(WebSocket conn, String message) {
		JSONObject msgObj = new JSONObject(message);

		Integer expensesId = msgObj.getInt("expensesId");
		Integer userId = msgObj.getInt("userId");
		Integer categoryId = msgObj.getInt("categoryId");
		Boolean type = msgObj.getBoolean("type");
		Integer money = msgObj.getInt("money");
		String memo = msgObj.getString("memo");

		Expenses expenses = new Expenses(expensesId, userId, categoryId, type, money, memo, null);

		int check = 0;
		try {
			check = ExpensesDAO.updateExpenses(DBConnection.getConnection(), expenses);
		} catch (Exception e) {
			e.printStackTrace();
		}

		if (check > 0) {
			JSONObject ackObj = new JSONObject();
			ackObj.put("result", "success");
			conn.send(ackObj.toString());
		} else {
			JSONObject ackObj = new JSONObject();
			ackObj.put("result", "fail");
			conn.send(ackObj.toString());
		}
	}

	/**
	 * @author 서혜리<br>
	 *         getExpensesList : 수입 지출 내역을 DB에서 가져와 보여주는 기능
	 */
	@Override
	public List<Expenses> getExpensesList(WebSocket conn, String message) {
		JSONObject msgObj = new JSONObject(message);

		Integer userId = msgObj.getInt("userId");

		Boolean filter = msgObj.getBoolean("type");
		Expenses expenses = new Expenses(userId);
		
		List<Expenses> list = null;
		try {
			list = ExpensesDAO.getExpensesList(DBConnection.getConnection(), filter, expenses);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

}
