package DAO;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.java_websocket.WebSocket;
import org.json.JSONObject;

import DTO.Expenses;

public class ExpensesDAO {

	public ExpensesDAO() {
	}

	/**
	 * @author 서혜리<br>
	 *         insertExpenses : 수입 지출 내역을 DB에 저장하는 기능<br>
	 * 
	 * @return result : db에 저장이 성공적으로 되면 1을 반환
	 */
	public static int insertExpenses(Connection conn, Expenses expenses) throws Exception {
		int result = 0;
		PreparedStatement pstmt = null;
		try {
			String sql = "insert into expenses (userId, type, money, categoryId, memo, expensesDate) "
					+ "values (?, ?, ?, ?, ?, ?)";
			pstmt = conn.prepareStatement(sql);

			pstmt.setInt(1, expenses.getUserId());
			pstmt.setBoolean(2, expenses.getType());
			pstmt.setInt(3, expenses.getMoney());
			pstmt.setInt(4, expenses.getCategoryId());
			pstmt.setString(5, expenses.getMemo());
			pstmt.setDate(6, expenses.getExpensesDate());

			result = pstmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			pstmt.close();
		}
		System.out.println("ExpensesDAO: " + result);
		return result;
	}

	/**
	 * @author 서혜리<br>
	 *         deleteExpenses : 수입 지출 내역을 DB에서 삭제하는 기능<br>
	 * 
	 * @return result : db에서 성공적으로 삭제되면 1을 반환
	 */
	public static int deleteExpenses(Connection conn, Expenses expenses) throws Exception {
		int result = 0;
		PreparedStatement pstmt = null;
		try {
			String sql = "delete from expenses where userId = ? and expensesId = ?";
			pstmt = conn.prepareStatement(sql);

			pstmt.setInt(1, expenses.getUserId());
			pstmt.setInt(2, expenses.getExpensesId());

			result = pstmt.executeUpdate();

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			pstmt.close();
		}
		System.out.println("ExpensesDAO: " + result);
		return result;
	}

	/**
	 * @author 서혜리<br>
	 *         updateExpenses : 수입 지출 내역을 수정해서 DB에 저장하는 기능<br>
	 * 
	 * @return result : db에 업데이트가 성공적으로 완료되면 1을 반환
	 */
	public static int updateExpenses(Connection conn, Expenses expenses) throws Exception {
		int result = 0;
		PreparedStatement pstmt = null;
		try {
			String sql = "update expenses set categoryId = ?, type = ?, money =?, memo =?, expensesDate = ? where userId = ? and expensesId = ?";

			pstmt = conn.prepareStatement(sql);

			pstmt.setInt(1, expenses.getCategoryId());
			pstmt.setBoolean(2, expenses.getType());
			pstmt.setInt(3, expenses.getMoney());
			pstmt.setString(4, expenses.getMemo());
			pstmt.setDate(5, expenses.getExpensesDate());
			pstmt.setInt(6, expenses.getUserId());
			pstmt.setInt(7, expenses.getExpensesId());

			result = pstmt.executeUpdate();

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			pstmt.close();
		}
		System.out.println("ExpensesDAO: " + result);
		return result;
	}

	/**
	 * @author 서혜리<br>
	 *         getExpensesList : 수입/지출 내역을 DB에서 불러오는 기능<br>
	 * 
	 * @param Boolean filter<br>
	 *                true = 수입 내역 불러오기(카테고리 번호 순) false = 지출 내역 불러오기(카테고리 번호 순)
	 * 
	 * @return expensesList
	 */
	public static JSONObject getExpensesList(Connection conn, Boolean filter, Expenses expenses) throws Exception {
		JSONObject json1 = new JSONObject();
		json1.put("cmd", "getExpensesList");
		List<JSONObject> list = new LinkedList<>();
		String sql;
		PreparedStatement pstmt = null;
		try {
			if (filter.equals(true)) { // 수입일 때 카테고리 번호 내림차순으로 내역 조회
				sql = "select * from expenses where userId = ? and type = 1 and expensesDate = ? order by categoryId DESC";
			} else if (filter.equals(false)) { // 지출일 때 카테고리 번호 내림차순으로 내역 조회
				sql = "select * from expenses where userId = ? and type = 0 and expensesDate = ? order by categoryId DESC";
			} else {
				throw new IllegalArgumentException("불가능한 타입 값입니다. 타입 값은 true, false만 허용됩니다.");
			}
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, expenses.getUserId());
			pstmt.setDate(2, expenses.getExpensesDate());

			ResultSet rs = pstmt.executeQuery();
			if (!rs.next()) {
				System.out.println("조회할 데이터가 없습니다.");
			} else {
				do {
					JSONObject json2 = new JSONObject();
					Integer expensesId = rs.getInt("expensesId");
					Integer categoryId = rs.getInt("categoryId");
					Boolean type = rs.getBoolean("type");
					Integer money = rs.getInt("money");
					String memo = rs.getString("memo");
					Date expensesDate = rs.getDate("expensesDate");
					
					json2.put("expensesId", expensesId);
					json2.put("categoryId", categoryId);
					json2.put("type", type);
					json2.put("money", money);
					json2.put("memo", memo);
					json2.put("expensesDate", expensesDate);
					list.add(json2);
					
				} while (rs.next());
				json1.put("expensesList", list);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			pstmt.close();
		}
		return json1;
	}

