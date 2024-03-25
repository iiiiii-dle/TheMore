let today = new Date();
console.log(today);
const transMonth = document.querySelector("#month");
const prevMonth = document.querySelector("#prevMonth");
const nextMonth = document.querySelector("#nextMonth");
let nowMonth = today.getMonth()+1;
let nowYear = today.getFullYear();
let nowDay = today.getDate();
let jsonDate = `${nowYear}-${nowMonth}-${nowDay}`; // json에 보낼 데이터용
transMonth.innerHTML = `${today.getFullYear()}년 ${nowMonth}월` ;
prevMonth.addEventListener("click", ()=>{
    nowMonth--;
    if(nowMonth < 1 ){
        nowMonth = 12;
        nowYear--;
    }
    transMonth.innerHTML = `${nowYear}년 ${nowMonth}월`;
});
nextMonth.addEventListener("click", ()=>{
    nowMonth++;
    if(nowMonth > 12){
        nowMonth = 1;
        nowYear++;
    }
    transMonth.innerHTML = `${nowYear}년 ${nowMonth}월`;
});