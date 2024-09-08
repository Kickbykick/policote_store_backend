import {
  Entity,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import {
  Customer as MedusaCustomer,
} from "@medusajs/medusa";
import { Profile } from "./profile";
import { OrderEstimate } from "./order-estimate";

@Entity()
export class Customer extends MedusaCustomer {
  @OneToOne(() => Profile, (profile) => profile.customer, {onDelete: "CASCADE"}) // specify inverse side as a second parameter
  @JoinColumn({name: "profile_id"})
  profile: Profile;

  @OneToOne(() => OrderEstimate, (orderEstimate) => orderEstimate.customer, {onDelete: "CASCADE"})
  @JoinColumn({name: "order_estimate_id"})
  orderEstimate: OrderEstimate;
}