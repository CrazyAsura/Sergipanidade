'use client';

import { useIsMobile } from '@/hooks/useIsMobile';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Bot, Map, Share2, Navigation, ArrowRight, Compass, Heart, Camera, ShieldCheck, Star, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Box, Typography, Paper, Stack, Button as MuiButton } from '@mui/material';

const servicos = [
  { icon: Bot, title: 'Guia IA Inteligente', desc: 'Assistente pessoal 24h para tirar dúvidas sobre qualquer canto de Sergipe. Responde em tempo real com inteligência artificial.', link: '/guide', cta: 'CONVERSAR COM IA', color: 'text-primary', bg: 'bg-primary/10', ring: 'ring-primary/20' },
  { icon: Map, title: 'Mapa Interativo', desc: 'Mapa integrado com geolocalização dos melhores pontos turísticos, restaurantes e hotéis de Sergipe.', link: '/map', cta: 'ABRIR MAPA', color: 'text-blue-500', bg: 'bg-blue-50', ring: 'ring-blue-100' },
  { icon: Heart, title: 'Favoritos & Roteiros', desc: 'Salve seus destinos favoritos e construa roteiros personalizados para suas férias ou fim de semana.', link: '/favorites', cta: 'VER MEUS FAVORITOS', color: 'text-red-500', bg: 'bg-red-50', ring: 'ring-red-100' },
  { icon: Share2, title: 'Fórum da Comunidade', desc: 'Conecte-se com outros viajantes, compartilhe fotos, dicas e experiências sobre o estado.', link: '/discussions', cta: 'ACESSAR FÓRUM', color: 'text-green-500', bg: 'bg-green-50', ring: 'ring-green-100' },
  { icon: Camera, title: 'Galeria de Fotos', desc: 'Explore a galeria visual dos destinos mais bonitos de Sergipe, enviados pela comunidade.', link: '/locations', cta: 'VER GALERIA', color: 'text-purple-500', bg: 'bg-purple-50', ring: 'ring-purple-100' },
  { icon: ShieldCheck, title: 'Dicas de Segurança', desc: 'Informações verificadas por especialistas sobre segurança, emergências e contatos úteis.', link: '/faq', cta: 'LER DICAS', color: 'text-amber-600', bg: 'bg-amber-50', ring: 'ring-amber-100' },
];

function WebServicos() {
  const router = useRouter();
  return (
    <div className="space-y-24 animate-in fade-in duration-700">
      {/* Hero */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full">Nossos Serviços</span>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 dark:text-white uppercase italic leading-none">
          Tudo para sua <span className="text-primary">viagem</span> ser inesquecível.
        </h1>
        <p className="text-xl text-gray-400 dark:text-slate-500 font-medium max-w-xl mx-auto">
          Ferramentas inteligentes, mapa ao vivo e uma comunidade vibrante para te acompanhar em cada passo.
        </p>
      </section>

      {/* Service Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicos.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} whileHover={{ y: -8 }}>
              <Card className={`h-full border-gray-100 dark:border-slate-800 hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] p-2 bg-white dark:bg-slate-900 group cursor-pointer ring-1 ${s.ring} dark:ring-slate-800`} onClick={() => router.push(s.link)}>
                <CardContent className="p-8 space-y-6">
                  <div className={`p-5 rounded-2xl ${s.bg} dark:bg-opacity-20 w-fit group-hover:scale-110 transition-transform`}>
                    <Icon className={`h-8 w-8 ${s.color}`} />
                  </div>
                  <div className="space-y-3">
                    <CardTitle className="text-xl font-black uppercase italic tracking-tight">{s.title}</CardTitle>
                    <p className="text-sm text-gray-500 dark:text-slate-400 font-medium leading-relaxed">{s.desc}</p>
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
      </section>

      {/* CTA */}
      <section className="bg-linear-to-br from-slate-900 to-slate-800 rounded-[3rem] p-16 md:p-24 text-white relative overflow-hidden">
        <Compass size={400} className="absolute -bottom-40 -right-40 opacity-5" />
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <span className="inline-block px-4 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full">Premium</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-none">Roteiros Personalizados com IA.</h2>
            <p className="text-slate-400 text-lg font-medium leading-relaxed">Nosso assistente virtual cria roteiros sob medida baseados nos seus interesses, tempo de viagem e estilo de aventura.</p>
            <Button onClick={() => router.push('/guide')} className="bg-primary hover:bg-primary/90 text-white font-black h-16 px-10 rounded-2xl shadow-xl text-base">
               FALAR COM O GUIA IA <Sparkles size={18} className="ml-2" />
            </Button>
          </div>
          <div className="space-y-6">
            {['Roteiros de fim de semana', 'Viagens em família', 'Aventura no sertão', 'Gastronomia sergipana'].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center text-white shrink-0">
                  <Star size={18} />
                </div>
                <span className="font-black text-sm uppercase tracking-wide">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
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
