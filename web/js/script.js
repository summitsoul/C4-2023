const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const img = document.getElementById('img');

function updateImage() {
    let keys = "";
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            keys += checkboxes[i].value;
        }
    }
    img.src = images[keys];
}

for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('click', updateImage);
}
// 生成随机数据集
function generateData() {
    let data = [];
    for (let i = 0; i < 30; i++) {
        data.push(Math.floor(Math.random() * 100));
    }
    return data;
}

// 创建图表
function createChart(canvasId, label) {
    let ctx = document.getElementById(canvasId).getContext('2d');
    let chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from(Array(30), (_, i) => i + 1),
            datasets: [{
                label: label,
                data: generateData(),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    return chart;
}

// 更新图表数据
function updateChart(chart) {
    chart.data.datasets[0].data.shift();
    chart.data.datasets[0].data.push(Math.floor(Math.random() * 100));
    chart.update();
}

// 创建4个图表
let chart1 = createChart('chart1', 'Key Frequency');
let chart2 = createChart('chart2', 'Write Frequency');
let chart3 = createChart('chart3', 'Channel Load');
let chart4 = createChart('chart4', 'Virtual Address');

// 每秒钟更新一次数据
setInterval(() => {
    updateChart(chart1);
    updateChart(chart2);
    updateChart(chart3);
    updateChart(chart4);
}, 1000);