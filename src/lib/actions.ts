"use server";

import { redirect } from 'next/navigation';
import { z } from 'zod';

const inquirySchema = z.object({
  name: z.string(),
  phone: z.string(),
  service: z.string().optional(),
});

export async function submitInquiry(data: unknown) {
  const parsedData = inquirySchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, message: 'Неверные данные.' };
  }

  // Here you would typically send an email, save to a database, or send a Telegram message.
  // For this example, we'll just log it and simulate success.
  console.log("New Inquiry Received:", parsedData.data);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  redirect('/thank-you');

  // Although we redirect, we return a success message for type consistency,
  // even though this part of the code won't be reached after a successful redirect.
  return { success: true };
}

const calculatorInquirySchema = z.object({
  name: z.string().min(2, { message: "Имя должно быть не менее 2 символов." }),
  phone: z.string().min(7, { message: "Пожалуйста, введите корректный номер телефона." }),
  service: z.string().optional(),
  details: z.string().optional(),
});

export async function submitCalculatorInquiry(data: unknown) {
  const parsedData = calculatorInquirySchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, message: 'Неверные данные.' };
  }

  console.log("New Calculator Inquiry Received:", parsedData.data);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // No redirect here
  return { success: true };
}
