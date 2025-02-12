import type { 
    Customer,
    CustomerService,
    MedusaRequest, 
    MedusaResponse,
} from "@medusajs/medusa"
import OtpService from "src/services/otp"
import { MedusaError } from "medusa-core-utils";

interface OtpRequestBody {
    otp: string;
}

export const POST = async (
    req: MedusaRequest, 
    res: MedusaResponse
) => {
    const id = req.user.customer_id
    const { otp } = req.body as OtpRequestBody;

    const customerService = req.scope.resolve<CustomerService>("customerService")
    const otpService: OtpService = req.scope.resolve("otpService")

    const customer: Customer = await customerService.retrieve(id)
    if (!customer) {
        throw new MedusaError(MedusaError.Types.NOT_FOUND, "Customer not found")
    }

    const sent: boolean = await otpService.verifyOtp(customer, otp)
  
    res.json({"otpVerified": sent});
}