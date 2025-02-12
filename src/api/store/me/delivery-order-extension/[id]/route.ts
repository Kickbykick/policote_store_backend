import type {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/medusa"
import { ORDER_STATUS } from "src/models/delivery-order-extension"
import DeliveryOrderExtensionService from "src/services/delivery-order-extension"

interface DeliveryDetailsBody {
  pickup_at?: Date
  delivery_at?: Date
  order_status?: ORDER_STATUS
}

export const POST = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const deliveryOrderExtensionService: DeliveryOrderExtensionService = 
      req.scope.resolve("deliveryOrderExtensionService")
  const { id } = req.params
  const updateData = req.body as DeliveryDetailsBody

  try {
      const updated = await deliveryOrderExtensionService.updateDeliveryDetails(id, updateData)
      console.log("updated", updated);
      res.json({ delivery_order_extension: updated })
  } catch (error) {
    console.log("error in database", error);

    console.log("error in database", error.message);

      res.status(500).json({ 
          message: "Failed to update delivery order extension", 
          error: error.message 
      })
  }
}
