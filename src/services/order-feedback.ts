import { TransactionBaseService } from "@medusajs/medusa";
import { OrderFeedback, IssueType } from "../models/order-feedback";
import { MedusaError } from "@medusajs/utils";
import { OrderFeedbackRepository } from "../repositories/order-feedback";
import { Customer } from "../models/customer";
import { DeliveryOrderExtension } from "../models/delivery-order-extension";
import { CustomerRepository } from "../repositories/customer";
import { DeliveryOrderExtensionRepository } from "../repositories/delivery-order-extension";

class OrderFeedbackService extends TransactionBaseService {
    protected readonly orderFeedbackRepository_: typeof OrderFeedbackRepository;
    protected readonly customerRepository_: typeof CustomerRepository;
    protected readonly deliveryOrderExtensionRepository_: typeof DeliveryOrderExtensionRepository;

    constructor({ orderFeedbackRepository, customerRepository, deliveryOrderExtensionRepository }) {
        super(arguments[0]);
        this.orderFeedbackRepository_ = orderFeedbackRepository;
        this.customerRepository_ = customerRepository;
        this.deliveryOrderExtensionRepository_ = deliveryOrderExtensionRepository;
    }

    async create(
        customerId: string,
        deliveryOrderExtensionId: string,
        data: {
        issue_type: IssueType;
        description: string;
        attachment_url?: string[];
        }
    ): Promise<OrderFeedback> {
        return await this.atomicPhase_(async (manager) => {
        const orderFeedbackRepo = manager.withRepository(this.orderFeedbackRepository_);
        const customerRepo = manager.withRepository(this.customerRepository_);
        const deliveryOrderExtensionRepo = manager.withRepository(this.deliveryOrderExtensionRepository_);

        const customer = await customerRepo.findOne({ where: { id: customerId }});
        if (!customer) {
            throw new MedusaError(
            MedusaError.Types.NOT_FOUND,
            `Customer with id: ${customerId} was not found`
            );
        }

        const deliveryOrderExtension = await deliveryOrderExtensionRepo.findOne({ where: { id: deliveryOrderExtensionId }});
        if (!deliveryOrderExtension) {
            throw new MedusaError(
            MedusaError.Types.NOT_FOUND,
            `DeliveryOrderExtension with id: ${deliveryOrderExtensionId} was not found`
            );
        }
        
        const orderFeedback = orderFeedbackRepo.create({
            customer,
            delivery_order_extension: deliveryOrderExtension,
            ...data
        });

        return await orderFeedbackRepo.save(orderFeedback);
        });
    }

    async retrieve(orderFeedbackId: string): Promise<OrderFeedback> {
        const orderFeedback = await this.orderFeedbackRepository_.findOne({
            where: { id: orderFeedbackId },
            relations: ['customer', 'delivery_order_extension']
        });

        if (!orderFeedback) {
            throw new MedusaError(
                MedusaError.Types.NOT_FOUND,
                `OrderFeedback with id: ${orderFeedbackId} was not found`
            );
        }

        return orderFeedback;
    }

    async list(): Promise<OrderFeedback[]> {
        return await this.orderFeedbackRepository_.find({
        relations: ['customer', 'delivery_order_extension']
        });
    }

    async update(orderFeedbackId: string, data: Partial<OrderFeedback>): Promise<OrderFeedback> {
        return await this.atomicPhase_(async (manager) => {
            const orderFeedbackRepo = manager.withRepository(this.orderFeedbackRepository_);
            const orderFeedback = await this.retrieve(orderFeedbackId);

            for (const [key, value] of Object.entries(data)) {
                if (value !== undefined) {
                orderFeedback[key] = value;
                }
            }

            return await orderFeedbackRepo.save(orderFeedback);
        });
    }

    async delete(orderFeedbackId: string): Promise<void> {
        return await this.atomicPhase_(async (manager) => {
            const orderFeedbackRepo = manager.withRepository(this.orderFeedbackRepository_);
            const orderFeedback = await this.retrieve(orderFeedbackId);
            await orderFeedbackRepo.remove(orderFeedback);
        });
    }
}

export default OrderFeedbackService;
