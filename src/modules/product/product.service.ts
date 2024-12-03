import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/Product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/createProduct.dto';
import { Shop } from 'src/entities/Shop.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Shop) private readonly shopRepository: Repository<Shop>,
  ) {}

  async createProduct(data: CreateProductDto) {
    const product = new Product();

    const shop = await this.shopRepository.findOneBy({ id: data.shopId });

    product.shop = shop;
    product.name = data.name;
    product.description = data.description;
    product.price = data.price;
    product.totalRemaining = data.totalRemaining;

    const dataReturn = await this.productRepository.save(product);

    return { data: dataReturn };
  }

  async getListProducts(shopId: number) {
    const shop = await this.shopRepository.findOneBy({ id: shopId });

    const products = await this.productRepository.findBy({ shop });

    return { data: products };
  }

  async getProduct(productId: number) {
    const product = await this.productRepository.findOneBy({ id: productId });

    return { data: product };
  }
}
