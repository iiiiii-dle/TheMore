const socket = new WebSocket('ws://localhost:9000');

socket.onopen = function () {
  console.log('Connected to werver');

  // 서버에 getCategoryTotal 명령 전송
  const cmd = {
    cmd: "Expenses",
    cmd2: "stacTotalList",
    userId: 1,
    type: true,
    expensesDate: '2024-03-20'
  };
  socket.send(JSON.stringify(cmd));
}

socket.onmessage = function (event) {
  console.log('Received from server: %s', event.data);
  const jsonData = JSON.parse(event.data);
  const categoryData = jsonData.expenses;

  if (categoryData) {
    const currentDate = new Date(jsonData.expensesDate);
    const currentMonth = currentDate.getMonth() + 1; // getMonth는 0부터 시작하므로 1을 더해줌
    const currentYear = currentDate.getFullYear();
    const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1; // 1월인 경우 전년도 12월로 설정
    const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear

    const data_stac = {
      labels: [`${currentYear}-${currentMonth}`, `${previousYear}-${previousMonth}`],
      datasets: []
    };

    // 카테고리 아이디별로 데이터를 그룹화하기 위한 객체 생성
    const categoryMap = {};

    // 카테고리 데이터를 그룹화
    categoryData.forEach(item => {
      const categoryId = item.categoryId;
      const money = item.money;
      const month = item.month; // 현재 월 또는 전월

      // 카테고리 아이디가 이미 존재하는 경우 해당 데이터에 추가
      if (categoryMap[categoryId]) {
        categoryMap[categoryId][month] = money;
      } else { // 카테고리 아이디가 존재하지 않는 경우 새로운 항목 생성
        categoryMap[categoryId] = { [month]: money };
      }
    });

    // 데이터셋 생성
    for (const categoryId in categoryMap) {
      if (Object.hasOwnProperty.call(categoryMap, categoryId)) {
        const categoryData = categoryMap[categoryId];
        const dataset = {
          label: `${categoryId}`,
          backgroundColor: ['#FDDAEC', '#FFFFCC', '#FBB4AE', '#B3CDE3', '#E5D8BD'],
          data: [categoryData[`${currentYear}-${currentMonth}`] || 0, categoryData[`${previousYear}-${previousMonth}`] || 0] // 현재 월과 전월의 데이터를 가져옴
        };
        data_stac.datasets.push(dataset);
      }
    }
    // 옵션
    const options_stac = {
      responsive: false,
      maintainAspectRatio: false,
      scales: {
        x: {
          stacked: true
        },
        y: {
          stacked: true
        }
      }
    };

    // 차트 생성
    const ctx_stac = document.getElementById('myStacChart').getContext('2d');
    const myChart_stac = new Chart(ctx_stac, {
      type: 'bar',
      data: data_stac,
      options: options_stac
    });
  } else {
    console.error('categoryData is undefined or null');
  }
}
socket.onclose = function () {
  console.log('Disconnected from server');
}
