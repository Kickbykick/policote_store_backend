import type { 
    Customer,
    CustomerService,
    MedusaRequest, 
    MedusaResponse,
} from "@medusajs/medusa"
import OtpService from "src/services/otp"

interface OtpRequestBody {
    phone: string;
    otp: string;
}

export const POST = async (
    req: MedusaRequest, 
    res: MedusaResponse
) => {
    try {
        const { phone, otp } = req.body as OtpRequestBody

        if (!phone || !otp) {
            return res.status(400).json({ message: "Phone and OTP are required" })
        }

        const customerService = req.scope.resolve<CustomerService>("customerService")
        const otpService: OtpService = req.scope.resolve("otpService")

        const customer: Customer = await customerService.retrieveByPhone(phone)
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" })
        }

        const verified: boolean = await otpService.verifyOtp(customer, otp)
        return res.json({ "otpVerified": verified })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to verify OTP",
            error: error.message
        })
    }
}
