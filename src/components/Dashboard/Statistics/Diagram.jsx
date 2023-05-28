import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styles from './Diagram.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

export const Diagram = () => {
  const [selectedYear, setSelectedYear] = useState('2023');
  const [selectedMonth, setSelectedMonth] = useState('April');

  const handleYearChange = e => {
    setSelectedYear(e.target.value);
  };

  const handleMonthChange = e => {
    setSelectedMonth(e.target.value);
  };

  const dataByMonth = {
    January: [
      { category: 'Category 1', value: 10.0 },
      { category: 'Category 2', value: 20.0 },
      { category: 'Category 3', value: 30.0 },
      { category: 'Category 4', value: 15.0 },
      { category: 'Category 5', value: 25.0 },
    ],
    February: [
      { category: 'Category 1', value: 5.0 },
      { category: 'Category 2', value: 15.0 },
      { category: 'Category 3', value: 25.0 },
      { category: 'Category 4', value: 20.0 },
      { category: 'Category 5', value: 10.0 },
    ],
    March: [
      { category: 'Category 1', value: 15.0 },
      { category: 'Category 2', value: 10.0 },
      { category: 'Category 3', value: 5.0 },
      { category: 'Category 4', value: 20.0 },
      { category: 'Category 5', value: 30.0 },
    ],
    April: [
      { category: 'Category 1', value: 20.0 },
      { category: 'Category 2', value: 25.0 },
      { category: 'Category 3', value: 15.0 },
      { category: 'Category 4', value: 10.0 },
      { category: 'Category 5', value: 8.0 },
    ],
  };

  const generateChartData = (year, month) => {
    const selectedData = dataByMonth[month];
    const chartData = selectedData.map(item => item.value);
    const categoryColors = ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0']; // Define an array of category colors
    const backgroundColors = selectedData.map(
      (_, index) => categoryColors[index % categoryColors.length],
    );
    return {
      data: chartData,
      backgroundColor: backgroundColors,
      borderWidth: 0,
    };
  };

  const chartData = {
    datasets: [generateChartData(selectedYear, selectedMonth)],
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

  const income = '80.00';
  const expense = chartData.datasets[0].data.reduce((total, value) => total + value, 0).toFixed(2);
  const centerTextValue = income - expense;
  const centerTextClass = centerTextValue > 0 ? styles.greenText : styles.redText;
  const centerText = (
    <span className={centerTextClass}>
      {'₴'} {centerTextValue}
    </span>
  );

  const selectedData = dataByMonth[selectedMonth];

  return (
    <div className={styles.statistic}>
      <div>
        <p className={styles.chartTitle}>Statistics</p>
        <div className={styles.chartContainer}>
          <Doughnut data={chartData} options={chartOptions} />
          <div className={styles.centerText}>{centerText}</div>
        </div>
      </div>
      <div>
        <div className={styles.select}>
          <select className={styles.optionSelect} value={selectedYear} onChange={handleYearChange}>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </select>
          <select
            className={styles.optionSelect}
            value={selectedMonth}
            onChange={handleMonthChange}
          >
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
          </select>
        </div>
        <div className={styles.dataTitle}>
          <p>Category</p>
          <p>Sum</p>
        </div>
        <div>
          {selectedData.map((item, index) => (
            <div className={styles.data} key={item.category}>
              <div
                className={styles.dataColor}
                style={{ backgroundColor: chartData.datasets[0].backgroundColor[index] }}
              ></div>
              <p className={styles.categoryData}>{item.category}</p>
              <p className={styles.valueData}>{item.value.toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className={styles.expense}>
          <p>Expense:</p>
          <p>{expense}</p>
        </div>
        <div className={styles.income}>
          <p>Income:</p>
          <p>{income}</p>
        </div>
      </div>
    </div>
  );
};
