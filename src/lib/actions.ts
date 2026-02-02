"use server";

import { redirect } from 'next/navigation';
import { z } from 'zod';

async function sendTelegramNotification(message: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error("Telegram bot token or chat ID is not configured in .env.local");
    // We don't want to block the user's request if Telegram isn't set up.
    return;
  }

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      const result = await response.json();
      console.error("Failed to send Telegram notification:", result.description);
    }
  } catch (error) {
    console.error("Error sending Telegram notification:", error);
  }
}

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

  const { name, phone, service } = parsedData.data;

  // Send Telegram notification
  const message = `<b>Новая заявка с сайта!</b>\n\n<b>Имя:</b> ${name}\n<b>Телефон:</b> ${phone}\n<b>Услуга:</b> ${service || 'Не указана'}`;
  await sendTelegramNotification(message);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  redirect('/thank-you');

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

  const { name, phone, service, details } = parsedData.data;

  // Send Telegram notification
  const message = `<b>🔥 Новая заявка с калькулятора!</b>\n\n<b>Имя:</b> ${name}\n<b>Телефон:</b> ${phone}\n<b>Услуга:</b> ${service || 'Не указана'}\n<b>Детали:</b> ${details || 'Нет'}`;
  await sendTelegramNotification(message);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // No redirect here
  return { success: true };
}
