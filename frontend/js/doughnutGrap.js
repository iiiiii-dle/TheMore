const socket = new WebSocket('ws://localhost:9000');

socket.onopen = function () {
    console.log('Connected to werver');

    // 서버에 getCategoryTotal 명령 전송
    const cmd = {
        cmd: "Expenses",
        cmd2: "categoryTotalList",
        userId: 1,
        type: false,
        expensesDate: '2024-03-20'

    };
    socket.send(JSON.stringify(cmd));
}

socket.onmessage = function (event) {
    console.log('Received from server: %s', event.data);
    const jsonData = JSON.parse(event.data);
    const categoryData = jsonData.cateTotalList?.expenses;

    if (categoryData) {
        const data_grap = {
            labels: [],
            datasets: [{
                label: '지출',
                data: [],
                backgroundColor: [
                    '#FDDAEC', '#FBB4AE', '#B3CDE3', '#DECBE4', '#F2F2F2', '#FFFFCC', '#FED9A6', '#CCEBC5', '#E5D8BD'
                ],
                hoverOffset: 4
            }]
        };

        categoryData.forEach(item => {
            data_grap.labels.push(item.categoryId); // 카테고리 아이디를 라벨로 사용
            data_grap.datasets[0].data.push(item.totalMoney); // 카테고리별 총 금액을 데이터로 사용
        });
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
    } else {
        console.error('categoryData is undefined or null');
    }
}
socket.onclose = function () {
    console.log('Disconnected from server');
}