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
  latitude: string | null;

  @Column()
  longitude: string | null;

  @Column("jsonb", {nullable: true})
  pickup_instructions: {
    image_url?: string
    description: string
  }[]

  @Column("jsonb", {nullable: true})
  delivery_instructions: {
    image_url?: string
    description: string
  }[]
}