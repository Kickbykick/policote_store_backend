import type { 
    MedusaRequest, 
    MedusaResponse,
} from "@medusajs/medusa"
import ClaimedRewardsService from "src/services/claimed-rewards";
import CustomerService from "src/services/customer";
import ProfileService from "src/services/profile";

interface ChangePasswordRequestBody {
    password: string;
}

export const POST = async (
    req: MedusaRequest, 
    res: MedusaResponse
) => {
    try {
        const id = req.user.customer_id
        const { password } = req.body as ChangePasswordRequestBody;

        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long"
            })
        }

        const customerService = req.scope.resolve<CustomerService>("customerService")

        const passwordChanged = await customerService.changePassword(
            id,
            password
        )
    
        return res.json({
            passwordChanged: passwordChanged
        })
    } catch (error) {
        return res.status(500).json({ 
            message: "Failed to change password",
            error: error.message 
        })
    }
}