
class Calendar {
    constructor() {
        this.quote = new Quote();
        this.expensesBox = new ExpensesBox();

        this.calendarHeaderYear = document.querySelector('#year'); // 연도 
        this.calendarBodyMonth = document.querySelector('#month'); // 월
        this.calendarDays = document.querySelector('.calendar-days'); // 일

        this.selectedDate = document.querySelector('#selectedDate'); // expensesBox 날짜(일)
        this.select = document.querySelector('#select'); // expenseAdd 날짜(연도-월-일)

        /* 현재 날짜 설정 */
        this.currentDate = new Date();
        this.currentMonth = this.currentDate.getMonth();
        this.currentYear = this.currentDate.getFullYear();
        this.currentWeek = this.currentDate.getDay(); //-----expenseBox에 나오게 하고 싶어서 일단 선언함(구현 안함)

        /* 캘린더 생성 */
        this.generateCalendar(this.currentMonth, this.currentYear);

        document.querySelector('#pre-year').addEventListener('click', this.prevYear.bind(this));
        document.querySelector('#next-year').addEventListener('click', this.nextYear.bind(this));
        document.querySelector('#pre-month').addEventListener('click', this.prevMonth.bind(this));
        document.querySelector('#next-month').addEventListener('click', this.nextMonth.bind(this));
        this.calendarDays.addEventListener('click', this.handleDateClick.bind(this));
    }

    /* 메소드 */
    prevYear() { // 이전 년도로 이동
        this.currentYear--;
        this.generateCalendar(this.currentMonth, this.currentYear);
    }

    nextYear() { // 다음 년도로 이동
        this.currentYear++;
        this.generateCalendar(this.currentMonth, this.currentYear);
    }

    prevMonth() { // 이전 달로 이동
        this.currentMonth = (this.currentMonth + 11) % 12;
        if (this.currentMonth === 11) {
            this.currentYear--;
        }
        this.generateCalendar(this.currentMonth, this.currentYear);
    }

    nextMonth() { // 다음 달로 이동
        this.currentMonth = (this.currentMonth + 1) % 12;
        if (this.currentMonth === 0) {
            this.currentYear++;
        }
        this.generateCalendar(this.currentMonth, this.currentYear);
    }

