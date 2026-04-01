'use client';

import { useIsMobile } from '@/hooks/useIsMobile';
import { motion } from 'framer-motion';
import { Map, Heart, Users, Compass } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Box, Typography, Paper, Stack, Divider } from '@mui/material';

const pillars = [
  { icon: Map, title: 'Exploração', desc: 'Mapeamos os melhores destinos, desde o litoral até o sertão.', color: 'text-orange-500' },
  { icon: Heart, title: 'Cultura', desc: 'Valorizamos o artesanato, o folclore e as tradições locais.', color: 'text-red-500' },
  { icon: Users, title: 'Comunidade', desc: 'Um espaço para trocar experiências e dicas reais.', color: 'text-blue-500' },
];

function WebSobre() {
  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="text-center max-w-2xl mx-auto"><h1 className="text-5xl font-black tracking-tight text-gray-900 mb-4">Sobre a <span className="text-orange-500">Sergipanidade</span></h1><p className="text-xl text-gray-400">Descobrindo o menor estado com o maior coração do Brasil.</p></div>
      <Card className="border-none shadow-xl bg-gradient-to-r from-orange-50 to-amber-50 max-w-3xl mx-auto"><CardContent className="p-8"><p className="text-lg leading-relaxed text-gray-700">O projeto <span className="font-bold text-orange-600">Sergipanidade</span> nasceu da paixão por Sergipe e do desejo de conectar viajantes às riquezas culturais, gastronômicas e naturais do nosso estado. Somos muito mais que um guia; somos uma comunidade que celebra a identidade do povo sergipano.</p></CardContent></Card>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {pillars.map((p, i) => { const Icon = p.icon; return (
          <motion.div key={i} whileHover={{ scale: 1.04 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Card className="h-full border-gray-100 hover:shadow-xl transition-shadow"><CardHeader className="flex flex-row items-center gap-3 space-y-0"><div className="p-3 bg-gray-50 rounded-xl"><Icon className={`h-6 w-6 ${p.color}`} /></div><CardTitle className="text-lg">{p.title}</CardTitle></CardHeader><CardContent><p className="text-gray-500">{p.desc}</p></CardContent></Card>
          </motion.div>
        ); })}
      </div>
      <Alert className="max-w-3xl mx-auto bg-slate-900 border-none text-white p-8 rounded-3xl relative overflow-hidden"><Compass className="absolute -bottom-6 -right-6 h-40 w-40 opacity-5" /><AlertTitle className="text-xl font-black mb-2">Roteiros Personalizados</AlertTitle><AlertDescription className="text-slate-300 text-base">Entre em contato e solicite um guia exclusivo para Sergipe.</AlertDescription></Alert>
      <Separator className="max-w-xl mx-auto" />
      <p className="text-center text-gray-400 italic text-lg">&quot;Sergipe é o país do forró, da renda irlandesa e do caranguejo.&quot;</p>
    </div>
  );
}

function MobileSobre() {
  return (
    <Box sx={{ py: 2 }}>
      <Typography sx={{ color: '#E67E22', fontSize: '1.5rem', fontWeight: 800, mb: 0.5 }}>Sobre a Sergipanidade</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>Descobrindo o menor estado com o maior coração.</Typography>
      <Paper elevation={0} sx={{ p: 3, borderRadius: 4, bgcolor: 'white', border: '1px solid #eee', mb: 3 }}>
        <Typography sx={{ lineHeight: 1.7, color: '#2C3E50' }}>O projeto <strong>Sergipanidade</strong> nasceu da paixão por Sergipe e do desejo de conectar viajantes às riquezas culturais, gastronômicas e naturais.</Typography>
      </Paper>
      <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, mb: 2 }}>Nossos Pilares</Typography>
      <Stack spacing={2}>
        {pillars.map((p, i) => { const Icon = p.icon; return (
          <Box key={i} sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ bgcolor: '#FFF5EB', p: 1.5, borderRadius: 3, display: 'flex' }}><Icon size={20} color="#E67E22" /></Box>
            <Box><Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>{p.title}</Typography><Typography variant="body2" color="text.secondary">{p.desc}</Typography></Box>
          </Box>
        ); })}
      </Stack>
      <Divider sx={{ my: 5 }} />
      <Typography variant="body2" sx={{ textAlign: 'center', color: '#999', fontStyle: 'italic' }}>&quot;Sergipe é o país do forró, da renda irlandesa e do caranguejo.&quot;</Typography>
    </Box>
  );
}

export default function SobrePage() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileSobre /> : <WebSobre />;
}
