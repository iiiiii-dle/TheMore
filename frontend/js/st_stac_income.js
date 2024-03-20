
const data_stac = {
    labels: ['이번 달', '전 달'],
    datasets: [{
      label: '월급',
      backgroundColor: '#FDDAEC',
      data: [1975000, 1875000]
    }, {
        label: '금융',
        backgroundColor: '#FBB4AE',
        data: [100000, 200000]
      },{
        label: '용돈',
        backgroundColor: '#B3CDE3',
        data: [0, 150000]
      },{
        label: '기타',
        backgroundColor: '#E5D8BD',
        data: [10000, 0]
      }]
  };
  
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
  