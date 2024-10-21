import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/createShop.dto';

@ApiTags('shop')
@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post('create')
  async createPost(@Body() data: CreateShopDto) {
    return this.shopService.createShop(data);
  }
}
