'use client';

import { useState } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { HelpCircle, MapPin, CreditCard, ShieldCheck, Info, Bot, Globe, Utensils, Compass, Sun, ArrowRight } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Box, Typography, Accordion as MuiAccordion, AccordionSummary, AccordionDetails, Stack, Paper, Button as MuiButton } from '@mui/material';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { icon: Sun, q: 'Quais são as melhores épocas para visitar Sergipe?', a: 'Sergipe é ótimo o ano todo! Mas as festas juninas em Julho são inesquecíveis. Para praias, de Outubro a Março o clima é perfeito com sol e temperaturas entre 28°C e 32°C.' },
  { icon: CreditCard, q: 'Os passeios precisam ser agendados com antecedência?', a: 'Sim, especialmente o Cânion do Xingó e a Crôa do Goré que dependem de marés e têm limite de passageiros. Recomendamos reservar com pelo menos 3 dias de antecedência na alta temporada.' },
  { icon: ShieldCheck, q: 'É seguro viajar sozinho por Sergipe?', a: 'Sim, Sergipe é considerado bastante seguro para turistas. Evite locais desertos à noite e use sempre canais oficiais para passeios. Nosso app conta com emergências rápidas (190, 192) no mapa.' },
  { icon: Bot, q: 'O Guia Virtual com IA é pago?', a: 'Não! O Guia Virtual IA é 100% gratuito e está disponível 24 horas. Ele responde dúvidas sobre destinos, gastronomia, cultura e até cria roteiros personalizados.' },
  { icon: Utensils, q: 'Quais pratos típicos eu não posso deixar de provar?', a: 'O caranguejo na Passarela do Caranguejo em Aracaju é obrigatório! Também prove a moqueca sergipana, o cuscuz com leite de coco, a paçoca de carne de sol e o bolinho de estudante.' },
  { icon: Globe, q: 'Preciso de carro para conhecer Sergipe?', a: 'Depende do roteiro. Aracaju e a Orla de Atalaia são acessíveis a pé e por transporte público. Para destinos como Canindé de São Francisco (Cânion do Xingó), recomendamos carro ou transfer.' },
  { icon: MapPin, q: 'Quais são os destinos mais populares?', a: 'Os destinos imperdíveis incluem: Cânion do Xingó, Crôa do Goré, Orla de Atalaia, São Cristóvão (patrimônio UNESCO), Mangue Seco e Pirambu (tartarugas marinhas). Todos estão mapeados na plataforma.' },
  { icon: Compass, q: 'Como funciona o mapa interativo?', a: 'Nosso mapa usa Google Maps com geolocalização em tempo real. Mostra restaurantes, praias, museus e pontos históricos. Você pode filtrar por categoria e ver detalhes como cardápio e avaliações.' },
];

function WebFAQ() {
  const router = useRouter();
  return (
    <div className="space-y-20 animate-in fade-in duration-700">
      {/* Hero */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <div className="h-20 w-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto transition-transform hover:scale-110">
          <HelpCircle size={40} className="text-primary" />
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground uppercase italic leading-none">
          Perguntas <span className="text-primary">Frequentes</span>
        </h1>
        <p className="text-xl text-muted-foreground font-medium max-w-xl mx-auto leading-relaxed">
          Tudo que você precisa saber antes e durante sua viagem a Sergipe.
        </p>
      </section>

      <div className="max-w-3xl mx-auto px-4 md:px-0">
        <Accordion className="space-y-4">
          {faqs.map((f, i) => {
            const Icon = f.icon;
            return (
              <AccordionItem key={i} value={`item-${i}`} className="border border-border rounded-[2rem] px-8 data-[state=open]:shadow-2xl data-[state=open]:shadow-primary/5 data-[state=open]:border-primary/20 transition-all overflow-hidden bg-card text-card-foreground">
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-5">
                    <div className="p-3 bg-primary/10 rounded-2xl shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-black text-left text-foreground text-base md:text-lg leading-tight uppercase italic tracking-tighter">{f.q}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pl-16 pb-6 text-sm font-medium">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>

      {/* CTA */}
      <section className="max-w-3xl mx-auto bg-orange-600 rounded-[2.5rem] p-12 text-white text-center space-y-6 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter">Não encontrou sua resposta?</h2>
          <p className="text-orange-200 font-medium">Pergunte ao nosso Guia IA ou entre em contato.</p>
          <div className="flex gap-4 justify-center mt-6">
            <Button onClick={() => router.push('/guide')} className="bg-white text-orange-600 hover:bg-orange-50 font-black h-14 px-8 rounded-2xl shadow-xl">
              FALAR COM IA <Bot size={18} className="ml-2" />
            </Button>
            <Button onClick={() => router.push('/contact')} variant="outline" className="border-white/30 text-white hover:bg-white/10 font-black h-14 px-8 rounded-2xl">
              CONTATO <ArrowRight size={18} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function MobileFAQ() {
  const router = useRouter();
  return (
    <div className="pb-10 space-y-8">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-primary/10 rounded-[1.5rem] flex items-center justify-center mx-auto shadow-lg shadow-primary/5">
          <HelpCircle size={32} className="text-primary" />
        </div>
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tighter leading-none text-foreground uppercase italic">
            Perguntas <span className="text-primary">Frequentes</span>
          </h1>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Tudo sobre sua viagem</p>
        </div>
      </div>

      <div className="space-y-4">
        {faqs.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div className="bg-card border border-border rounded-[2rem] overflow-hidden shadow-xl shadow-black/5">
                 <Accordion>
                    <AccordionItem value="item-1" className="border-none px-6">
                       <AccordionTrigger className="py-5 hover:no-underline [&[data-state=open]>div>div>svg]:rotate-180">
                          <div className="flex items-center gap-4 text-left">
                             <div className="p-2.5 bg-primary/10 rounded-xl shrink-0 text-primary">
                                <Icon size={18} />
                             </div>
                             <span className="font-black text-xs leading-snug text-foreground uppercase tracking-tight">{f.q}</span>
                          </div>
                       </AccordionTrigger>
                       <AccordionContent className="text-muted-foreground text-[11px] font-bold leading-relaxed pb-6 pl-12 border-none">
                          {f.a}
                       </AccordionContent>
                    </AccordionItem>
                 </Accordion>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="bg-primary rounded-[2.5rem] p-8 text-white text-center space-y-6 shadow-2xl shadow-primary/30 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/20 rounded-full blur-3xl opacity-50" />
        <div className="relative z-10 space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-black uppercase italic tracking-tighter leading-none">Não encontrou?</h2>
            <p className="text-[10px] font-bold text-primary-foreground/80 uppercase tracking-widest">Pergunte ao nosso Guia IA.</p>
          </div>
          <div className="space-y-3">
            <Button onClick={() => router.push('/guide')} className="w-full bg-white text-primary hover:bg-orange-50 font-black h-14 rounded-2xl shadow-xl">FALAR COM IA</Button>
            <Button onClick={() => router.push('/contact')} variant="outline" className="w-full border-white/30 text-white hover:bg-white/10 font-black h-14 rounded-2xl">CONTATO</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileFAQ /> : <WebFAQ />;
}
