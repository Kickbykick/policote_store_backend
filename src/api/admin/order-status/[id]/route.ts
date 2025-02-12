import type {
    MedusaRequest,
    MedusaResponse,
  } from "@medusajs/medusa"
import OrderStatusSSEService from "src/services/order-status-sse";

interface OrderStatusBody {
  status: string;
}

// GET
export const POST = async (
    req: MedusaRequest,
    res: MedusaResponse
  ) => {
    const orderStatusSSEService: OrderStatusSSEService = req.scope.resolve("orderStatusSseService");
    const order_id = req.params.id
    const { status } = req.body as OrderStatusBody
  
    try {
      await orderStatusSSEService.updateOrderStatus(order_id, status);    
    } catch (error) {
      console.error("Error getting claimedReward:", error)
    }
}

export const AUTHENTICATE = false