import { Controller, Get, Post, Body } from '@nestjs/common';
import { WebsocketsService } from './websockets.service';
import { TransactionDto } from './dto/transaction.dto';
import { Transaction } from './dto/transaction.interface';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly websocketsService: WebsocketsService) {}

  @Post()
  createTransaction(@Body() transactionDto: TransactionDto): Transaction {
    return this.websocketsService.createTransaction(transactionDto);
  }

  @Get('active')
  getActiveTransactions(): Transaction[] {
    return this.websocketsService.getActiveTransactions();
  }
}
