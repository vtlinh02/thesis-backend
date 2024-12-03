import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/entities/Cart.entity';
import { In, Repository } from 'typeorm';
import { AddToCartDto } from './dto/addToCart.dto';
import { Product } from 'src/entities/Product.entity';
import { Customer } from 'src/entities/Customer.entity';
import { CancelCartDto } from './dto/cancelCart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async addCart(data: AddToCartDto) {
    const customer = await this.customerRepository.findOneBy({
      id: data.customerId,
    });

    if (!customer) {
      throw new HttpException('Customer not found', HttpStatus.BAD_REQUEST);
    }

    const product = await this.productRepository.findOneBy({
      id: data.productId,
    });
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.BAD_REQUEST);
    }

    const cart = new Cart();
    cart.customer = customer;
    cart.product = product;

    const dataReturn = await this.cartRepository.save(cart);

    return {
      data: dataReturn,
    };
  }

  async getCartListByCustomerrId(customerId: number) {
    const customer = await this.customerRepository.findOneBy({
      id: customerId,
    });

    if (!customer) {
      throw new HttpException('Customer not found', HttpStatus.BAD_REQUEST);
    }

    const carts = await this.cartRepository.find({
      where: {
        customer,
        isCancelled: false,
      },
      relations: ['product'],
    });

    return {
      data: carts,
    };
  }

  async cancelCart(data: CancelCartDto) {
    const dataReturn = await this.cartRepository.update(
      {
        id: data.cartId,
        isCancelled: false,
      },
      {
        isCancelled: true,
      },
    );

    return {
      data: dataReturn,
    };
  }

  async checkIfCartAlreadyExist(data: AddToCartDto) {
    const customer = await this.customerRepository.findOneBy({
      id: data.customerId,
    });

    if (!customer) {
      throw new HttpException('Customer not found', HttpStatus.BAD_REQUEST);
    }

    const product = await this.productRepository.findOneBy({
      id: data.productId,
    });
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.BAD_REQUEST);
    }

    const cart = await this.cartRepository.findOneBy({
      customer,
      product,
      isCancelled: false,
    });

    return {
      data: cart ? true : false,
    };
  }
}