	/**
	 * @author 최병민<br>
	 *         getTotalAmount : 우선 날짜 데이터 년도와 월로 분류를 해서<br>
	 *         수입이면 수입값 다 더하고 지출이면 지출값 다 더해 출력하는 기능
	 * 
	 * @param Boolean filter<br>
	 *                true = 수입 내역 불러오기(카테고리 번호 순) false = 지출 내역 불러오기(카테고리 번호 순)
	 * 
	 * @return totalAmount
	 */

	public static int getTotalAmount(Connection conn, boolean filter, Expenses expenses) throws SQLException {
		int totalAmount = 0;
		PreparedStatement pstmt = null;
		ResultSet rs = null;

		try {
			String sql = null;
			if (filter == true) {
				sql = "SELECT SUM(money) AS totalIncome FROM expenses WHERE userId = ? AND type = 1 AND YEAR(expensesDate) = YEAR(?) AND MONTH(expensesDate) = MONTH(?)";
			} else if (filter == false) {
				sql = "SELECT SUM(money) AS totalExpense FROM expenses WHERE userId = ? AND type = 0 AND YEAR(expensesDate) = YEAR(?) AND MONTH(expensesDate) = MONTH(?)";
			}
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, expenses.getUserId());
			pstmt.setDate(2, expenses.getExpensesDate());
			pstmt.setDate(3, expenses.getExpensesDate());

			rs = pstmt.executeQuery();
			if (rs.next()) {
				totalAmount = rs.getInt(filter ? "totalIncome" : "totalExpense");
				System.out.println(" Total : " + totalAmount); // 디버깅용 로그
			}

		} finally {
			if (rs != null) {
				rs.close();
			}
			if (pstmt != null) {
				pstmt.close();
			}
		}

