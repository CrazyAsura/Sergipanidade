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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="relative h-[560px] md:h-[750px] rounded-[3rem] overflow-hidden shadow-2xl group border border-white/10">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          className="absolute inset-0"
        >
          <img src={carouselItems[index].image} className="w-full h-full object-cover" alt={carouselItems[index].title} />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent opacity-80" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-24 z-10">
        <motion.div 
          key={index}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.span 
            variants={itemVariants}
            className="inline-block px-5 py-1.5 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary-foreground text-[10px] font-black tracking-widest mb-6 uppercase shadow-lg"
          >
            {carouselItems[index].subtitle}
          </motion.span>
          <motion.h2 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-9xl font-black text-white leading-[0.9] mb-4 md:mb-8 drop-shadow-2xl uppercase italic tracking-tighter"
          >
            {carouselItems[index].title}
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-gray-200 text-base sm:text-lg md:text-2xl font-medium mb-10 md:mb-14 max-w-2xl leading-relaxed opacity-80"
          >
            {carouselItems[index].description}
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
             <Button 
                onClick={() => router.push('/locations')}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-black px-12 h-16 md:h-20 rounded-2xl shadow-2xl transition-all hover:scale-105 active:scale-95 text-sm md:text-base border border-white/20"
             >
                COMEÇAR EXPLORAÇÃO <ChevronRight size={20} className="ml-2" />
             </Button>
             <div className="flex gap-3 items-center bg-white/5 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                {carouselItems.map((_, i) => (
                  <div 
                    key={i} 
                    onClick={() => setIndex(i)}
                    className={`h-1.5 transition-all duration-500 cursor-pointer rounded-full ${index === i ? 'w-10 bg-primary' : 'w-2 bg-white/20 hover:bg-white/40'}`} 
                  />
                ))}
             </div>
          </motion.div>
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
  
  const scrollVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="py-32 space-y-40">
      {/* About the Site */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={scrollVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center"
      >
        <div className="space-y-10">
          <div className="space-y-4">
              <p className="text-primary font-black text-[10px] tracking-[0.4em] uppercase">Mergulhe na Cultura</p>
              <h2 className="text-5xl md:text-7xl font-black text-foreground leading-[0.95] tracking-tighter uppercase italic">
                Sua porta de entrada para a <span className="text-gradient">essência</span> de Sergipe.
              </h2>
           </div>
           <p className="text-xl text-muted-foreground font-medium leading-relaxed max-w-xl">
             O Sergipanidade nasceu com o propósito de conectar viajantes e apaixonados pela cultura sergipana com o que há de melhor no nosso estado.
           </p>
            <div className="grid grid-cols-2 gap-10">
              {[
                { icon: Globe, title: "Tudo em um lugar", desc: "Destinos, cultura e dicas práticas." },
                { icon: Compass, title: "Guia Inteligente", desc: "Nossa IA te ajuda a planejar tudo." },
                { icon: Users, title: "Comunidade Viva", desc: "Compartilhe suas experiências e fotos." },
                { icon: Heart, title: "Feito com Amor", desc: "Orgulho de ser sergipano." },
              ].map((item, i) => (
                <div key={i} className="space-y-4 group">
                   <div className="h-12 w-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 border border-primary/10">
                      <item.icon size={22} />
                   </div>
                   <div className="space-y-1">
                      <h4 className="font-bold text-foreground uppercase text-xs tracking-wider">{item.title}</h4>
                      <p className="text-xs text-muted-foreground font-medium leading-normal">{item.desc}</p>
                   </div>
                </div>
              ))}
           </div>
           <Button 
             onClick={() => router.push('/about')}
             className="bg-foreground text-background hover:bg-foreground/90 font-black px-10 h-16 rounded-2xl transition-all shadow-xl hover:-translate-y-1"
           >
              CONHEÇA NOSSA HISTÓRIA
           </Button>
        </div>
        <div className="relative">
           <div className="aspect-[4/5] rounded-[4rem] overflow-hidden rotate-2 shadow-2xl border border-white/10 group">
              <img src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
           </div>
           <motion.div 
             initial={{ opacity: 0, x: -50, rotate: -10 }}
             whileInView={{ opacity: 1, x: 0, rotate: -6 }}
             viewport={{ once: true }}
             className="absolute -bottom-16 -left-12 glass-card p-10 rounded-[3rem] shadow-2xl max-w-[320px] hidden md:block"
           >
              <div className="flex items-center gap-5 mb-6">
                 <div className="h-14 w-14 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground scale-110 shadow-2xl shadow-primary/40">
                    <Sparkles size={28} />
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] leading-none mb-2">Recomendação</p>
                    <p className="font-black text-foreground uppercase italic leading-none text-lg">IA Guide</p>
                 </div>
              </div>
              <p className="text-base font-bold text-muted-foreground italic leading-relaxed">"Descobri lugares que nem imaginava que existiam no meu estado!"</p>
           </motion.div>
        </div>
      </motion.div>

      {/* Why use us? */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={scrollVariants}
        className="bg-accent rounded-[4rem] p-16 md:p-32 text-accent-foreground relative overflow-hidden shadow-2xl border border-white/10"
      >
         <div className="absolute -right-32 -top-32 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px]" />
         <div className="absolute -left-32 -bottom-32 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px]" />
         
         <div className="relative z-10 max-w-5xl mx-auto text-center space-y-20">
            <h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.85]">
              A maior plataforma de turismo de Sergipe.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
               <div className="space-y-2">
                  <h3 className="text-7xl font-black tracking-tighter text-white">50+</h3>
                  <p className="font-black opacity-60 uppercase tracking-[0.3em] text-[10px]">Destinos Unicos</p>
               </div>
               <div className="space-y-2">
                  <h3 className="text-7xl font-black tracking-tighter text-white">10k</h3>
                  <p className="font-black opacity-60 uppercase tracking-[0.3em] text-[10px]">Usuários Ativos</p>
               </div>
               <div className="space-y-2">
                  <h3 className="text-7xl font-black tracking-tighter text-white">24h</h3>
                  <p className="font-black opacity-60 uppercase tracking-[0.3em] text-[10px]">Suporte Realtime</p>
               </div>
            </div>
            <Button 
               onClick={() => router.push('/auth/register')}
               className="bg-white text-accent hover:bg-white/90 font-black px-16 h-20 rounded-3xl shadow-2xl transition-all hover:scale-110 active:scale-95 text-lg"
            >
               CRIAR CONTA GRÁTIS
            </Button>
         </div>
      </motion.section>
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
                { icon: Bot, title: "Inteligência Artificial", desc: "Um guia que te conhece e te entende.", path: '/guide' },
                { icon: MapIcon, title: "Mapa Interativo", desc: "Localize tudo ao seu redor facilmente.", path: '/map' },
                { icon: ShieldCheck, title: "Segurança & Dicas", desc: "Informações verificadas por especialistas.", path: '/faq' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start" onClick={() => router.push(item.path)}>
                   <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0 transition-transform active:scale-90 cursor-pointer">
                      <item.icon size={22} />
                   </div>
                   <div className="pt-1 cursor-pointer">
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
