package service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.sql.Date;
import java.util.LinkedList;
import java.util.List;

import org.java_websocket.WebSocket;
import org.json.JSONObject;

import DAO.ExpensesDAO;
import DB.DBConnection;
import DTO.Expenses;

public class ExpensesServiceImpl implements ExpensesService {

	/**
	 * @author 서혜리<br>
	 *         parseDate: String 객체를 java.sql.Date 타입으로 파싱하는 메소드
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

	/**
	 * @author 서혜리<br>
	 *         parse : Server 클래스에서 클라이언트로부터 받은 cmd가 Expenses인 경우,<br>
	 *         ExpensesServiceImpl 클래스 내에서 다시 명령어(cmd2)를 받아<br>
	 *         적절한 메소드로 분배하는 메소드
	 */
	@Override
	public void parse(WebSocket conn, JSONObject json) {
		String cmd2 = json.getString("cmd2");
		ExpensesServiceImpl expensesService = new ExpensesServiceImpl();

		switch (cmd2) {
		case "insertExpenses":
			expensesService.insertExpenses(conn, json);
			conn.send("작성이 완료되었습니다.");
			break;
			
		case "deleteExpenses":
			expensesService.deleteExpenses(conn, json);
			conn.send("삭제가 완료되었습니다.");
			break;
			
		case "updateExpenses":
			expensesService.updateExpenses(conn, json);
			conn.send("수정이 완료되었습니다.");
			break;
			
		case "getExpensesList":
			List<Expenses> expensesList = expensesService.getExpensesList(conn, json);
			JSONObject json2 = new JSONObject();
			json2.put("cmd", "getExpensesList");
			for (Expenses ex : expensesList) {
				json2.put("expenses", ex);
			}
			json.append("expensesList", json2);
			conn.send(json.toString());
			break;
			
		// 병민 ------------------------------------------------------
		case "getTotalAmount" :
			int sum = expensesService.getTotalAmount(conn, json);
			JSONObject getAmount = new JSONObject();
			getAmount.put("cmd", "getTotalAmount");
			getAmount.put("total",sum);
			conn.send(getAmount.toString());
			break;
			
		case "getTotalCategoryAmount" :
			int catagorySum = expensesService.getTotalCategoryAmount(conn, json);
			JSONObject getCatagory = new JSONObject();
			getCatagory.put("cmd", "getTotalCategoryAmount");
			getCatagory.put("totalCatagory", catagorySum);
			conn.send(getCatagory.toString());
			break;
			
		default:
			conn.send("잘못된 입력입니다.");
			break;
		}
	}

	/**
	 * @author 서혜리<br>
	 *         insertExpenses : 수입 지출 내역을 DB에 저장하도록 하고<br>
	 *         check을 통해 내역이 DB에 성공적으로 저장됐는지 확인하는 기능
	 */
	@Override
	public void insertExpenses(WebSocket conn, JSONObject json) {

		Integer userId = json.getInt("userId");
		Boolean type = json.getBoolean("type");
		Integer money = json.getInt("money");
		Integer categoryId = json.getInt("categoryId");
		String memo = json.getString("memo");
		String dateString = json.getString("expensesDate");
		Date expensesDate = parseDate(dateString);

		Expenses expenses = new Expenses(userId, categoryId, type, money, memo, expensesDate);

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
	public void deleteExpenses(WebSocket conn, JSONObject json) {

		Integer expensesId = json.getInt("expensesId");
		Integer userId = json.getInt("userId");

		Expenses expenses = new Expenses(expensesId, userId);

		int check = 0;
		try {
			check = ExpensesDAO.deleteExpenses(DBConnection.getConnection(), expenses);
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
	public void updateExpenses(WebSocket conn, JSONObject json) {

		Integer expensesId = json.getInt("expensesId");
		Integer userId = json.getInt("userId");
		Integer categoryId = json.getInt("categoryId");
		Boolean type = json.getBoolean("type");
		Integer money = json.getInt("money");
		String memo = json.getString("memo");
		String dateString = json.getString("expensesDate");
		Date expensesDate = parseDate(dateString);

		Expenses expenses = new Expenses(expensesId, userId, categoryId, type, money, memo, expensesDate);

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
	public List<Expenses> getExpensesList(WebSocket conn, JSONObject json) {

		Integer userId = json.getInt("userId");

		Boolean filter = json.getBoolean("type");
		Expenses expenses = new Expenses(userId);

		List<Expenses> list = new LinkedList<>();
		try {
			list = ExpensesDAO.getExpensesList(DBConnection.getConnection(), filter, expenses);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	
	/**
	 * @author 최병민<br>
	 *         getTotalAmount : userId를 가져와서 수입 지출 값을 주면 수입 합 또는 지출 합 출력기능
	 */
	@Override
	public int getTotalAmount(WebSocket conn, JSONObject json) {
		Integer userId = json.getInt("userId");

		Boolean filter = json.getBoolean("type");
		String dateString = json.getString("expensesDate");
		Date expensesDate = parseDate(dateString);
		
		Expenses expenses = new Expenses(userId);
		
		int result = 0;
		try {
			result = ExpensesDAO.getTotalAmount(DBConnection.getConnection(), filter, expenses);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	/**
	 * @author 최병민<br>
	 * 			getTotalCategoryAmount : userId를 가져와서 수입 지출 값을 주고 카테고리 아이디를 주면 수입 합 또는 지출 합 출력기능
	 */
	@Override
	public int getTotalCategoryAmount(WebSocket conn, JSONObject json) {
		Integer userId = json.getInt("userId");

		Boolean filter = json.getBoolean("type");
		Integer categoryId = json.getInt("categoryId");
		String dateString = json.getString("expensesDate");
		Date expensesDate = parseDate(dateString);
		
		Expenses expenses = new Expenses(userId);
		
		int result = 0;
		try {
			result = ExpensesDAO.getTotalCategoryAmount(DBConnection.getConnection(), filter, expenses);
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		return result;
	}

}