		return totalAmount;
	}

	/**
	 * @author 최병민<br>
	 *         getTotalCategoryAmount : userId가 일치하면 수입이면 수입 수출이면 수출을 분류한 후<br>
	 *         각 카테고리 별로 분류를 한 후 날짜 데이터 년도와 월로 분류를 해서 월에 해당하는 각각의 카테고리의 합을 출력한다.
	 * @param Boolean filter<br>
	 *                true = 수입 내역 불러오기(카테고리 번호 순) false = 지출 내역 불러오기(카테고리 번호 순)
	 * 
	 * @return totalCategoryAmount
	 */
	public static int getTotalCategoryAmount(Connection conn, boolean filter, Expenses expenses) throws SQLException {
		int totalCategoryAmount = 0;
		PreparedStatement pstmt = null;
		ResultSet rs = null;

		try {
			String sql;
			if (filter) {
				sql = "SELECT SUM(money) AS totalIncome FROM expenses WHERE userId = ? AND type = 1 AND categoryId = ? AND YEAR(expensesDate) = YEAR(?) AND MONTH(expensesDate) = MONTH(?)";
			} else {
				sql = "SELECT SUM(money) AS totalExpense FROM expenses WHERE userId = ? AND type = 0 AND categoryId = ? AND YEAR(expensesDate) = YEAR(?) AND MONTH(expensesDate) = MONTH(?)";
			}
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, expenses.getUserId());
			pstmt.setInt(2, expenses.getCategoryId());
			pstmt.setDate(3, expenses.getExpensesDate());
			pstmt.setDate(4, expenses.getExpensesDate());

			rs = pstmt.executeQuery();
			if (rs.next()) {
				totalCategoryAmount = rs.getInt(filter ? "totalIncome" : "totalExpense");
				System.out.println("Total amount: " + totalCategoryAmount); // 디버깅용 로그

			}

		} finally {
			if (rs != null) {
				rs.close();
			}
			if (pstmt != null) {
				pstmt.close();
			}
		}

		return totalCategoryAmount;
	}

	/**
	 * @author 최병민 categoryTotalList : 카테고리 별 지출 총합
	 * 
	 * @return cateTotalList
	 */

	public static List<Expenses> categoryTotalList(Connection conn, Boolean filter, Expenses expenses)
			throws Exception {
		List<Expenses> cateTotalList = new LinkedList<>();
		String sql;
		PreparedStatement pstmt = null;
		try {
			if (filter.equals(true)) {
				sql = "SELECT * FROM expenses WHERE userId = ? AND Type = 1 AND MONTH(expensesDate) = MONTH(?)";
			} else if (filter.equals(false)) {
				sql = "SELECT * FROM expenses WHERE userId = ? AND Type = 0 AND MONTH(expensesDate) = MONTH(?)";
			} else {
				throw new IllegalArgumentException("불가능한 타입 값입니다. 타입 값은 true, false만 허용됩니다.");
			}
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, expenses.getUserId());
			pstmt.setDate(2, expenses.getExpensesDate());

			ResultSet rs = pstmt.executeQuery();
			if (!rs.next()) {
				System.out.println("조회할 데이터가 없습니다.");
			} else {
				do {
					Integer expensesId = rs.getInt("expensesId");
					Integer userId = rs.getInt("userId");
					Integer categoryId = rs.getInt("categoryId");
					Boolean type = rs.getBoolean("type");
					Integer money = rs.getInt("money");
					String memo = rs.getString("memo");
					Date expensesDate = rs.getDate("expensesDate");

					Expenses categoryExpenses = new Expenses(expensesId, userId, categoryId, type, money, memo,
							expensesDate);
					System.out.printf("%s", categoryExpenses);
					cateTotalList.add(categoryExpenses);
				} while (rs.next());
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			pstmt.close();
		}
		return cateTotalList;
	}

	public static List<Expenses> stacTotalList(Connection conn, Boolean filter, Expenses expenses) throws Exception {
		List<Expenses> stacCateTotalList = new LinkedList<>();
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String sql;
		try {
			if (filter.equals(true)) {
				sql = "SELECT * FROM expenses WHERE userId = ? AND Type = 1 AND (MONTH(expensesDate) = MONTH(CURRENT_DATE()) OR MONTH(expensesDate) = MONTH(CURRENT_DATE()) - 1)";
			} else if (filter.equals(false)) {
				sql = "SELECT * FROM expenses WHERE userId = ? AND Type = 0 AND (MONTH(expensesDate) = MONTH(CURRENT_DATE()) OR MONTH(expensesDate) = MONTH(CURRENT_DATE()) - 1)";
			} else {
				throw new IllegalArgumentException("불가능한 타입 값입니다. 타입 값은 true, false만 허용됩니다.");
			}

			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, expenses.getUserId());
			pstmt.setDate(2, expenses.getExpensesDate());

			rs = pstmt.executeQuery();
			if (!rs.next()) {
				System.out.println("조회할 데이터가 없습니다.");
			} else {
				do {
					Integer expensesId = rs.getInt("expensesId");
					Integer userId = rs.getInt("userId");
					Integer categoryId = rs.getInt("categoryId");
					Boolean type = rs.getBoolean("type");
					Integer money = rs.getInt("money");
					String memo = rs.getString("memo");
					Date expensesDate = rs.getDate("expensesDate");
					Expenses stacExpenses = new Expenses(expensesId, userId, categoryId, type, money, memo,
							expensesDate);
					System.out.printf("%s", stacExpenses);
					stacCateTotalList.add(stacExpenses);
				} while (rs.next());
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			pstmt.close();
		}
		return stacCateTotalList;
	}

	/**
	 * @author 김강현 statistics : 카테고리별 지출, 수입 총합
	 * 
	 * @return statistics
	 */
	public static List<Expenses> statistics(Connection conn, Expenses expenses, WebSocket socket) throws Exception {
		String sql;
		PreparedStatement pstmt = null;
		sql = "SELECT categoryId, SUM(CASE WHEN type = 1 THEN money ELSE 0 END) AS type_1_totalMoney, SUM(CASE WHEN type = 0 THEN money ELSE 0 END) AS type_0_totalMoney FROM Expenses WHERE userId = ? AND MONTH(expensesDate) = MONTH(?) GROUP BY categoryId";

		try {

			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, 1); // 유저 아이디 1강제 주입 / 테스트용
			pstmt.setDate(2, expenses.getExpensesDate());

			ResultSet rs = pstmt.executeQuery();
			if (!rs.next()) {
				System.out.println("조회할 데이터가 없습니다.");
			} else {
				do {
					Integer categoryId = rs.getInt("categoryId");
					Integer type1_money = rs.getInt("type_1_totalMoney"); // 수입
					Integer type0_money = rs.getInt("type_0_totalMoney"); // 지출

					JSONObject response = new JSONObject();

					response.put("cmd", "김~현~강");
					response.put("categoryId", categoryId);
					response.put("type1_money", type1_money);
					response.put("type0_money", type0_money);
					System.out.println(response);
					socket.send(response.toString());

				} while (rs.next());
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			pstmt.close();
		}
		return null;
	}
}
