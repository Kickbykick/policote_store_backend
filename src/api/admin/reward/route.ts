import type {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/medusa"
import RewardService from "../../../services/reward"
  
// GET - List all rewards
export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const rewardService: RewardService = req.scope.resolve("rewardService")

  const rewards = await rewardService.list()

  res.json({ rewards })
}

// POST - Create a new reward
export const POST = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const rewardService: RewardService = req.scope.resolve("rewardService")

  const created = await rewardService.create(req.body)

  res.status(201).json({ reward: created })
}

export const AUTHENTICATE = false