package DTO;

import java.sql.Date;

public class Budget {
	private Integer budgetId;
	private Integer userId;
	private Integer amount;
	private Date budgetDate;
	
	public Budget() {}
	
	public Budget(Integer userId, Integer budgetId, Integer amount, Date budgetDate) {
		this.userId = userId;
		this.budgetId = budgetId;
		this.amount = amount;
		this.budgetDate = budgetDate;
	}
	
	public Budget(Integer userId, Integer budgetId) {
		this.userId = userId;
		this.budgetId = budgetId;
	}
	
	public Budget(Integer userId, Integer budgetId, Integer amount) {
		this.userId = userId;
		this.budgetId = budgetId;
		this.amount = amount;
	}
	
	public Integer getBudgetId() {
		return budgetId;
	}
	public void setBudgetId(Integer budgetId) {
		this.budgetId = budgetId;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public Integer getAmount() {
		return amount;
	}
	public void setAmount(Integer amount) {
		this.amount = amount;
	}
	public Date getBudgetDate() {
		return budgetDate;
	}
	public void setBudgetDate(Date budgetDate) {
		this.budgetDate = budgetDate;
	}

}