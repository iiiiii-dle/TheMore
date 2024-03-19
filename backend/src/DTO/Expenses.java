package DTO;

import java.sql.Date;

public class Expenses {
	private Integer accountId;
	private Integer userId;
	private Integer categoryId;
	private boolean type;		//수입(1), 지출(0)
	private Integer money;
	private String memo;
	private Date accountDate;	//입출금 발생 날짜
	
	//생성자는 필요할 때 추가할 예정
	
	public Integer getAccountId() {
		return accountId;
	}
	public void setAccountId(Integer accountId) {
		this.accountId = accountId;
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
	public boolean isType() {
		return type;
	}
	public void setType(boolean type) {
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
	public Date getAccountDate() {
		return accountDate;
	}
	public void setAccountDate(Date accountDate) {
		this.accountDate = accountDate;
	}
	
	
}
