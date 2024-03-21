
class Calendar {
    constructor() {
        this.quote = new Quote();
        this.expensesBox = new ExpensesBox();
        // DOM 요소 찾기
        this.calendar = document.querySelector('.calendar');
        this.calendarDays = document.querySelector('.calendar-days');
        this.calendarHeaderYear = document.querySelector('#year');
        this.calendarBodyMonth = document.querySelector('#month');
        this.todayShowTime = document.querySelector('.time-formate');
        this.todayShowDate = document.querySelector('.date-formate');

        // 현재 날짜 설정
        this.currentDate = new Date();
        this.currentMonth = this.currentDate.getMonth();
        this.currentYear = this.currentDate.getFullYear();

        // 이벤트 리스너 추가
        document.querySelector('#pre-year').addEventListener('click', this.prevYear.bind(this));
        document.querySelector('#next-year').addEventListener('click', this.nextYear.bind(this));
        document.querySelector('#pre-month').addEventListener('click', this.prevMonth.bind(this));
        document.querySelector('#next-month').addEventListener('click', this.nextMonth.bind(this));

        // 캘린더 생성
        this.generateCalendar(this.currentMonth, this.currentYear);
    }

    // 이전 년도로 이동
    prevYear() {
        this.currentYear--;
        this.generateCalendar(this.currentMonth, this.currentYear);
    }

    // 다음 년도로 이동
    nextYear() {
        this.currentYear++;
        this.generateCalendar(this.currentMonth, this.currentYear);
    }

    // 이전 달로 이동
    prevMonth() {
        this.currentMonth = (this.currentMonth - 1 + 12) % 12;
        if (this.currentMonth === 11) {
            this.currentYear--;
        }
        this.generateCalendar(this.currentMonth, this.currentYear);
    }

    // 다음 달로 이동
    nextMonth() {
        this.currentMonth = (this.currentMonth + 1) % 12;
        if (this.currentMonth === 0) {
            this.currentYear++;
        }
        this.generateCalendar(this.currentMonth, this.currentYear);
    }

    // 윤년 계산
    isLeapYear(year) {
        return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0);
    }

    // 2월 날짜 반환
    getFebDays(year) {
        return this.isLeapYear(year) ? 29 : 28;
    }

    // 캘린더 생성
    generateCalendar(month, year) {
        const month_names = [
            '1월', '2월', '3월', '4월', '5월', '6월',
            '7월', '8월', '9월', '10월', '11월', '12월',
        ];
        this.calendarDays.innerHTML = '';
        const daysOfMonth = [31, this.getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const firstDay = new Date(year, month);

        this.calendarHeaderYear.innerHTML = year;
        this.calendarBodyMonth.innerHTML = month_names[month];

        for (let i = 0; i <= daysOfMonth[month] + firstDay.getDay() - 1; i++) {
            let day = document.createElement('div');
            if (i >= firstDay.getDay()) {
                day.innerHTML = i - firstDay.getDay() + 1;
                if (i - firstDay.getDay() + 1 === this.currentDate.getDate() &&
                    year === this.currentDate.getFullYear() &&
                    month === this.currentDate.getMonth()) {
                    day.classList.add('current-date');
                }
            }
            this.calendarDays.appendChild(day);
        }
    }

    displayExpenseBox() {
        this.calendarDays.childNodes.forEach(day => { // calendarDays의 자식 요소에 대해 forEach를 사용
            day.addEventListener('click', () => {
                const expensesBoxStyle = getComputedStyle(this.expensesBox.expensesBox1);
                if (expensesBoxStyle.display === 'block') {
                    this.expensesBox.expensesBox1.style.display = 'none';
                    this.quote.quote.style.display = 'block';
                } else {
                    this.quote.quote.style.display = 'none';
                    this.expensesBox.expensesBox1.style.display = 'block';
                }

                this.quote.updateQuote();
            });
        });
    }
}

class Quote {
    constructor() {
        this.quote = document.querySelector('#quote');
        this.quotes = [
            '"한 푼 아낀 것은 한 푼 <br> 번 것이나 마찬가지다." <br> <br> - 벤자민 프랭클린',
            '"버는 것보다 적게 쓰는 것을 안다면 <br> 현자의 돌을 가진 것과 같다." <br> <br> - 벤자민 프랭클린',
            '"절약하지 않는 자는 <br> 고뇌하게 될 것이다." <br> <br> - 공자',
            '"돈 생각을 떨쳐내는 유일한 <br> 방법은 돈을 많이 갖는 것이다." <br> <br> - 이디스 워튼',
            '"가난에 대한 두려움이 삶을 <br> 지배하도록 내버려두면, <br> 그 대가로 당신은 먹기는 할 것이나 <br> 살지는 못할 것이다." <br> <br> - 조지 버나드쇼',
            '"돈에 대해 쉽게 사는 방법은 <br> 생활수준을 형편보다 <br> 한 단계 낮추는 것이다." <br> <br> - 헨리 테일러 경',
            '"돈이 전부는 아니지만, <br> 그만한 게 없다." <br> <br> - 메이웨더',
            '"돈지갑의 밑바닥이 드러났을 때의 <br> 절약은 이미 늦은 행위다." <br> <br> - 세네카',
            '"검약은 멋진 수입이다." <br> <br> - 에라스무스',
            '"근면은 부유의 오른손이요, 절약은 그 왼손이다." <br> <br> - J.레이'
        ];

        this.updateQuote();
    }

    updateQuote() {
        const randomQuote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
        this.quote.innerHTML = randomQuote;
    }
}

