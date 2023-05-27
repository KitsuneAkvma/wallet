import React from 'react';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './EditTransaction.module.css';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

export const EditTransaction = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState('expense');
  const [selectedDate, setSelectedDate] = useState(null);
  const [category, setCategory] = useState('');

  const editModal = () => {
    setSelectedDate(new Date());
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
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
    },
    validationSchema,
    onSubmit: values => {
      console.log(values);
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

    if (showModal) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showModal]);

  return (
    <div>
      <button onClick={editModal}>Edit</button>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p className={styles.modalTitle}>Edit transaction</p>
            <div className={styles.optionContainer}>
              <span
                className={selectedOption === 'expense' ? styles.greyedText : styles.incomeColor}
              >
                Income
              </span>
              /
              <span
                className={selectedOption === 'income' ? styles.greyedText : styles.expenseColor}
              >
                Expense
              </span>
            </div>

            {selectedOption === 'expense' && (
              <div>
                <select className={styles.categorySelect} defaultValue="">
                  {category ? null : (
                    <option value="" hidden>
                      Select your option
                    </option>
                  )}
                  <option value="Tutaj">Tutaj</option>
                  <option value="Będą">Będą</option>
                  <option value="Dodane">Dodane</option>
                  <option value="Opcje">Opcje</option>
                  <option value="ZBackendu">z Backendu</option>
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
            <input className={styles.transactionComment} type="text" placeholder="Comment" />
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
