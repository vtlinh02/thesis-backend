import { ApiProperty } from '@nestjs/swagger';

export class AddToCartDto {
  @ApiProperty()
  customerId: number;

  @ApiProperty()
  productId: number;
}