    isLeapYear(year) {  // 윤년 
        return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0);
    }

    getFebDays(year) {  // 2월 날짜 반환
        return this.isLeapYear(year) ? 29 : 28;
    }

    generateCalendar(month, year) {   // 캘린더 생성
        const month_names = [
            '1월', '2월', '3월', '4월', '5월', '6월',
            '7월', '8월', '9월', '10월', '11월', '12월',
        ];
        //-----expensesBox 날짜 옆에 요일 구현 예정
        // const week_names = ['일', '월', '화', '수', '목', '금', '토'];
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
                /* 클릭한 날짜 가져오기  */
                day.addEventListener('click', (event) => {
                    const clickedDate = i - firstDay.getDay() + 1;
                    console.log('Year:', year, 'Month:', month + 1, 'Date:', clickedDate);
                });
            }
            this.calendarDays.appendChild(day);
        }
    }

    handleDateClick(event) { // 클릭한 달력 div에 연도 / 월 / 일 가져오기
        const clickedDate = event.target.textContent;
        const year = this.currentYear;
        const month = this.currentMonth + 1;
        this.selectedDate.innerHTML = `${clickedDate}일`; // expensesBox 날짜
        this.select.innerHTML = `${year}-${month}-${clickedDate}`; // expenseAdd 날짜
    }

    displayExpenseBox() { // expensesBox display 설정
        this.calendarDays.childNodes.forEach(day => {
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
        this.expenseAdd.clickCommitBtn();
        this.expenseAdd = document.querySelector('.expenseAdd');

        this.expensesBox1 = document.querySelector('#expensesBox1');
        this.expensesBox = document.querySelector('.expensesBox');
        this.incomeBtn = document.querySelector('.incomeBtn');
        this.outcomeBtn = document.querySelector('.outcomeBtn');
        this.expenseList = document.querySelector('.expenseList');
        this.addButton = document.querySelector('#addListBtn');

        this.categorys = document.querySelector('.categorys');
        this.amount = document.querySelector('.amount');
        this.detail = document.querySelector('.detail');
        this.cancelBtn = document.querySelector('.cancelBtn');
        this.commitBtn = document.querySelector('.commitBtn');

        this.clickOutcomeBtn = this.clickOutcomeBtn.bind(this);
        this.clickIncomeBtn = this.clickIncomeBtn.bind(this);
        // expenseItem 클릭 시 수정 
        this.expenseList.addEventListener('click', this.handleExpenseItemClick.bind(this));

        this.clickOutcomeBtn(); // expensesBox 지출 버튼 메소드
        this.clickIncomeBtn();  // expensesBox 수입 버튼 메소드
        this.clickAddListBtn(); // expenseAdd 넘어가기 메소드
    }

    handleExpenseItemClick(event) { // expenseList 안의 expenseItem 수정 
        const clickedItem = event.target.closest('.expenseItem');
        if (!clickedItem) {
            console.error('clickedItem not found');
            return;
        }

        // expenseItem의 내용 가져오기
        const amount = clickedItem.querySelector('.amount').textContent.trim();
        const detail = clickedItem.querySelector('.detail').textContent.trim();

        // expenseAdd에 내용 채우기
        this.amount.querySelector('input').value = amount;
        this.detail.querySelector('input').value = detail;

        // expenseAdd를 보여줌
        this.expenseAdd.style.display = 'block';
        this.expensesBox.style.display = 'none';

        // 수정된 내용을 저장할 때 기존 expenseItem 삭제
        this.commitBtn.addEventListener('click', () => {
            // 기존 expenseItem 삭제
            clickedItem.remove();

            // 입력된 내용 가져오기
            const newAmount = this.amount.querySelector('input').value;
            const newDetail = this.detail.querySelector('input').value;

            /// 새로운 expense 요소 생성
            const newExpenseItem = document.createElement('div');
            newExpenseItem.classList.add('expenseItem');
            newExpenseItem.innerHTML = `
            <div class="amount">${newAmount}</div>
            <div class="detail">${newDetail}</div>
            `;

            // expenseList에 새로운 expenseItem 추가
            this.expenseList.appendChild(newExpenseItem);

            // 입력 필드 초기화
            this.amount.querySelector('input').value = '';
            this.detail.querySelector('input').value = '';

            // expenseAdd 숨김
            this.expenseAdd.style.display = 'none';
        });
    }

    clickOutcomeBtn() { // expensesBox 지출 버튼 메소드
        this.outcomeBtn.addEventListener('click', () => {
            this.expenseList.style.display = 'block';
            // 입력 필드 초기화
            this.amount.querySelector('input').value = '';
            this.detail.querySelector('input').value = '';
        });
    }

    clickIncomeBtn() { // expensesBox 수입 버튼 메소드
        this.incomeBtn.addEventListener('click', () => {
            this.expenseList.style.display = 'block';
            // 입력 필드 초기화
            this.amount.querySelector('input').value = '';
            this.detail.querySelector('input').value = '';
        });
    }

    clickAddListBtn() { // expenseAdd 넘어가기 메소드
        this.addButton.addEventListener('click', () => {
            this.expensesBox1.style.display = 'none';
            this.expenseAdd.style.display = 'block';
            this.categorys.classList.add('hidden');
            this.amount.classList.add('hidden');
            this.detail.classList.add('hidden');
            this.cancelBtn.classList.add('hidden');
            this.commitBtn.classList.add('hidden');
            // 입력 필드 초기화
            this.amount.querySelector('input').value = '';
            this.detail.querySelector('input').value = '';
        });
    }
}

class ExpenseAdd {
    constructor() {
        this.quote = document.querySelector('#quote');
        this.expenseList = document.querySelector('.expenseList');

        this.expenseAdd = document.querySelector('.expenseAdd');
        this.budgetBtn = document.querySelector('.budgetBtn');
        this.incomeBtn = document.querySelector('#income');
        this.outcomeBtn = document.querySelector('#outcome');

        this.categorys = document.querySelector('.categorys');
        this.incomeCategoryGrid = document.querySelector('.incomeCategoryGrid');
        this.outcomeCategoryGrid = document.querySelector('.outcomeCategoryGrid');
        this.amount = document.querySelector('.amount');
        this.detail = document.querySelector('.detail');
        this.cancelBtn = document.querySelector('.cancelBtn');
        this.commitBtn = document.querySelector('.commitBtn');

        // 초기에 입력창들을 숨김
        this.amount.classList.add('hidden');
        this.detail.classList.add('hidden');
        this.cancelBtn.classList.add('hidden');
        this.commitBtn.classList.add('hidden');


        this.clickBudgeBtn = this.clickBudgeBtn.bind(this);
        this.clickIncomeBtn2 = this.clickIncomeBtn2.bind(this);
        this.clickOutcomeBtn2 = this.clickOutcomeBtn2.bind(this);

        this.clickBudgeBtn();
        this.clickIncomeBtn2();
        this.clickOutcomeBtn2();
        this.clickCancelBtn();
        this.clickCommitBtn();
    }

    clickBudgeBtn() {
        this.budgetBtn.addEventListener('click', () => {
            this.categorys.classList.add('hidden');
            this.amount.classList.remove('hidden');
            this.detail.classList.add('hidden');
            this.cancelBtn.classList.remove('hidden');
            this.commitBtn.classList.remove('hidden');
        });
    }

    clickIncomeBtn2() {
        this.incomeBtn.addEventListener('click', () => {
            this.categorys.classList.remove('hidden');
            this.incomeCategoryGrid.classList.remove('hidden');
            this.outcomeCategoryGrid.classList.add('hidden');
            this.amount.classList.remove('hidden');
            this.detail.classList.remove('hidden');
            this.cancelBtn.classList.remove('hidden');
            this.commitBtn.classList.remove('hidden');
        });
    }

    clickOutcomeBtn2() {
        this.outcomeBtn.addEventListener('click', () => {
            this.categorys.classList.remove('hidden');
            this.incomeCategoryGrid.classList.add('hidden');
            this.outcomeCategoryGrid.classList.remove('hidden');
            this.amount.classList.remove('hidden');
            this.detail.classList.remove('hidden');
            this.cancelBtn.classList.remove('hidden');
            this.commitBtn.classList.remove('hidden');
        });
    }

    clickCancelBtn() {
        this.cancelBtn.addEventListener('click', () => {
            this.expenseAdd.style.display = 'none';
            this.quote.style.display = 'block';
        });
    }

    clickCommitBtn() {
        this.commitBtn.addEventListener('click', () => {
            // 입력된 내용 가져오기
            const amount = this.amount.querySelector('input').value;
            const detail = this.detail.querySelector('input').value;

            // 새로운 expense 요소 생성
            const expenseItem = document.createElement('div');
            expenseItem.classList.add('expenseItem');
            expenseItem.innerHTML = `
            <span class="amount"> ${amount} </span><span class="detail"> ${detail}</span>
             `;
            console.log(expenseItem);
            this.expenseList.append(expenseItem);

            this.amount.querySelector('input').value = '';
            this.detail.querySelector('input').value = '';

            this.expenseAdd.style.display = 'none';
            this.expenseList.style.display = 'block';
            this.quote.style.display = 'block';
        });
    }
}

let calendar; // calendar 변수를 전역으로 선언

function initialize() {
    calendar = new Calendar();
    calendar.displayExpenseBox();
}

document.addEventListener('DOMContentLoaded', () => {
    initialize();
});

export { Calendar, Quote, ExpensesBox, ExpenseAdd };

/* 테마 색상 변경
   -----------------------------------------------------------------*/
document.getElementById('greenTheme').addEventListener('click', function () {
    var iframe = document.querySelector('iframe');
    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    var header = iframeDoc.querySelector('header');
    header.style.backgroundColor = 'rgba(111, 242, 132, 0.3)';

    let styleTag = document.createElement('style');
    styleTag.innerHTML = `
            .incomeCategoryGrid button,
            .outcomeCategoryGrid button,
            .amount input,
            .detail input,
            .commitBtn,
            #addListBtn,
            .calendar-header,
            .year-change:hover {
                background-color: rgba(111, 242, 132, 0.3);
            }
    
            #click-account,
            #month,
            .month-change pre,
            .calendar-days div.current-date {
                color: rgba(111, 242, 132, 1);
            }
    
            progress::-webkit-progress-bar {
                border-radius: 20px;
                background-color: rgba(111, 242, 132, 0.2);
            }
    
            progress::-webkit-progress-value {
                border-radius: 20px;
                background-color: rgba(111, 242, 132, 1);
            }
    
            .month-change:hover {
                background-color: rgba(111, 242, 132, 0.5);
            }
    
            .calendar-days div:hover {
                background-color: rgba(111, 242, 132, 0.3);
                color: #f8fbff;
            }
        `;
    document.head.appendChild(styleTag);
});

document.getElementById('blueTheme').addEventListener('click', function () {
    var iframe = document.querySelector('iframe'); // 수정: iframe 변수 재정의
    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    var header = iframeDoc.querySelector('header');
    header.style.backgroundColor = 'rgba(55, 159, 235, 0.3)';

    let styleTag = document.createElement('style');
    styleTag.innerHTML = `
            .incomeCategoryGrid button,
            .outcomeCategoryGrid button,
            .amount input,
            .detail input,
            .commitBtn,
            #addListBtn,
            .calendar-header,
            .year-change:hover {
                background-color: rgba(55, 159, 235, 0.3);
            }

            #click-account,
            #month,
            .month-change pre,
            .calendar-days div.current-date {
                color: rgba(55, 159, 235, 1);
            }
    
            progress::-webkit-progress-bar {
                background-color: rgba(55, 159, 235, 0.2);
            }
    
            progress::-webkit-progress-value {
                background-color: rgba(55, 159, 235, 1);
            }
    
            .month-change:hover {
                background-color: rgba(55, 159, 235, 0.5);
            }
    
            .calendar-days div:hover {
                background-color: rgba(55, 159, 235, 0.3);
                color: #f8fbff;
            }
        `;
    document.head.appendChild(styleTag);
});

document.getElementById('pinkTheme').addEventListener('click', function () {
    var iframe = document.querySelector('iframe'); // 수정: iframe 변수 재정의
    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    var header = iframeDoc.querySelector('header');
    header.style.backgroundColor = 'rgba(242, 111, 111, 0.3)';

    let styleTag = document.createElement('style');
    styleTag.innerHTML = `
            .incomeCategoryGrid button,
            .outcomeCategoryGrid button,
            .amount input,
            .detail input,
            .commitBtn,
            #addListBtn,
            .calendar-header,
            .year-change:hover {
                background-color: rgba(242, 111, 111, 0.3);
            }

            #month,
            .month-change pre,
            #click-account,
            .calendar-days div.current-date {
                color: rgba(242, 111, 111, 1);
            }
    
            progress::-webkit-progress-bar {
                background-color: rgba(242, 111, 111, 0.2);
            }
    
            progress::-webkit-progress-value {
                background-color: rgba(242, 111, 111, 1);
            }
    
            .month-change:hover {
                background-color: rgba(242, 111, 111, 0.5);
            }
    
            .calendar-days div:hover {
                background-color: rgba(242, 111, 111, 0.3);
                color: #f8fbff;
            }
        `;
    document.head.appendChild(styleTag);
});
