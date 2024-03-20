package DTO;

import java.sql.Date;

public class Budget {
	private Integer budgetId;
	private Integer userId;
	private Integer amount;
	private Date month;
	
	//생성자는 필요할 때 추가할 예정
	public Budget(Integer budgetId, Integer userId, Integer amount, Date month) {
		this.budgetId = budgetId;
		this.userId = userId;
		this.amount = amount;
		this.month = month;
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
	public Date getMonth() {
		return month;
	}
	public void setMonth(Date month) {
		this.month = month;
	}

}