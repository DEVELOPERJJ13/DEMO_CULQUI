import { z } from "zod";

const allowedEmailDomains = ["gmail.com", "hotmail.com", "yahoo.es"];
const currentYear = new Date().getFullYear();

export const CardSchema = z.object({
  card_number: z
    .number()
    .int()
    .refine(
      (val) => {
        const length = val.toString().length;
        return length >= 13 || length <= 16;
      },
      { message: "Card number must be between 13 and 16 digits" }
    )
    .refine((val) => luhnCheck(val.toString()), {
      message: "Card number is invalid",
    }),
  // TODO
  cvv: z
    .number()
    .int()
    .gte(100, "CVV must be a 3-digit number")
    .lte(999, "CVV must be a 3-digit number"),

  expiration_month: z
    .string()
    .regex(/^\d{1,2}/, "Invalid month format")
    .refine(
      (val) => {
        const num = parseInt(val);
        return num >= 1 && num <= 12;
      },
      { message: "Month must be between 1 and 12" }
    ),

  expiration_year: z
    .string()
    .regex(/^\d{4}$/, "Invalid year format")
    .refine(
      (val) => {
        const year = parseInt(val);
        return year >= currentYear && year <= currentYear + 5;
      },
      { message: "Expiration year must be within the next 5 years" }
    ),

  email: z
    .string()
    .email("Invalid email format")
    .refine(
      (email) => {
        const domain = email.split("@")[1];
        return allowedEmailDomains.includes(domain);
      },
      {
        message:
          "Email domain must be one of: " + allowedEmailDomains.join(", "),
      }
    ),
});

export type CardInput = z.infer<typeof CardSchema>;

function luhnCheck(cardNumber: string): boolean {
  let sum = 0;
  let shouldDouble = false;

  // iterate over the card number from right to left
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber[i], 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}
