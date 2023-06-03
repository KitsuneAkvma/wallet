import React from 'react';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './EditTransaction.module.css';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateIsModalEditTransactionOpen } from '../../../redux/Slices/global/globalSlice';

export const EditTransaction = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState('expense');
  const [selectedDate, setSelectedDate] = useState(null);
  const [category, setCategory] = useState('');
  const [transactionId, setTransactionId] = useState('');

  const open = useSelector(state => state.global.isModalEditTransactionOpen);
  const dispatch = useDispatch();
  const editModal = async () => {
    try {
      const id = '647a30e1f3a09f8e61244a5d'; // dodać pobieranie id
      setTransactionId(id);
      const transaction = await dispatch(getOneTransaction(id)).unwrap();
      const dateParts = transaction.transactionDate.split('-');
      const year = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10) - 1;
      const day = parseInt(dateParts[2], 10);
      const date = new Date(year, month, day);

      setSelectedDate(date);
      setShowModal(true);

      formik.setValues({
        transactionValue: transaction.amountOfTransaction.toString(),
        comment: transaction.comment,
        data: transaction.createdAt,
        category: transaction.category,
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
    },
    validationSchema,
    onSubmit: async values => {
      try {
        const id = transactionId;
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

        await dispatch(editTransaction(transactionData)).unwrap();
        formik.resetForm();
        closeModal();
      } catch (error) {
        console.error('Error:', error);
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
            <p className={styles.modalTitle}>Edit transaction</p>
            <div className={styles.optionContainer}>
              <span
                className={selectedOption === 'expense' ? styles.greyedText : styles.incomeColor}
              >
                Income
              </span>
              /
              <span
                className={selectedOption === 'Income' ? styles.greyedText : styles.incomeColor}
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
