// import type { CartService, MedusaRequest, MedusaResponse } from "@medusajs/medusa"
// import type { PaymentSession } from "@medusajs/medusa"
// import axios from 'axios'
// import { loadEnvironment } from '../../../../../utils/load-environment';
// loadEnvironment();

// interface ProcessPaymentBody {
//     cart_id: string
//     card_details: {
//       number: string
//       cvc: string
//       exp_month: number
//       exp_year: number
//     }
// }

// export const POST = async (
//   req: MedusaRequest,
//   res: MedusaResponse
// ) => {
//   const cartService = req.scope.resolve<CartService>("cartService")
//   const { cart_id, card_details } = req.body as ProcessPaymentBody

//   try {
//     const cart = await cartService.retrieve(cart_id)
//     const session = cart.payment_session as PaymentSession
    
//     const response = await axios.post(
//         `https://api.stripe.com/v1/payment_intents/${session.data.payment_intent_id}/confirm`,
//         {
//           payment_method_data: {
//             type: 'card',
//             billing_details: {
//               name: `${cart.billing_address.first_name} ${cart.billing_address.last_name}`,
//               email: cart.email,
//               address: {
//                 city: cart.billing_address.city,
//                 country: cart.billing_address.country_code.toLowerCase(),
//                 line1: cart.billing_address.address_1,
//                 postal_code: cart.billing_address.postal_code,
//                 state: cart.billing_address.province
//               },
//               phone: cart.billing_address.phone
//             },
//             card: card_details
//           },
//           client_secret: session.data.client_secret
//         },
//         {
//           headers: {
//             'Authorization': `Bearer ${process.env.STRIPE_API_KEY}`,
//             'Content-Type': 'application/x-www-form-urlencoded'
//           }
//         }
//     )
  
//     if (response.data.status === 'succeeded') {
//         const completedOrder = await cartService.complete(cart_id)
//         return res.status(200).json({
//             data: {
//             object: "order",
//             ...completedOrder
//             },
//             type: "order"
//         })
//     }
  

//     return res.status(400).json({
//       status: 'error',
//       message: 'Payment failed'
//     })

//   } catch (error) {
//     return res.status(500).json({
//       status: 'error',
//       message: error.message
//     })
//   }
// }
