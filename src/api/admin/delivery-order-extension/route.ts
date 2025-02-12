import type {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/medusa"
import DeliveryOrderExtensionService from "src/services/delivery-order-extension"
  
// POST - Create a new reward
export const POST = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const deliveryOrderExtensionService: DeliveryOrderExtensionService = req.scope.resolve("deliveryOrderExtensionService")

  const connectToCart = await deliveryOrderExtensionService.connectCart("cart_01JFVVMNMSM590C49NFZDGDBC5");
  console.log("connectToCart", connectToCart);

  res.status(201).json({ deliveryOrderExtension: connectToCart })
}

export const AUTHENTICATE = false