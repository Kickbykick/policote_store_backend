import { 
    CustomerService,
    type SubscriberConfig, 
    type SubscriberArgs,
    type ConfigModule,
    Logger, 
} from "@medusajs/medusa"
 
const RESEND_CUSTOMER_CREATED = process.env.RESEND_CUSTOMER_CREATED;
const MAX_RETRIES = 3;

export default async function customerCreateHandler({ 
    data, eventName, container, pluginOptions, 
}: SubscriberArgs) {
    const configModule: ConfigModule = container.resolve(
        "configModule"
    )
    // const resendNotificationService: ResendNotificationService = container.resolve("resendNotificationService");
    // // const pushNotificationService: PushNotificationService = container.resolve("pushNotificationService");

    // const profileService: ProfileService = container.resolve<ProfileService>(
    //     "profileService"
    // )
    // const logger = container.resolve<Logger>("logger")
    // const customer = data as Customer;
    // let attempts = 0;

    // if (!customer) {
    //     console.error(`Customer ID is missing in the event data: ${JSON.stringify(data)}`);
    //     return;
    // }

    // while (attempts < MAX_RETRIES) {
    //     try {
    //         // await profileService.createProfileForCustomer(customer)
    //         await resendNotificationService.sendNotification(RESEND_CUSTOMER_CREATED, {
    //             customer_id: customer.id,
    //             fcm_data: "FCM Data",
    //         });
    //         // await pushNotificationService.sendNotification(RESEND_CUSTOMER_CREATED, {

    //         // });
    //         logger.info(`User Profile Created and Email Sent  ${customer.email}`);
    //     } catch (error) {
    //         attempts += 1;
    //         logger.error(`Attempt ${attempts} failed to send customer created email: ${error.message}`, error);
    //         if (attempts >= MAX_RETRIES) {
    //             logger.error(`Failed to send customer created email after ${MAX_RETRIES} attempts`);
    //         }
    //         await new Promise(resolve => setTimeout(resolve, 3000));
    //     }
    // }
}

export const config: SubscriberConfig = {
    event: CustomerService.Events.CREATED,
    context: {
        subscriberId: "customer-create-handler",
    },
}