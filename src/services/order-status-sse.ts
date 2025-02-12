import { MedusaRequest, MedusaResponse, TransactionBaseService } from "@medusajs/medusa"
import EventEmitter from "events"
import { ORDER_STATUS } from "src/models/delivery-order-extension"

class OrderStatusSseService extends TransactionBaseService {
    static identifier = "order-status-sse"
    private static eventEmitter = new EventEmitter()
  
    constructor(container) {
      super(container)
    }
  
    async subscribe(orderId: string, res: MedusaResponse, req: MedusaRequest) {
        res.setHeader('Content-Type', 'text/event-stream')
        res.setHeader('Cache-Control', 'no-cache')
        res.setHeader('Connection', 'keep-alive')
        res.setHeader('Access-Control-Allow-Origin', '*')

        const listener = (data) => {
          console.log("data", data)
          res.write(`data: ${JSON.stringify(data)}\n\n`)
        }
    
        OrderStatusSseService.eventEmitter.on(`order-${orderId}`, listener)
    
        req.on('close', () => {
          OrderStatusSseService.eventEmitter.removeListener(`order-${orderId}`, listener)
        })
    }
  
    async updateOrderStatus(orderId: string, status: string) {
      console.log("updateOrderStatus", orderId, status)
      OrderStatusSseService.eventEmitter.emit(`order-${orderId}`, { status })
    }
}
  
export default OrderStatusSseService;
