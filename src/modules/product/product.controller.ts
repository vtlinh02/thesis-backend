import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/createProduct.dto';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/create')
  async createProduct(@Body() data: CreateProductDto) {
    return this.productService.createProduct(data);
  }

  @Get('/listProducts/:shopId')
  async getListProducts(@Param('shopId') shopId: string) {
    return this.productService.getListProducts(Number(shopId));
  }

  @Get('/:productId')
  async getProduct(@Param('productId') productId: string) {
    return this.productService.getProduct(Number(productId));
  }
}
