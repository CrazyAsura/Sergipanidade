'use client';

import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// Icons
import { Sun, ChevronRight, Info, ShieldCheck, MapPin, TrendingUp, Bot, Sparkles, Navigation, ChevronLeft, Map as MapIcon, Globe, Compass, Users, Heart } from 'lucide-react';

// Shadcn
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// MUI
import {
  Box, Typography, Paper, Stack, IconButton, Button as MuiButton
} from '@mui/material';

const carouselItems = [
  {
    title: "Cânion do Xingó",
    subtitle: "EXPLORE O SERTÃO",
    description: "Navegue pelas águas esmeraldas do Rio São Francisco em um cenário de tirar o fôlego.",
    image: "https://images.unsplash.com/photo-1596739942337-332463eacc76?q=80&w=1200&auto=format&fit=crop",
    link: "/locations/1"
  },
  {
    title: "Crôa do Goré",
    subtitle: "PARAÍSO TROPICAL",
    description: "Um banco de areia que surge com a maré, oferecendo águas calmas e petiscos inigualáveis.",
    image: "https://images.unsplash.com/photo-1544735038-348dfaf8ab4b?q=80&w=1200&auto=format&fit=crop",
    link: "/locations/2"
  },
  {
    title: "São Cristóvão",
    subtitle: "HISTÓRIA VIVA",
    description: "Conheça a quarta cidade mais antiga do Brasil e seu patrimônio mundial da UNESCO.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop",
    link: "/locations/3"
  },
  {
    title: "Orla de Atalaia",
    subtitle: "A CAPITAL DO SOL",
    description: "A passarela do caranguejo e lagos encantadores te esperam na orla mais bonita do Brasil.",
    image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=1200&auto=format&fit=crop",
    link: "/locations/4"
  }
];

// ═══════════════════════════════════════════
// HERO CAROUSEL COMPONENT
// ═══════════════════════════════════════════
function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % carouselItems.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[500px] md:h-[650px] rounded-[3rem] overflow-hidden shadow-2xl group">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img src={carouselItems[index].image} className="w-full h-full object-cover" alt={carouselItems[index].title} />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-0 p-8 md:p-20 z-10">
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-3xl"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-orange-600 text-white text-[10px] font-black tracking-widest mb-6 uppercase shadow-lg shadow-orange-950/20">
            {carouselItems[index].subtitle}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-8xl font-black text-white leading-tight mb-4 md:mb-6 drop-shadow-2xl uppercase italic tracking-tighter">
            {carouselItems[index].title}
          </h2>
          <p className="text-gray-200 text-sm sm:text-base md:text-2xl font-medium mb-8 md:mb-10 max-w-2xl leading-relaxed opacity-90">
            {carouselItems[index].description}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
             <Button 
                onClick={() => router.push('/locations')}
                className="bg-orange-600 text-white hover:bg-orange-700 font-black px-6 md:px-10 h-14 md:h-16 rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95 text-xs md:text-sm"
             >
                COMEÇAR EXPLORAÇÃO <ChevronRight size={16} className="ml-2" />
             </Button>
             <div className="flex gap-2 items-center">
                {carouselItems.map((_, i) => (
                  <div 
                    key={i} 
                    onClick={() => setIndex(i)}
                    className={`h-1.5 transition-all cursor-pointer rounded-full ${index === i ? 'w-8 bg-orange-500' : 'w-2 bg-white/20 hover:bg-white/40'}`} 
                  />
                ))}
             </div>
          </div>
        </motion.div>
      </div>

      {/* Nav Controls */}
      <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8 flex">
        <button 
          onClick={() => setIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length)} 
          className="bg-white/10 hover:bg-white/30 backdrop-blur-md text-white border border-white/20 h-10 w-10 md:h-14 md:w-14 rounded-xl md:rounded-2xl flex items-center justify-center transition-all active:scale-90"
        >
          <ChevronLeft size={20} />
        </button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8 flex">
        <button 
          onClick={() => setIndex((prev) => (prev + 1) % carouselItems.length)} 
          className="bg-white/10 hover:bg-white/30 backdrop-blur-md text-white border border-white/20 h-10 w-10 md:h-14 md:w-14 rounded-xl md:rounded-2xl flex items-center justify-center transition-all active:scale-90"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
