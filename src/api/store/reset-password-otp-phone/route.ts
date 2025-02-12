import type { 
    CustomerService,
    MedusaRequest, 
    MedusaResponse,
} from "@medusajs/medusa"
import OtpService from "src/services/otp"

interface ResetPasswordRequestBody {
    phone: string;
    password: string;
}

export const POST = async (
    req: MedusaRequest, 
    res: MedusaResponse
) => {
    try {
        const { phone, password } = req.body as ResetPasswordRequestBody;
        if (!phone || !password) {
            return res.status(400).json({
                message: "Missing required fields: phone or password"
            })
        }

        const otpService: OtpService = req.scope.resolve("otpService")
        const hasReset: boolean = await otpService.resetPasswordPhone(phone, password)
    
        return res.json({"reset": hasReset})
    } catch (error) {
        return res.status(500).json({
            message: "Failed to reset password",
            error: error.message
        })
    }
}

export const AUTHENTICATE = false