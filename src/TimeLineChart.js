import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
//import ChartDataLabels from 'chartjs-plugin-datalabels';


//setup block
const data = {
    labels: ['00 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM', '00 AM'],
datasets: [{
  label: 'Tr40-225_V1',
  data: [95, 83, 71, 69, 47, 35, 23, 12, 0, 26, 55, 44, 33, 22, 10, 19, 27, 36, 44, 52, 61, 69, 78, 86, 94],
  backgroundColor: "rgba(190, 80, 120, 0.2)",
  borderColor: "black",
  borderWidth: 1,
  pointBorderColor: "aqua",
  fill: true,
  tension: 0.4,
},
]
};

//config block
const config = {
type: 'line',
data,
//plugins: [ChartDataLabels],
options: {
    //events: [],
    plugins: {
        legend: {
            display: true,
        },
        tooltip:{
            enabled: true
        }
        /*datalabels: {
            color: 'black',
            anchor: 'end',
            align: 'left'
        }*/
    },
    responsive: true,
    showTooltips: true,
    maintainAspectRatio: false,
    scales: {
        x: {
            title: {
                display: true,
                text: 'Time (hr)'
            },
            grid: {
              display: false
            }
            
        },
        y: {
          title: {
            display: true,
            text: 'SoC Profile'
        },
        grid: {
          display: false
        }
        }
    }

}

};

//init and render block
new Chart(
document.getElementById('myChart1'),
config

);

const data2 = {
  labels: ['00 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM', '00 AM'],
datasets: [{
label: 'Tr40-225_V2',
data: [95, 83, 71, 59, 48, 36, 24, 13, 1, 22, 53, 46, 35, 24, 13, 17, 25, 33, 42, 50, 58, 66, 75, 86, 94],
backgroundColor: "rgba(190, 80, 120, 0.2)",
borderColor: "black",
borderWidth: 1,
pointBorderColor: "aqua",
fill: true,
tension: 0.4,
},
]
};

const totalDuration = 100000;
const delayBetweenPoints = totalDuration / data.length;
const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
const animation = {
  x: {
    type: 'number',
    easing: 'linear',
    duration: delayBetweenPoints,
    from: NaN, // the point is initially skipped
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.xStarted) {
        return 0;
      }
      ctx.xStarted = true;
      return ctx.index * delayBetweenPoints;
    }
  },
  y: {
    type: 'number',
    easing: 'linear',
    duration: delayBetweenPoints,
    from: previousY,
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.yStarted) {
        return 0;
      }
      ctx.yStarted = true;
      return ctx.index * delayBetweenPoints;
    }
  }
};
//config block
const config2 = {
type: 'line',
data: data2,
//plugins: [ChartDataLabels],
options: {
  //events: [],
  animation,
  interaction: {
    intersect: false
  },
  plugins: {
      legend: {
          display: true,
      },
      tooltip:{
          enabled: true
      }
      /*datalabels: {
          color: 'black',
          anchor: 'end',
          align: 'left'
      }*/
  },
  responsive: true,
  showTooltips: true,
  maintainAspectRatio: false,
  scales: {
      x: {
          title: {
              display: true,
              text: 'Time (hr)'
          },
          grid: {
            display: false
          }
          
      },
      y: {
        title: {
          display: true,
          text: 'SoC Profile'
      },
      grid: {
        display: false
      }
      }
  }

}

};

//init and render block
new Chart(
document.getElementById('myChart2'),
config2

);

const TimeLineChart = () => {
    return (
      <div>
        <Line data={data} />
        <Line data={data2} />
      </div>
    );
  };

  export default TimeLineChart;