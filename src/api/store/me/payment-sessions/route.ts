// import type { CartService, MedusaRequest, MedusaResponse } from "@medusajs/medusa"

// interface CartPamentBody { cart_id: string }

// export const POST = async (
//   req: MedusaRequest,
//   res: MedusaResponse
// ) => {
//   const cartService = req.scope.resolve<CartService>("cartService")
//   const { cart_id } = req.body as CartPamentBody;

//   try {
//     // Create payment sessions for cart
//     await cartService.createPaymentSessions(cart_id)

//     // Set Stripe as payment provider
//     const cart = await cartService.setPaymentSession(cart_id, 'stripe')

//     res.status(200).json({
//       cart: cart,
//       payment_provider: 'stripe'
//     })
//   } catch (error) {
//     res.status(500).json({
//       error: error.message,
//       code: error.code
//     })
//   }
// }
