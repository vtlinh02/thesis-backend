import { ApiProperty } from '@nestjs/swagger';

export class CancelCartDto {
  @ApiProperty()
  cartId: number;
}
