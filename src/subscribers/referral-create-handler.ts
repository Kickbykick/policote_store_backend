import { 
  CustomerService,
  type SubscriberConfig, 
  type SubscriberArgs,
  type ConfigModule,
  Logger, 
} from "@medusajs/medusa"
import ProfileService from "../services/profile";
import { Customer } from "src/models/customer";

export default async function referralCreateHandler({ 
  data, eventName, container, pluginOptions, 
}: SubscriberArgs) {
  const configModule: ConfigModule = container.resolve(
    "configModule"
  )
  const profileService: ProfileService = container.resolve<ProfileService>(
    "profileService"
  )
  const logger = container.resolve<Logger>("logger")
  const customer = data as Customer;

  await profileService.createProfileForCustomer(customer)
  logger.info(`User Profile Created`);
}
  
export const config: SubscriberConfig = {
  event: CustomerService.Events.CREATED,
  context: {
    subscriberId: "referral-create-handler",
  },
}