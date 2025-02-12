import { ConfigModule, Customer, CustomerService, Logger, TransactionBaseService } from "@medusajs/medusa"
import { Twilio } from "twilio"
import { MedusaError } from "medusa-core-utils";
import CustomerRepository from "src/repositories/customer";
// import CustomerService from "./customer";

class OtpService extends TransactionBaseService {
    protected customerService: CustomerService;
    protected logger: Logger;
    protected twilioClient: Twilio;
    protected readonly configModule_: ConfigModule
    protected readonly customerRepository_: typeof CustomerRepository;

    constructor(container, customerRepository) {
        super(arguments[0]);
        this.customerService = container.customerService as CustomerService;
        this.customerRepository_ = customerRepository;
    }

    async sendOtp(twilioSmsService, phoneNumber: string): Promise<{ sent: boolean, expiry: number }> {
        const otp = this.generateOtp()
        try {
            twilioSmsService.sendSms({
                to: phoneNumber,
                body: `Your Policote OTP Code is: ${otp}`,
            })

            const customer = await this.customerService.retrieveByPhone(phoneNumber)
            if (customer) {
                const expiryTime = Date.now() + 10 * 60 * 1000 // OTP expires in 10 minutes
                await this.customerService.update(customer.id, {
                metadata: {
                    ...customer.metadata,
                    otp: otp,
                    otpExpiry: Date.now() + 10 * 60 * 1000 // OTP expires in 10 minutes
                }
                })
                return { sent: true, expiry: expiryTime }
            } else {
                throw new MedusaError(MedusaError.Types.NOT_FOUND, "Customer not found")
            }
        } catch (error) {
            throw error;
        }
    }

    async verifyOtp(customer: Customer, otp: string): Promise<boolean> {
        const storedOtp = customer.metadata?.otp as string | undefined
        const otpExpiry = customer.metadata?.otpExpiry as number | undefined

        if (storedOtp === otp ) {//&& Date.now() < otpExpiry) {
            // Clear OTP after successful verification
            await this.customerService.update(customer.id, {
                metadata: {
                    ...customer.metadata,
                    otp: null,
                    otpExpiry: null
                }
            });
            return true
        } else {
            return false
        }
    }

    async resetPassword(email: string, password: string): Promise<boolean> {
        console.log(email, password)
        
        try {
            const customer = await this.customerService.retrieveRegisteredByEmail(email);
            if (!customer) {
                throw new MedusaError(MedusaError.Types.NOT_FOUND, "Customer not found");
            }

            // const tokenGen = await this.customerService.generateResetPasswordToken(customer.id);
            // console.log("tokenGen: ", tokenGen);

            const otpExpiry = customer.metadata?.otpExpiry as number | undefined

            if (Date.now() < otpExpiry) {
                await this.customerService.update(customer.id, {
                    password: password
                });
            }

            return true
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async resetPasswordPhone(phone: string, password: string): Promise<boolean> {        
        try {
            const customer = await this.customerService.retrieveByPhone(phone);
            if (!customer) {
                throw new MedusaError(MedusaError.Types.NOT_FOUND, "Customer not found");
            }

            // const tokenGen = await this.customerService.generateResetPasswordToken(customer.id);
            // console.log("tokenGen: ", tokenGen);

            const otpExpiry = customer.metadata?.otpExpiry as number | undefined

            if (Date.now() < otpExpiry) {
                await this.customerService.update(customer.id, {
                    password: password
                });
            }

            return true
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    private generateOtp(): string {
        return Math.floor(100000 + Math.random() * 900000).toString()
    }
}

export default OtpService