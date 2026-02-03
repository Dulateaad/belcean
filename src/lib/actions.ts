"use server";

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { headers } from 'next/headers';

function getLocale() {
    const headersList = headers();
    const pathname = headersList.get('x-pathname');
    const locale = pathname?.split('/')[1] || 'ru';
    return locale;
}

async function sendTelegramNotification(message: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatIds = process.env.TELEGRAM_CHAT_ID?.split(',') || [];

  if (!botToken || chatIds.length === 0) {
    console.error("Telegram bot token or chat ID is not configured in .env.local");
    return;
  }

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  
  for (const chatId of chatIds) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId.trim(),
            text: message,
            parse_mode: 'HTML',
          }),
        });
    
        if (!response.ok) {
          const result = await response.json();
          console.error(`Failed to send Telegram notification to ${chatId}:`, result.description);
        }
      } catch (error) {
        console.error(`Error sending Telegram notification to ${chatId}:`, error);
      }
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


  if (!parsedData.success) {
    return { success: false, message: 'Неверные данные.' };
  }

  const { name, phone, service } = parsedData.data;

  const message = `📥 <b>Новая заявка</b>\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n📝 Инфо: ${service || '—'}\n🌍 Источник: website`;
    
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

  if (!parsedData.success) {
    return { success: false, message: 'Invalid data.' };
  }

  const { name, phone, service, details } = parsedData.data;

  const info = `${service || 'Не указана'}\n${details || 'Нет'}`;

  const message = `📥 <b>Новая заявка</b>\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n📝 Инфо: ${info}\n🌍 Источник: Calculator`;

  await sendTelegramNotification(message);

  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return { success: true };
}
