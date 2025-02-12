import { AppInfo } from "../models/app-info";
import { dataSource } from "@medusajs/medusa/dist/loaders/database";

export const AppInfoRepository = dataSource
  .getRepository(AppInfo)
  .extend({});

export default AppInfoRepository;
