import { Product, TransactionBaseService } from "@medusajs/medusa"
import { EntityManager } from "typeorm"
import { OrderEstimate } from "../models/order-estimate"
import OrderEstimateRepository from "src/repositories/order-estimate"
import { Customer } from "src/models/customer"
import { OrderEstimateItem } from "src/models/order-estimate-item"
import OrderEstimateItemRepository from "src/repositories/order-estimate-item"
import LineItemRepository from "@medusajs/medusa/dist/repositories/line-item"

class OrderEstimateService extends TransactionBaseService {
    protected orderEstimateRepository_: typeof OrderEstimateRepository
    protected orderEstimateItemRepository_: typeof OrderEstimateItemRepository
    protected readonly lineItemRepository_: typeof LineItemRepository;

    constructor({ orderEstimateRepository, orderEstimateItemRepository, productService }) {
        super(arguments[0])
        this.orderEstimateRepository_ = orderEstimateRepository;
        this.orderEstimateItemRepository_ = orderEstimateItemRepository;

    }

    async create(customer: Customer, data: Partial<OrderEstimate>): Promise<OrderEstimate> {
        return this.atomicPhase_(async (manager) => {
            const order_estimate_repo = manager.withRepository(this.orderEstimateRepository_);
            const order_estimate = order_estimate_repo.create({
                customer: customer,
                ...data
            });

            return await order_estimate_repo.save(order_estimate)
        })
    }

    async retrieve(id: string): Promise<OrderEstimate> {
        const orderEstimate = await this.orderEstimateRepository_.findOne({
            where: { id: id },
            relations: ["orderEstimateItem"],
        })

        if (!orderEstimate) {
        throw new Error(`OrderEstimate with id: ${id} not found`)
        }

        return orderEstimate
    }

    async update(id: string, data: Partial<OrderEstimateItem>): Promise<OrderEstimate> {
        return this.atomicPhase_(async (manager) => {
            const order_estimate_repo = manager.withRepository(this.orderEstimateRepository_);
            const order_estimate_item_repo = manager.withRepository(this.orderEstimateItemRepository_);
            let orderEstimate = await this.retrieve(id)
    
            // Create new OrderEstimateItem
            const order_estimate_item = order_estimate_item_repo.create({
                orderEstimate: orderEstimate,
                ...data
            })
        
            // Add new item to the OrderEstimate
            if (!orderEstimate.orderEstimateItem) {
                orderEstimate.orderEstimateItem = []
            }
            orderEstimate.orderEstimateItem.push(order_estimate_item)
            const line_item = await this.lineItemRepository_.findOne({
                where: { id: order_estimate_item.line_item_id }
            })
        
            // Recalculate total
            orderEstimate.total += (line_item.unit_price * line_item.quantity);
        
            // Save updated OrderEstimate
            return await order_estimate_repo.save(orderEstimate)
        })
      }

    async delete(id: string): Promise<void> {
        return this.atomicPhase_(async (manager) => {
            const order_estimate_repo = manager.withRepository(this.orderEstimateRepository_);
            const order_estimate = await this.retrieve(id)
            await order_estimate_repo.softRemove(order_estimate)
        })
    }

  async calculateTotal(orderEstimate: OrderEstimate): Promise<number> {
        let total = 0
        for (const item of orderEstimate.orderEstimateItem) {
            const line_item = await this.lineItemRepository_.findOne({
                where: { id: item.id }
            })

            total += (line_item.unit_price * line_item.quantity);
        }
        orderEstimate.total = total

        return orderEstimate.total;
  }
}

export default OrderEstimateService