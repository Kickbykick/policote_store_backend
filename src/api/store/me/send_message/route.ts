

import type {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/medusa"
import { Resend } from 'resend';
import { loadEnvironment } from '../../../../utils/load-environment';
loadEnvironment();

interface SendMessageBody { message: string }

// CREATE - Add new delivery instruction
export const POST = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const id = req.user.customer_id
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { message } = req.body as SendMessageBody;

  try {
    const sent = await resend.emails.send({
      from: 'hello@policote.com',
      to: 'policotetech@gmail.com',
      subject: 'Contact From Policote App',
      text: `Here is the message\nCustomer Id => ${id}\nMessage:\n ${message}`,
    })
    return res.status(200).json({
      sent: {
        data: {
          id: sent.data.id
        },
        error: null
      }
    })
  } catch (error) {
    console.error("Error sending message:", error)
    return res.status(500).json({
      sent: {
        data: null,
        error: {
          message: "Failed to send message",
          details: error.message
        }
      }
    });
  }
}
