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
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/addToCart.dto';
import { CancelCartDto } from './dto/cancelCart.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('cart')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('/check-cart-exist')
  async checkCartExist(@Body() data: AddToCartDto) {
    return this.cartService.checkIfCartAlreadyExist(data);
  }

  @Get('/list-carts/:customerId')
  async getCartListByCustomerId(@Param('customerId') customerId: string) {
    return this.cartService.getCartListByCustomerrId(Number(customerId));
  }

  @Put('/cancel-cart/')
  async cancelCart(@Body() data: CancelCartDto) {
    return this.cartService.cancelCart(data);
  }

  @Post('/')
  async addCart(@Body() data: AddToCartDto) {
    return this.cartService.addCart(data);
  }
}
