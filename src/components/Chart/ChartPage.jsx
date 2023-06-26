import React from 'react'
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Col, Container, Row } from 'react-bootstrap';
import './Chart.scss'
const ChartPage = () => {
    const labels = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00","19:00"];
    const data = {
      labels: labels,
      datasets: [
        {
          label: "Ishga kelgan xodimlar",
          backgroundColor: "#7F73FF",
          borderColor: "#7F73FF",
          data: [0, 10, 20, 25, 30, 35, 40, 40, 40, 40, 45,45],
        },
        {
          label: "Ishga kelmagan xodimlar",
          backgroundColor: "red",
          borderColor: "red",
          data: [45, 30,25, 20, 15, 10, 5, 5, 5, 5, 0,0],
        },
      ],
    };
    return (
        <div className='chart_sec'>
            <div className="chart_title">
                <h6>Ishga kelganlar statistikasi</h6>
            </div>
            <Line data={data} />  
        </div>
    )
}

export default ChartPage