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
	private static final String location = "//192.168.0.73:3306/";
	private static final String databaseName = "themore"; // DB name
	private static final String userName = "idle"; // Username
	private static String password = "20240320!!"; // Password
	
//	private static final String location = "//localhost:3306/"; // 테스트용입니다.
//	private static final String databaseName = "themore"; // 테스트용입니다. 
//	private static final String userName = "kim"; // 테스트용입니다.
//	private static String password = "1234"; // 테스트용입니다.

	private static final String DB_URL = protocol + vendor + location + databaseName;
	private static final String jdbcUrl = DB_URL + "?serverTimezone = UTC";

	public static Connection connection; // Connection Interface

	// DB connection open
	private static void openConnection() {
		try {
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