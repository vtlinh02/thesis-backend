import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  customerId: number;

  @ApiProperty()
  productId: number;

  @ApiProperty({
    required: false,
  })
  note?: string;
}
