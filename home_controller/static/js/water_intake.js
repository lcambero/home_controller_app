// Namespace of the watering controller module
const WATERING_NAMESPACE = '/water-intake'

const periodsSpanish = {'week': 'Semana', 'month': 'Mes', 'year': 'Año'}

// var socket = io(window.location.href);

// // Socket.io connect receiver
// socket.on('connect', function () {
//     console.log("Websocket connected...!", socket.connected)
// });

// // Socket.io connect error receiver
// socket.on('connect_error', (err) => {
//     console.log(`connect_error due to ${err.message}`);
// });

window.onload = function () {
    displayDate();
    mainValveStatus();
    updateFlowChart();
    // updateConsumptionChart();
}

function httpGet(url, async=false) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', url, async); // false for synchronous request
    xmlHttp.send(null);
    if (xmlHttp.responseText) {
        return JSON.parse(xmlHttp.responseText);
    }
}

// Update datetime every second
setInterval(displayDate, 1000);

// Display date and time in YY/MM/DD HH:MM format
function displayDate() {
    current_date = new Date();

    year = current_date.getFullYear();
    month = current_date.getMonth() + 1;
    month = ((month < 10) ? '0' + month : month);
    day = current_date.getDate();
    day = ((day < 10) ? '0' + day : day);
    hour = current_date.getHours();
    hour = ((hour < 10) ? '0' + hour : hour);
    minute = current_date.getMinutes();
    minute = ((minute < 10) ? '0' + minute : minute);

    document.getElementById('dateTime').innerHTML = year + "/" + month + "/" + day + "  " + hour + ":" + minute;
}

// Updates de status of the main valve every 15secs
setInterval(mainValveStatus, 15000);

// Retrieve the status of the main valve from the backend
function mainValveStatus() {
    var mainValveButtonStatus = httpGet(WATERING_NAMESPACE + '/main-water-valve');
    document.getElementById('mainValveButton').checked = mainValveButtonStatus;
}

// Controls the status of the main valve button and send the status to the backend
function mainValveButton() {
    var mainValveButtonStatus = document.getElementById('mainValveButton').checked;
    console.log(mainValveButtonStatus);
    var mainValveButtonStatus = httpGet(WATERING_NAMESPACE + '/main-water-valve?status=' + mainValveButtonStatus);

}

// Flow chart definition
const flowctx = document.getElementById('flowChart').getContext('2d');
const flowChart = new Chart(flowctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Flujo de agua actual',
            data: [],
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1,
            fill: false,
            tension: 0.3
        }
    ]
    },
    options: {
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Flujo (L/min)'
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Flujo de agua actual'
            }
        },
        legend: {
            display: false,
        }
    }
});

// Updates flow chart every 15secs
setInterval(updateFlowChart, 15000);

// Makes an HTTP GET request to retrieve the las 10 flow sensor data points and updates the flow chart with it
function updateFlowChart() {
    var flowData = httpGet(WATERING_NAMESPACE + '/flow-sensor-data?data-points=10');
    flowChart.data.labels = flowData['datetime'];
    flowChart.data.datasets[0].data = flowData['flow'];

    // console.log(flowChart.data.labels);
    // console.log(flowChart.data.datasets[0].data);
    flowChart.update();
}


// const consumptionctx = document.getElementById('consumptionChart').getContext('2d');
// const consumptionChart = new Chart(consumptionctx, {
//     type: 'line',
//     data: {
//         labels: [],
//         datasets: [{
//             label: '',
//             data: [],
//             backgroundColor: [
//                 'rgba(75, 192, 192, 0.2)'
//             ],
//             borderColor: [
//                 'rgb(75, 192, 192)'
//             ],
//             borderWidth: 1,
//             fill: false,
//             tension: 0.3
//         },
//         {
//             label: '',
//             data: [],
//             backgroundColor: [
//                 'rgba(153, 102, 255, 0.2)'
//             ],
//             borderColor: [
//                 'rgb(153, 102, 255)'
//             ],
//             borderDash: [5, 5],
//             borderWidth: 1,
//             fill: false,
//             tension: 0.3
//         }
//     ]
//     },
//     options: {
//         scales: {
//             y: {
//                 title: {
//                     display: true,
//                     text: 'Cantidad de agua (L)'
//                 }
//             }
//         },
//         plugins: {
//             title: {
//                 display: true,
//                 text: 'Histórico de consumo'
//             }
//         }
//     }
// });

// function updateConsumptionChart(period='week') {
//     var consumptionData = httpGet('/historical-consumption-data?period=' + period);

//     consumptionChart.data.labels = consumptionData['labels'];

//     var periodSP = periodsSpanish[period];
//     consumptionChart.data.datasets[0].label = periodSP + ' actual';
//     consumptionChart.data.datasets[1].label = periodSP + ' anterior';

//     consumptionChart.data.datasets[0].data = consumptionData['current_period'];
//     consumptionChart.data.datasets[1].data = consumptionData['last_period'];

//     // console.log(consumptionChart.data.labels);
//     // console.log(consumptionChart.data.datasets[0].data);
//     consumptionChart.update();
// }