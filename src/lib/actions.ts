
"use server";

import { redirect } from 'next/navigation';
import { z } from 'zod';

async function sendTelegramNotification(message: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatIds = ['7593008791'].concat(process.env.TELEGRAM_CHAT_ID?.split(',') || []);

  if (!botToken || chatIds.length === 0) {
    console.error("Telegram bot token or chat ID is not configured");
    return;
  }

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  
  for (const chatId of chatIds) {
      if (!chatId.trim()) continue;
      try {
        await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId.trim(),
            text: message,
            parse_mode: 'HTML',
          }),
        });
      } catch (error) {
        console.error(`Error sending Telegram notification to ${chatId}:`, error);
      }
  }
}

const inquirySchema = z.object({
  name: z.string(),
  phone: z.string(),
  service: z.string().optional(),
  locale: z.string().default('ru'),
});

export async function submitInquiry(formData: FormData) {
  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const service = formData.get('service') as string;
  const locale = formData.get('locale') as string || 'ru';

  const message = `📥 <b>Новая заявка</b>\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n📝 Инфо: ${service || '—'}\n🌍 Источник: website`;
    
  await sendTelegramNotification(message);
  
  redirect(`/${locale}/thank-you`);
}
