'use client';

import { useIsMobile } from '@/hooks/useIsMobile';
import { Mail, Phone, Clock, Sparkles, Send, Globe, Share2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Box, Typography, Paper, Stack, TextField, Button as MuiButton, IconButton, Grid, Divider } from '@mui/material';

const contacts = [
  { icon: Mail, title: 'E-mail', value: 'contato@sergipanidade.com.br', bg: 'bg-orange-50', color: 'text-orange-500' },
  { icon: Phone, title: 'Telefone', value: '(79) 99999-9999', bg: 'bg-blue-50', color: 'text-blue-500' },
  { icon: Clock, title: 'Horário', value: 'Seg - Sex: 08:00 - 18:00', bg: 'bg-green-50', color: 'text-green-500' },
];

function WebContato() {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div><h1 className="text-5xl font-black tracking-tight text-gray-900 mb-3">Fale <span className="text-orange-500">Conosco</span></h1><p className="text-xl text-gray-400">Dúvida ou sugestão? Estamos prontos.</p></div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-2 space-y-6">
          {contacts.map((c, i) => { const Icon = c.icon; return (
            <div key={i} className="flex items-start gap-4"><div className={`p-3 rounded-xl ${c.bg} shrink-0`}><Icon className={`h-5 w-5 ${c.color}`} /></div><div><h3 className="font-bold text-gray-900">{c.title}</h3><p className="text-sm text-gray-400">{c.value}</p></div></div>
          ); })}
          <Separator />
          <div><h4 className="font-bold text-sm text-gray-700 mb-3">Redes Sociais</h4><div className="flex gap-2"><Button variant="outline" size="icon" className="rounded-full h-10 w-10"><Globe className="h-4 w-4" /></Button><Button variant="outline" size="icon" className="rounded-full h-10 w-10"><Share2 className="h-4 w-4" /></Button></div></div>
        </div>
        <Card className="md:col-span-3 border-gray-100 shadow-xl">
          <CardHeader><CardTitle className="text-2xl flex items-center gap-2">Mande uma mensagem <Sparkles className="h-5 w-5 text-orange-500" /></CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3"><div className="space-y-2"><Label className="font-semibold">Nome</Label><Input className="h-11 rounded-xl" /></div><div className="space-y-2"><Label className="font-semibold">E-mail</Label><Input type="email" className="h-11 rounded-xl" /></div></div>
            <div className="space-y-2"><Label className="font-semibold">Assunto</Label><Input className="h-11 rounded-xl" /></div>
            <div className="space-y-2"><Label className="font-semibold">Mensagem</Label><Textarea rows={4} className="rounded-xl" /></div>
            <Button className="w-full h-12 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold"><Send className="mr-2 h-4 w-4" /> ENVIAR MENSAGEM</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MobileContato() {
  return (
    <Box sx={{ py: 2 }}>
      <Typography sx={{ color: '#E67E22', fontSize: '1.5rem', fontWeight: 800, mb: 0.5 }}>Fale Conosco</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>Estamos prontos.</Typography>
      <Stack spacing={3} sx={{ mb: 3 }}>
        {contacts.map((c, i) => { const Icon = c.icon; return (
          <Box key={i} sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ bgcolor: '#FFF5EB', p: 1.5, borderRadius: 3, display: 'flex', height: 'fit-content' }}><Icon size={20} color="#E67E22" /></Box>
            <Box><Typography sx={{ fontWeight: 800, fontSize: '0.95rem' }}>{c.title}</Typography><Typography variant="body2" color="text.secondary">{c.value}</Typography></Box>
          </Box>
        ); })}
      </Stack>
      <Divider sx={{ my: 3 }} />
      <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #eee' }}>
        <Typography sx={{ fontWeight: 800, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>Mensagem <Sparkles size={16} color="#E67E22" /></Typography>
        <Stack spacing={2}>
          <TextField fullWidth label="Nome" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
          <TextField fullWidth label="E-mail" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
          <TextField fullWidth label="Assunto" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
          <TextField fullWidth label="Mensagem" multiline rows={3} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
          <MuiButton fullWidth variant="contained" startIcon={<Send size={16} />} sx={{ py: 1.75, borderRadius: 3, fontWeight: 800, bgcolor: '#E67E22', '&:hover': { bgcolor: '#D35400' } }}>ENVIAR</MuiButton>
        </Stack>
      </Paper>
    </Box>
  );
}

export default function ContatoPage() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileContato /> : <WebContato />;
}
