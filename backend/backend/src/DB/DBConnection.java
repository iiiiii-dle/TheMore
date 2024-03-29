package DB;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * DBConnection
 * : MySQL DB connection class
 * 
 * @author 서혜리, 이경석
 */
public class DBConnection {
	private static final String protocol = "jdbc";
	private static final String vendor = ":mysql:";
	private static final String location = "//192.168.0.73:3306/";
	private static final String databaseName = "themore";
	private static final String userName = "idle";
	private static String password = "20240320!!";

	private static final String DB_URL = protocol + vendor + location + databaseName;
	private static final String jdbcUrl = DB_URL + "?serverTimezone = UTC";

	public static Connection connection; // Connection Interface

	private static void openConnection() {
		try {
			connection = DriverManager.getConnection(jdbcUrl, userName, password);
			System.out.println("Connection successful!\n\n");
		} catch (Exception e) {
			System.out.println("Error : " + e.getMessage());
			e.printStackTrace();
		}
	}

	public static void closeConnection() {
		try {
			connection.close();
			System.out.println("\n\nConnection closed!");
		} catch (Exception e) {
			System.out.println("Error : " + e.getMessage());
		}
	}

	public static Connection getConnection() {
		if (connection == null) {
            try {
                connection = DriverManager.getConnection(jdbcUrl, userName, password);
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return connection;
	}
}