'use client';

import { useIsMobile } from '@/hooks/useIsMobile';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Map, Heart, Users, Compass, Globe, ShieldCheck, Bot, Star, ArrowRight, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Box, Typography, Paper, Stack, Divider, Button as MuiButton } from '@mui/material';

const pillars = [
  { icon: Map, title: 'Exploração Guiada', desc: 'Mapeamos os melhores destinos de Sergipe — praias, cânions, cidades históricas e gastronomia de primeira.', color: 'text-primary', bg: 'bg-primary/10' },
  { icon: Heart, title: 'Cultura & Tradição', desc: 'Valorizamos o artesanato local, o folclore sergipano, o forró e as tradições que nos fazem únicos.', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-950/30' },
  { icon: Users, title: 'Comunidade Ativa', desc: 'Um espaço para viajantes compartilharem experiências, dicas e criarem memórias juntos.', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/30' },
  { icon: Bot, title: 'Inteligência Artificial', desc: 'Nosso guia virtual com IA responde suas dúvidas sobre Sergipe 24 horas por dia, 7 dias por semana.', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-950/30' },
];

const stats = [
  { value: '50+', label: 'Destinos Mapeados' },
  { value: '10k', label: 'Usuários Mensais' },
  { value: '24/7', label: 'Suporte IA Ativo' },
  { value: '4.9', label: 'Avaliação Média' },
];

const team = [
  { name: 'Turismo Sergipano', role: 'Orgulho local', avatar: '🌴' },
  { name: 'Tecnologia & IA', role: 'Inovação constante', avatar: '🤖' },
  { name: 'Comunidade', role: 'Feito por pessoas', avatar: '❤️' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function WebSobre() {
  const router = useRouter();
  return (
    <div className="space-y-32">
      {/* Hero */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="relative rounded-[4rem] overflow-hidden bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-20 md:p-28 text-white border border-white/10"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        </div>
        <div className="absolute -right-40 -bottom-40 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute -left-20 -top-20 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[100px]" />
        
        <div className="relative z-10 max-w-3xl">
          <motion.span variants={fadeUp} className="inline-block px-5 py-2 bg-primary/20 backdrop-blur-md border border-primary/30 text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-10">
            Sobre a Plataforma
          </motion.span>
          <motion.h1 variants={fadeUp} className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter uppercase italic mb-10">
            Descobrindo a <span className="text-gradient">alma</span> do menor estado do Brasil.
          </motion.h1>
          <motion.p variants={fadeUp} className="text-xl text-slate-300 font-medium leading-relaxed max-w-2xl mb-12">
            O Sergipanidade nasceu da paixão por Sergipe e do desejo de conectar viajantes às riquezas culturais, gastronômicas e naturais deste estado incrível.
          </motion.p>
          <motion.div variants={fadeUp} className="flex gap-4">
            <Button onClick={() => router.push('/auth/register')} className="bg-primary hover:bg-primary/90 text-white font-black h-16 px-12 rounded-2xl shadow-2xl shadow-primary/30 border border-white/10 hover:scale-105 transition-all">
              JUNTE-SE A NÓS <ArrowRight size={18} className="ml-2" />
            </Button>
            <Button onClick={() => router.push('/contact')} variant="outline" className="border-white/20 text-slate-300 hover:bg-white/10 font-black h-16 px-10 rounded-2xl backdrop-blur-md">
              FALE CONOSCO
            </Button>
          </motion.div>
        </div>
        <Compass size={350} className="absolute -bottom-24 -right-24 text-white/[0.03]" />
      </motion.section>

      {/* Stats */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="grid grid-cols-2 md:grid-cols-4 gap-8"
      >
        {stats.map((s, i) => (
          <motion.div key={i} variants={fadeUp}>
            <div className="text-center space-y-3 p-10 rounded-[2.5rem] glass-card hover:shadow-2xl transition-all duration-500 group hover:-translate-y-1">
              <p className="text-6xl font-black text-primary tracking-tighter group-hover:scale-110 transition-transform">{s.value}</p>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">{s.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.section>

      {/* Pillars */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="space-y-16"
      >
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Nossos Pilares</span>
          <h2 className="text-5xl md:text-7xl font-black text-foreground tracking-tighter uppercase italic leading-[0.9]">O que nos move todos os dias.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -8 }}>
                <Card className="h-full border-white/10 dark:border-white/5 hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] p-3 glass-card group">
                  <CardHeader className="flex flex-row items-start gap-6 space-y-0 pb-2">
                    <div className={`p-5 rounded-2xl ${p.bg} shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-8 w-8 ${p.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-black uppercase italic tracking-tight">{p.title}</CardTitle>
                      <p className="text-sm text-muted-foreground font-medium mt-3 leading-relaxed">{p.desc}</p>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Mission Card */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="bg-primary rounded-[4rem] p-20 md:p-32 text-white relative overflow-hidden border border-white/10"
      >
        <div className="absolute -right-32 -top-32 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px]" />
        <div className="absolute -left-32 -bottom-32 w-[300px] h-[300px] bg-accent/20 rounded-full blur-[100px]" />
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-10">
          <Sparkles size={56} className="mx-auto opacity-40" />
          <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-[0.85]">"Sergipe é o país do forró, da renda irlandesa e do caranguejo."</h2>
          <p className="opacity-70 text-xl font-medium max-w-xl mx-auto leading-relaxed">Nossa missão é revelar ao mundo que o menor estado é, na verdade, gigante.</p>
          <Button onClick={() => router.push('/locations')} className="bg-white text-primary hover:bg-white/90 font-black h-20 px-16 rounded-3xl shadow-2xl text-lg hover:scale-105 transition-all">
            EXPLORAR DESTINOS
          </Button>
        </div>
      </motion.section>

      {/* Team */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="space-y-16 pb-16"
      >
        <div className="text-center space-y-4">
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Quem Somos</span>
          <h2 className="text-5xl font-black text-foreground tracking-tighter uppercase italic leading-none">Construído com amor sergipano.</h2>
        </div>
        <div className="grid grid-cols-3 gap-10 max-w-3xl mx-auto">
          {team.map((t, i) => (
            <motion.div key={i} variants={fadeUp} className="text-center space-y-5 group">
              <div className="text-7xl group-hover:scale-125 transition-transform duration-300">{t.avatar}</div>
              <div>
                <p className="font-black text-foreground uppercase text-sm">{t.name}</p>
                <p className="text-xs font-bold text-muted-foreground mt-1">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}

function MobileSobre() {
  const router = useRouter();
  return (
    <Box sx={{ py: 2, pb: 10 }}>
      <Typography sx={{ color: '#ED2100', fontWeight: 900, fontSize: '0.7rem', letterSpacing: 2, textTransform: 'uppercase', mb: 1 }}>Sobre Nós</Typography>
      <Typography variant="h4" sx={{ fontWeight: 950, mb: 2, letterSpacing: -1.5, lineHeight: 1.1 }}>
        A <span style={{ color: '#ED2100' }}>alma</span> de Sergipe em suas mãos.
      </Typography>

      <Paper elevation={0} sx={{ p: 3, borderRadius: 6, bgcolor: 'white', border: '1px solid #f0f0f0', mb: 4 }}>
        <Typography sx={{ lineHeight: 1.8, color: '#4A5568', fontWeight: 500 }}>
          O <strong style={{ color: '#ED2100' }}>Sergipanidade</strong> nasceu da paixão por Sergipe — conectando viajantes às riquezas culturais, gastronômicas e naturais do nosso estado.
        </Typography>
      </Paper>

      {/* Stats */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mb: 5 }}>
        {stats.map((s, i) => (
          <Paper key={i} elevation={0} sx={{ p: 3, borderRadius: 5, textAlign: 'center', bgcolor: 'white', border: '1px solid #f0f0f0' }}>
            <Typography sx={{ fontSize: '2rem', fontWeight: 950, color: '#ED2100', letterSpacing: -1 }}>{s.value}</Typography>
            <Typography sx={{ fontSize: '0.65rem', fontWeight: 900, color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: 1.5 }}>{s.label}</Typography>
          </Paper>
        ))}
      </Box>

      <Typography sx={{ fontWeight: 950, mb: 3, fontSize: '1.2rem' }}>Nossos Pilares</Typography>
      <Stack spacing={3} sx={{ mb: 5 }}>
        {pillars.map((p, i) => {
          const Icon = p.icon;
          return (
            <Box key={i} sx={{ display: 'flex', gap: 2.5, p: 3, bgcolor: 'white', borderRadius: 5, border: '1px solid #f0f0f0' }}>
              <Box sx={{ bgcolor: 'rgba(237, 33, 0, 0.1)', p: 1.5, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, height: 'fit-content' }}>
                <Icon size={24} color="#ED2100" />
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 900, fontSize: '0.95rem', mb: 0.5 }}>{p.title}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>{p.desc}</Typography>
              </Box>
            </Box>
          );
        })}
      </Stack>

      {/* CTA */}
      <Paper elevation={0} sx={{ p: 4, borderRadius: 6, bgcolor: '#ED2100', color: 'white', textAlign: 'center', mb: 4 }}>
        <Typography sx={{ fontWeight: 950, fontSize: '1.3rem', mb: 1 }}>Começar Exploração</Typography>
        <Typography sx={{ fontSize: '0.85rem', opacity: 0.85, mb: 3 }}>Junte-se à comunidade e descubra Sergipe.</Typography>
        <MuiButton onClick={() => router.push('/auth/register')} fullWidth sx={{ bgcolor: 'white', color: '#ED2100', fontWeight: 950, borderRadius: 4, py: 1.5, '&:hover': { bgcolor: '#f8f8f8' } }}>CRIAR MINHA CONTA</MuiButton>
      </Paper>

      <Divider sx={{ my: 4 }} />
      <Typography variant="body2" sx={{ textAlign: 'center', color: '#A0AEC0', fontStyle: 'italic', fontWeight: 600 }}>
        "Sergipe é o país do forró, da renda irlandesa e do caranguejo."
      </Typography>
    </Box>
  );
}

export default function SobrePage() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileSobre /> : <WebSobre />;
}
