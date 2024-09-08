import { TransactionBaseService } from "@medusajs/medusa"
import { EntityManager } from "typeorm"
import { OrderEstimateItemRepository } from "../repositories/order-estimate-item"
import { OrderEstimateItem } from "../models/order-estimate-item"
import { OrderEstimate } from "src/models/order-estimate"

class OrderEstimateItemService extends TransactionBaseService {
    protected orderEstimateItemRepository_: typeof OrderEstimateItemRepository

    constructor({ orderEstimateItemRepository }) {
        super(arguments[0])
        this.orderEstimateItemRepository_ = orderEstimateItemRepository
    }

    async create(orderEstimate: OrderEstimate, data: Partial<OrderEstimateItem>): Promise<OrderEstimateItem> {
        return this.atomicPhase_(async (manager) => {
            const order_estimate_item_repo = manager.withRepository(this.orderEstimateItemRepository_);
            const order_estimate_item = order_estimate_item_repo.create({
                orderEstimate: orderEstimate,
                ...data
            })
            return await order_estimate_item_repo.save(order_estimate_item);
        })
    }

    async retrieve(id: string): Promise<OrderEstimateItem> {
        const order_estimate_item = await this.orderEstimateItemRepository_.findOne({ where: { id: id } }) 
        if (!order_estimate_item) {
            throw new Error(`OrderEstimateItem with id: ${id} not found`)
        }
        return order_estimate_item
    }

    async update(id: string, data: Partial<OrderEstimateItem>): Promise<OrderEstimateItem> {
        return this.atomicPhase_(async (manager) => {
            const order_estimate_item_repo = manager.withRepository(this.orderEstimateItemRepository_);
            const order_estimate_item = await this.retrieve(id)
            order_estimate_item_repo.merge(order_estimate_item, data)
            return await order_estimate_item_repo.save(order_estimate_item)
        })
    }

    async delete(id: string): Promise<void> {
        return this.atomicPhase_(async (manager) => {
            const service_provider_repo = manager.withRepository(this.orderEstimateItemRepository_);
            const order_estimate_item = await this.retrieve(id)
            await service_provider_repo.remove(order_estimate_item)
        })
    }
}

export default OrderEstimateItemService