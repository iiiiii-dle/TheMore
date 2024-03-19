
const data_stac = {
    labels: ['이번 달', '전 달'],
    datasets: [{
      label: '식비',
      backgroundColor: '#FDDAEC',
      data: [150000, 200000]
    }, {
        label: '교통',
        backgroundColor: '#FBB4AE',
        data: [50000, 70000]
      },{
        label: '주거생활',
        backgroundColor: '#B3CDE3',
        data: [390000, 450000]
      },{
        label: '보험',
        backgroundColor: '#DECBE4',
        data: [50000, 20000]
      },{
        label: '금융',
        backgroundColor: '#F2F2F2',
        data: [100000, 1000000]
      },{
        label: '쇼핑',
        backgroundColor: '#FFFFCC',
        data: [100000, 150000]
      },{
        label: '자기계발',
        backgroundColor: '#FED9A6',
        data: [70000, 100000]
      },{
        label: '문화생활',
        backgroundColor: '#CCEBC5',
        data: [20000, 10000]
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