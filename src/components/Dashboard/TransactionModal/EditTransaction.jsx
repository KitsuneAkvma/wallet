import React from 'react';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import styles from './EditTransaction.module.css';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import {
  updateIsCategoriesListOpen,
  updateIsModalEditTransactionOpen,
} from '../../../redux/Slices/global/globalSlice';
import {
  editTransaction,
  getOneTransaction,
  fetchCategories,
} from '../../../redux/Slices/finance/operations';
import { ReactSVG } from 'react-svg';
import { selectIsCategoriesListOpen } from '../../../redux/selectors';

export const EditTransaction = () => {
  const [selectedOption, setSelectedOption] = useState('Income');
  const [selectedDate, setSelectedDate] = useState(null);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  const open = useSelector(state => state.global.isModalEditTransactionOpen);
  const dispatch = useDispatch();
  const isCategoriesListOpen = useSelector(selectIsCategoriesListOpen);
  const transactionId = useSelector(state => state.finance.selectedTransaction);

  const editModal = async () => {
    try {
      const transaction = await dispatch(getOneTransaction(transactionId)).unwrap();
      const dateParts = transaction.transactionDate.split('-');
      const year = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10) - 1;
      const day = parseInt(dateParts[2], 10);
      const date = new Date(year, month, day);

      setSelectedDate(date);

      formik.setValues({
        transactionValue: transaction.amountOfTransaction.toString(),
        comment: transaction.comment,
        category: transaction.categoryId,
      });

      setSelectedOption(transaction.typeOfTransaction);

      if (transaction.typeOfTransaction === 'Expense') {
        setCategory(transaction.category);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const closeModal = () => {
    dispatch(updateIsModalEditTransactionOpen(false));
  };

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
          amountOfTransaction: values.transactionValue,
          transactionDate: selectedDate.toISOString(),
          comment: values.comment,
          id: transactionId._id,
          category: 'Income',
        };

        if (selectedOption === 'Expense') {
          transactionData.category = category;
        }
        console.log(selectedOption);
        await dispatch(editTransaction(transactionData)).unwrap();
        formik.resetForm();
        closeModal();
      } catch (error) {
        console.error('Error:', error);
      }
    },
  });

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
      editModal();
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
            <p className={styles.modalTitle}>Edit transaction</p>
            <div className={styles.optionContainer}>
              <span
                className={selectedOption === 'Expense' ? styles.greyedText : styles.incomeColor}
              >
                Income
              </span>
              /
              <span
                className={selectedOption === 'Income' ? styles.greyedText : styles.expenseColor}
              >
                Expense
              </span>
            </div>

            {selectedOption === 'Expense' && (
              <div
                className={styles.categoriesBox}
                onClick={() => {
                  isCategoriesListOpen
                    ? dispatch(updateIsCategoriesListOpen(false))
                    : dispatch(updateIsCategoriesListOpen(true));
                }}
              >
                <input
                  placeholder="Select a category"
                  className={styles.selectCategoryInput}
                  value={category}
                  readOnly
                />
                <ReactSVG className={styles.arrowIcon} src="/svg/arrow_icon.svg" />
                {isCategoriesListOpen && (
                  <ul className={styles.optionList}>
                    {categories.map(category => {
                      if (category === 'Income') {
                        return null;
                      }
                      return (
                        <li
                          key={category}
                          className={styles.optionLi}
                          onClick={() => setCategory(category)}
                        >
                          {category}
                        </li>
                      );
                    })}
                  </ul>
                )}
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
              SAVE
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
