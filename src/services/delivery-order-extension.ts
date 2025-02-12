import { CartService, TransactionBaseService } from "@medusajs/medusa";
import { DeliveryOrderExtension, ORDER_STATUS } from "../models/delivery-order-extension";
import { MedusaError } from "@medusajs/utils";
import { DeliveryOrderExtensionRepository } from "src/repositories/delivery-order-extension";
import { Cart } from "../models/cart";
import { Order } from "src/models/order";
import CartRepository from "src/repositories/cart";
import OrderRepository from "src/repositories/order";
import ServiceProviderRepository from "src/repositories/service-provider";

class DeliveryOrderExtensionService extends TransactionBaseService {
    protected readonly cartService_: CartService;
    protected readonly deliveryOrderExtensionRepository_: typeof DeliveryOrderExtensionRepository;
    protected readonly cartRepository_: typeof CartRepository;
    protected readonly orderRepository_: typeof OrderRepository;
    protected readonly serviceProviderRepository_: typeof ServiceProviderRepository;

    constructor({ cartService, deliveryOrderExtensionRepository, cartRepository, orderRepository, serviceProviderRepository }) {
      super(arguments[0]);
      this.cartService_ = cartService;
      this.deliveryOrderExtensionRepository_ = deliveryOrderExtensionRepository;
      this.cartRepository_ = cartRepository;
      this.orderRepository_ = orderRepository;
      this.serviceProviderRepository_ = serviceProviderRepository;
    }

    async create(cart: Cart, data: Partial<DeliveryOrderExtension>): Promise<DeliveryOrderExtension> {
      return await this.atomicPhase_(async (manager) => {
        const deliveryOrderExtensionRepo = manager.withRepository(this.deliveryOrderExtensionRepository_);
        const deliveryOrderExtension = deliveryOrderExtensionRepo.create({
          cart: cart,
          ...data
        });
        return await deliveryOrderExtensionRepo.save(deliveryOrderExtension);
      });
    }

    async retrieve(deliveryOrderExtensionId: string): Promise<DeliveryOrderExtension> {
      const deliveryOrderExtension = await this.deliveryOrderExtensionRepository_.findOne({ 
        where: { id: deliveryOrderExtensionId } 
      });
      if (!deliveryOrderExtension) {
        throw new MedusaError(
          MedusaError.Types.NOT_FOUND,
          `DeliveryOrderExtension with id: ${deliveryOrderExtensionId} was not found`
        );
      }
      return deliveryOrderExtension;
    }

    async list(): Promise<DeliveryOrderExtension[]> {
      return await this.deliveryOrderExtensionRepository_.find();
    }

    async connectCart(cartId: string): Promise<DeliveryOrderExtension> {
      console.log("Connecting cart with ID:", cartId);
      return await this.atomicPhase_(async (manager) => {
        try {
          const deliveryOrderExtensionRepo = manager.withRepository(this.deliveryOrderExtensionRepository_);
          const cartRepo = manager.withRepository(this.cartRepository_);
          const serviceProviderRepo = manager.withRepository(this.serviceProviderRepository_);
          const serviceProvider = await serviceProviderRepo.findOne({ 
            where: { id: process.env.SERVICE_PROVIDER_WAREHOUSE_ID } 
          });

          console.log("Cart found:", cartId);
          // Get the cart first
          const cart = await cartRepo.findOne({ where: { id: cartId } });
          console.log("Cart retrieved:", cart);

          // Create new empty delivery order extension
          const deliveryOrderExtension = deliveryOrderExtensionRepo.create({
            cart: cart,
            serviceProvider: serviceProvider,
            order_status: ORDER_STATUS.PENDING,
          });
          console.log("Delivery order extension created:", deliveryOrderExtension);

          // Save the delivery order extension
          const savedDeliveryOrderExtension = await deliveryOrderExtensionRepo.save(deliveryOrderExtension);
          console.log("Delivery order extension saved:", savedDeliveryOrderExtension);
          
          // Update cart using CartRepository
          cart.deliveryOrderExtension = savedDeliveryOrderExtension;
          console.log("Cart updated:", cart);

          if(serviceProvider.delivery_order_extension) {
            serviceProvider.delivery_order_extension.push(savedDeliveryOrderExtension);
          } else {
            serviceProvider.delivery_order_extension = [savedDeliveryOrderExtension];
          }

          await serviceProviderRepo.save(serviceProvider);
          console.log("Service provider updated:", serviceProvider);

          await cartRepo.save(cart);
    
          return savedDeliveryOrderExtension;
        } catch (error) {
          console.error("Error connecting cart:", error);
          throw error;
        }
      });
    }

    async connectOrder(orderId: string): Promise<DeliveryOrderExtension> {
      return await this.atomicPhase_(async (manager) => {
        const deliveryOrderExtensionRepo = manager.withRepository(this.deliveryOrderExtensionRepository_);
        const orderRepo = manager.withRepository(this.orderRepository_);
        const cartRepo = manager.withRepository(this.cartRepository_);
        console.log("Order found:", orderId);

        const order = await orderRepo.findOne({ where: { id: orderId } });
        const cart = await cartRepo.findOne({ 
            where: { id: order.cart_id },
            relations: ['deliveryOrderExtension']
        });
        console.log("Cart retrieved:", cart);
        
        const deliveryOrderExtension = cart.deliveryOrderExtension;
        deliveryOrderExtension.order = order;
        const savedDeliveryOrderExtension = await deliveryOrderExtensionRepo.save(deliveryOrderExtension);
        console.log("Delivery order extension saved:", savedDeliveryOrderExtension);

        order.deliveryOrderExtension = savedDeliveryOrderExtension;
        console.log("Order updated:", cart);
        await orderRepo.save(order);
        return savedDeliveryOrderExtension;
      });
  }      

