import type {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/medusa"
import ServiceProviderService from "src/services/service-provider"

// GET - List all service providers
export const GET = async (
req: MedusaRequest,
res: MedusaResponse
) => {
  console.log("GET /admin/service_providers")
  const serviceProviderService: ServiceProviderService = req.scope.resolve("serviceProviderService")
  const serviceProviders = await serviceProviderService.list()
  res.json({ service_providers: serviceProviders })
}

export const AUTHENTICATE = true
