package DTO;

import java.sql.Date;

public class Expenses {
	private Integer expensesId;
	private Integer userId;
	private Integer categoryId;
	private Boolean type; // 수입(1), 지출(0)
	private Integer money;
	private String memo;
	private Date expensesDate; // 입출금 발생 날짜

	// 혜리 - ExpensesDAO의 getExpensesList에서 사용,
	//		ExpensesServiceImpl의 updateExpenses에서 사용
	public Expenses(Integer expensesId, Integer userId, Integer categoryId, Boolean type, Integer money, String memo,
			Date expensesDate) {
		this.expensesId = expensesId;
		this.userId = userId;
		this.categoryId = categoryId;
		this.type = type;
		this.money = money;
		this.memo = memo;
		this.expensesDate = expensesDate;
	}

	// 혜리 - ExpensesServiceImpl의 insertExpenses에서 사용
	public Expenses(Integer userId, Integer categoryId, Boolean type, Integer money, String memo, Date expensesDate) {
		this.userId = userId;
		this.categoryId = categoryId;
		this.type = type;
		this.money = money;
		this.memo = memo;
		this.expensesDate = expensesDate;
	}

	// 혜리 - ExpensesServiceImpl의 deleteExpenses에서 사용
	public Expenses(Integer expensesId, Integer userId) {
		this.expensesId = expensesId;
		this.userId = userId;
	}

	// 혜리 - ExpensesServiceImpl의 getExpensesList에서 사용
	public Expenses(Integer userId, Date expensesDate) {
		this.userId = userId;
		this.expensesDate = expensesDate;
	}
	// 병민
	public Expenses(Integer userId) {
		this.userId = userId;
	}

	public Integer getExpensesId() {
		return expensesId;
	}

	public void setExpensesId(Integer expensesId) {
		this.expensesId = expensesId;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}

	public Boolean getType() {
		return type;
	}

	public void setType(Boolean type) {
		this.type = type;
	}

	public Integer getMoney() {
		return money;
	}

	public void setMoney(Integer money) {
		this.money = money;
	}

	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public Date getExpensesDate() {
		return expensesDate;
	}

	public void setExpensesDate(Date expensesDate) {
		this.expensesDate = expensesDate;
	}

	@Override
	public String toString() {
		return "Expenses [expensesId=" + expensesId + ", userId=" + userId + ", categoryId=" + categoryId + ", type="
				+ type + ", money=" + money + ", memo=" + memo + ", expensesDate=" + expensesDate + "]";
	}
}
