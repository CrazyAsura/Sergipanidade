'use client';

import { useState } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useRouter } from 'next/navigation';
import { motion, Variants } from 'framer-motion';
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

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.7, 
      ease: 'easeOut' 
    } 
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { 
    transition: { 
      staggerChildren: 0.06 
    } 
  },
};

function WebFAQ() {
  const router = useRouter();
  return (
    <div className="space-y-24">
      {/* Hero */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="text-center max-w-4xl mx-auto space-y-8"
      >
        <motion.div variants={fadeUp} className="h-24 w-24 bg-primary/10 rounded-[2rem] flex items-center justify-center mx-auto border border-primary/20 shadow-xl shadow-primary/5">
          <HelpCircle size={48} className="text-primary" />
        </motion.div>
        <motion.h1 variants={fadeUp} className="text-5xl md:text-8xl font-black tracking-tighter text-foreground uppercase italic leading-[0.85]">
          Perguntas <span className="text-gradient">Frequentes</span>
        </motion.h1>
        <motion.p variants={fadeUp} className="text-xl text-muted-foreground font-medium max-w-xl mx-auto leading-relaxed">
          Tudo que você precisa saber antes e durante sua viagem a Sergipe.
        </motion.p>
      </motion.section>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="max-w-3xl mx-auto px-4 md:px-0"
      >
        <Accordion className="space-y-5">
          {faqs.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div key={i} variants={fadeUp}>
                <AccordionItem value={`item-${i}`} className="border border-white/10 dark:border-white/5 rounded-[2.5rem] px-8 data-[state=open]:shadow-2xl data-[state=open]:shadow-primary/5 data-[state=open]:border-primary/20 transition-all overflow-hidden glass-card">
                  <AccordionTrigger className="hover:no-underline py-7">
                    <div className="flex items-center gap-5">
                      <div className="p-3.5 bg-primary/10 rounded-2xl shrink-0 border border-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-black text-left text-foreground text-base md:text-lg leading-tight uppercase italic tracking-tighter">{f.q}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pl-[4.5rem] pb-7 text-sm font-medium">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            );
          })}
        </Accordion>
      </motion.div>

      {/* CTA */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="max-w-3xl mx-auto bg-primary rounded-[3rem] p-16 text-primary-foreground text-center space-y-8 relative overflow-hidden border border-white/10"
      >
        <div className="absolute -right-20 -top-20 w-[300px] h-[300px] bg-white/10 rounded-full blur-[100px]" />
        <div className="absolute -left-10 -bottom-10 w-[200px] h-[200px] bg-accent/20 rounded-full blur-[80px]" />
        <div className="relative z-10 space-y-6">
          <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none">Não encontrou sua resposta?</h2>
          <p className="opacity-70 font-medium text-lg">Pergunte ao nosso Guia IA ou entre em contato.</p>
          <div className="flex gap-4 justify-center mt-8">
            <Button onClick={() => router.push('/guide')} className="bg-white text-primary hover:bg-white/90 font-black h-16 px-10 rounded-2xl shadow-2xl hover:scale-105 transition-all">
              FALAR COM IA <Bot size={18} className="ml-2" />
            </Button>
            <Button onClick={() => router.push('/contact')} variant="outline" className="border-white/30 text-white hover:bg-white/10 font-black h-16 px-10 rounded-2xl backdrop-blur-md">
              CONTATO <ArrowRight size={18} className="ml-2" />
            </Button>
          </div>
        </div>
      </motion.section>
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
            <Button onClick={() => router.push('/guide')} className="w-full bg-white text-primary hover:bg-gray-50 font-black h-14 rounded-2xl shadow-xl">FALAR COM IA</Button>
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
