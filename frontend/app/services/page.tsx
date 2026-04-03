'use client';

import { useIsMobile } from '@/hooks/useIsMobile';
import { motion } from 'framer-motion';
import { Bot, Map, Share2, Navigation, ArrowRight, Compass } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Box, Typography, Paper, Grid, Button as MuiButton } from '@mui/material';

const servicos = [
  { icon: Bot, title: 'Guia IA Inteligente', desc: 'Assistente pessoal 24h para tirar dúvidas sobre Sergipe.', color: 'text-orange-500', bg: 'bg-orange-50' },
  { icon: Map, title: 'Roteiros de Base', desc: 'Roteiros prontos para fim de semana ou férias.', color: 'text-blue-500', bg: 'bg-blue-50' },
  { icon: Share2, title: 'Rede Social', desc: 'Conecte-se com outros viajantes.', color: 'text-green-500', bg: 'bg-green-50' },
  { icon: Navigation, title: 'Geolocalização', desc: 'Mapa integrado com melhores pontos.', color: 'text-purple-500', bg: 'bg-purple-50' },
];

function WebServicos() {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="text-center max-w-2xl mx-auto"><h1 className="text-5xl font-black tracking-tight text-gray-900 mb-3">Nossos <span className="text-orange-500">Serviços</span></h1><p className="text-xl text-gray-400">Tudo para tornar sua viagem inesquecível.</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {servicos.map((s, i) => { const Icon = s.icon; return (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="h-full border-gray-100 hover:shadow-xl transition-shadow p-2"><CardHeader className="flex flex-row items-center gap-4 space-y-0"><div className={`p-4 rounded-2xl ${s.bg}`}><Icon className={`h-7 w-7 ${s.color}`} /></div><div><CardTitle className="text-lg">{s.title}</CardTitle><p className="text-sm text-gray-400 mt-1">{s.desc}</p></div></CardHeader><CardContent><Button variant="ghost" className="font-bold text-orange-500 hover:text-orange-600 p-0 h-auto">Saiba mais <ArrowRight className="ml-1 h-4 w-4" /></Button></CardContent></Card>
          </motion.div>
        ); })}
      </div>
      <Card className="bg-slate-900 border-none text-white p-10 rounded-3xl relative overflow-hidden">
        <Compass className="absolute -bottom-10 -right-10 h-48 w-48 opacity-5" />
        <div className="relative z-10"><h2 className="text-3xl font-black mb-2">Roteiros Personalizados?</h2><p className="text-slate-300 mb-6 max-w-lg">Solicite um guia exclusivo para Sergipe.</p><Button className="bg-white text-slate-900 font-bold hover:bg-gray-100 rounded-full px-8">SOLICITAR AGORA</Button></div>
      </Card>
    </div>
  );
}

function MobileServicos() {
  return (
    <Box sx={{ py: 2 }}>
      <Typography sx={{ color: '#E67E22', fontSize: '1.5rem', fontWeight: 800, mb: 0.5 }}>Nossos Serviços</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>Tudo para sua viagem.</Typography>
      <Grid container spacing={2}>
        {servicos.map((s, i) => { const Icon = s.icon; return (
          <Grid key={i} size={{ xs: 12 }}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #eee' }}>
              <Box sx={{ mb: 2, p: 1.5, bgcolor: '#f8f9fa', borderRadius: 3, width: 'fit-content' }}><Icon size={24} color="#E67E22" /></Box>
              <Typography sx={{ fontWeight: 800, mb: 0.5 }}>{s.title}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{s.desc}</Typography>
              <MuiButton size="small" sx={{ fontWeight: 800, color: '#E67E22', p: 0 }}>Saiba mais →</MuiButton>
            </Paper>
          </Grid>
        ); })}
      </Grid>
      <Paper elevation={0} sx={{ mt: 3, p: 3, borderRadius: 4, bgcolor: '#2C3E50', color: 'white', position: 'relative', overflow: 'hidden' }}>
        <Typography sx={{ fontWeight: 800, mb: 0.5 }}>Roteiros Personalizados?</Typography>
        <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>Solicite um guia exclusivo.</Typography>
        <MuiButton variant="contained" sx={{ bgcolor: 'white', color: '#2C3E50', fontWeight: 800, '&:hover': { bgcolor: '#f0f0f0' } }}>SOLICITAR</MuiButton>
      </Paper>
    </Box>
  );
}

export default function ServicosPage() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileServicos /> : <WebServicos />;
}
