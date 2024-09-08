import { TransactionBaseService } from "@medusajs/medusa"
import { EntityManager } from "typeorm"
import { OrderRepository } from "../repositories/order"
import { Order } from "../models/order"
import { Rating } from "src/models/rating"

class OrderService extends TransactionBaseService {
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

  // ... other methods
}

export default OrderService