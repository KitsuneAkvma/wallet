import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './Transaction.module.css';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateIsModalAddTransactionOpen } from '../../../redux/Slices/global/globalSlice';
import { addTransaction, fetchCategories } from '../../../redux/Slices/finance/operations';
import { selectFinanceCategories } from '../../../redux/selectors';

export const TransactionModal = () => {
  const [selectedOption, setSelectedOption] = useState('Expense');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedExpense, setSelectedExpense] = useState([]);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  const open = useSelector(state => state.global.isModalAddTransactionOpen);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(updateIsModalAddTransactionOpen(false));
  };

  const handleSwitchToggle = () => {
    setSelectedOption(prevOption => (prevOption === 'Income' ? 'Expense' : 'Income'));
    setSelectedExpense([]);
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await dispatch(fetchCategories());
        const categoriesName = response.payload.map(category => category.name);
        setCategories(categoriesName);
      } catch (error) {
        console.error('Error fetching transaction categories:', error);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    if (open) {
      setSelectedDate(new Date());
    }
  }, [open]);

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

        dispatch(addTransaction(transactionData))
          .unwrap()
          .then(() => {
            console.log(formik.values);
            formik.resetForm();
            closeModal();
          })
          .catch(error => {
            console.error('Error:', error);
          });
      } catch (error) {
        if (error.response && error.response.status === 404) {
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
              <div>
                <select
                  className={styles.categorySelect}
                  defaultValue="Select your option"
                  onChange={e => setCategory(e.target.value)}
                >
                  {category ? null : (
                    <option value="" hidden>
                      Select your option
                    </option>
                  )}
                  {categories.map(category => {
                    if (category === 'Income') {
                      return null;
                    }
                    return (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    );
                  })}
                </select>
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
