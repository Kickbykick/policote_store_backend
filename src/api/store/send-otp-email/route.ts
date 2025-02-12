import type { 
    CustomerService,
    MedusaRequest, 
    MedusaResponse,
} from "@medusajs/medusa"
import OtpService from "src/services/otp"
 
interface SendOtpRequestBody {
    email: string;
}

export const POST = async (
    req: MedusaRequest, 
    res: MedusaResponse
) => {
    try {
        const { email } = req.body as SendOtpRequestBody

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const customerService = req.scope.resolve<CustomerService>("customerService")
        const customer = await customerService.retrieveRegisteredByEmail(email)

        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        if (!customer.phone) {
            return res.status(400).json({ message: "Customer phone number not found" });
        }

        const otpService: OtpService = req.scope.resolve("otpService")
        const twilioSmsService = req.scope.resolve("twilioSmsService")

        const { sent, expiry } = await otpService.sendOtp(twilioSmsService, customer.phone)
        
        return res.json({ 
            otpSent: sent,
            expiresAt: expiry
        });
    } catch (error) {
        return res.status(500).json({ 
            message: "An error occurred while sending OTP",
            error: error.message 
        });
    }
}