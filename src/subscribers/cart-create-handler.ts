import { 
    CartService,
    type SubscriberConfig, 
    type SubscriberArgs,
    type ConfigModule,
    Logger, 
} from "@medusajs/medusa"
import DeliveryOrderExtensionService from "../services/delivery-order-extension";

interface CartCreatedType {
    id: string;
}

export default async function cartCreateHandler({ 
    data, eventName, container, pluginOptions, 
}: SubscriberArgs) {
    const configModule: ConfigModule = container.resolve(
        "configModule"
    )
    const deliveryOrderExtensionService: DeliveryOrderExtensionService = container.resolve("deliveryOrderExtensionService")

    const logger = container.resolve<Logger>("logger")
    const cart = data as CartCreatedType;

    await deliveryOrderExtensionService.connectCart(cart.id)
    logger.info(`Delivery Order Extension Id`);
}

export const config: SubscriberConfig = {
    event: CartService.Events.CREATED,
    context: {
        subscriberId: "order-create-handler",
    },
}