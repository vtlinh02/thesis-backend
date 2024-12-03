import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/createWallet.dto';
import { DepositWalletDto } from './dto/depositWallet.dto';
import { WithDrawWalletDto } from './dto/withdrawWallet.dto';

@ApiTags('Wallet')
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('/')
  async createWallet(@Body() data: CreateWalletDto) {
    return this.walletService.createWallet(data);
  }

  @Get('/:customerId')
  async getWalletBalance(@Param('customerId') customerId: string) {
    return this.walletService.getWalletBalance(Number(customerId));
  }

  @Put('/deposit')
  async depositWallet(@Body() data: DepositWalletDto) {
    return this.walletService.depositWallet(data);
  }

  @Put('/withdraw')
  async withdrawWallet(@Body() data: WithDrawWalletDto) {
    return this.walletService.withdrawWallet(data);
  }
}
