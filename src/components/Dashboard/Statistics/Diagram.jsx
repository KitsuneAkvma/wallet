import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styles from './Diagram.module.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactSVG } from 'react-svg';
import Datetime from 'react-datetime';
import {
  fetchCategories,
  fetchTransactionsByMonth,
  getAllTransactions,
} from '../../../redux/Slices/finance/operations';

ChartJS.register(ArcElement, Tooltip, Legend);

export const Diagram = () => {
  const [selectedYear, setSelectedYear] = useState('2023');
  const [selectedMonth, setSelectedMonth] = useState('June');
  const [categories, setCategories] = useState([]);
  const [color, setColor] = useState([]);
  const [diagramData, setDiagramData] = useState([]);
  const [isMonthListOpen, setIsMonthListOpen] = useState(false);
  const [isYearListOpen, setIsYearListOpen] = useState(false);
  const [incomeValue, setIncomeValue] = useState(0);

  const dispatch = useDispatch();

  const handleYearChange = e => {
    setSelectedYear(e.target.value);
  };

  const handleMonthChange = e => {
    setSelectedMonth(e.target.value);
    generateChartData(selectedYear, e.target.value);
  };

  const getMonthNumber = month => {
    const monthMap = {
      January: 0,
      February: 1,
      March: 2,
      April: 3,
      May: 4,
      June: 5,
      July: 6,
      August: 7,
      September: 8,
      October: 9,
      November: 10,
      December: 11,
    };
    return monthMap[month];
  };

  useEffect(() => {
    const getMonthlySummary = async () => {
      const specificDate = new Date(selectedYear, getMonthNumber(selectedMonth), 1);
      try {
        const response = await dispatch(fetchTransactionsByMonth(specificDate));
        const { incomeValue, usedCategoryIds, categoryIdValues } = response.payload;

        const categoryResponse = await dispatch(fetchCategories());

        setIncomeValue(incomeValue);

        console.log(response.payload);
        const getingCategories = categoryResponse.payload;

        const categoryIdMap = categoryIdValues.map((value, index) => ({
          value: value,
          usedCategoryId: usedCategoryIds[index],
        }));

        const getCategoryName = categoryId => {
          const category = getingCategories.find(category => category._id === categoryId);
          return category ? category.name : '';
        };

        const updatedCategoryIdMap = categoryIdMap.map(item => ({
          value: item.value,
          usedCategoryId: getCategoryName(item.usedCategoryId),
        }));

        console.log(updatedCategoryIdMap);
        setDiagramData(updatedCategoryIdMap);

        setCategories(getingCategories.map(category => category.name));
        setColor(getingCategories.map(category => category.color));
      } catch (error) {
        console.error(error);
      }
    };
    getMonthlySummary();
  }, [dispatch, selectedMonth]);

  const dataByMonth = {
    January: diagramData.map(item => ({
      category: item.usedCategoryId,
      value: item.value,
    })),
    February: diagramData.map(item => ({
      category: item.usedCategoryId,
      value: item.value,
    })),
    March: diagramData.map(item => ({
      category: item.usedCategoryId,
      value: item.value,
    })),
    April: diagramData.map(item => ({
      category: item.usedCategoryId,
      value: item.value,
    })),
    May: diagramData.map(item => ({
      category: item.usedCategoryId,
      value: item.value,
    })),
    June: diagramData.map(item => ({
      category: item.usedCategoryId,
      value: item.value,
    })),
    July: diagramData.map(item => ({
      category: item.usedCategoryId,
      value: item.value,
    })),
    August: diagramData.map(item => ({
      category: item.usedCategoryId,
      value: item.value,
    })),
    September: diagramData.map(item => ({
      category: item.usedCategoryId,
      value: item.value,
    })),
    October: diagramData.map(item => ({
      category: item.usedCategoryId,
      value: item.value,
    })),
    November: diagramData.map(item => ({
      category: item.usedCategoryId,
      value: item.value,
    })),
    December: diagramData.map(item => ({
      category: item.usedCategoryId,
      value: item.value,
    })),
  };

  const generateChartData = (year, month) => {
    const selectedData = dataByMonth[month];
    const chartData = selectedData.map(item => item.value);
    const categoryColors = color.length > 0 ? color : [];
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

  const income = incomeValue.toFixed(2);
  const expense = chartData.datasets[0].data.reduce((total, value) => total + value, 0).toFixed(2);
  const centerTextValue = (income - expense).toFixed(2);
  const centerTextClass = centerTextValue > 0 ? styles.greenText : styles.redText;
  const centerText = (
    <span className={centerTextClass}>
      {'₴'} {centerTextValue}
    </span>
  );

  const selectedData = dataByMonth[selectedMonth];

  return (
    <div className={styles.statistic}>
      <p className={styles.chartTitle}>Statistics</p>
      <div className={styles.statisticContent}>
        <div>
          <div className={styles.chartContainer}>
            <Doughnut data={chartData} options={chartOptions} />
            <div className={styles.centerText}>{centerText}</div>
          </div>
        </div>
        <div>
          <div className={styles.select}>
            <div
              onClick={() => {
                isMonthListOpen ? setIsMonthListOpen(false) : setIsMonthListOpen(true);
              }}
              className={styles.timeBox}
            >
              <input className={styles.selectMonthInput} value={selectedMonth} />
              <ReactSVG className={styles.arrowIcon} src="/svg/arrow_icon.svg" />
              {isMonthListOpen && (
                <ul className={`${styles.optionList}`}>
                  <li
                    onClick={() => {
                      setSelectedMonth('January');
                    }}
                    className={styles.optionLi}
                    value="January"
                  >
                    January
                  </li>
                  <li
                    onClick={() => {
                      setSelectedMonth('February');
                    }}
                    className={styles.optionLi}
                    value="February"
                  >
                    February
                  </li>
                  <li
                    onClick={() => {
                      setSelectedMonth('March');
                    }}
                    className={styles.optionLi}
                    value="March"
                  >
                    March
                  </li>
                  <li
                    onClick={() => {
                      setSelectedMonth('April');
                    }}
                    className={styles.optionLi}
                    value="April"
                  >
                    April
                  </li>
                  <li
                    onClick={() => {
                      setSelectedMonth('May');
                    }}
                    className={styles.optionLi}
                    value="May"
                  >
                    May
                  </li>
                  <li
                    onClick={() => {
                      setSelectedMonth('June');
                    }}
                    className={styles.optionLi}
                    value="June"
                  >
                    June
                  </li>
                  <li
                    onClick={() => {
                      setSelectedMonth('July');
                    }}
                    className={styles.optionLi}
                    value="July"
                  >
                    July
                  </li>
                  <li
                    onClick={() => {
                      setSelectedMonth('August');
                    }}
                    className={styles.optionLi}
                    value="August"
                  >
                    August
                  </li>
                  <li
                    onClick={() => {
                      setSelectedMonth('September');
                    }}
                    className={styles.optionLi}
                    value="September"
                  >
                    September
                  </li>
                  <li
                    onClick={() => {
                      setSelectedMonth('October');
                    }}
                    className={styles.optionLi}
                    value="October"
                  >
                    October
                  </li>
                  <li
                    onClick={() => {
                      setSelectedMonth('November');
                    }}
                    className={styles.optionLi}
                    value="November"
                  >
                    November
                  </li>
                  <li
                    onClick={() => {
                      setSelectedMonth('December');
                    }}
                    className={styles.optionLi}
                    value="December"
                  >
                    December
                  </li>
                </ul>
              )}
            </div>
            <div
              onClick={() => {
                isYearListOpen ? setIsYearListOpen(false) : setIsYearListOpen(true);
              }}
              className={styles.timeBox}
            >
              <input className={styles.selectYearInput} value={selectedYear} />
              <ReactSVG className={styles.arrowIcon} src="/svg/arrow_icon.svg" />
              {isYearListOpen && (
                <ul className={`${styles.optionList}`}>
                  <li
                    onClick={() => {
                      setSelectedYear('2023');
                    }}
                    className={styles.optionLi}
                    value="2023"
                  >
                    2023
                  </li>
                </ul>
              )}
            </div>
            {/* <select
              className={styles.optionSelect}
              value={selectedMonth}
              onChange={handleMonthChange}
            >
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
            <select
              className={styles.optionSelect}
              value={selectedYear}
              onChange={handleYearChange}
            >
              <option value="2023">2023</option>
            </select> */}
          </div>
          <div className={styles.dataTitle}>
            <p>Category</p>
            <p>Sum</p>
          </div>
          <div>
            {selectedData.map((item, index) => (
              <div className={styles.data} key={item.category}>
                <div className={styles.categoryExplanation}>
                  <div
                    className={styles.dataColor}
                    style={{ backgroundColor: chartData.datasets[0].backgroundColor[index] }}
                  ></div>
                  <p className={styles.categoryData}>{item.category}</p>
                </div>
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
    </div>
  );
};
