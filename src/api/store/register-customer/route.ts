import type { 
    MedusaRequest, 
    MedusaResponse,
} from "@medusajs/medusa"
import ClaimedRewardsService from "src/services/claimed-rewards";
import CustomerService from "src/services/customer";
import ProfileService from "src/services/profile";

interface RegisterRequestBody {
    email: string;
    password: string;
    first_name: string,
    last_name: string,
    phone_number: string;
    referral_code?: string;
}

export const POST = async (
    req: MedusaRequest, 
    res: MedusaResponse
) => {
    try {
        const { email, password, first_name, last_name, phone_number, referral_code } = req.body as RegisterRequestBody
        console.log("password", req.body)

        if (!email || !password || !first_name || !last_name || !phone_number) {
            return res.status(400).json({ 
                message: "Email, password, full name and phone number are required" 
            })
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long"
            })
        }

        const customerService = req.scope.resolve<CustomerService>("customerService")
        const profileService = req.scope.resolve<ProfileService>("profileService")
        const claimedRewardsService = req.scope.resolve<ClaimedRewardsService>("claimedRewardsService")

        const { customer, referralClaimed } = await customerService.register(
            email,
            password,
            first_name,
            last_name,
            phone_number,
            referral_code, 
            profileService, 
            claimedRewardsService
        )
    
        return res.json({
            customer: customer,
            referral_claimed: referralClaimed
        })
    } catch (error) {
        return res.status(500).json({ 
            message: "Failed to register customer",
            error: error.message 
        })
    }
}

export const AUTHENTICATE = false
