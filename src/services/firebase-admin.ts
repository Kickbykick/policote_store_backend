import { TransactionBaseService } from '@medusajs/medusa';
import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';
import admin from "firebase-admin"
import * as dotenv from 'dotenv';
import { Message } from 'firebase-admin/lib/messaging/messaging-api';
import { MulticastMessage, BatchResponse } from 'firebase-admin/messaging';

dotenv.config();

const serviceAccount: ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

class FirebaseAdminService extends TransactionBaseService {
  private auth: Auth;

  constructor() {
    super(arguments[0])
    initializeApp({
      credential: cert(serviceAccount),
    });
  
    this.auth = getAuth();
  }

  async createCustomToken(userId: string): Promise<string> {
    try {
      return await this.auth.createCustomToken(userId);
    } catch (error) {
      console.error('Error creating custom token:', error);
      throw error;
    }
  }

  async sendNotification(message: Message, dryRun?: boolean): Promise<string> {
    const result: string = await admin.messaging().send(message);

    return result;
  }

  async sendPushNotification(
    token: string, 
    title: string, 
    body: string, 
    data?: Record<string, string>
  ): Promise<string> {
    const message = {
      token: token,
      notification: {
        title: title,
        body: body
      },
      data: data
    };

    try {
      const response = await this.sendNotification(message);
      return response;
    } catch (error) {
      throw new Error(`Failed to send push notification: ${error.message}`);
    }
  }

}

export default FirebaseAdminService;