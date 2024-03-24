import { Socket } from "../js/socket/socket.js";


//class들화 시킨 구현들
// 수입또는 지출에 따라 작성되는 차트js폼을 구성
// class AllTotal{ 
//     constructor(socket){
//
//     this.expendCon = document.querySelector("#expendCon");

//     
// } }
class 수입지출{
    constructor(){
        
        this.state = document.querySelector(".acc");
        this.changeState = '';
        if(window.location.href.indexOf("income") > 0){
            this.changeState = "수입"; 
        }else if(window.location.href.indexOf("income") < 0){
            this.changeState = "지출";
        }
    }
        getState() {
            return this.changeState;
        }
}
class 카테고리이름바꾸기 {
    constructor(params) {
        params.list.forEach((element,i) => {
            switch (element.categoryId) {
                case 1:
                    element.categoryId = "자기개발"
                    break;
                case 2:
                    element.categoryId = "문화생활"
                    break;
                case 3:
                    element.categoryId = "금융"
                    break;
                case 4:
                    element.categoryId = "보험"
                    break;
                case 5:
                    element.categoryId = "주거"
                    break;
                case 6:
                    element.categoryId = "쇼핑"
                    break;
                case 7:
                    element.categoryId = "통신"
                    break;
                case 8:
                    element.categoryId = "교통"
                    break;
                case 9:
                    element.categoryId = "식비"
                    break;
                case 10:
                    element.categoryId = "기타"
                    break;
                case 11:
                    element.categoryId = "용돈"
                    break;
                case 12:
                    element.categoryId = "금융소득"
                    break;
                case 13:
                    element.categoryId = "상여금"
                    break;
                case 14:
                    element.categoryId = "월급"
                    break;
            
                default:
                    break;
            }
        });
    }
}

class 원형그래프 { 
// 수입이 1 지출이 0
    constructor(json){
        new 카테고리이름바꾸기(json);
        const state = new 수입지출().getState();
        this.mychart = document.querySelector("#myChart");
        this.expendCon = document.querySelector("#expendCon")
        let total = 0;


        // 차트 옵션
        
        const data_grap = {
            labels: [],
            datasets: [{
                label: state,
                data: [],
                backgroundColor: [
                    '#FDDAEC', '#FBB4AE', '#B3CDE3', '#DECBE4', '#F2F2F2', '#FFFFCC', '#FED9A6', '#CCEBC5', '#E5D8BD'
                ],
                hoverOffset: 4
            }]
        };
        

        if(state === "지출" ){
            json.list.sort((a, b) => b.type0_money - a.type0_money);
        }else if(state ==="수입"){
            json.list.sort((a, b) => b.type1_money - a.type1_money);
        }

        json.list.forEach((element,i) => {
            
            if(state === "지출" && (element.type0_money > 0)){//지출
                console.log("state=> " +state);
                data_grap.labels.push(json.list[i].categoryId);
                data_grap.datasets[0].data.push(json.list[i].type0_money);
                total += json.list[i].type0_money;
                
                
            }else if(state === "수입" && (element.type1_money > 0) ){ //수입
                data_grap.labels.push(json.list[i].categoryId);
                data_grap.datasets[0].data.push(json.list[i].type1_money);
                total += json.list[i].type1_money;
            }
        });
        
        
        const options_grap = {
            responsive: false,
            maintainAspectRatio: false,
            cutout: '50%', // 도넛의 중앙을 빈 공간으로 설정할 수 있습니다.
        };
        const ctx_grap = document.getElementById('myChart').getContext('2d');
        const myChart_grap = new Chart(ctx_grap, {
            type: 'doughnut',
            data: data_grap,
            options: options_grap
        });

        document.getElementById("expendCon").value = total;
    } 

}




class 막대그래프{ 
    constructor(json){
        new 카테고리이름바꾸기(json);
        const state = new 수입지출().getState();
        this.my_stac = document.querySelector('#myStacChart');

        if(state === "지출" ){
            json.list.sort((a, b) => b.type0_money - a.type0_money);
        }else if(state ==="수입"){
            json.list.sort((a, b) => b.type1_money - a.type1_money);
        }




        const data_stac = {
            labels: ["이번 달","전 달"],
        }
    } 


}




class 현재날짜{  //이름은 아마 통계로 바꿀듯 현재 년월을 기준으로 카테고리별 나누어주니까
    constructor(host, port){
    this.socket = new Socket(host, port ,this.callback.bind(this));

    this.today = new Date();
    this.nowYear = this.today.getFullYear();
    this.nowMonth = this.today.getMonth()+1;
    this.nowDay = this.today.getDate();
    
    
    this.month = document.querySelector("#month");
    this.preMonth = document.querySelector("#prevMonth").addEventListener("click",this.preMonth.bind(this));
    this.nextMonth = document.querySelector("#nextMonth").addEventListener("click",this.nextMonth.bind(this));
    
    // 현재 년 월 생성
    this.socket.socket.addEventListener('open', () => {
        
        this.generateDate(this.nowYear, this.nowMonth);
    })


}
    //'대문짝만한 현재 년월을 가져온다. 그리고 JSON으로 보내주자
    callback(data){
        const json = JSON.parse(data);
        console.log("정렬 전 - json");
        console.log(json);

        new 원형그래프(json);
        if(json.cmd == "원형그래프"){

        }else if(json.cmd == "직선그래프"){

        }
        // const state = json.cmd; // 김현강~

        // console.log("state");
        // console.log(state);
    }
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
            'cmd': 'grap',
            'cmd2': 'grapList',
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
    const a = new 현재날짜("localhost", 9000);
}

document.addEventListener("DOMContentLoaded",()=>{
    initialize();
});
export { 현재날짜 }