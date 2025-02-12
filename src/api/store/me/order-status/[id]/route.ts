import type { 
  MedusaRequest, 
  MedusaResponse 
} from "@medusajs/medusa"
import OrderStatusSseService from "src/services/order-status-sse";

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const orderStatusSseService: OrderStatusSseService = req.scope.resolve("orderStatusSseService");
  const orderId = req.params.id
  console.log("orderId", orderId)
  
  // Set SSE headers
  await orderStatusSseService.subscribe(orderId, res, req);
}

export const AUTHENTICATE = false