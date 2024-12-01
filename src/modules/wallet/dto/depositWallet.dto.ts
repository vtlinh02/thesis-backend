import { ApiProperty } from '@nestjs/swagger';

export class DepositWalletDto {
  @ApiProperty()
  walletId: number;

  @ApiProperty()
  amount: number;
}
