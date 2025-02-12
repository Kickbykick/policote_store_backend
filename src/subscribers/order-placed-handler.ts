import { 
    CartService,
    type SubscriberConfig, 
    type SubscriberArgs,
    type ConfigModule,
    Logger,
    OrderService, 
} from "@medusajs/medusa"
import ProfileService from "../services/profile";
import DeliveryOrderExtensionService from "../services/delivery-order-extension";

interface OrderCreatedType {
    id: string;
}

export default async function orderCreateHandler({ 
    data, eventName, container, pluginOptions, 
}: SubscriberArgs) {
    const configModule: ConfigModule = container.resolve(
        "configModule"
    )
    const deliveryOrderExtensionService: DeliveryOrderExtensionService = container.resolve("deliveryOrderExtensionService")

    const logger = container.resolve<Logger>("logger")
    const order = data as OrderCreatedType;

    await deliveryOrderExtensionService.connectOrder(order.id)
    logger.info(`Delivery Order Extension Id`);
}

export const config: SubscriberConfig = {
    event: OrderService.Events.PLACED,
    context: {
        subscriberId: "order-placed-handler",
    },
}