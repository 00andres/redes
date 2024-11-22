import { Injectable } from '@nestjs/common';
import { TransactionDto } from './dto/transaction.dto';
import { Transaction } from './dto/transaction.interface';

@Injectable()
export class WebsocketsService {
  private transactions: Transaction[] = [];
  private idCounter = 1;

  createTransaction(transactionDto: TransactionDto): Transaction {
    const newTransaction: Transaction = {
      id: this.idCounter++,
      ...transactionDto,
      isActive: true,
    };
    this.transactions.push(newTransaction);
    return newTransaction;
  }

  getActiveTransactions(): Transaction[] {
    return this.transactions.filter(transaction => transaction.isActive);
  }
}
