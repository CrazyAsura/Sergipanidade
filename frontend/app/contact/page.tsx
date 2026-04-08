'use client';

import { useState } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Phone, Clock, Send, Globe, MapPin, CheckCircle2, Camera, MessageCircle, Share2, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Box, Typography, Paper, Stack, TextField, Button as MuiButton, Divider, Alert } from '@mui/material';

const contacts = [
  { icon: Mail, title: 'E-mail', value: 'contato@sergipanidade.com.br', bg: 'bg-primary/10', color: 'text-primary' },
  { icon: Phone, title: 'Telefone', value: '(79) 99999-9999', bg: 'bg-blue-50 dark:bg-blue-950/30', color: 'text-blue-500' },
  { icon: Clock, title: 'Horário', value: 'Seg - Sex: 08:00 - 18:00', bg: 'bg-green-50 dark:bg-green-950/30', color: 'text-green-500' },
  { icon: MapPin, title: 'Endereço', value: 'Aracaju, Sergipe - Brasil', bg: 'bg-purple-50 dark:bg-purple-950/30', color: 'text-purple-500' },
];

const socials = [
  { icon: Camera, label: 'Instagram', url: '#' },
  { icon: Share2, label: 'Facebook', url: '#' },
  { icon: MessageCircle, label: 'Twitter', url: '#' },
  { icon: Globe, label: 'Website', url: '#' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

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
    <div className="space-y-24">
      {/* Hero */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="text-center max-w-4xl mx-auto space-y-8"
      >
        <motion.span variants={fadeUp} className="inline-block px-5 py-2 bg-primary/10 backdrop-blur-md border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.4em] rounded-full">
          Contato
        </motion.span>
        <motion.h1 variants={fadeUp} className="text-5xl md:text-8xl font-black tracking-tighter text-foreground uppercase italic leading-[0.85]">
          Fale <span className="text-gradient">conosco.</span>
        </motion.h1>
        <motion.p variants={fadeUp} className="text-xl text-muted-foreground font-medium">Dúvida, sugestão ou parceria? Estamos prontos para ouvir.</motion.p>
      </motion.section>

      {/* Contact Info + Form */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="grid grid-cols-1 lg:grid-cols-5 gap-14"
      >
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-6">
            {contacts.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div key={i} variants={fadeUp} whileHover={{ x: 6 }}>
                  <div className="flex items-start gap-5 p-6 rounded-2xl glass-card hover:shadow-xl transition-all duration-300 group border border-white/10 dark:border-white/5">
                    <div className={`p-4 rounded-xl ${c.bg} shrink-0 group-hover:scale-110 transition-transform border border-white/10`}>
                      <Icon className={`h-5 w-5 ${c.color}`} />
                    </div>
                    <div>
                      <h3 className="font-black text-foreground text-sm uppercase tracking-wider">{c.title}</h3>
                      <p className="text-sm text-muted-foreground font-medium mt-1">{c.value}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div variants={fadeUp} className="p-8 rounded-[2.5rem] bg-slate-900 text-white space-y-6 border border-white/10">
            <h4 className="font-black uppercase text-xs tracking-[0.3em] text-accent">Redes Sociais</h4>
            <div className="grid grid-cols-2 gap-4">
              {socials.map((s, i) => {
                const Icon = s.icon;
                return (
                  <a key={i} href={s.url} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                    <Icon size={18} className="text-accent group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-bold">{s.label}</span>
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="lg:col-span-3">
          <Card className="border-white/10 dark:border-white/5 shadow-2xl shadow-primary/5 dark:shadow-none rounded-[3rem] overflow-hidden glass-card">
            <CardHeader className="p-10 pb-4">
              <CardTitle className="text-2xl font-black uppercase italic tracking-tighter flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                  <Send className="text-primary" size={22} />
                </div>
                Enviar Mensagem
              </CardTitle>
            </CardHeader>
            <CardContent className="p-10 pt-4 space-y-6">
              {sent && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-5 rounded-2xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800"
                >
                  <CheckCircle2 className="text-green-500 shrink-0" />
                  <p className="text-sm font-bold text-green-700 dark:text-green-400">Mensagem enviada com sucesso! Responderemos em breve.</p>
                </motion.div>
              )}
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Seu Nome</Label>
                  <Input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="João Silva" className="h-14 rounded-xl bg-background/50" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">E-mail</Label>
                  <Input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} placeholder="seu@email.com" className="h-14 rounded-xl bg-background/50" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Assunto</Label>
                <Input value={form.subject} onChange={(e) => setForm({...form, subject: e.target.value})} placeholder="Parceria, Dúvida, Sugestão..." className="h-14 rounded-xl bg-background/50" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Mensagem</Label>
                <Textarea value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} rows={5} placeholder="Escreva sua mensagem aqui..." className="rounded-xl bg-background/50" />
              </div>
              <Button onClick={handleSend} className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-base shadow-2xl shadow-primary/20 dark:shadow-none transition-all hover:scale-[1.02] active:scale-95 border border-white/10">
                <Send className="mr-2 h-5 w-5" /> ENVIAR MENSAGEM
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
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
      <Typography sx={{ color: '#ED2100', fontWeight: 900, fontSize: '0.7rem', letterSpacing: 2, textTransform: 'uppercase', mb: 1 }}>Contato</Typography>
      <Typography variant="h4" sx={{ fontWeight: 950, mb: 1, letterSpacing: -1.5, lineHeight: 1.1 }}>
        Fale <span style={{ color: '#ED2100' }}>conosco.</span>
      </Typography>
      <Typography sx={{ color: 'text.secondary', fontWeight: 600, fontSize: '0.85rem', mb: 4 }}>Estamos aqui para ajudar.</Typography>

      <Stack spacing={2} sx={{ mb: 4 }}>
        {contacts.map((c, i) => {
          const Icon = c.icon;
          return (
            <Box key={i} sx={{ display: 'flex', gap: 2, p: 2.5, bgcolor: 'white', borderRadius: 4, border: '1px solid #f0f0f0' }}>
              <Box sx={{ bgcolor: 'rgba(237, 33, 0, 0.1)', p: 1.5, borderRadius: 3, display: 'flex', height: 'fit-content' }}><Icon size={20} color="#ED2100" /></Box>
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
          <Send size={18} color="#ED2100" /> Enviar Mensagem
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
          <MuiButton fullWidth variant="contained" onClick={handleSend} startIcon={<Send size={16} />} sx={{ py: 1.75, borderRadius: 4, fontWeight: 900, bgcolor: '#ED2100', '&:hover': { bgcolor: '#C41B00' } }}>
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