    async update(deliveryOrderExtensionId: string, data: Partial<DeliveryOrderExtension>): Promise<DeliveryOrderExtension> {
      return await this.atomicPhase_(async (manager) => {
        const deliveryOrderExtensionRepo = manager.withRepository(this.deliveryOrderExtensionRepository_);
        const deliveryOrderExtension = await this.retrieve(deliveryOrderExtensionId);
      
        for (const [key, value] of Object.entries(data)) {
          if (value !== undefined) {
            deliveryOrderExtension[key] = value;
          }
        }

        return await deliveryOrderExtensionRepo.save(deliveryOrderExtension);
      });
    }

    async delete(deliveryOrderExtensionId: string): Promise<void> {
      return await this.atomicPhase_(async (manager) => {
        const deliveryOrderExtensionRepo = manager.withRepository(this.deliveryOrderExtensionRepository_);
        const deliveryOrderExtension = await this.retrieve(deliveryOrderExtensionId);
        await deliveryOrderExtensionRepo.remove(deliveryOrderExtension);
      });
    }

    async setPickupTime(deliveryOrderExtensionId: string, pickupTime: Date): Promise<DeliveryOrderExtension> {
      return await this.atomicPhase_(async (manager) => {
          const deliveryOrderExtensionRepo = manager.withRepository(this.deliveryOrderExtensionRepository_);
          const deliveryOrderExtension = await this.retrieve(deliveryOrderExtensionId);
          
          deliveryOrderExtension.pickup_at = pickupTime;
          return await deliveryOrderExtensionRepo.save(deliveryOrderExtension);
      });
    }
  
    async setDeliveryTime(deliveryOrderExtensionId: string, deliveryTime: Date): Promise<DeliveryOrderExtension> {
      return await this.atomicPhase_(async (manager) => {
          const deliveryOrderExtensionRepo = manager.withRepository(this.deliveryOrderExtensionRepository_);
          const deliveryOrderExtension = await this.retrieve(deliveryOrderExtensionId);
          
          deliveryOrderExtension.delivery_at = deliveryTime;
          return await deliveryOrderExtensionRepo.save(deliveryOrderExtension);
      });
    }

    async updateDeliveryDetails(
      deliveryOrderExtensionId: string, 
      data: {
        pickup_at?: Date;
        delivery_at?: Date;
        order_status?: ORDER_STATUS;
      }
    ): Promise<DeliveryOrderExtension> {
      return await this.atomicPhase_(async (manager) => {
        const deliveryOrderExtensionRepo = manager.withRepository(this.deliveryOrderExtensionRepository_);
        const deliveryOrderExtension = await this.deliveryOrderExtensionRepository_.findOne({ 
          where: { id: deliveryOrderExtensionId } 
        });

        if (!deliveryOrderExtension) {
            throw new MedusaError(
                MedusaError.Types.NOT_FOUND,
                `DeliveryOrderExtension with id: ${deliveryOrderExtensionId} was not found`
            );
        }

        console.log("Updating delivery details for delivery order extension:", deliveryOrderExtensionId);
        console.log("Data to update:", data);
        if (data.pickup_at) {
            deliveryOrderExtension.pickup_at = data.pickup_at;
        }
        if (data.delivery_at) {
            deliveryOrderExtension.delivery_at = data.delivery_at;
        }
        if (data.order_status) {
            deliveryOrderExtension.order_status = data.order_status;
        }

        const savedDeliveryOrderExtension = deliveryOrderExtensionRepo.save(deliveryOrderExtension);
        return savedDeliveryOrderExtension;
      });
    }

    async addGarmentInstruction(
        deliveryOrderExtensionId: string, 
        instruction: { image_url?: string; description: string }
    ): Promise<DeliveryOrderExtension> {
      return await this.atomicPhase_(async (manager) => {
        const deliveryOrderExtension = await this.retrieve(deliveryOrderExtensionId);
        const currentInstructions = deliveryOrderExtension.garment_instructions || [];
        
        deliveryOrderExtension.garment_instructions = [...currentInstructions, instruction];
        return await manager.withRepository(this.deliveryOrderExtensionRepository_).save(deliveryOrderExtension);
      });
    }
      
    async updateGarmentInstruction(
        deliveryOrderExtensionId: string,
        index: number,
        instruction: { image_url?: string; description: string }
    ): Promise<DeliveryOrderExtension> {
        return await this.atomicPhase_(async (manager) => {
          const deliveryOrderExtension = await this.retrieve(deliveryOrderExtensionId);
          const instructions = deliveryOrderExtension.garment_instructions || [];
          
          instructions[index] = instruction;
          deliveryOrderExtension.garment_instructions = instructions;
          
          return await manager.withRepository(this.deliveryOrderExtensionRepository_).save(deliveryOrderExtension);
        });
    }
      
    async removeGarmentInstruction(
        deliveryOrderExtensionId: string,
        index: number
    ): Promise<DeliveryOrderExtension> {
        return await this.atomicPhase_(async (manager) => {
          const deliveryOrderExtension = await this.retrieve(deliveryOrderExtensionId);
          const instructions = deliveryOrderExtension.garment_instructions || [];
          
          instructions.splice(index, 1);
          deliveryOrderExtension.garment_instructions = instructions;
          
          return await manager.withRepository(this.deliveryOrderExtensionRepository_).save(deliveryOrderExtension);
        });
    }
      
    async getGarmentInstructions(deliveryOrderExtensionId: string): Promise<{ image_url?: string; description: string }[]> {
        const deliveryOrderExtension = await this.retrieve(deliveryOrderExtensionId);
        return deliveryOrderExtension.garment_instructions || [];
    }
}

export default DeliveryOrderExtensionService;