// @ts-nocheck
"use server";

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { getDictionary } from './get-dictionary';
import { headers } from 'next/headers';

function getLocale() {
    const headersList = headers();
    const pathname = headersList.get('x-pathname');
    const locale = pathname?.split('/')[1] || 'ru';
    return locale;
}

async function sendTelegramNotification(message: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error("Telegram bot token or chat ID is not configured in .env.local");
    return;
  }

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
  const locale = getLocale();
  const t = await getDictionary(locale as any);


  if (!parsedData.success) {
    return { success: false, message: 'Неверные данные.' };
  }

  const { name, phone, service } = parsedData.data;

  const message = t.Actions.new_inquiry_telegram
    .replace('{name}', name)
    .replace('{phone}', phone)
    .replace('{service}', service || t.Actions.no_service_specified);
    
  await sendTelegramNotification(message);

  await new Promise(resolve => setTimeout(resolve, 1000));
  
  redirect(`/${locale}/thank-you`);

  return { success: true };
}

const calculatorInquirySchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(7),
  service: z.string().optional(),
  details: z.string().optional(),
});

export async function submitCalculatorInquiry(data: unknown) {
    const parsedData = calculatorInquirySchema.safeParse(data);
    const locale = getLocale();
    const t = await getDictionary(locale as any);

  if (!parsedData.success) {
    return { success: false, message: 'Invalid data.' };
  }

  const { name, phone, service, details } = parsedData.data;

  const message = t.Actions.new_calculator_inquiry_telegram
    .replace('{name}', name)
    .replace('{phone}', phone)
    .replace('{service}', service || t.Actions.no_service_specified)
    .replace('{details}', details || t.Actions.no_details);

  await sendTelegramNotification(message);

  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return { success: true };
}
