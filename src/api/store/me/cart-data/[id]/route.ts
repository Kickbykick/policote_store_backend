import type {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/medusa"
import CartService from "src/services/cart"

export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const cartService: CartService = req.scope.resolve("cartService")
    const { id } = req.params
    
    try {
        const cart = await cartService.retrieve(id)
        res.json({ "cart": cart });
    } catch (error) {
        res.status(500).json({ 
            message: "Failed to retrieve cart", 
            error: error.message 
        })
    }
}
