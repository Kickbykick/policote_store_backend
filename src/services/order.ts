import { OrderService as MedusaOrderService } from "@medusajs/medusa"
import { EntityManager } from "typeorm"
import { OrderRepository } from "../repositories/order"
import { Order } from "../models/order"
import { Rating } from "src/models/rating"
import { DeliveryOrderExtension } from "src/models/delivery-order-extension"
import { MedusaError } from "medusa-core-utils"

class OrderService extends MedusaOrderService {
  protected orderRepository_: typeof OrderRepository

  constructor({ orderRepository }) {
    super(arguments[0])
    this.orderRepository_ = orderRepository
  }

  async getRatings(orderId: string, page: number = 1, limit: number = 10): Promise<{ ratings: Rating[], count: number }> {
    return await this.atomicPhase_(async (manager) => {
        const orderRepo = manager.withRepository(this.orderRepository_);
        const skip = (page - 1) * limit

        const [ratings, count] = await orderRepo.createQueryBuilder("order")
        .leftJoinAndSelect("order.deliveryOrderExtension", "deliveryOrderExtension")
        .leftJoinAndSelect("deliveryOrderExtension.ratings", "ratings")
        .where("order.id = :orderId", { orderId })
        .skip(skip)
        .take(limit)
        .getManyAndCount()

        return {
            ratings: ratings[0]?.deliveryOrderExtension?.ratings || [],
            count
        }
    });
  }

  // async retrieve(orderId: string): Promise<Order> {
  //   // TODO: Change findbyid to something els
  //   const address = await this.orderRepository_.findOne({ where: { id: orderId } });
  //   if (!address) {
  //     throw new MedusaError(
  //       MedusaError.Types.NOT_FOUND,
  //       `Order with id: ${orderId} was not found`
  //     );
  //   }
  //   return address;
  // }

  // async addDeliveryOrderExtension(orderId: string, deliveryOrderExtension: DeliveryOrderExtension): Promise<Order> {
  //   return await this.atomicPhase_(async (manager) => {
  //     const orderRepo = manager.withRepository(this.orderRepository_);
  //     const order = await this.retrieve(orderId);
      
  //     order.deliveryOrderExtension = deliveryOrderExtension;
  //     return await orderRepo.save(order);
  //   });
  // }
}

export default OrderService