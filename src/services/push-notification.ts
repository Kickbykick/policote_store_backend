import { AbstractNotificationService } from "@medusajs/medusa";
import { readFileSync } from "fs";
import { resolve } from "path";
import axios from "axios";
import FirebaseAdminService from "./firebase-admin";
import FCMNotificationService from "./fcm_notification";

class PushNotificationService extends AbstractNotificationService {
    static identifier = "fcm-push-notification";
    protected apiKey_: string;
    protected resendApiUrl_: string;
    protected logger_: any;    
    protected firebaseAdminSerivce: FirebaseAdminService;
    protected fcmNotificationService: FCMNotificationService;

    constructor(container) {
        super(container);
        this.logger_ = container.logger;
        this.firebaseAdminSerivce = container.firebaseAdminService;
        this.fcmNotificationService = container.fcmNotificationService;
    }

    async sendNotification(event: string, data: any): Promise<{ to: string; status: string; data: Record<string, unknown>; }> {
        const { token, title, body, fcm_data } = await this.prepareNotificationData(event, data);
        const result = await this.firebaseAdminSerivce.sendPushNotification(
            token as string, 
            title, 
            body, 
            fcm_data
        );
        return {
            to: result,
            status: "success",
            data: { message: "Push Notification sent" },
        };
    }

    async resendNotification(notification: any, config: any): Promise<{ to: string; status: string; data: Record<string, unknown>; }> {
        const token = config.token || notification.token;
        const result = await this.firebaseAdminSerivce.sendPushNotification(
            token as string, 
            notification.title, 
            notification.body, 
            notification.fcm_data
        );
        return {
            to: result,
            status: "success",
            data: notification.data,
        };
    }

    protected async prepareNotificationData(event: string, data: any) {
        const token = await this.fcmNotificationService.getFCMToken(data.customer_id);
        let title = "";
        let body = "";
        let fcm_data = {};

        this.logger_.info(`Preparing push notification for event: ${event}`);

        switch (event) {
            // case process.env.RESEND_ORDER_PLACED:
            //     subject = "Order Confirmation";
            //     email = data.email; 
            //     htmlContent = this.loadTemplate_("order-placed")
            //     .replace("{{order_id}}", data.order_id)
            //     .replace("{{first_name}}", data.first_name);
            //     break;
            // case process.env.RESEND_CUSTOMER_PASSWORD_RESET:
            //     subject = "Password Reset Request";
            //     email = data.email;
            //     const userResetLink = `https://boujee-botanical.store/password/user-password-reset?token=${data.token}`;
            //     htmlContent = this.loadTemplate_("password-reset")
            //     .replace("{{email}}", email)
            //     .replace("{{resetLink}}", userResetLink);
            //     break;
            // case process.env.RESEND_ORDER_DISPATCHED:
            //     subject = "Your Order Has Shipped";
            //     email = data.email;
            //     htmlContent = this.loadTemplate_("order-shipped")
            //     .replace("{{order_id}}", data.order_id)
            //     .replace("{{first_name}}", data.first_name)
            //     .replace("{{tracking_number}}", data.tracking_number);
            //     break;
            // case process.env.RESEND_USER_INVITE:
            //     subject = "You're Invited!";
            //     email = data.email;
            //     const inviteLink = `https://boujee-botanical.store/invite?token=${data.token}`;
            //     htmlContent = this.loadTemplate_("invite-created")
            //     .replace("{{email}}", email)
            //     .replace("{{inviteLink}}", inviteLink);
            //     break;
            // case process.env.RESEND_ORDER_DELIVERED:
            //     subject = "Your Order Has Been Fulfilled";
            //     email = data.email;
            //     htmlContent = this.loadTemplate_("order-fulfillment")
            //     .replace("{{email}}", email)
            //     .replace("{{first_name}}", data.first_name)
            //     .replace("{{order_id}}", data.order_id);
            //     break;
            case process.env.RESEND_CUSTOMER_CREATED:
                title = "Welcome to Policote!";
                // data.firstname
                // data.lastname    
                body = "Hello, welcome to Policote! We're excited to have you on board. We hope you enjoy your experience with us.";
                data = data.fcm_data;

                break;
            default:
                this.logger_.error(`Unhandled notification event: ${event}`);
                throw new Error("Unhandled notification event");
        }

        return { token, title, body, fcm_data };
    }
}

export default PushNotificationService;
