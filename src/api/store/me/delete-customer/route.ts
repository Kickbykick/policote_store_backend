import type { 
    MedusaRequest, 
    MedusaResponse,
} from "@medusajs/medusa"
import CustomerService from "src/services/customer"

export const DELETE = async (
    req: MedusaRequest, 
    res: MedusaResponse
) => {
    const customerId = req.user?.customer_id

    if (!customerId) {
        return res.status(401).json({ 
            message: "Unauthorized" 
        })
    }

    try {
        const customerService = req.scope.resolve<CustomerService>("customerService")
        await customerService.delete(customerId)

        return res.status(200).json({
            message: "Customer account deleted successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ 
            message: "Failed to delete customer account",
            error: error.message
        })
    }
}
