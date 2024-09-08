import { TransactionBaseService } from "@medusajs/medusa";
import { Reward } from "../models/reward";
import { MedusaError } from "@medusajs/utils";
import { RewardRepository } from "src/repositories/reward";
import AddressRepository from "src/repositories/address";
import { AppInfo } from "src/models/app-info";
import AppInfoRepository from "src/repositories/app_info";

class AppInfoService extends TransactionBaseService {
  protected readonly appInfoRepository_: typeof AppInfoRepository;

  constructor({ appInfoRepository }) {
    super(arguments[0]);
    this.appInfoRepository_ = appInfoRepository;
  }

  // Get the first item
  async retrieve(): Promise<AppInfo> {
    const appInfo = await this.appInfoRepository_.find();

    if(appInfo && appInfo.length > 0){
        return appInfo[0];
    }
    return null;
  }

  // Always update the item in the column or insert a new item
  async upsert(data: Partial<AppInfo>): Promise<AppInfo> {
    const existing = await this.appInfoRepository_.find()
    if (existing && existing.length > 0) {
      return this.appInfoRepository_.save({ ...existing[0], ...data })
    }
    const newInfo = this.appInfoRepository_.create(data)
    return this.appInfoRepository_.save(newInfo)
  }
}

export default AppInfoService;