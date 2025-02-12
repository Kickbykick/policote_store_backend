import type {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/medusa"
import AppInfoService from "../../../services/app-info"
  
// GET - List all rewards
export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const appInfoService: AppInfoService = req.scope.resolve("appInfoService")

  const appInfo = await appInfoService.retrieve()

  res.json({ appInfo })
}

// POST - Create a new reward
export const POST = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
    const appInfoService: AppInfoService = req.scope.resolve("appInfoService")

  const appInfo = await appInfoService.upsert(req.body)

  res.status(201).json({ appInfo: appInfo })
}