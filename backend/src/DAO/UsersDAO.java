package DAO;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.LinkedList;
import java.util.List;
import DTO.Users;

public class UsersDAO {
	public UsersDAO() {}
	
	//회원 추가
	public static int insertUser(Connection conn, Users user) throws Exception{
		int result = 0;
		PreparedStatement pstmt = null;
		try {
			String sql = "INSERT INTO users (email, password, salt, nickName,joinDate, isActive, isHidden) VALUES (?, ?, ?, ?, ?, ?, ?) ";
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, user.getEmail());
			pstmt.setString(2, user.getPassword());
			pstmt.setString(3, user.getSalt());
			pstmt.setString(4, user.getNickName());
			pstmt.setDate(5, user.getJoinDate());
			pstmt.setBoolean(6, user.getIsActive());
			pstmt.setBoolean(7, user.getIsHidden());
			result = pstmt.executeUpdate();
		}catch(Exception e) {
			e.printStackTrace();
		}finally {
			pstmt.close();
		}
		System.out.println("UsersDAO - insertUser: " + result);
		return result;
	}
	
	// 회원 삭제
	public static int deleteUser(Connection conn, Users user) throws Exception{
		int result = 0;
		PreparedStatement pstmt = null;
		try {
			String sql = "DELETE FROM users WHERE userId = ?";
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, user.getUserId());
			result = pstmt.executeUpdate();
		}catch(Exception e) {
			e.printStackTrace();
		}finally {
			pstmt.close();
		}
		System.out.println("UsersDAO - deleteUser: " + result);
		return result;
	}
	// 회원 수정
	public static int updateUser(Connection conn, Users user) throws Exception{
		int result = 0;
		PreparedStatement pstmt = null;
		try {
			String sql = "UPDATE users SET email = ?, password = ?, salt = ? , nickName =? , joinDate = ?, isActive = ?, isHidden = ?, WHERE userId = ?";
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, user.getEmail());
			pstmt.setString(2, user.getPassword());
			pstmt.setString(3, user.getSalt());
			pstmt.setString(4, user.getNickName());
			pstmt.setDate(5, user.getJoinDate());
			pstmt.setBoolean(6, user.getIsActive());
			pstmt.setBoolean(7, user.getIsHidden());
			pstmt.setInt(8, user.getUserId());
			result = pstmt.executeUpdate();
		}catch(Exception e) {
			e.printStackTrace();
		}finally {
			pstmt.close();
		}
		System.out.println("UsersDAO - updateUser: " + result);
		return result;
	}
	// 특정 회원 조회
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
}
