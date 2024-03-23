import { Socket } from "../js/socket/socket.js";


//class들화 시킨 구현들
// 수입또는 지출에 따라 작성되는 차트js폼을 구성
// class AllTotal{ 
//     constructor(socket){
//
//     this.expendCon = document.querySelector("#expendCon");

//     
// } }



// class 원형그래프{ constructor(){

// } }




// class 막대그래프{ constructor(){

// } }




class 현재날짜{  //이름은 아마 통계로 바꿀듯 현재 년월을 기준으로 카테고리별 나누어주니까
    constructor(socket){
    this.socket = socket;
    this.today = new Date();
    this.nowYear = this.today.getFullYear();
    this.nowMonth = this.today.getMonth()+1;
    this.nowDay = this.today.getDate();
    
    
    this.month = document.querySelector("#month");
    this.preMonth = document.querySelector("#prevMonth").addEventListener("click",this.preMonth.bind(this));
    this.nextMonth = document.querySelector("#nextMonth").addEventListener("click",this.nextMonth.bind(this));
    
    // 현재 년 월 생성
        this.generateDate(this.nowYear, this.nowMonth);


}
    //'대문짝만한 현재 년월을 가져온다. 그리고 JSON으로 보내주자
    generateDate(y, m){
        this.month.textContent = `${y}년 ${m}월`;


        /*  보여줄테이블은 categoryId(카테고리번호), SUM(money), type(수입/지출)이다.
            SELECT 
                    categoryId AS 카테고리아이디,
                    SUM(CASE WHEN type = 1 THEN money ELSE 0 END) AS 수입,
                    SUM(CASE WHEN type = 0 THEN money ELSE 0 END) AS 지출
                FROM 
                    Expenses    
                WHERE 
                    userId = 1
                    AND MONTH(expensesDate) = 3
                GROUP BY 
            categoryId;

        */
        //쿼리문에 보낼 데이터는 userId(로그인한유저)와 expensesDate(현재달)이다.
        const jsonForm = {
            'cmd': '김강~형',
            'cmd2': '그래_동생아',
            'userId': sessionStorage.getItem('userId'),
            'expensesDate': `${this.nowYear}-${this.nowMonth}-${this.nowDay}`
        };
        const jsonData = JSON.stringify(jsonForm);
        //debug
        console.log("[statistics.js-generateDate()] jsonData ->>>>"+jsonData);
        // 아직 보내기 전
        console.log("[statistics.js-generateDate()] this.socket >>>>> " + this.socket);
        this.socket.sendMessage(jsonData);
    }
    preMonth() { // "<" 누르면 월이 1씩 줄어든다. 1보다 작으면 12부터 다시시작
        this.nowMonth--;
        if(this.nowMonth < 1){
            this.nowMonth = 12;
            this.nowYear--;
        }
        this.generateDate(this.nowYear, this.nowMonth);
    }
    nextMonth(){ // ">" 누르면 월이 1씩 늘어남. 12보다 크면 1부터 다시 시작
        this.nowMonth++;
        if(this.nowMonth > 12){
            this.nowMonth = 1;
            this.nowYear++;
        }
        this.generateDate(this.nowYear, this.nowMonth);
    }
}

function initialize() {
    const socket = new Socket("localhost", 9000, ()=>{});
    console.log("[statistics.js-initialize()] 손모가지가 아파요");
    // const allTotal = new AllTotal(socket);
    // const 원그래프 = new 원형그래프(socket);
    // const 막그래프 = new 막대그래프(socket);
    const 월변경 = new 현재날짜(socket);
    // 월변경.generateDate(월변경.nowYear,월변경.nowMonth);
}

document.addEventListener("DOMContentLoaded",()=>{
    initialize();
});
export { 현재날짜 }