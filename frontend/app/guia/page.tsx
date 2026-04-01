'use client';

import { useState } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Bot, Sparkles } from 'lucide-react';
import { Avatar as ShadAvatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Box, Typography, Paper, Stack, TextField, InputAdornment, IconButton, Avatar as MuiAvatar, Chip } from '@mui/material';

const initialMessages = [
  { id: 1, text: 'Olá! Sou o Guia Virtual da Sergipanidade. O que quer descobrir sobre Sergipe?', sender: 'bot', time: '10:00' },
  { id: 2, text: 'Quais são os melhores pratos típicos?', sender: 'user', time: '10:01' },
  { id: 3, text: 'A culinária é riquíssima! Prove o Caranguejo na Passarela, a Moqueca de Peixe e o Cuscuz com Leite.', sender: 'bot', time: '10:01' },
];
const suggestions = ['Onde comer caranguejo?', 'Roteiros em Aracaju', 'História do Cangaço'];

function useChat() {
  const [msgs, setMsgs] = useState(initialMessages);
  const [input, setInput] = useState('');
  const send = () => {
    if (!input.trim()) return;
    const nm = { id: Date.now(), text: input, sender: 'user', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMsgs(p => [...p, nm]);
    setInput('');
    setTimeout(() => { setMsgs(p => [...p, { id: Date.now() + 1, text: 'Ótima pergunta! Deixe-me buscar...', sender: 'bot', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]); }, 800);
  };
  return { msgs, input, setInput, send };
}

function WebGuia() {
  const { msgs, input, setInput, send } = useChat();
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 mb-6">
        <ShadAvatar className="h-12 w-12 bg-orange-500"><AvatarFallback className="bg-orange-500 text-white font-bold"><Bot className="h-6 w-6" /></AvatarFallback></ShadAvatar>
        <div><h1 className="text-2xl font-black text-gray-900">Guia IA Sergipanidade</h1><div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-green-400" /><span className="text-xs text-green-500 font-bold">Online agora</span></div></div>
        <Badge className="ml-auto bg-orange-50 text-orange-500 border-orange-200"><Sparkles className="mr-1 h-3 w-3" /> IA</Badge>
      </div>

      <ScrollArea className="h-[50vh] border border-gray-100 rounded-2xl p-6 bg-white">
        <div className="space-y-6">
          {msgs.map((m) => (
            <motion.div key={m.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl ${m.sender === 'user' ? 'bg-orange-500 text-white rounded-br-sm' : 'bg-gray-50 text-gray-800 rounded-bl-sm border border-gray-100'}`}>
                <p className="text-sm leading-relaxed">{m.text}</p>
              </div>
              <span className="text-[10px] text-gray-300 mt-1">{m.time}</span>
            </motion.div>
          ))}
        </div>
      </ScrollArea>

      <div className="flex gap-2 flex-wrap">{suggestions.map((s) => (<button key={s} onClick={() => setInput(s)} className="px-3 py-1.5 rounded-full bg-gray-50 border border-gray-100 text-xs font-bold text-gray-500 hover:bg-orange-50 hover:text-orange-500 transition-colors">{s}</button>))}</div>
      <div className="flex gap-2">
        <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Pergunte sobre Sergipe..."
          onKeyDown={(e) => { if (e.key === 'Enter') send(); }} className="flex-1 h-12 rounded-xl" />
        <Button onClick={send} className="h-12 w-12 rounded-xl bg-orange-500 hover:bg-orange-600"><Send className="h-5 w-5 text-white" /></Button>
      </div>
    </div>
  );
}

function MobileGuia() {
  const { msgs, input, setInput, send } = useChat();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 160px)' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
        <MuiAvatar sx={{ bgcolor: '#E67E22' }}><Bot size={20} color="white" /></MuiAvatar>
        <Box flex={1}><Typography sx={{ fontWeight: 800, fontSize: '1rem' }}>Guia IA</Typography><Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><Box sx={{ width: 6, height: 6, bgcolor: '#2ECC71', borderRadius: '50%' }} /><Typography variant="caption" sx={{ color: '#2ECC71', fontWeight: 700, fontSize: '0.65rem' }}>Online</Typography></Box></Box>
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto', pb: 2, '&::-webkit-scrollbar': { display: 'none' } }}>
        <Stack spacing={2}>
          {msgs.map((m) => (
            <motion.div key={m.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: m.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                <Paper elevation={0} sx={{ p: 2, maxWidth: '85%', borderRadius: m.sender === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px', bgcolor: m.sender === 'user' ? '#E67E22' : 'white', color: m.sender === 'user' ? 'white' : '#2C3E50', border: m.sender === 'user' ? 'none' : '1px solid #eee' }}>
                  <Typography variant="body2" sx={{ lineHeight: 1.6, fontSize: '0.85rem' }}>{m.text}</Typography>
                </Paper>
                <Typography variant="caption" sx={{ mt: 0.5, opacity: 0.4, fontSize: '0.6rem' }}>{m.time}</Typography>
              </Box>
            </motion.div>
          ))}
        </Stack>
      </Box>

      <Box sx={{ mb: 1, overflowX: 'auto', '&::-webkit-scrollbar': { display: 'none' } }}>
        <Stack direction="row" spacing={1}>{suggestions.map((s) => (<Chip key={s} label={s} size="small" onClick={() => setInput(s)} sx={{ bgcolor: '#f5f5f5', border: '1px solid #eee', fontWeight: 600, fontSize: '0.7rem' }} />))}</Stack>
      </Box>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField fullWidth value={input} onChange={(e) => setInput(e.target.value)} placeholder="Pergunte..." size="small"
          onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: 'white' } }}
          InputProps={{ startAdornment: <InputAdornment position="start"><Mic size={16} color="#999" /></InputAdornment> }} />
        <IconButton onClick={send} sx={{ bgcolor: '#E67E22', color: 'white', borderRadius: 3, '&:hover': { bgcolor: '#D35400' } }}><Send size={18} /></IconButton>
      </Box>
    </Box>
  );
}

export default function GuiaPage() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileGuia /> : <WebGuia />;
}
