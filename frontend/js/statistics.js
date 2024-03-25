import { Socket } from '../js/socket/socket.js';

class SelectType {
    constructor() {
        this.state = document.querySelector('.acc');
        this.changeState = '';
        if (window.location.href.indexOf('income') > 0) {
            this.changeState = '수입';
        } else if (window.location.href.indexOf('income') < 0) {
            this.changeState = '지출';
        }
    }
    getState() {
        return this.changeState;
    }
}
class SwitchCategoryName {
    constructor(params) {
        params.list.forEach((element, i) => {
            switch (element.categoryId) {
                case 1:
                    element.categoryId = '자기개발';
                    break;
                case 2:
                    element.categoryId = '문화생활';
                    break;
                case 3:
                    element.categoryId = '금융';
                    break;
                case 4:
                    element.categoryId = '보험';
                    break;
                case 5:
                    element.categoryId = '주거';
                    break;
                case 6:
                    element.categoryId = '쇼핑';
                    break;
                case 7:
                    element.categoryId = '통신';
                    break;
                case 8:
                    element.categoryId = '교통';
                    break;
                case 9:
                    element.categoryId = '식비';
                    break;
                case 10:
                    element.categoryId = '기타';
                    break;
                case 11:
                    element.categoryId = '용돈';
                    break;
                case 12:
                    element.categoryId = '금융소득';
                    break;
                case 13:
                    element.categoryId = '상여금';
                    break;
                case 14:
                    element.categoryId = '월급';
                    break;

                default:
                    break;
            }
        });
    }
}

class CircleGraph {
    constructor(json) {
        new SwitchCategoryName(json);
        const state = new SelectType().getState();
        this.mychart = document.querySelector('#myChart');
        this.expendCon = document.querySelector('#expendCon');
        let total = 0;

        const data_grap = {
            labels: [],
            datasets: [
                {
                    label: state,
                    data: [],
                    backgroundColor: [
                        '#FDDAEC',
                        '#FBB4AE',
                        '#B3CDE3',
                        '#DECBE4',
                        '#F2F2F2',
                        '#FFFFCC',
                        '#FED9A6',
                        '#CCEBC5',
                        '#E5D8BD',
                    ],
                    hoverOffset: 4,
                },
            ],
        };

        if (state === '지출') {
            json.list.sort((a, b) => b.currentMonthExpense - a.currentMonthExpense);
        } else if (state === '수입') {
            json.list.sort((a, b) => b.currentMonthIncome - a.currentMonthIncome);
        }

        json.list.forEach((element) => {
            if (state === '지출' && element.currentMonthExpense > 0) {
                //지출
                data_grap.labels.push(element.categoryId);
                data_grap.datasets[0].data.push(element.currentMonthExpense);
                total += element.currentMonthExpense;
            } else if (state === '수입' && element.currentMonthIncome > 0) {
                //수입
                data_grap.labels.push(element.categoryId);
                data_grap.datasets[0].data.push(element.currentMonthIncome);
                total += element.currentMonthIncome;
            }
        });

        const options_grap = {
            responsive: false,
            maintainAspectRatio: false,
            cutout: '50%', // 도넛의 중앙을 빈 공간으로 설정
        };
        const ctx_grap = document.getElementById('myChart').getContext('2d');
        const myChart_grap = new Chart(ctx_grap, {
            type: 'doughnut',
            data: data_grap,
            options: options_grap,
        });

        document.getElementById('expendCon').value = total;
    }
}

