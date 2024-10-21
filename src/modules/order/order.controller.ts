import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/createOrder.dto';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/create')
  async createOrder(@Body() data: CreateOrderDto) {
    return this.orderService.createOrder(data);
  }

  @Get('/listOrders/:customerId')
  async getListOrdersByCustomerId(@Param('customerId') customerId: string) {
    return this.orderService.getListOrdersByCustomerId(Number(customerId));
  }
}
