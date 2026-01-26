"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { services } from "@/lib/constants";
import { submitInquiry } from "@/lib/actions";

const formSchema = z.object({
  name: z.string().min(2, { message: "Имя должно быть не менее 2 символов." }),
  phone: z.string().min(7, { message: "Пожалуйста, введите корректный номер телефона." }),
  service: z.string().optional(),
});

type ContactFormValues = z.infer<typeof formSchema>;

export function ContactForm({ defaultService }: { defaultService?: string }) {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      service: defaultService || "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    try {
      const result = await submitInquiry(data);
      if (result.success) {
        // Redirect is handled by the server action
      } else {
        toast({
          variant: "destructive",
          title: "Ошибка отправки",
          description: result.message || "Произошла ошибка при отправке формы.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось связаться с сервером.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Имя</FormLabel>
              <FormControl>
                <Input placeholder="Ваше имя" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Телефон</FormLabel>
              <FormControl>
                <Input placeholder="+998 XX XXX XX XX" type="tel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Услуга</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите услугу (необязательно)" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="">-- Не выбрано --</SelectItem>
                  {services.map((service) => (
                    <SelectItem key={service.slug} value={service.title}>
                      {service.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Отправка..." : "Оставить заявку"}
        </Button>
      </form>
    </Form>
  );
}
