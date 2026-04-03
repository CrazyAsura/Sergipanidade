'use client';

import { useIsMobile } from '@/hooks/useIsMobile';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Map, Heart, Users, Compass, Globe, ShieldCheck, Bot, Star, ArrowRight, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Box, Typography, Paper, Stack, Divider, Button as MuiButton } from '@mui/material';

const pillars = [
  { icon: Map, title: 'Exploração Guiada', desc: 'Mapeamos os melhores destinos de Sergipe — praias, cânions, cidades históricas e gastronomia de primeira.', color: 'text-orange-500', bg: 'bg-orange-50' },
  { icon: Heart, title: 'Cultura & Tradição', desc: 'Valorizamos o artesanato local, o folclore sergipano, o forró e as tradições que nos fazem únicos.', color: 'text-red-500', bg: 'bg-red-50' },
  { icon: Users, title: 'Comunidade Ativa', desc: 'Um espaço para viajantes compartilharem experiências, dicas e criarem memórias juntos.', color: 'text-blue-500', bg: 'bg-blue-50' },
  { icon: Bot, title: 'Inteligência Artificial', desc: 'Nosso guia virtual com IA responde suas dúvidas sobre Sergipe 24 horas por dia, 7 dias por semana.', color: 'text-purple-500', bg: 'bg-purple-50' },
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

function WebSobre() {
  const router = useRouter();
  return (
    <div className="space-y-24 animate-in fade-in duration-700">
      {/* Hero */}
      <section className="relative rounded-[3rem] overflow-hidden bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-16 md:p-24 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        </div>
        <div className="relative z-10 max-w-3xl">
          <span className="inline-block px-4 py-1.5 bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-8">Sobre a Plataforma</span>
          <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter uppercase italic mb-8">
            Descobrindo a <span className="text-orange-400">alma</span> do menor estado do Brasil.
          </h1>
          <p className="text-xl text-slate-300 font-medium leading-relaxed max-w-2xl mb-10">
            O Sergipanidade nasceu da paixão por Sergipe e do desejo de conectar viajantes às riquezas culturais, gastronômicas e naturais deste estado incrível. Somos muito mais que um guia — somos uma comunidade.
          </p>
          <div className="flex gap-4">
            <Button onClick={() => router.push('/auth/register')} className="bg-orange-600 hover:bg-orange-700 text-white font-black h-14 px-10 rounded-2xl shadow-xl">
              JUNTE-SE A NÓS <ArrowRight size={18} className="ml-2" />
            </Button>
            <Button onClick={() => router.push('/contact')} variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 font-black h-14 px-8 rounded-2xl">
              FALE CONOSCO
            </Button>
          </div>
        </div>
        <Compass size={300} className="absolute -bottom-20 -right-20 text-white/5" />
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <div className="text-center space-y-2 p-8 rounded-[2rem] bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 hover:shadow-xl transition-shadow">
              <p className="text-5xl font-black text-orange-500 tracking-tighter">{s.value}</p>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{s.label}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Pillars */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Nossos Pilares</span>
          <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter uppercase italic">O que nos move todos os dias.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} whileHover={{ y: -6 }}>
                <Card className="h-full border-gray-100 dark:border-slate-800 hover:shadow-2xl transition-all duration-500 rounded-[2rem] p-2 bg-white dark:bg-slate-900">
                  <CardHeader className="flex flex-row items-start gap-5 space-y-0 pb-2">
                    <div className={`p-4 rounded-2xl ${p.bg} dark:bg-opacity-20 shrink-0`}>
                      <Icon className={`h-7 w-7 ${p.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-black uppercase italic tracking-tight">{p.title}</CardTitle>
                      <p className="text-sm text-gray-500 dark:text-slate-400 font-medium mt-2 leading-relaxed">{p.desc}</p>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Mission Card */}
      <section className="bg-orange-600 rounded-[3rem] p-16 md:p-24 text-white relative overflow-hidden">
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
          <Sparkles size={48} className="mx-auto text-orange-200" />
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">"Sergipe é o país do forró, da renda irlandesa e do caranguejo."</h2>
          <p className="text-orange-200 text-lg font-medium max-w-xl mx-auto">Nossa missão é revelar ao mundo que o menor estado é, na verdade, gigante quando o assunto é cultura, natureza e calor humano.</p>
          <Button onClick={() => router.push('/locations')} className="bg-white text-orange-600 hover:bg-orange-50 font-black h-16 px-12 rounded-2xl shadow-2xl text-lg">
            EXPLORAR DESTINOS
          </Button>
        </div>
      </section>

      {/* Team */}
      <section className="space-y-12 pb-12">
        <div className="text-center space-y-4">
          <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Quem Somos</span>
          <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter uppercase italic">Construído com amor sergipano.</h2>
        </div>
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          {team.map((t, i) => (
            <div key={i} className="text-center space-y-4">
              <div className="text-6xl">{t.avatar}</div>
              <div>
                <p className="font-black text-gray-900 dark:text-white uppercase text-sm">{t.name}</p>
                <p className="text-xs font-bold text-gray-400">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function MobileSobre() {
  const router = useRouter();
  return (
    <Box sx={{ py: 2, pb: 10 }}>
      <Typography sx={{ color: '#E67E22', fontWeight: 900, fontSize: '0.7rem', letterSpacing: 2, textTransform: 'uppercase', mb: 1 }}>Sobre Nós</Typography>
      <Typography variant="h4" sx={{ fontWeight: 950, mb: 2, letterSpacing: -1.5, lineHeight: 1.1 }}>
        A <span style={{ color: '#E67E22' }}>alma</span> de Sergipe em suas mãos.
      </Typography>

      <Paper elevation={0} sx={{ p: 3, borderRadius: 6, bgcolor: 'white', border: '1px solid #f0f0f0', mb: 4 }}>
        <Typography sx={{ lineHeight: 1.8, color: '#4A5568', fontWeight: 500 }}>
          O <strong style={{ color: '#E67E22' }}>Sergipanidade</strong> nasceu da paixão por Sergipe — conectando viajantes às riquezas culturais, gastronômicas e naturais do nosso estado.
        </Typography>
      </Paper>

      {/* Stats */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mb: 5 }}>
        {stats.map((s, i) => (
          <Paper key={i} elevation={0} sx={{ p: 3, borderRadius: 5, textAlign: 'center', bgcolor: 'white', border: '1px solid #f0f0f0' }}>
            <Typography sx={{ fontSize: '2rem', fontWeight: 950, color: '#E67E22', letterSpacing: -1 }}>{s.value}</Typography>
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
              <Box sx={{ bgcolor: '#FFF5EB', p: 1.5, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, height: 'fit-content' }}>
                <Icon size={24} color="#E67E22" />
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
      <Paper elevation={0} sx={{ p: 4, borderRadius: 6, bgcolor: '#E67E22', color: 'white', textAlign: 'center', mb: 4 }}>
        <Typography sx={{ fontWeight: 950, fontSize: '1.3rem', mb: 1 }}>Começar Exploração</Typography>
        <Typography sx={{ fontSize: '0.85rem', opacity: 0.85, mb: 3 }}>Junte-se à comunidade e descubra Sergipe.</Typography>
        <MuiButton onClick={() => router.push('/auth/register')} fullWidth sx={{ bgcolor: 'white', color: '#E67E22', fontWeight: 950, borderRadius: 4, py: 1.5 }}>CRIAR MINHA CONTA</MuiButton>
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
