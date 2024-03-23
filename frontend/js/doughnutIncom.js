const socket = new WebSocket('ws://localhost:9000');

socket.onopen = function() {
    console.log('Connected to werver');

    // 서버에 getCategoryTotal 명령 전송
    const cmd = {
        cmd: "Expenses",
        cmd2: "categoryTotalList",
        userId: 1,
        type: true,
        expensesDate: '2024-03-20'

    };
    socket.send(JSON.stringify(cmd));
}

socket.onmessage = function(event) {
    console.log('Received from server: %s', event.data);
    const jsonData = JSON.parse(event.data);
    const categoryData = jsonData.expenses;

    if(categoryData) {
        const data_grap = {
            labels: [],
            datasets: [{
                labels: '수입',
                data: [],
                backgroundColor: [
                    '#FDDAEC', '#FBB4AE','#FFFFCC', '#B3CDE3', '#E5D8BD'
                ],
                hoverOffset: 4
            }]
        };

       // 중복된 카테고리를 하나로 합치기 위한 객체 생성
       const categoryMap = {};

       // categoryData 배열을 순회하면서 카테고리 아이디별로 돈을 합산
       categoryData.forEach(item => {
        const categoryId = item.categoryId;
        const money = item.money;

        // 카테고리 아이디가 이미 존재하는 경우 해당 카테고리에 돈을 합산
        if (categoryMap[categoryId]) {
            categoryMap[categoryId] += money;
        } else { // 카테고리 아이디가 존재하지 않는 경우 새로운 항목을 추가
            categoryMap[categoryId] = money;
        }
    });

    // 합산된 데이터를 data_grap에 추가
    for (const categoryId in categoryMap) {
        if (Object.hasOwnProperty.call(categoryMap, categoryId)) {
            data_grap.labels.push(categoryId);
            data_grap.datasets[0].data.push(categoryMap[categoryId]);
        }
    }
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

    }else{
        console.error('categoryData is undefined or null');
    }
}
socket.onclose = function() {
    console.log('Disconnected from server');
}