class ExpensesBox {
    constructor() {
        this.expenseAdd = new ExpenseAdd();
        this.expensesBox1 = document.querySelector('#expensesBox1');
        this.expenseList = document.querySelector('.expenseList');
        this.incomeLists = document.querySelector('.incomeLists');
        this.expenseList.style.display = 'none';
        // this.incomeLists.style.display = 'none';

        this.outcomeBtn = document.querySelector('.outcomeBtn');
        this.incomeBtn = document.querySelector('.incomeBtn');
        /* 채림 */
        this.expensesBox = document.querySelector('.expensesBox');
        this.addButton = document.querySelector('#addListBtn');
        this.expenseAdd = document.querySelector('.expenseAdd');
        this.categorys = document.querySelector('.categorys');
        this.amount = document.querySelector('.amount');
        this.detail = document.querySelector('.detail');
        this.cancelBtn = document.querySelector('.cancelBtn');
        this.commitBtn = document.querySelector('.commitBtn');
        /*  */

        this.clickOutcomeBtn = this.clickOutcomeBtn.bind(this);
        this.clickIncomeBtn = this.clickIncomeBtn.bind(this);

        // 요소가 제대로 찾아졌을 때 버튼 클릭 이벤트를 바인딩합니다.
        this.clickOutcomeBtn();
        this.clickIncomeBtn();
        this.clickAddListBtn();
    }

    clickOutcomeBtn() {
        this.outcomeBtn.addEventListener('click', () => { // 화살표 함수로 변경
            this.expenseList.style.display = 'block';
            // this.incomeLists.style.display = 'none';
        });
    }

    clickIncomeBtn() {
        this.incomeBtn.addEventListener('click', () => { // 화살표 함수로 변경
            // this.incomeLists.style.display = 'block';
            this.expenseList.style.display = 'none';
        });
    }

    /* 채림 */
    clickAddListBtn() {
        this.addButton.addEventListener('click', () => {
            // const expenseAddBoxStyle = getComputedStyle(this.expenseAdd);
            this.expensesBox1.style.display = 'none';
            this.expenseAdd.style.display = 'block';
            this.categorys.classList.add('hidden'); // 안보이기
            this.amount.classList.add('hidden'); // 안보이기
            this.detail.classList.add('hidden'); // 안보이기
            this.cancelBtn.classList.add('hidden'); // 안보이기
            this.commitBtn.classList.add('hidden'); // 안보이기
        });
    }

    clickCancelBtn() {
        this.expenseAdd.style.display = 'none';
        this.expensesBox1.style.display = 'none';
        this.quote.style.display = 'block';
    }
    /*  */
}

class ExpenseAdd {
    constructor() {
        this.budgetBtn = document.querySelector('.budgetBtn');
        this.incomeBtn = document.querySelector('#income');
        this.outcomeBtn = document.querySelector('#outcome');
        this.incomeCategoryGrid = document.querySelector('.incomeCategoryGrid');
        this.outcomeCategoryGrid = document.querySelector('.outcomeCategoryGrid');

        this.categorys = document.querySelector('.categorys');
        this.amount = document.querySelector('.amount');
        this.detail = document.querySelector('.detail');
        this.cancelBtn = document.querySelector('.cancelBtn');
        this.commitBtn = document.querySelector('.commitBtn');

        this.clickBudgeBtn = this.clickBudgeBtn.bind(this);
        this.clickIncomeBtn2 = this.clickIncomeBtn2.bind(this);
        this.clickOutcomeBtn2 = this.clickOutcomeBtn2.bind(this);

        // this.incomeCategoryGrid = this.incomeCategoryGrid.bind(this);
        // this.outcomeCategoryGrid = this.outcomeCategoryGrid.bind(this);

        // 요소가 제대로 찾아졌을 때 버튼 클릭 이벤트를 바인딩합니다.
        this.clickBudgeBtn();
        this.clickIncomeBtn2();
        this.clickOutcomeBtn2();
    }

    clickBudgeBtn() {
        this.budgetBtn.addEventListener('click', ()=> {
            this.categorys.classList.add('hidden'); // 안보이기
            this.amount.style.display = 'block';
            this.detail.style.display = 'none';
            this.cancelBtn.classList.remove('hidden');
            this.commitBtn.classList.remove('hidden');
        });
    }

    clickIncomeBtn2() {
        this.incomeBtn.addEventListener('click', ()=> {
            // console.log(this.target);
            // console.log(this.target.parentElement);
            // console.log(this.categorys.classList);
            this.categorys.classList.remove('hidden');  // 보이기
            this.incomeCategoryGrid.classList.remove('hidden'); // 보이기 
            this.outcomeCategoryGrid.classList.add('hidden'); // 안보이기 
            this.detail.style.display = 'block';
            this.cancelBtn.classList.remove('hidden');
            this.commitBtn.classList.remove('hidden');
        });
    }

    clickOutcomeBtn2() {
        this.outcomeBtn.addEventListener('click', ()=> {
            this.categorys.classList.remove('hidden'); // 보이기 
            this.incomeCategoryGrid.classList.add('hidden'); // 안보이기
            this.outcomeCategoryGrid.classList.remove('hidden'); //보이기
            this.detail.style.display = 'block';
            this.cancelBtn.classList.remove('hidden');
            this.commitBtn.classList.remove('hidden');
            // console.log('새끼야');
        });
    }
}
function initialize() {
    const calendar = new Calendar();
    calendar.displayExpenseBox();
}

document.addEventListener('DOMContentLoaded', () => {
    initialize();
});

export { Calendar, Quote, ExpensesBox, ExpenseAdd };