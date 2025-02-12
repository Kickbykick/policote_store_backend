import { 
    CustomerService,
    type SubscriberConfig, 
    type SubscriberArgs,
    type ConfigModule,
    Logger, 
} from "@medusajs/medusa"
import ProfileService from "../services/profile";
import { Customer } from "src/models/customer";
  
export default async function resetPassword({ 
    data, eventName, container, pluginOptions, 
}: SubscriberArgs) {
    const configModule: ConfigModule = container.resolve(
      "configModule"
    )
    const logger = container.resolve<Logger>("logger")
  
    logger.info(`Reset Password Handler - ${data["token"]} - ${data["id"]}`);
}
    
export const config: SubscriberConfig = {
    event: CustomerService.Events.PASSWORD_RESET,
    context: {
      subscriberId: "reset-password-handler",
    },
}