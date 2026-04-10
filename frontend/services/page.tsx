'use client';

import { useIsMobile } from '@/hooks/useIsMobile';
import { useRouter } from 'next/navigation';
import { motion, Variants } from 'framer-motion';
import { Bot, Map, Share2, Navigation, ArrowRight, Compass, Heart, Camera, ShieldCheck, Star, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Box, Typography, Paper, Stack, Button as MuiButton } from '@mui/material';

const servicos = [
  { icon: Bot, title: 'Guia IA Inteligente', desc: 'Assistente pessoal 24h para tirar dúvidas sobre qualquer canto de Sergipe. Responde em tempo real com inteligência artificial.', link: '/guide', cta: 'CONVERSAR COM IA', color: 'text-primary', bg: 'bg-primary/10', ring: 'ring-primary/20' },
  { icon: Map, title: 'Mapa Interativo', desc: 'Mapa integrado com geolocalização dos melhores pontos turísticos, restaurantes e hotéis de Sergipe.', link: '/map', cta: 'ABRIR MAPA', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/30', ring: 'ring-blue-100 dark:ring-blue-900/30' },
  { icon: Heart, title: 'Favoritos & Roteiros', desc: 'Salve seus destinos favoritos e construa roteiros personalizados para suas férias ou fim de semana.', link: '/favorites', cta: 'VER MEUS FAVORITOS', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-950/30', ring: 'ring-red-100 dark:ring-red-900/30' },
  { icon: Share2, title: 'Fórum da Comunidade', desc: 'Conecte-se com outros viajantes, compartilhe fotos, dicas e experiências sobre o estado.', link: '/discussions', cta: 'ACESSAR FÓRUM', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-950/30', ring: 'ring-green-100 dark:ring-green-900/30' },
  { icon: Camera, title: 'Galeria de Fotos', desc: 'Explore a galeria visual dos destinos mais bonitos de Sergipe, enviados pela comunidade.', link: '/locations', cta: 'VER GALERIA', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-950/30', ring: 'ring-purple-100 dark:ring-purple-900/30' },
  { icon: ShieldCheck, title: 'Dicas de Segurança', desc: 'Informações verificadas por especialistas sobre segurança, emergências e contatos úteis.', link: '/faq', cta: 'LER DICAS', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-950/30', ring: 'ring-amber-100 dark:ring-amber-900/30' },
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
      staggerChildren: 0.08 
    } 
  },
};

function WebServicos() {
  const router = useRouter();
  return (
    <div className="space-y-32">
      {/* Hero */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="text-center max-w-4xl mx-auto space-y-8"
      >
        <motion.span variants={fadeUp} className="inline-block px-5 py-2 bg-primary/10 backdrop-blur-md border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.4em] rounded-full">
          Nossos Serviços
        </motion.span>
        <motion.h1 variants={fadeUp} className="text-5xl md:text-8xl font-black tracking-tighter text-foreground uppercase italic leading-[0.85]">
          Tudo para sua <span className="text-gradient">viagem</span> ser inesquecível.
        </motion.h1>
        <motion.p variants={fadeUp} className="text-xl text-muted-foreground font-medium max-w-xl mx-auto leading-relaxed">
          Ferramentas inteligentes, mapa ao vivo e uma comunidade vibrante para te acompanhar em cada passo.
        </motion.p>
      </motion.section>

      {/* Service Grid */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
      >
        {servicos.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={i} variants={fadeUp} whileHover={{ y: -10, scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
              <Card className={`h-full border-white/10 dark:border-white/5 hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] p-2 glass-card group cursor-pointer`} onClick={() => router.push(s.link)}>
                <CardContent className="p-10 space-y-8">
                  <div className={`p-6 rounded-2xl ${s.bg} w-fit group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-9 w-9 ${s.color}`} />
                  </div>
                  <div className="space-y-4">
                    <CardTitle className="text-xl font-black uppercase italic tracking-tight">{s.title}</CardTitle>
                    <p className="text-sm text-muted-foreground font-medium leading-relaxed">{s.desc}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    className={`font-black ${s.color} p-0 h-auto gap-2 group-hover:gap-4 transition-all text-xs uppercase tracking-widest`}
                    onClick={(e) => { e.stopPropagation(); router.push(s.link); }}
                  >
                    {s.cta} <ArrowRight size={14} />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.section>

      {/* CTA */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="bg-linear-to-br from-slate-900 to-slate-800 rounded-[4rem] p-20 md:p-28 text-white relative overflow-hidden border border-white/10"
      >
        <Compass size={450} className="absolute -bottom-48 -right-48 opacity-[0.03]" />
        <div className="absolute -left-32 -top-32 w-[400px] h-[400px] bg-primary/15 rounded-full blur-[120px]" />
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <span className="inline-block px-5 py-2 bg-primary/20 backdrop-blur-md border border-primary/30 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Premium</span>
            <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-[0.85]">Roteiros Personalizados com IA.</h2>
            <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-md">Nosso assistente virtual cria roteiros sob medida baseados nos seus interesses e estilo de aventura.</p>
            <Button onClick={() => router.push('/guide')} className="bg-primary hover:bg-primary/90 text-white font-black h-18 px-12 rounded-2xl shadow-2xl shadow-primary/30 text-base border border-white/10 hover:scale-105 transition-all">
               FALAR COM O GUIA IA <Sparkles size={18} className="ml-2" />
            </Button>
          </div>
          <div className="space-y-6">
            {['Roteiros de fim de semana', 'Viagens em família', 'Aventura no sertão', 'Gastronomia sergipana'].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-5 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all group"
              >
                <div className="h-12 w-12 bg-primary rounded-xl flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                  <Star size={20} />
                </div>
                <span className="font-black text-base uppercase tracking-wide">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}

function MobileServicos() {
  const router = useRouter();
  return (
    <Box sx={{ py: 2, pb: 10 }}>
      <Typography sx={{ color: '#ED2100', fontWeight: 900, fontSize: '0.7rem', letterSpacing: 2, textTransform: 'uppercase', mb: 1 }}>Serviços</Typography>
      <Typography variant="h4" sx={{ fontWeight: 950, letterSpacing: -1.5, lineHeight: 1.1, mb: 1 }}>
        Tudo para sua <span style={{ color: '#ED2100' }}>viagem.</span>
      </Typography>
      <Typography sx={{ color: 'text.secondary', fontWeight: 600, fontSize: '0.85rem', mb: 4 }}>Ferramentas inteligentes ao seu alcance.</Typography>

      <Stack spacing={3} sx={{ mb: 5 }}>
        {servicos.map((s, i) => {
          const Icon = s.icon;
          return (
            <Paper key={i} elevation={0} onClick={() => router.push(s.link)} sx={{ p: 3, borderRadius: 6, border: '1px solid #f0f0f0', bgcolor: 'white', cursor: 'pointer', '&:active': { transform: 'scale(0.98)' }, transition: 'all 0.2s' }}>
              <Box sx={{ display: 'flex', gap: 2.5 }}>
                <Box sx={{ bgcolor: 'rgba(237, 33, 0, 0.1)', p: 1.5, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, height: 'fit-content' }}>
                  <Icon size={24} color="#ED2100" />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontWeight: 950, fontSize: '0.95rem', mb: 0.5 }}>{s.title}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, mb: 1.5 }}>{s.desc}</Typography>
                  <Typography sx={{ color: '#ED2100', fontWeight: 900, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {s.cta} <ArrowRight size={12} />
                  </Typography>
                </Box>
              </Box>
            </Paper>
          );
        })}
      </Stack>

      <Paper elevation={0} sx={{ p: 4, borderRadius: 6, bgcolor: '#1A202C', color: 'white', textAlign: 'center' }}>
        <Typography sx={{ fontWeight: 950, fontSize: '1.2rem', mb: 1 }}>Roteiros com IA</Typography>
        <Typography sx={{ fontSize: '0.8rem', opacity: 0.7, mb: 3 }}>Crie roteiros personalizados gratuitamente.</Typography>
        <MuiButton onClick={() => router.push('/guide')} fullWidth sx={{ bgcolor: '#ED2100', color: 'white', fontWeight: 950, borderRadius: 4, py: 1.5, '&:hover': { bgcolor: '#C41B00' } }}>
          FALAR COM IA
        </MuiButton>
      </Paper>
    </Box>
  );
}

export default function ServicosPage() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileServicos /> : <WebServicos />;
}
