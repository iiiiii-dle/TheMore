package DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Date;
import java.util.LinkedList;
import java.util.List;

import DTO.Budget;

public class BudgetDAO {

	public BudgetDAO() {}
	/**
	 * @author 최병민<br>
	 * 			insertBudget : 예산 내역을 DB에 저장하는 기능<br>
	 * 
	 * @return result : db에 저장이 성공적이면 1을 반환
	 */
	public static int insertBudget(Connection conn, Budget budget) throws Exception {
		int result = 0;
		PreparedStatement pstmt = null;
		try {
			String sql = "INSERT INTO budget (userId,budgetId, amount, month) VALUES ( ?,?, ?, ?)";
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setInt(1, budget.getUserId());
			pstmt.setInt(2, budget.getBudgetId());
			pstmt.setInt(3, budget.getAmount());
			pstmt.setDate(4, budget.getBudgetDate());
			
			result = pstmt.executeUpdate();
			
		}catch(Exception e) {
			e.printStackTrace();
		}finally {
			pstmt.close();
		}
		return result;
	}
	/**
	 * @author 최병민<br>
	 * 			deleteBudget : 예산 내역을 DB에 삭제하는 기능<br>
	 * 
	 * @return result : db에 저장이 성공적이면 1을 반환
	 */
	public static int deleteBudget(Connection conn, Budget budget) throws Exception {
		int result = 0;
		PreparedStatement pstmt = null;
		try {
			String sql = "DELETE FROM budget WHERE userId = ? AND budgetId = ?";
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setInt(1, budget.getUserId());
			pstmt.setInt(2, budget.getBudgetId());
			
			result = pstmt.executeUpdate();
		}catch(Exception e) {
			e.printStackTrace();
		}finally {
			pstmt.close();
		}
		return result;
	}
	
	/**
	 * @author 최병민<br>
	 * 			updateBudget : 예산 내역을 수정해서 DB에 저장하는 기능<br>
	 * 
	 * @return result : db에 수정이 성공적이면 1을 반환
	 */
	public static int updateBudget(Connection conn, Budget budget) throws Exception {
		int result = 0;
		PreparedStatement pstmt = null;
		try {
			String sql = "UPDATE budget SET amount = ? WHERE userId = ? AND budgetId = ?";
			
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setInt(1, budget.getAmount());
			pstmt.setInt(2, budget.getUserId());
			pstmt.setInt(3, budget.getBudgetId());
			
			result = pstmt.executeUpdate();
			
		}catch(Exception e){
			e.printStackTrace();
		}finally {
			pstmt.close();
		}
		return result;
	}
	
	/**
	 * @author 최병민<br>
	 * 			bringBudget : 예산 내역을 userId와 month 를 통해서 가져오는 기능<br>
	 * 
	 * @return result : budgetList
	 */
	
	public static List<Budget> bringBudget(Connection conn, int userId, Date budgetDate) throws Exception {
	    List<Budget> budgetList = new LinkedList<>();
	    String sql = "SELECT * FROM budget WHERE userId = ? AND MONTH(expensesDate) = MONTH(?)";
	    PreparedStatement pstmt = null;
	    ResultSet rs = null;
	    try {
	        pstmt = conn.prepareStatement(sql);
	        pstmt.setInt(1, userId);
	        pstmt.setDate(2, budgetDate);
	        
	        rs = pstmt.executeQuery();
	        
	        while (rs.next()) {
	            Budget budget = new Budget();
	            
	            budget.setUserId(rs.getInt("userId"));
	            budget.setAmount(rs.getInt("amount"));
	            budget.setBudgetDate(rs.getDate("budgetDate"));
	            
	            budgetList.add(budget);
	        }
	    } finally {
	        if (rs != null) {
	            rs.close();
	        }
	        if (pstmt != null) {
	            pstmt.close();
	        }
	    }
	    return budgetList;
	}

}
