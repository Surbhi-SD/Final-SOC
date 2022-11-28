import React from 'react';
import { useState, useEffect } from 'react';
//import axios from 'axios';
//import SOCResponse from './SOCResponse.json';
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip,
  );

  const options = {
    type: 'bar',
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    scales:{
      x: {
      stacked: false,
      grid: {
        display: false
      }
      },
      y: {
      stacked: true,
      grid: {
        display: false
      },
      beginAtZero: true
      }
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Chart.js Horizontal Bar Chart',
      },
    },
  };

const TimeChart =() => {
    const [data, setData] = useState({
        labels:['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [
          {
            label: 'Dataset 1',
            data:[],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'black',
            borderWidth: 2
          },
          {
            label: 'Dataset 2',
            data:[],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'black',
            borderWidth: 2
          }
        ],
      });

    useEffect(()=> {
       const fetchData= async()=> {
           const url = 'http://localhost:8000/soc_profile'
           const labelSet = []
           const dataSet1 = [];
           //const dataSet2 = [];
         await fetch(url).then((data)=> {
             console.log("Api data", data)
             const res = data.json();
             return res
         }).then((res) => {
             console.log("ressss", res)
            for (const val of res) {
                 labelSet.push(val.vehicel_model)
                dataSet1.push(val.soc_profile);
                //dataSet2.push(val.postId)
                 
            }
            setData({
                labels: labelSet,
                datasets: [
                  {
                    label: 'SOC Profile',
                    data: dataSet1,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'black',
                    borderWidth: 2
                  }
                ],
              })
            console.log("arrData", labelSet, dataSet1)
         }).catch(e => {
                console.log("error", e)
            })
        }
        
        fetchData();
    },[])
   
    return(
        <div style={{height:'100%'}}>
            {
                console.log("dataaaaaaaa", data)
            }
            <Bar data={data} options={options}/>
         </div>)
}

export default TimeChart;