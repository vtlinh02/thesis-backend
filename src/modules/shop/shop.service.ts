import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shop } from 'src/entities/Shop.entity';
import { Repository } from 'typeorm';
import { CreateShopDto } from './dto/createShop.dto';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop) private readonly shopRepository: Repository<Shop>,
  ) {}

  async createShop(data: CreateShopDto) {
    const shop = new Shop();
    shop.name = data.name;

    const dataReturn = await this.shopRepository.save(shop);
    return { data: dataReturn };
  }
}
