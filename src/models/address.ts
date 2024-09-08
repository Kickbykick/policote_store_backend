import {
  Entity,
  Column,
} from "typeorm";
import {
  Address as MedusaAddress,
} from "@medusajs/medusa";

@Entity()
export class Address extends MedusaAddress  {
  @Column()
  latitude: string | null;;

  @Column()
  longitude: string | null;;
}