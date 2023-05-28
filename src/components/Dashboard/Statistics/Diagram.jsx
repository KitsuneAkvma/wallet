import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styles from './Diagram.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

export const Diagram = () => {
  const chartData = {
    datasets: [
      {
        data: [10.0, 20.0, 30.0, 15.0, 25.0],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0'],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    cutout: '70%',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        display: false,
      },
    },
  };

  const centerText =
    '₴' + ' ' + chartData.datasets[0].data.reduce((total, value) => total + value, 0).toFixed(2);

  return (
    <div className={`${styles.statistic} ${styles.smallChart}`}>
      <div>
        <p>Statistic</p>
        <div>
          <select className={styles.optionSelect}>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </select>
          <select className={styles.optionSelect}>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
          </select>
        </div>
      </div>
      <div className={styles.chartContainer}>
        <Doughnut data={chartData} options={chartOptions} />
        <div className={styles.centerText}>{centerText}</div>
      </div>
    </div>
  );
};
