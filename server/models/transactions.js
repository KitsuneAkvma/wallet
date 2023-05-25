import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const dateNow = new Date().toString();
export const transaction = new Schema(
  {
    transactionDate: {
      type: String,
      default: dateNow,
    },
    typeOfTransaction: {
      type: String,
      enum: ['Income', 'Expense'],
      default: 'Expense',
    },
    categoryOfTransaction: {
      type: String,
      enum: [
        'Main expenses',
        'Products',
        'Car',
        'Self care',
        'Child care',
        'Household products',
        'Education',
        'Leisure',
        'Other expenses',
        'Entertainment',
      ],
      default: 'Other expenses',
    },
    comment: {
      type: String,
      default: '',
    },
    amountOfTransaction: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false, timestamps: true },
);
export const Transaction = mongoose.model('transaction', transaction);
