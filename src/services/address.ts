import { Address } from "src/models/address";
import { AddressRepository } from "../repositories/address";
import { MedusaError } from "medusa-core-utils";
import { TransactionBaseService } from "@medusajs/medusa";

type InjectedDependencies = {
  addressRepository: typeof AddressRepository;
};


class AddressService extends TransactionBaseService {
  protected readonly addressRepository_: typeof AddressRepository;

  constructor({ addressRepository }: InjectedDependencies) {
    super(arguments[0]);
    this.addressRepository_ = addressRepository;
  }

  async getCoordinates(addressId: string): Promise<{ longitude: number | null; latitude: number | null }> {
    try {
      return await this.addressRepository_.getCoordinates(addressId);
    } catch (error) {
      throw new MedusaError(MedusaError.Types.NOT_FOUND, `Address with ID ${addressId} not found`);
    }
  }

  async retrieve(addresId: string): Promise<Address> {
    const address = await this.addressRepository_.findById(addresId);
    if (!address) {
      throw new MedusaError(
        MedusaError.Types.NOT_FOUND,
        `Reward with id: ${addresId} was not found`
      );
    }
    return address;
  }

  async update(addressId: string, data: Partial<Address>): Promise<Address> {
    return await this.atomicPhase_(async (manager) => {
      const addressRepo = manager.withRepository(this.addressRepository_);
      const address = await this.retrieve(addressId);
      
      for (const [key, value] of Object.entries(data)) {
        if (value !== undefined) {
          address[key] = value;
        }
      }

      return await addressRepo.save(address);
    });
  }

  async addPickupInstruction(
    addressId: string, 
    instruction: { image_url?: string; description: string }
  ): Promise<Address> {
      return await this.atomicPhase_(async (manager) => {
          const address = await this.retrieve(addressId);
          const currentInstructions = address.pickup_instructions || [];
          
          address.pickup_instructions = [...currentInstructions, instruction];
          return await manager.withRepository(this.addressRepository_).save(address);
      });
  }
    
  async updatePickupInstruction(
      addressId: string,
      index: number,
      instruction: { image_url?: string; description: string }
  ): Promise<Address> {
      return await this.atomicPhase_(async (manager) => {
          const address = await this.retrieve(addressId);
          const instructions = address.pickup_instructions || [];
          
          instructions[index] = instruction;
          address.pickup_instructions = instructions;
          
          return await manager.withRepository(this.addressRepository_).save(address);
      });
  }
    
  async removePickupInstruction(
      addressId: string,
      index: number
  ): Promise<Address> {
      return await this.atomicPhase_(async (manager) => {
          const address = await this.retrieve(addressId);
          const instructions = address.pickup_instructions || [];
          
          instructions.splice(index, 1);
          address.pickup_instructions = instructions;
          
          return await manager.withRepository(this.addressRepository_).save(address);
      });
  }

  async addDeliveryInstruction(
      addressId: string, 
      instruction: { image_url?: string; description: string }
  ): Promise<Address> {
      return await this.atomicPhase_(async (manager) => {
          const address = await this.retrieve(addressId);
          const currentInstructions = address.delivery_instructions || [];
          
          address.delivery_instructions = [...currentInstructions, instruction];
          return await manager.withRepository(this.addressRepository_).save(address);
      });
  }
    
  async updateDeliveryInstruction(
      addressId: string,
      index: number,
    instruction: { image_url?: string; description: string }
  ): Promise<Address> {
      return await this.atomicPhase_(async (manager) => {
          const address = await this.retrieve(addressId);
          const instructions = address.delivery_instructions || [];
          
          instructions[index] = instruction;
          address.delivery_instructions = instructions;
          
          return await manager.withRepository(this.addressRepository_).save(address);
      });
  }
    
  async removeDeliveryInstruction(
      addressId: string,
      index: number
  ): Promise<Address> {
      return await this.atomicPhase_(async (manager) => {
          const address = await this.retrieve(addressId);
          const instructions = address.delivery_instructions || [];
          
          instructions.splice(index, 1);
          address.delivery_instructions = instructions;
          
          return await manager.withRepository(this.addressRepository_).save(address);
      });
  }

}

export default AddressService;
