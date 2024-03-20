package DAO;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.LinkedList;
import java.util.List;

import DB.DBConnection;
import DTO.Expenses;

public class ExpensesDAO {
	
	public ExpensesDAO() {}
	
	/**
	 * @author 서혜리<br>
	 * 			insertExpenses : 수입 지출 내역을 DB에 저장하는 기능<br>
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
		} catch(Exception e) {
			e.printStackTrace();
		} finally {
			pstmt.close();
		}
		System.out.println("ExpensesDAO: " + result);
		return result;
	}
	
	/**
	 * @author 서혜리<br>
	 * 			deleteExpenses : 수입 지출 내역을 DB에서 삭제하는 기능<br>
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
			
		} catch(Exception e) {
			e.printStackTrace();
		} finally {
			pstmt.close();
		}
		System.out.println("ExpensesDAO: " + result);
		return result;
	}
	
	/**
	 * @author 서혜리<br>
	 * 			updateExpenses : 수입 지출 내역을 수정해서 DB에 저장하는 기능<br>
	 * 
	 * @return result : db에 업데이트가 성공적으로 완료되면 1을 반환
	 */
	public static int updateExpenses(Connection conn, Expenses expenses) throws Exception {
		int result = 0;
		PreparedStatement pstmt = null;
		try {
			String sql = "update expenses set categoryId = ?, type = ?, money =?, memo =?, accountDate = ? where userId = ? and expensesId = ?";

			pstmt = conn.prepareStatement(sql);

			pstmt.setInt(1, expenses.getCategoryId());
			pstmt.setBoolean(2, expenses.getType());
			pstmt.setInt(3, expenses.getMoney());
			pstmt.setString(4, expenses.getMemo());
			pstmt.setInt(5, expenses.getUserId());
			pstmt.setInt(6, expenses.getExpensesId());

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
	 * 			getExpensesList : 수입/지출 내역을 DB에서 불러오는 기능<br>
	 * 
	 * @param Boolean filter<br>
	 * 				  true = 수입 내역 불러오기(카테고리 번호 순)
	 * 				  false = 지출 내역 불러오기(카테고리 번호 순)
	 * 
	 * @return expensesList
	 */
	public static List<Expenses> getExpensesList(Connection conn, Boolean filter, Expenses expenses) throws Exception {
		List<Expenses> expensesList = new LinkedList<>();
		String sql;
		PreparedStatement pstmt = null;
		try {
			if(filter.equals(true)) {			// 수입일 때 카테고리 번호 내림차순으로 내역 조회
				sql = "select * from expenses where userId = ? and type = 1 order by categoryId DESC";
			} else if(filter.equals(false)) {	// 지출일 때 카테고리 번호 내림차순으로 내역 조회
				sql = "select * from expenses where userId = ? and type = 0 order by categoryId DESC";
			} else {
				throw new IllegalArgumentException("불가능한 타입 값입니다. 타입 값은 true, false만 허용됩니다.");
			}
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, expenses.getUserId());
			
			ResultSet rs = pstmt.executeQuery();
			if(!rs.next()) {
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
					
					Expenses newExpenses = new Expenses(expensesId, userId, categoryId, type, money, memo, expensesDate);
					System.out.printf("%s", newExpenses);
					expensesList.add(newExpenses);
				} while(rs.next());
			}
		} catch(Exception e) {
			e.printStackTrace();
		} finally {
			pstmt.close();
		}
		return expensesList;
	}
	/**
	 * @author 최병민<br>
	 * 			getTotalAmount : 수입이면 수입값 다 더하고 지출이면 지출값 다 더해 출력하는 기능<br>
	 * 
	 * @param Boolean isIncome<br>
	 * 				  true = 수입 내역 불러오기(카테고리 번호 순)
	 * 				  false = 지출 내역 불러오기(카테고리 번호 순)
	 * 
	 * @return totalAmount 
	 */
	
	public static int getTotalAmount(Connection conn, boolean isIncome, Expenses expenses) throws Exception {
	    int totalAmount = 0;
	    PreparedStatement pstmt = null;
	    ResultSet rs = null;
	    
	    try {
	        String sql;
	        if (isIncome) {
	            sql = "SELECT SUM(money) AS totalIncome FROM expenses WHERE userId = ? AND type = 1";
	        } else {
	            sql = "SELECT SUM(money) AS totalExpense FROM expenses WHERE userId = ? AND type = 0";
	        }
	        pstmt = conn.prepareStatement(sql);
	        pstmt.setInt(1, expenses.getUserId());
	        
	        rs = pstmt.executeQuery();
	        if (rs.next()) {
	            totalAmount = rs.getInt(isIncome ? "totalIncome" : "totalExpense");
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

}
