import * as z from "zod";

export const signupSchema =z.object({
name:
    z.string()
    .trim()
    .min(3 , "minimum length schould be 3")
    .max(30),

 age: 
    z.number()
    .min(10 , "minimum age schould be 10")
    .max(100,"maximum age should be 100")
    .optional(),


email: z.preprocess(
  (value) =>
    typeof value === "string"
      ? value.trim().toLowerCase()
      : value,
      z.email()
),



password:
    z.string()
    .min(8)
    .max(30)
    .regex(/[A-Z]/,"Missing Capital Letter")
    .regex(/[a-z]/,"Your Password must have small letter")
    .regex(/[0-9]/,"Your Password must have one numeric")

});


export const loginSchema= z.object({
    email: z.preprocess(
  (value) => typeof value === "string"
      ? value.trim().toLowerCase()
      : value,
      z.email()
),



password:
    z.string()
    .min(8)
    .max(30)
    .regex(/[A-Z]/,"Missing Capital Letter")
    .regex(/[a-z]/,"Your Password must have small letter")
    .regex(/[0-9]/,"Your Password must have one numeric")

});

    
