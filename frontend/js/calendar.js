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