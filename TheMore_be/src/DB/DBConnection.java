package DB;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * DBConnection
 * : MySQL DB connection class
 * 
 * @author 서혜리
 */
public class DBConnection {
	// field
	private static final String protocol = "jdbc";
	private static final String vendor = ":mysql:";
	private static final String location = "//...:/";
	private static final String databaseName = ""; // DB name
	private static final String userName = ""; // Username
	private static String password = ""; // Password

	private static final String DB_URL = protocol + vendor + location + databaseName;
	private static final String jdbcUrl = DB_URL + "?serverTimezone = UTC";

	private static final String driver = "com.mysql.cj.jdbc.Driver"; // Driver ref

	public static Connection connection; // Connection Interface

	// DB connection open
	public static void openConnection() {
		try {
			Class.forName(driver); // Locate Driver
			connection = DriverManager.getConnection(jdbcUrl, userName, password);
			System.out.println("Connection successful!\n\n");
		} catch (Exception e) {
			System.out.println("Error : " + e.getMessage());
			e.printStackTrace();
		}
	}

	// DB connection close
	public static void closeConnection() {
		try {
			connection.close();
			System.out.println("\n\nConnection closed!");
		} catch (Exception e) {
			System.out.println("Error : " + e.getMessage());
		}
	}

	// Connection getter
	public static Connection getConnection() {
		if (connection == null) {
            try {
                // 데이터베이스 연결 정보를 사용하여 Connection 생성
                connection = DriverManager.getConnection(jdbcUrl, userName, password);
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return connection;
	}
}