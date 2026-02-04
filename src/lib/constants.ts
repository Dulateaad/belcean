import { Building2, ShoppingBag, HeartPulse, HardHat, Sparkles, Wind, Sofa, Users, UserCheck, ShieldCheck, Smile, ClipboardList, Home } from 'lucide-react';
import { PlaceHolderImages } from './placeholder-images';

export const getServices = (t: any) => {
    const servicesText = t.Constants.services;
    return [
      { slug: servicesText[0].slug, title: servicesText[0].title, description: servicesText[0].description, icon: Building2, imageId: 'service-office', imageHint: 'clean office' },
      { slug: servicesText[1].slug, title: servicesText[1].title, description: servicesText[1].description, icon: ClipboardList, imageId: 'service-subscription', imageHint: 'calendar schedule' },
      { slug: servicesText[2].slug, title: servicesText[2].title, description: servicesText[2].description, icon: Sparkles, imageId: 'service-general', imageHint: 'floor polishing' },
      { slug: servicesText[3].slug, title: servicesText[3].title, description: servicesText[3].description, icon: HardHat, imageId: 'service-construction', imageHint: 'construction site' },
      { slug: servicesText[4].slug, title: servicesText[4].title, description: servicesText[4].description, icon: Wind, imageId: 'service-windows', imageHint: 'window cleaning' },
      { slug: servicesText[5].slug, title: servicesText[5].title, description: servicesText[5].description, icon: Sofa, imageId: 'service-furniture', imageHint: 'upholstery cleaning' },
    ];
};

export const getTestimonials = (t: any) => {
    const testimonialsText = t.Constants.testimonials;
    return [
      { name: testimonialsText[0].name, role: testimonialsText[0].role, quote: testimonialsText[0].quote, avatarUrl: PlaceHolderImages.find(p => p.id === 'testimonial-1')?.imageUrl || '' },
      { name: testimonialsText[1].name, role: testimonialsText[1].role, quote: testimonialsText[1].quote, avatarUrl: PlaceHolderImages.find(p => p.id === 'testimonial-2')?.imageUrl || '' },
      { name: testimonialsText[2].name, role: testimonialsText[2].role, quote: testimonialsText[2].quote, avatarUrl: PlaceHolderImages.find(p => p.id === 'testimonial-3')?.imageUrl || '' },
    ];
};


export const getClientTypes = (t: any) => {
    const clientTypesText = t.Constants.client_types;
    return [
        { name: clientTypesText[0].name, icon: Building2, imageUrl: null },
        { name: clientTypesText[1].name, icon: Building2, imageUrl: 'https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/Gemini_Generated_Image_wqlim4wqlim4wqli.png?alt=media&token=2836cd0c-fba1-48f7-a840-12156db46e68' },
        { name: clientTypesText[2].name, icon: ShoppingBag, imageUrl: 'https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/Gemini_Generated_Image_mrb58smrb58smrb5.png?alt=media&token=6784452a-b066-405a-971b-1606c7de2cb2' },
        { name: clientTypesText[3].name, icon: HeartPulse, imageUrl: 'https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/Gemini_Generated_Image_x21e9gx21e9gx21e.png?alt=media&token=cdd15f92-cbe6-4fc5-b9bd-e63e37439429' },
        { name: clientTypesText[4].name, icon: HardHat, imageUrl: 'https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/Gemini_Generated_Image_8ha5h68ha5h68ha5.png?alt=media&token=cdfe0667-95c2-40cb-adf6-00e5911e906d' },
        { name: clientTypesText[5].name, icon: Home, imageUrl: 'https://firebasestorage.googleapis.com/v0/b/studio-590355839-601a4.firebasestorage.app/o/Gemini_Generated_Image_so9mwwso9mwwso9m.png?alt=media&token=6c739362-5949-4dd0-86de-2bb1cc257e22' },
    ];
};

export const getWhyBeClean = (t: any) => {
    const whyBeCleanText = t.Constants.why_beclean;
    return [
        { title: whyBeCleanText[0].title, description: whyBeCleanText[0].description, icon: Users  },
        { title: whyBeCleanText[1].title, description: whyBeCleanText[1].description, icon: ShieldCheck },
        { title: whyBeCleanText[2].title, description: whyBeCleanText[2].description, icon: UserCheck },
        { title: whyBeCleanText[3].title, description: whyBeCleanText[3].description, icon: Smile },
    ];
};

export const getHowItWorks = (t: any) => {
    return t.Constants.how_it_works;
};

export const getPrices = (t: any) => {
    return t.Constants.prices;
};

    