document.addEventListener('DOMContentLoaded', () => {
    let $nextMonth = document.querySelector("#nextMonth");
    let $prevMonth = document.querySelector("#prevMonth");
    const monthElement = document.getElementById('month');

    let isPlaying = true;
    let monthIndex = 2; // 현재 월 (3월: index 2)
    let yearIndex = 0; // 현재 년도
    const months = [
        "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"
    ];

    const years = [
        "2024년", "2025년", "2026년"
    ];

    $nextMonth.addEventListener('click', () => {
        if (isPlaying) {
            monthIndex++;
            if (monthIndex >= months.length) {
                monthIndex = 0;
                yearIndex++;
            }
            if (yearIndex >= years.length) {
                yearIndex = 0;
            }
            monthElement.textContent = `${years[yearIndex]} ${months[monthIndex]}`;
        }
    });

    $prevMonth.addEventListener('click', () => {
        if (isPlaying) {
            monthIndex--;
            if (monthIndex < 0) {
                monthIndex = months.length - 1;
                yearIndex--;
            }
            if (yearIndex < 0) {
                yearIndex = years.length - 1;
            }
            monthElement.textContent = `${years[yearIndex]} ${months[monthIndex]}`;
        }
    });

});