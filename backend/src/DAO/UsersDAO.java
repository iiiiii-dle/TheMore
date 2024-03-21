package DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import DTO.Users;

public class UsersDAO {
	public UsersDAO() {}
	
	
	/**
	 * @author 전민재<br>
	 * 			insertUser : 회원 정보를 db에 저장하는 기능<br>
	 * 
	 * @return result : db에 저장이 성공적으로 되면 1을 반환
	 */

	public static int insertUser(Connection conn, Users user) throws Exception{
		int result = 0;
		PreparedStatement pstmt = null;
		try {
			String sql = "INSERT INTO users (email, password, salt, nickName,joinDate) VALUES (?, ?, ?, ?, ?) ";
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, user.getEmail());
			pstmt.setString(2, user.getPassword());
			pstmt.setString(3, user.getSalt());
			pstmt.setString(4, user.getNickName());
			pstmt.setDate(5, user.getJoinDate());

			result = pstmt.executeUpdate();
		}catch(Exception e) {
			e.printStackTrace();
		}finally {
			pstmt.close();
		}
		System.out.println("UsersDAO - insertUser: " + result);
		return result;
	}
	

	// 회원 수정
	public static int updateUser(Connection conn, Users user) throws Exception{
		int result = 0;
		PreparedStatement pstmt = null;
		try {
			String sql = "UPDATE users SET email = ?, password = ?, salt = ? , nickName =? , joinDate = ?, isHidden = ?, WHERE userId = ?";
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, user.getEmail());
			pstmt.setString(2, user.getPassword());
			pstmt.setString(3, user.getSalt());
			pstmt.setString(4, user.getNickName());
			pstmt.setDate(5, user.getJoinDate());
			pstmt.setBoolean(6, user.getIsHidden());
			pstmt.setInt(7, user.getUserId());
			result = pstmt.executeUpdate();
		}catch(Exception e) {
			e.printStackTrace();
		}finally {
			pstmt.close();
		}
		System.out.println("UsersDAO - updateUser: " + result);
		return result;
	}
	/**
	 * @author 전민재<br>
	 * 			getUser : db에 저장된 회원 불러오기<br>
	 * 
	 * @return result : db에 불러오기를 성공적으로 되면 1을 반환
	 */
	public static Users getUser(Connection conn, int userId) throws Exception{
		Users user = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		try {
			String sql = "SELECT * FROM users WHERE userId = ?";
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, userId);
			rs = pstmt.executeQuery();
			if(rs.next()) {
				user = new Users();
				user.setUserId(rs.getInt("userId"));
				user.setEmail(rs.getString("email"));
				user.setPassword(rs.getString("password"));
				user.setSalt(rs.getString("salt"));
				user.setNickName(rs.getString("nickName"));
				user.setJoinDate(rs.getDate("joinDate"));
				user.setIsActive(rs.getBoolean("isActive"));
				user.setIsHidden(rs.getBoolean("isHidden"));
			}
		}catch(Exception e) {
			e.printStackTrace();
		}finally {
			rs.close();
			pstmt.close();
		}
		return user;
	}
	
	/**
	 * @author 이경석<br>
	 * 			stopUser : 유저 계정을 비활성화, 숨김 처리 (계정 탈퇴)<br>
	 * 
	 * @return result : User 계정 하나의 isActivate, isHidden이 false로 변경되며 1을 반환
	 */
	public int stopUser(Connection conn, Users user) throws SQLException {
		
		int result = 0;
		
		PreparedStatement pstmt = null;
		
		try {
			String query = "UPDATE Users SET isActivate=?, isHidden=? WHERE userId=?";
			
			pstmt = conn.prepareStatement(query);
			
			pstmt.setBoolean(1, false);
			pstmt.setBoolean(2, true);
			pstmt.setInt(3, user.getUserId());
			
			result = pstmt.executeUpdate();
		} catch(Exception e) {
			e.printStackTrace();
		} finally {
			pstmt.close();
		}
		
		return result;
		
	}
	
	/**
	 * @author 이경석<br>
	 * 			getUser : db에 저장된 회원 불러오기<br>
	 * 
	 * @return result : db에 불러오기를 성공적으로 되면 유저를 반환
	 */
	public static Users getUserByEmail(Connection conn, String email) throws Exception{
		Users user = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		try {
			String sql = "SELECT * FROM users WHERE email = ?";
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, email);
			rs = pstmt.executeQuery();
			if(rs.next()) {
				user = new Users();
				user.setUserId(rs.getInt("userId"));
				user.setEmail(rs.getString("email"));
				user.setPassword(rs.getString("password"));
				user.setSalt(rs.getString("salt"));
				user.setNickName(rs.getString("nickName"));
				user.setJoinDate(rs.getDate("joinDate"));
				user.setIsActive(rs.getBoolean("isActive"));
				user.setIsHidden(rs.getBoolean("isHidden"));
			}
		}catch(Exception e) {
			e.printStackTrace();
		}finally {
			rs.close();
			pstmt.close();
		}
		return user;
	}
	
	
}
