/* LEAP YEAR(윤년)
--------------------------------------*/
const isLeapYear = (year) => {
    return (
        (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
        (year % 100 === 0 && year % 400 === 0)
    );
};
/* 2월 날 수 반환 */
const getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28;
};

/* CALENDER
--------------------------------------*/
let calendar = document.querySelector('.calendar');
const month_names = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월',
];
const dayTextFormate = document.querySelector('.day-text-formate');
const timeFormate = document.querySelector('.time-formate');
const dateFormate = document.querySelector('.date-formate');

/* 주어진 월과 연도에 해당하는 달력 생성 */
const generateCalendar = (month, year) => {
    let calendar_days = document.querySelector('.calendar-days');
    calendar_days.innerHTML = '';  // 새로운 달력을 생성하기 위해 기존 달력 내용 제거 
    let calendar_header_year = document.querySelector('#year');
    let calender_body_month = document.querySelector('#month');
    let days_of_month = [
        31, getFebDays(year), 31, 30, 31, 30,
        31, 31, 30, 31, 30, 31,
    ];

    let currentDate = new Date();

    calendar_header_year.innerHTML = year;
    calender_body_month.innerHTML = month_names[month];

    /* 주어진 연도와 월에 해당하는 첫째날 */
    let first_day = new Date(year, month);
    /* 선택된 월의 날짜 수와 첫째 날의 요일을 고려하여 각 날짜를 달력에 추가 */
    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div');

        if (i >= first_day.getDay()) {
            day.innerHTML = i - first_day.getDay() + 1;
            if (i - first_day.getDay() + 1 === currentDate.getDate() &&
                year === currentDate.getFullYear() &&
                month === currentDate.getMonth()
            ) {
                day.classList.add('current-date');
            }
        }
        calendar_days.appendChild(day);
    }
};

/* < > 를 이용해서 연도, 월 조정 */
document.querySelector('#pre-year').onclick = () => {
    --currentYear.value;
    generateCalendar(currentMonth.value, currentYear.value);
};
document.querySelector('#next-year').onclick = () => {
    ++currentYear.value;
    generateCalendar(currentMonth.value, currentYear.value);
};
document.querySelector('#pre-month').onclick = () => {
    currentMonth.value = (currentMonth.value - 1 + 12) % 12;
    if (currentMonth.value === 11) {
        --currentYear.value;
    }
    generateCalendar(currentMonth.value, currentYear.value);
};
document.querySelector('#next-month').onclick = () => {
    currentMonth.value = (currentMonth.value + 1) % 12;
    if (currentMonth.value === 0) {
        ++currentYear.value;
    }
    generateCalendar(currentMonth.value, currentYear.value);
};

let currentDate = new Date();
let currentMonth = { value: currentDate.getMonth() };
let currentYear = { value: currentDate.getFullYear() };
generateCalendar(currentMonth.value, currentYear.value);

const todayShowTime = document.querySelector('.time-formate');
const todayShowDate = document.querySelector('.date-formate');

const currshowDate = new Date();
const showCurrentDateOption = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
};

