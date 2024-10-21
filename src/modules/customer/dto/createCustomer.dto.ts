import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
