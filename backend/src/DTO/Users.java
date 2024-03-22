package DTO;

import java.sql.Date;

public class Users {
	private Integer userId;
	private String email;
	private String password;
	private String salt;		//복호화 난수
	private String nickName;
	private Date joinDate;		//가입일
	private Boolean isActive;	//계정활성여부(탈퇴 안 하면 1, 탈퇴 시 0)
	private Boolean isHidden;	//정보공개여부(공개 시 0, 비공개 시 1)
	
	
	
	//생성자는 필요할 때 추가할 예정
	
	public Users() {
		
	}
	public Users(String email, String password, String salt, String nickname, Boolean isHidden) {
		this.email = email;
		this.password = password;
		this.salt = salt;
		this.nickName = nickname;
		this.isHidden = isHidden;
	}
	
	
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getSalt() {
		return salt;
	}
	public void setSalt(String salt) {
		this.salt = salt;
	}
	public String getNickName() {
		return nickName;
	}
	public void setNickName(String nickName) {
		this.nickName = nickName;
	}
	public Date getJoinDate() {
		return joinDate;
	}
	public void setJoinDate(Date joinDate) {
		this.joinDate = joinDate;
	}
	public Boolean getIsActive() {
		return isActive;
	}
	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}
	public Boolean getIsHidden() {
		return isHidden;
	}
	public void setIsHidden(Boolean isHidden) {
		this.isHidden = isHidden;
	}
	
}