class BarGraph {
    constructor(json) {
        new SwitchCategoryName(json);
        const state = new SelectType().getState();
        this.my_stac = document.querySelector('#myStacChart');
        const data_stac = {
            labels: ['이번 달', '전 달'],
            datasets: [],
        };

        if (state === '지출') {
            json.list.sort((a, b) => b.currentMonthExpense - a.currentMonthExpense);
        } else if (state === '수입') {
            json.list.sort((a, b) => b.currentMonthIncome - a.currentMonthIncome);
        }

        json.list.forEach((element) => {
            if (state === '지출' && element.currentMonthExpense > 0) {
                data_stac.datasets.push({
                    label: element.categoryId,
                    backgroundColor: '',
                    data: [element.currentMonthExpense, element.prevMonthExpense],
                });
            } else if (state === '수입' && element.currentMonthIncome > 0) {
                data_stac.datasets.push({
                    label: element.categoryId,
                    backgroundColor: '',
                    data: [element.currentMonthIncome, element.prevMonthIncome],
                });
            }
        });

        // 옵션
        const options_stac = {
            responsive: false,
            maintainAspectRatio: false,
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true,
                },
            },
        };

        // 차트 생성
        const ctx_stac = document.getElementById('myStacChart').getContext('2d');
        const myChart_stac = new Chart(ctx_stac, {
            type: 'bar',
            data: data_stac,
            options: options_stac,
        });
    }
}

class NowDate {
    constructor(host, port) {
        this.socket = new Socket(host, port, this.callback.bind(this));

        this.today = new Date();
        this.nowYear = this.today.getFullYear();
        this.nowMonth = this.today.getMonth() + 1;
        this.nowDay = this.today.getDate();

        this.month = document.querySelector('#month');
        this.preMonth = document.querySelector('#prevMonth').addEventListener('click', this.preMonth.bind(this));
        this.nextMonth = document.querySelector('#nextMonth').addEventListener('click', this.nextMonth.bind(this));

        this.socket.socket.addEventListener('open', () => {
            this.generateDate(this.nowYear, this.nowMonth);
        });
    }

    callback(data) {
        const json = JSON.parse(data);

        new CircleGraph(json);
        new BarGraph(json);
    }
    generateDate(y, m) {
        this.month.textContent = `${y}년 ${m}월`;

        const jsonForm = {
            cmd: 'grap',
            cmd2: 'grapList',
            userId: sessionStorage.getItem('userId'),
            expensesDate: `${this.nowYear}-${this.nowMonth}-${this.nowDay}`,
        };
        const jsonData = JSON.stringify(jsonForm);
        this.socket.sendMessage(jsonData);
    }
    preMonth() {
        this.nowMonth--;
        if (this.nowMonth < 1) {
            this.nowMonth = 12;
            this.nowYear--;
        }
        this.generateDate(this.nowYear, this.nowMonth);
    }
    nextMonth() {
        this.nowMonth++;
        if (this.nowMonth > 12) {
            this.nowMonth = 1;
            this.nowYear++;
        }
        this.generateDate(this.nowYear, this.nowMonth);
    }
}

function initialize() {
    const a = new NowDate('192.168.0.73', 9000);
}

document.addEventListener('DOMContentLoaded', () => {
    initialize();
});
export { NowDate };

/* 웹 페이지 테마를 변경하는 기능
   localStorage 사용
---------------------------------*/
window.addEventListener('load', function () {
    var savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    }
});

document.getElementById('pinkTheme').addEventListener('click', function () {
    applyTheme('pink');
    localStorage.setItem('theme', 'pink');
});

document.getElementById('greenTheme').addEventListener('click', function () {
    applyTheme('green');
    localStorage.setItem('theme', 'green');
});

document.getElementById('blueTheme').addEventListener('click', function () {
    applyTheme('blue');
    localStorage.setItem('theme', 'blue');
});

function applyTheme(theme) {
    var iframe = document.querySelector('iframe');
    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    var header = iframeDoc.querySelector('header');
    var styleTag = document.createElement('style');

    switch (theme) {
        case 'pink':
            header.style.backgroundColor = 'rgba(242, 111, 111, 0.3)';
            styleTag.innerHTML = `
            #click-statistics {
                color: rgba(242, 111, 111, 1);
            }
            `;
            break;
        case 'green':
            header.style.backgroundColor = 'rgba(111, 242, 132, 0.3)';
            styleTag.innerHTML = `
            #click-statistics {
                color: rgba(111, 242, 132, 1);
            }
            `;
            break;
        case 'blue':
            header.style.backgroundColor = 'rgba(55, 159, 235, 0.3)';
            styleTag.innerHTML = `
            #click-statistics {
                color: rgba(55, 159, 235, 1);
            }
            `;
            break;
    }

    document.head.appendChild(styleTag);
}
