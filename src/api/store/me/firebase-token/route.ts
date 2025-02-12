import type {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/medusa"
import FirebaseAdminService from "src/services/firebase-admin";
  
// GET - 
export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
    const firebaseAdminService: FirebaseAdminService = req.scope.resolve("firebaseAdminService")
    const id = req.user.customer_id

    try {
        const customToken = await firebaseAdminService.createCustomToken(id);
        res.json({ token: customToken });
    } catch (error) {
        res.status(500).send("Error generating token");
    }
}