import React from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
//import ChartDataLabels from 'chartjs-plugin-datalabels';


//setup block
const data = {
    labels: ['Blk-1, VM1', 'Blk-2, VM2'],
datasets: [{
    label: 'SoC Level 75-95%',
    data: [21,6],
    backgroundColor: function(context){
        const chart = context.chart;
        const { ctx, chartArea } = chart;

        if (!chartArea) {
            return null;
        }
        return getGradient(ctx, chartArea);
    },
    borderWidth: 1
},
{
    label: 'Soc Level 50-75%',
    data: [41,26],
    backgroundColor: function(context){
        const chart = context.chart;
        const { ctx, chartArea } = chart;

        if (!chartArea) {
            return null;
        }
        return getGradient(ctx, chartArea);
    },
    borderWidth: 1
},
{
    label: 'SoC Level 25-50%',
    data: [71,51],
    backgroundColor: function(context){
        const chart = context.chart;
        const { ctx, chartArea } = chart;

        if (!chartArea) {
            return null;
        }
        return getGradient(ctx, chartArea);
    },
    borderWidth: 1
},
{
    label: 'SoC Level 0-25%',
    data: [106],
    backgroundColor: function(context){
        const chart = context.chart;
        const { ctx, chartArea } = chart;

        if (!chartArea) {
            return null;
        }
        return getGradient(ctx, chartArea);
    },
    borderWidth: 1
}
]
};

//gradient block
function getGradient(ctx, chartArea) {
    const gradientBg = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
    gradientBg.addColorStop(0, '#54B435');
    gradientBg.addColorStop(0.5, '#F5BB00');
    gradientBg.addColorStop(1, '#E0312B');
    return gradientBg;
    };

/*function getGradientNew(ctx, chartArea) {
    const gradientBgNew = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
    gradientBgNew.addColorStop(0.6, '#E14D2A');
    gradientBgNew.addColorStop(1, '#54B435');
    
    return gradientBgNew;
    };*/
//config block
const config = {
type: 'bar',
data,
//plugins: [ChartDataLabels],
options: {
    //events: [],
    plugins: {
        legend: {
            display: false,
            labels: {
                filter: (legendItem, chartData) => (legendItem.text !== 'SoC Level 25%-55%')
              }
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
    indexAxis: 'y',
    scales: {
        x: {
            title: {
                display: true,
                text: 'Distance (miles)'
            },
            stacked: false
            
        },
        y: {
            stacked: true,
            beginAtZero: true,
            callback: function(value,index,values){
                return value
            }
        }
    }

}

};

//init and render block
new Chart(
document.getElementById('myChartNew'),
config

);

const DisChart = () => {
    return (
      <div>
        <Bar data={data} />
      </div>
    );
  };

  export default DisChart;