// SUMMARY SECTION
// ═══════════════════════════════════════════
function SummarySection() {
  const router = useRouter();
  return (
    <section className="py-24 space-y-24">
      {/* About the Site */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
              <p className="text-primary font-black text-[10px] tracking-[0.3em] uppercase">O que é o Sergipanidade?</p>
              <h2 className="text-4xl md:text-6xl font-black text-foreground leading-tight tracking-tighter uppercase italic">
                Sua porta de entrada para a <span className="text-primary">essência</span> de Sergipe.
              </h2>
           </div>
           <p className="text-lg text-muted-foreground font-medium leading-relaxed">
             O Sergipanidade nasceu com o propósito de conectar viajantes e apaixonados pela cultura sergipana com o que há de melhor no nosso estado. Desde as praias paradisíacas até o sertão histórico, nossa plataforma é o seu guia definitivo.
           </p>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Globe, title: "Tudo em um lugar", desc: "Destinos, cultura e dicas práticas." },
                { icon: Compass, title: "Guia Inteligente", desc: "Nossa IA te ajuda a planejar tudo." },
                { icon: Users, title: "Comunidade Viva", desc: "Compartilhe suas experiências e fotos." },
                { icon: Heart, title: "Feito com Amor", desc: "Orgulho de ser sergipano." },
              ].map((item, i) => (
                <div key={i} className="space-y-3">
                   <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                      <item.icon size={20} />
                   </div>
                   <h4 className="font-bold text-foreground uppercase text-xs tracking-wide">{item.title}</h4>
                   <p className="text-[11px] text-muted-foreground font-bold">{item.desc}</p>
                </div>
              ))}
           </div>
           <Button 
             onClick={() => router.push('/about')}
             className="bg-gray-900 text-white hover:bg-black font-black px-8 h-14 rounded-2xl transition-all"
           >
              SAIBA MAIS SOBRE NÓS
           </Button>
        </div>
        <div className="relative">
           <div className="aspect-square rounded-[3rem] overflow-hidden rotate-3 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" />
           </div>
           <div className="absolute -bottom-10 -left-10 bg-card p-8 rounded-[2rem] shadow-2xl border border-border -rotate-6 hidden md:block">
              <div className="flex items-center gap-4 mb-4">
                 <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground scale-110 shadow-lg shadow-primary/20">
                    <Sparkles size={24} />
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none mb-1">Recomendação</p>
                    <p className="font-black text-foreground uppercase italic leading-none">IA Guide Sergipano</p>
                 </div>
              </div>
              <p className="text-sm font-bold text-muted-foreground italic">"Descobri lugares que nem imaginava que existiam no meu próprio estado!"</p>
           </div>
        </div>
      </div>

      {/* Why use us? */}
      <section className="bg-orange-600 rounded-[3rem] p-12 md:p-24 text-white relative overflow-hidden">
         <div className="absolute -right-20 -top-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
         <div className="relative z-10 max-w-4xl mx-auto text-center space-y-12">
            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">A maior plataforma de turismo de Sergipe.</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               <div>
                  <h3 className="text-6xl font-black mb-2 tracking-tighter">50+</h3>
                  <p className="font-bold text-orange-200 uppercase tracking-widest text-xs">Destinos Cadastrados</p>
               </div>
               <div>
                  <h3 className="text-6xl font-black mb-2 tracking-tighter">10k</h3>
                  <p className="font-bold text-orange-200 uppercase tracking-widest text-xs">Usuários Mensais</p>
               </div>
               <div>
                  <h3 className="text-6xl font-black mb-2 tracking-tighter">24/7</h3>
                  <p className="font-bold text-orange-200 uppercase tracking-widest text-xs">Guia IA Disponível</p>
               </div>
            </div>
            <Button 
               onClick={() => router.push('/auth/register')}
               className="bg-white text-orange-600 hover:bg-orange-50 font-black px-12 h-16 rounded-2xl shadow-2xl transition-all hover:scale-110"
            >
               Junte-se à Comunidade
            </Button>
         </div>
      </section>
    </section>
  );
}

// ═══════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════
export default function HomePage() {
  const isMobile = useIsMobile();
  const router = useRouter();
  
  if (isMobile) {
    return (
      <div className="pb-10 space-y-10">
        <HeroCarousel />
        <div className="px-4 space-y-8">
           <div className="space-y-4">
              <p className="text-primary font-black text-[10px] tracking-[0.3em] uppercase">BEM-VINDO</p>
              <h1 className="text-3xl md:text-4xl font-black text-foreground leading-none tracking-tighter uppercase italic">
                Sua jornada sergipana <br />começa <span className="text-primary">aqui.</span>
              </h1>
              <p className="text-muted-foreground font-bold text-sm leading-relaxed">
                 Descubra os segredos mais bem guardados de Sergipe, do litoral ao sertão, com o nosso guia dedicado.
              </p>
           </div>

           <Button 
             onClick={() => router.push('/locations')}
             className="w-full h-16 bg-primary text-primary-foreground font-black rounded-3xl shadow-xl shadow-primary/20 active:scale-95 transition-all text-base tracking-tight uppercase"
           >
              EXPLORAR DESTINOS <ChevronRight className="ml-2 h-5 w-5" />
           </Button>
           
           <div className="space-y-6">
              {[
                { icon: Bot, title: "Inteligência Artificial", desc: "Um guia que te conhece e te entende." },
                { icon: MapIcon, title: "Mapa Interativo", desc: "Localize tudo ao seu redor facilmente." },
                { icon: ShieldCheck, title: "Segurança & Dicas", desc: "Informações verificadas por especialistas." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                   <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0 transition-transform active:scale-90">
                      <item.icon size={22} />
                   </div>
                   <div className="pt-1">
                      <h4 className="font-black text-sm text-foreground uppercase tracking-tight">{item.title}</h4>
                      <p className="text-muted-foreground font-bold text-xs leading-snug">{item.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      <HeroCarousel />
      <SummarySection />
    </div>
  );
}
