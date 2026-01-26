import { Building2, ShoppingBag, HeartPulse, HardHat, Sparkles, Wind, Sofa, Users, UserCheck, BookCheck, Camera, CheckSquare, ClipboardList, ShieldCheck, Smile } from 'lucide-react';
import type { Service, Testimonial, ClientType, WhyBeCleanReason, HowItWorksStep, PriceItem } from './types';
import { PlaceHolderImages } from './placeholder-images';

export const services: Service[] = [
  {
    slug: '/uborka-ofisov-tashkent',
    title: 'Уборка офисов',
    description: 'Поддержим чистоту и порядок в вашем рабочем пространстве.',
    icon: Building2,
    imageId: 'service-office',
    imageHint: 'clean office'
  },
  {
    slug: '/abonentskiy-klining',
    title: 'Абонентский клининг',
    description: 'Регулярная уборка по согласованному графику.',
    icon: ClipboardList,
    imageId: 'service-subscription',
    imageHint: 'calendar schedule'
  },
  {
    slug: '/generalnaya-uborka',
    title: 'Генеральная уборка',
    description: 'Комплексная и тщательная уборка всех помещений.',
    icon: Sparkles,
    imageId: 'service-general',
    imageHint: 'floor polishing'
  },
  {
    slug: '/poslestroitelnaya-uborka',
    title: 'Послестроительная уборка',
    description: 'Уберем всю строительную пыль и мусор.',
    icon: HardHat,
    imageId: 'service-construction',
    imageHint: 'construction site'
  },
  {
    slug: '/moika-okon',
    title: 'Мойка окон',
    description: 'Кристально чистые окна, фасады и витрины.',
    icon: Wind,
    imageId: 'service-windows',
    imageHint: 'window cleaning'
  },
  {
    slug: '/himchistka-mebeli',
    title: 'Химчистка мебели',
    description: 'Вернем вашей мебели свежий и опрятный вид.',
    icon: Sofa,
    imageId: 'service-furniture',
    imageHint: 'upholstery cleaning'
  },
];

export const testimonials: Testimonial[] = [
  {
    name: 'Алишер Каримов',
    role: 'Директор, IT-компания',
    quote: 'BeClean Pro — настоящие профессионалы. Наш офис никогда не был таким чистым. Особенно радует ответственный менеджер, который всегда на связи.',
    avatarUrl: PlaceHolderImages.find(p => p.id === 'testimonial-1')?.imageUrl || '',
  },
  {
    name: 'Елена Пак',
    role: 'Управляющая бизнес-центра',
    quote: 'Перешли на абонентское обслуживание от BeClean и очень довольны. Персонал обученный, вежливый, а фотоотчёты помогают контролировать качество.',
    avatarUrl: PlaceHolderImages.find(p => p.id === 'testimonial-2')?.imageUrl || '',
  },
  {
    name: 'Тимур Ибрагимов',
    role: 'Владелец клиники',
    quote: 'Для нас стерильность — главный приоритет. Команда BeClean полностью оправдала наши ожидания. Работают по чек-листам, ничего не упускают.',
    avatarUrl: PlaceHolderImages.find(p => p.id === 'testimonial-3')?.imageUrl || '',
  },
];

export const clientTypes: ClientType[] = [
    { name: 'Офисы', icon: Building2 },
    { name: 'Бизнес-центры', icon: Building2 },
    { name: 'Магазины', icon: ShoppingBag },
    { name: 'Клиники', icon: HeartPulse },
    { name: 'Склады', icon: HardHat },
];

export const whyBeClean: WhyBeCleanReason[] = [
    { 
        title: 'Обученный персонал',
        description: 'Все наши сотрудники проходят специальное обучение и регулярно повышают квалификацию.',
        icon: Users 
    },
    { 
        title: 'Гарантия качества',
        description: 'Мы используем подробные чек-листы для каждого объекта, чтобы гарантировать высокий стандарт.',
        icon: ShieldCheck 
    },
    { 
        title: 'Персональный менеджер',
        description: 'За каждым клиентом закрепляется персональный менеджер для решения всех вопросов.',
        icon: UserCheck
    },
    { 
        title: 'Довольные клиенты',
        description: 'Предоставляем фотоотчёты о проделанной работе для полного контроля с вашей стороны.',
        icon: Smile
    },
];

export const howItWorks: HowItWorksStep[] = [
    {
        title: 'Заявка или звонок',
        description: 'Вы оставляете заявку на сайте или звоните нам. Мы обсуждаем ваши потребности.',
    },
    {
        title: 'Оценка объекта',
        description: 'Наш менеджер бесплатно выезжает на ваш объект для оценки объёма работ и составления сметы.',
    },
    {
        title: 'Заключение договора',
        description: 'Мы подготавливаем и подписываем договор с чётко прописанными условиями и графиком работ.',
    },
    {
        title: 'Выполнение работ',
        description: 'Наша команда приступает к работе в соответствии с согласованным планом и чек-листами.',
    },
    {
        title: 'Контроль качества',
        description: 'Менеджер контролирует качество уборки и предоставляет вам отчёт о проделанной работе.',
    }
];

export const prices: PriceItem[] = [
  { name: "Разовая уборка офиса", price: "от 4 000 сум / м²" },
  { name: "Абонентский клининг", price: "от 3 000 000 сум / месяц" },
  { name: "Генеральная уборка", price: "от 10 000 сум / м²" },
  { name: "Послестроительная уборка", price: "от 15 000 сум / м²" },
  { name: "Мойка окон", price: "от 20 000 сум / м²" },
  { name: "Химчистка мебели", price: "от 60 000 сум" },
];