document.addEventListener('DOMContentLoaded', () => {

    /* ----------혜리: 명언 스크립트---------- */

    const quote1 = '"한 푼 아낀 것은 한 푼 <br> 번 것이나 마찬가지다." <br> <br> - 벤자민 프랭클린';
    const quote2 = '"버는 것보다 적게 쓰는 것을 안다면 <br> 현자의 돌을 가진 것과 같다." <br> <br> - 벤자민 프랭클린';
    const quote3 = '"절약하지 않는 자는 <br> 고뇌하게 될 것이다." <br> <br> - 공자';
    const quote4 = '"돈 생각을 떨쳐내는 유일한 <br> 방법은 돈을 많이 갖는 것이다." <br> <br> - 이디스 워튼';
    const quote5 = '"가난에 대한 두려움이 삶을 <br> 지배하도록 내버려두면, <br> 그 대가로 당신은 먹기는 할 것이나 <br> 살지는 못할 것이다." <br> <br> - 조지 버나드 쇼';
    const quote6 = '"돈에 대해 쉽게 사는 방법은 <br> 생활수준을 형편보다 <br> 한 단계 낮추는 것이다." <br> <br> - 헨리 테일러 경';
    const quote7 = '"돈이 전부는 아니지만, <br> 그만한 게 없다." <br> <br> - 메이웨더';
    const quote8 = '"돈지갑의 밑바닥이 드러났을 때의 <br> 절약은 이미 늦은 행위다." <br> <br> - 세네카';
    const quote9 = '"검약은 멋진 수입이다." <br> <br> - 에라스무스';
    const quote10 = '"근면은 부유의 오른손이요, 절약은 그 왼손이다." <br> <br> - J.레이';
    const quotes = [
        quote1, quote2, quote3, quote4, quote5,
        quote6, quote7, quote8, quote9, quote10
    ];

    function updateQuote() {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        document.getElementById('quote').innerHTML = randomQuote;
    }

    updateQuote();

    /* ----------혜리: 날짜 클릭하면 우측 내용 바뀌게---------- */
    const calendarDays = document.querySelectorAll('.calendar-days div');
    const quote = document.getElementById('quote');
    const expensesBox = document.getElementById('expensesBox1');
    /* ----------[s]채림: addListBtn 누르면 expenseAdd 보이게---------- */
    const addButton = document.querySelector('#addListBtn');
    const expenseAdd = document.querySelector('.expenseAdd');
    const budgetBtn = document.querySelector('.budgetBtn');
    const incomeBtn = document.querySelector('#income');
    const incomeCategoryGrid = document.querySelector('.incomeCategoryGrid');
    const outcomeBtn = document.querySelector('#outcome');
    const outcomeCategoryGrid = document.querySelector('.outcomeCategoryGrid');
    const categorys = document.querySelector('.categorys');
    const amount = document.querySelector('.amount');
    const detail = document.querySelector('.detail');
    const cancelBtn = document.querySelector('.cancelBtn');
    const commitBtn = document.querySelector('.commitBtn');
    /* [e]채림 */

    calendarDays.forEach(day => {
        day.addEventListener('click', () => {
            // 현재 선택된 div의 상태를 확인하여 처리
            if (expensesBox.style.display === 'block') {
                // expensesBox가 표시되어 있으면 숨김
                expensesBox.style.display = 'none';
                // quote를 다시 표시
                quote.style.display = 'block';
            } else {
                // expensesBox가 표시되어 있지 않으면 quote를 숨기고 expensesBox를 표시
                quote.style.display = 'none';
                expensesBox.style.display = 'block';
            }

            /* ----------혜리: 날짜 창 닫히면 명언이 새로고침 되게---------- */
            updateQuote();
        });
    });

    /* ----------[s]채림: addListBtn 누르면 expenseAdd 보이게----------*/
    addButton.addEventListener('click', () => {
        expensesBox.style.display = 'none';
        expenseAdd.style.display = 'block';
        categorys.classList.add('hidden'); // 안보이기
        amount.classList.add('hidden'); // 안보이기
        detail.classList.add('hidden'); // 안보이기
        cancelBtn.classList.add('hidden'); // 안보이기
        commitBtn.classList.add('hidden'); // 안보이기
    });

    /* 취소 버튼 누른 경우 */
    cancelBtn.addEventListener('click', () => {
        expenseAdd.style.display = 'none';
        expensesBox.style.display = 'none';
        quote.style.display = 'block';
    });

    /* 예산 / 수입 / 지출 버튼에 따라 적용
    -----------------------------------------------------------------*/
    budgetBtn.addEventListener('click', () => {
        categorys.classList.add('hidden'); // 안보이기
        amount.style.display = 'block';
        detail.style.display = 'none';
        cancelBtn.classList.remove('hidden'); 
        commitBtn.classList.remove('hidden'); 
    });
    incomeBtn.addEventListener('click', () => {
        categorys.classList.remove('hidden');  // 보이기
        incomeCategoryGrid.classList.remove('hidden'); // 보이기 
        outcomeCategoryGrid.classList.add('hidden'); // 안보이기 
        detail.style.display = 'block';
        cancelBtn.classList.remove('hidden'); 
        commitBtn.classList.remove('hidden'); 
    });
    outcomeBtn.addEventListener('click', () => {
        categorys.classList.remove('hidden'); // 보이기 
        incomeCategoryGrid.classList.add('hidden'); // 안보이기
        outcomeCategoryGrid.classList.remove('hidden'); //보이기
        detail.style.display = 'block';
        cancelBtn.classList.remove('hidden'); 
        commitBtn.classList.remove('hidden'); 
    });
    /* [e]채림 */

    /* ----------혜리: 수입 버튼 클릭하면 수입 보이게, 지출 버튼 클릭하면 지출 보이게---------- */
    // 처음에는 지출 목록과 수입 목록을 모두 숨김
    const expenseLists = document.querySelector('.expenseLists');
    const incomeLists = document.querySelector('.incomeLists');
    expenseLists.style.display = 'none';
    incomeLists.style.display = 'none';

    /* ----------혜리: 수입 버튼 클릭하면 수입 보이게, 지출 버튼 클릭하면 지출 보이게---------- */
    const outcomeBtn = document.querySelector('.outcomeBtn');
    const incomeBtn = document.querySelector('.incomeBtn');

    // 지출 버튼 클릭 시
    outcomeBtn.addEventListener('click', function () {
        // 지출 목록 표시
        expenseLists.style.display = 'block';
        // 수입 목록 숨김
        incomeLists.style.display = 'none';
    });

    // 수입 버튼 클릭 시
    incomeBtn.addEventListener('click', function () {
        // 수입 목록 표시
        incomeLists.style.display = 'block';
        // 지출 목록 숨김
        expenseLists.style.display = 'none';
    });
});