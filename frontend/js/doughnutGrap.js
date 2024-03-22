// 데이터 그래프 테스트용
const data_grap = {
    labels: ['식비', '교통', '주거생활', '보험', '금융', '쇼핑', '자기계발', '문화생활', '기타'],
    datasets: [{
        label: '수입',
        data: [150000, 50000, 390000, 50000, 100000, 100000, 70000, 20000, 10000],
        backgroundColor: [
            '#FDDAEC', '#FBB4AE', '#B3CDE3', '#DECBE4', '#F2F2F2', '#FFFFCC', '#FED9A6', '#CCEBC5', '#E5D8BD'
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