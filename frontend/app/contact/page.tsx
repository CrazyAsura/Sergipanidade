'use client';

import { useState } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useRouter } from 'next/navigation';
import { Mail, Phone, Clock, Send, Globe, MapPin, CheckCircle2, Camera, MessageCircle, Share2, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Box, Typography, Paper, Stack, TextField, Button as MuiButton, Divider, Alert } from '@mui/material';

const contacts = [
  { icon: Mail, title: 'E-mail', value: 'contato@sergipanidade.com.br', bg: 'bg-orange-50', color: 'text-orange-500' },
  { icon: Phone, title: 'Telefone', value: '(79) 99999-9999', bg: 'bg-blue-50', color: 'text-blue-500' },
  { icon: Clock, title: 'Horário', value: 'Seg - Sex: 08:00 - 18:00', bg: 'bg-green-50', color: 'text-green-500' },
  { icon: MapPin, title: 'Endereço', value: 'Aracaju, Sergipe - Brasil', bg: 'bg-purple-50', color: 'text-purple-500' },
];

const socials = [
  { icon: Camera, label: 'Instagram', url: '#' },
  { icon: Share2, label: 'Facebook', url: '#' },
  { icon: MessageCircle, label: 'Twitter', url: '#' },
  { icon: Globe, label: 'Website', url: '#' },
];

function WebContato() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSend = () => {
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="space-y-20 animate-in fade-in duration-700">
      {/* Hero */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <span className="inline-block px-4 py-1.5 bg-orange-50 text-orange-600 text-[10px] font-black uppercase tracking-widest rounded-full">Contato</span>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 dark:text-white uppercase italic leading-none">
          Fale <span className="text-orange-500">conosco.</span>
        </h1>
        <p className="text-xl text-gray-400 dark:text-slate-500 font-medium">Dúvida, sugestão ou parceria? Estamos prontos para ouvir.</p>
      </section>

      {/* Contact Info + Form */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-6">
            {contacts.map((c, i) => {
              const Icon = c.icon;
              return (
                <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 hover:shadow-lg transition-shadow">
                  <div className={`p-3 rounded-xl ${c.bg} dark:bg-opacity-20 shrink-0`}>
                    <Icon className={`h-5 w-5 ${c.color}`} />
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 dark:text-white text-sm uppercase tracking-wide">{c.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-slate-400 font-medium mt-1">{c.value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-4">
            <h4 className="font-black uppercase text-xs tracking-widest text-orange-400">Redes Sociais</h4>
            <div className="grid grid-cols-2 gap-3">
              {socials.map((s, i) => {
                const Icon = s.icon;
                return (
                  <a key={i} href={s.url} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <Icon size={18} className="text-orange-400" />
                    <span className="text-sm font-bold">{s.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <Card className="lg:col-span-3 border-gray-100 dark:border-slate-800 shadow-2xl shadow-orange-100/20 dark:shadow-none rounded-[2.5rem] overflow-hidden">
          <CardHeader className="p-8 pb-2">
            <CardTitle className="text-2xl font-black uppercase italic tracking-tighter flex items-center gap-3">
              <Send className="text-orange-500" size={24} /> Enviar Mensagem
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 pt-4 space-y-6">
            {sent && (
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
                <CheckCircle2 className="text-green-500 shrink-0" />
                <p className="text-sm font-bold text-green-700 dark:text-green-400">Mensagem enviada com sucesso! Responderemos em breve.</p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Seu Nome</Label>
                <Input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="João Silva" className="h-12 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">E-mail</Label>
                <Input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} placeholder="seu@email.com" className="h-12 rounded-xl" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Assunto</Label>
              <Input value={form.subject} onChange={(e) => setForm({...form, subject: e.target.value})} placeholder="Parceria, Dúvida, Sugestão..." className="h-12 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Mensagem</Label>
              <Textarea value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} rows={5} placeholder="Escreva sua mensagem aqui..." className="rounded-xl" />
            </div>
            <Button onClick={handleSend} className="w-full h-14 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-black text-base shadow-xl shadow-orange-200 dark:shadow-none transition-all">
              <Send className="mr-2 h-5 w-5" /> ENVIAR MENSAGEM
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MobileContato() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSend = () => {
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <Box sx={{ py: 2, pb: 10 }}>
      <Typography sx={{ color: '#E67E22', fontWeight: 900, fontSize: '0.7rem', letterSpacing: 2, textTransform: 'uppercase', mb: 1 }}>Contato</Typography>
      <Typography variant="h4" sx={{ fontWeight: 950, mb: 1, letterSpacing: -1.5, lineHeight: 1.1 }}>
        Fale <span style={{ color: '#E67E22' }}>conosco.</span>
      </Typography>
      <Typography sx={{ color: 'text.secondary', fontWeight: 600, fontSize: '0.85rem', mb: 4 }}>Estamos aqui para ajudar.</Typography>

      <Stack spacing={2} sx={{ mb: 4 }}>
        {contacts.map((c, i) => {
          const Icon = c.icon;
          return (
            <Box key={i} sx={{ display: 'flex', gap: 2, p: 2.5, bgcolor: 'white', borderRadius: 4, border: '1px solid #f0f0f0' }}>
              <Box sx={{ bgcolor: '#FFF5EB', p: 1.5, borderRadius: 3, display: 'flex', height: 'fit-content' }}><Icon size={20} color="#E67E22" /></Box>
              <Box>
                <Typography sx={{ fontWeight: 900, fontSize: '0.85rem' }}>{c.title}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>{c.value}</Typography>
              </Box>
            </Box>
          );
        })}
      </Stack>

      <Divider sx={{ my: 3 }} />

      <Paper elevation={0} sx={{ p: 3, borderRadius: 6, border: '1px solid #eee', bgcolor: 'white' }}>
        <Typography sx={{ fontWeight: 950, mb: 3, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: 1 }}>
          <Send size={18} color="#E67E22" /> Enviar Mensagem
        </Typography>

        {sent && (
          <Alert severity="success" sx={{ mb: 3, borderRadius: 3, fontWeight: 700 }}>
            Mensagem enviada com sucesso!
          </Alert>
        )}

        <Stack spacing={2.5}>
          <TextField fullWidth label="Seu Nome" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
          <TextField fullWidth label="E-mail" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
          <TextField fullWidth label="Assunto" value={form.subject} onChange={(e) => setForm({...form, subject: e.target.value})} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
          <TextField fullWidth label="Mensagem" multiline rows={4} value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
          <MuiButton fullWidth variant="contained" onClick={handleSend} startIcon={<Send size={16} />} sx={{ py: 1.75, borderRadius: 4, fontWeight: 900, bgcolor: '#E67E22', '&:hover': { bgcolor: '#D35400' } }}>
            ENVIAR
          </MuiButton>
        </Stack>
      </Paper>
    </Box>
  );
}

export default function ContatoPage() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileContato /> : <WebContato />;
}
