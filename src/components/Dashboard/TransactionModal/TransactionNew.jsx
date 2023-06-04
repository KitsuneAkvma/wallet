import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './Transaction.module.css';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateIsCategoriesListOpen,
  updateIsModalAddTransactionOpen,
} from '../../../redux/Slices/global/globalSlice';
import categories from '../../../../server/models/categories.json';
import { ReactSVG } from 'react-svg';
import { addTransaction, fetchCategories } from '../../../redux/Slices/finance/operations';
import { selectIsCategoriesListOpen } from '../../../redux/selectors';

export const TransactionModal = () => {
  const [selectedOption, setSelectedOption] = useState('Expense');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedExpense, setSelectedExpense] = useState([]);
  const [category, setCategory] = useState('');
  const [chosenCategory, setChosenCategory] = useState('');

  const categories = useSelector(state => state.finance.categories);
  const open = useSelector(state => state.global.isModalAddTransactionOpen);
  const dispatch = useDispatch();
  const isCategoriesListOpen = useSelector(selectIsCategoriesListOpen);

  const closeModal = () => {
    dispatch(updateIsModalAddTransactionOpen(false));
  };

  const handleSwitchToggle = () => {
    setSelectedOption(prevOption => (prevOption === 'Income' ? 'Expense' : 'Income'));
    setSelectedExpense([]);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await dispatch(fetchCategories());
        if (response.status === 'success' && response.data && response.data.allCategories) {
          const categories = response.data.allCategories.map(category => category.name);
          console.log('Transaction Categories:', categories);
        } else {
          throw new Error('Invalid response structure');
        }
      } catch (error) {
        console.error('Error fetching transaction categories:', error);
      }
    };

    if (open) {
      setSelectedDate(new Date());
    }
  }, [open, dispatch]);

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const validationSchema = Yup.object().shape({
    transactionValue: Yup.number()
      .typeError('Value must be a number')
      .required('')
      .test('valid-number', 'Invalid number', value => {
        if (value === undefined || value === null) return false;
        const decimalRegex = /^\d+(\.\d{0,2})?$/;
        return decimalRegex.test(String(value)) && !String(value).includes('e');
      }),
  });

  const formik = useFormik({
    initialValues: {
      transactionValue: '',
      comment: '',
    },
    validationSchema,
    onSubmit: async values => {
      try {
        const transactionData = {
          typeOfTransaction: selectedOption,
          category: 'Income',
          amountOfTransaction: values.transactionValue,
          transactionDate: selectedDate.toISOString(),
          comment: values.comment,
        };

        if (selectedOption === 'Expense') {
          transactionData.category = category;
        }

        console.log(transactionData);

        dispatch(addTransaction(transactionData))
          .unwrap()
          .then(() => {
            formik.resetForm();
            closeModal();
          })
          .catch(error => {
            console.error('Error:', error);
          });
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log('Requested resource not found');
        } else {
          console.error('Error:', error.response.data);
        }
      }
    },
  });

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    const handleClickOutside = event => {
      if (event.target.classList.contains(styles.modal)) {
        closeModal();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [open]);

  return (
    <div>
      {open && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p className={styles.modalTitle}>Add transaction</p>
            <div className={styles.optionContainer}>
              <span
                className={selectedOption === 'Expense' ? styles.greyedText : styles.incomeColor}
              >
                Income
              </span>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={selectedOption === 'Expense'}
                  onChange={handleSwitchToggle}
                />
                <span className={`${styles.slider} ${styles.round}`}></span>
              </label>
              <span
                className={selectedOption === 'Income' ? styles.greyedText : styles.expenseColor}
              >
                Expense
              </span>
            </div>

            {selectedOption === 'Expense' && (
              <div
                onClick={() => {
                  isCategoriesListOpen
                    ? dispatch(updateIsCategoriesListOpen(false))
                    : dispatch(updateIsCategoriesListOpen(true));
                }}
                className={styles.categoriesBox}
              >
                <input placeholder="Select a category" className={styles.selectCategoryInput} value={chosenCategory}/>
                <ReactSVG className={styles.arrowIcon} src="/svg/arrow_icon.svg" />
                {isCategoriesListOpen && (
                  <ul
                    className={`${styles.optionList}`}
                  >
                    <li className={styles.optionLi} onClick={()=>{setChosenCategory("Main expenses")}} value="Main expenses">
                      Main expenses
                    </li>
                    <li className={styles.optionLi} onClick={()=>{setChosenCategory("Products")}} value="Products">
                      Products
                    </li>
                    <li className={styles.optionLi} onClick={()=>{setChosenCategory("Car")}} value="Car">
                      Car
                    </li>
                    <li className={styles.optionLi} onClick={()=>{setChosenCategory("Self care")}} value="Self care">
                      Self care
                    </li>
                    <li className={styles.optionLi} onClick={()=>{setChosenCategory("Child care")}} value="Child care">
                      Child care
                    </li>
                    <li className={styles.optionLi} onClick={()=>{setChosenCategory("Household products")}} value="Household products">
                      Household products
                    </li>
                    <li className={styles.optionLi} onClick={()=>{setChosenCategory("Education")}} value="Education">
                      Education
                    </li>
                    <li className={styles.optionLi} onClick={()=>{setChosenCategory("Leisure")}} value="Leisure">
                      Leisure
                    </li>
                    <li className={styles.optionLi} onClick={()=>{setChosenCategory("Entertainment")}} value="Entertainment">
                      Entertainment
                    </li>
                    <li className={styles.optionLi} onClick={()=>{setChosenCategory("Other expenses")}} value="Other expenses">
                      Other expenses
                    </li>
                  </ul>
                )}
                {/* <select
                  className={styles.categorySelect}
                  defaultValue="Select your option"
                  onChange={e => setCategory(e.target.value)}
                >
                  {category ? null : (
                    <option value="" hidden>
                      Select your option
                    </option>
                  )}
                  {categories.map(category => (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select> */}
              </div>
            )}
            <div className={styles.valueAndTime}>
              <input
                type="text"
                name="transactionValue"
                placeholder="0.00"
                className={styles.transactionValue}
                {...formik.getFieldProps('transactionValue')}
                onChange={e => {
                  let value = e.target.value.replace(',', '.');
                  value = value.replace(/[^0-9.]/g, '');
                  const decimalPlaces = 2;
                  const decimalIndex = value.indexOf('.');
                  if (decimalIndex !== -1) {
                    value = `${value.slice(0, decimalIndex + decimalPlaces + 1)}`;
                  }
                  formik.setFieldValue('transactionValue', value);
                }}
              />
              {formik.touched.transactionValue && formik.errors.transactionValue ? (
                <div className={styles.error}>{formik.errors.transactionValue}</div>
              ) : null}
              <div className={styles.transactionDate}>
                <Datetime
                  value={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="DD-MM-YYYY"
                  timeFormat={false}
                  className={styles.datetimePicker}
                />
              </div>
            </div>
            <input
              type="text"
              name="comment"
              placeholder="Comment"
              className={styles.transactionComment}
              {...formik.getFieldProps('comment')}
            />
            <button className={styles.closeBtn} onClick={closeModal}>
              &#10006;
            </button>
            <button type="submit" className={styles.addBtn} onClick={formik.handleSubmit}>
              ADD
            </button>
            <button className={styles.cancelBtn} onClick={closeModal}>
              CANCEL
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
