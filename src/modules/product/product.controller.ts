import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/create')
  async createProduct(@Body() data: CreateProductDto) {
    return this.productService.createProduct(data);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('/listProducts/:shopId')
  async getListProducts(@Param('shopId') shopId: string) {
    return this.productService.getListProducts(Number(shopId));
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('/:productId')
  async getProduct(@Param('productId') productId: string) {
    return this.productService.getProduct(Number(productId));
  }
}
