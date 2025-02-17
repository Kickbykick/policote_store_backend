import { Cart } from "../models/cart";
import { CartRepository } from "../repositories/cart";
import { CartService as MedusaCartService } from "@medusajs/medusa"

type InjectedDependencies = {
  cartRepository: typeof CartRepository;
};

class CartService extends MedusaCartService {
  protected readonly cartRepository_: typeof CartRepository;

  constructor({ cartRepository }: InjectedDependencies) {
    super(arguments[0]);
    this.cartRepository_ = cartRepository;
  }

  async retrieve(cartId: string, config = {}): Promise<Cart> {
    const baseCart = await super.retrieve(cartId, config);
    
    const cartWithExtension = await this.cartRepository_.findOne({
      where: { id: cartId },
      relations: ['deliveryOrderExtension']
    });
  
    const newCart = new Cart();
    Object.assign(newCart, baseCart);
    newCart.deliveryOrderExtension = cartWithExtension?.deliveryOrderExtension;
  
  
    return newCart;
  }
  
}

export default CartService;
