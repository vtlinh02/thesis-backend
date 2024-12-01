import { ApiProperty } from '@nestjs/swagger';

export class WithDrawWalletDto {
  @ApiProperty()
  walletId: number;

  @ApiProperty()
  amount: number;
}
