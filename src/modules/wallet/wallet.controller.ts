import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/createWallet.dto';
import { DepositWalletDto } from './dto/depositWallet.dto';
import { WithDrawWalletDto } from './dto/withdrawWallet.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('Wallet')
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('/')
  async createWallet(@Body() data: CreateWalletDto) {
    return this.walletService.createWallet(data);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
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
