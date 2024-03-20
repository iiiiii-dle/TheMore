// 데이터
const data_grap = {
    labels: ['월급', '금융', '용돈', '기타'],
    datasets: [{
        label: '수입',
        data: [1975000, 100000, 0, 10000],
        backgroundColor: [
            '#FDDAEC', '#FBB4AE', '#B3CDE3', '#E5D8BD'
        ],
        hoverOffset: 4
    }]
};

// 차트 옵션
const options_grap = {
    responsive: false,
    maintainAspectRatio: false,
    cutout: '50%', // 도넛의 중앙을 빈 공간으로 설정할 수 있습니다.
};

// 차트 생성
const ctx_grap = document.getElementById('myChart').getContext('2d');
const myChart_grap = new Chart(ctx_grap, {
    type: 'doughnut',
    data: data_grap,
    options: options_grap
});