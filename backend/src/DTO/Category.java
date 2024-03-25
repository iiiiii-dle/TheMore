package DTO;

public class Category {
	private Integer categoryId;
	private String categoryName;
	private Boolean categoryType;
		
	public Integer getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	public Boolean getCategoryType() {
		return categoryType;
	}
	public void setCategoryType(Boolean categoryType) {
		this.categoryType = categoryType;
	}
	
}
