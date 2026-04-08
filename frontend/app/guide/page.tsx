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

import { getGeminiResponse } from '../actions/gemini';

function useChat() {
  const [msgs, setMsgs] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg = { 
      id: Date.now(), 
      text: input, 
      sender: 'user', 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };
    
    setMsgs(p => [...p, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await getGeminiResponse(input);
      const botMsg = { 
        id: Date.now() + 1, 
        text: response, 
        sender: 'bot', 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      };
      setMsgs(p => [...p, botMsg]);
    } catch (error) {
      console.error("Chat Error:", error);
    } finally {
      setLoading(false);
    }
  };
  return { msgs, input, setInput, send, loading };
}

function WebGuia() {
  const { msgs, input, setInput, send, loading } = useChat();
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 mb-6">
        <ShadAvatar className="h-12 w-12 bg-primary"><AvatarFallback className="bg-primary text-white font-bold"><Bot className="h-6 w-6" /></AvatarFallback></ShadAvatar>
        <div><h1 className="text-2xl font-black text-gray-900 dark:text-white">Guia IA Sergipanidade</h1><div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-green-400" /><span className="text-xs text-green-500 font-bold">Online agora</span></div></div>
        <Badge className="ml-auto bg-primary/10 text-primary border-primary/20"><Sparkles className="mr-1 h-3 w-3" /> IA</Badge>
      </div>

      <ScrollArea className="h-[55vh] border border-gray-100 dark:border-slate-800 rounded-2xl p-6 bg-white dark:bg-slate-900 shadow-sm">
        <div className="space-y-6">
          {msgs.map((m) => (
            <motion.div key={m.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl ${m.sender === 'user' ? 'bg-primary text-white rounded-br-sm' : 'bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-slate-200 rounded-bl-sm border border-gray-100 dark:border-slate-700'}`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.text}</p>
              </div>
              <span className="text-[10px] text-gray-300 dark:text-slate-500 mt-1">{m.time}</span>
            </motion.div>
          ))}
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-primary font-bold text-xs">
              <div className="flex gap-1">
                <span className="animate-bounce">.</span>
                <span className="animate-bounce delay-100">.</span>
                <span className="animate-bounce delay-200">.</span>
              </div>
              Digitando...
            </motion.div>
          )}
        </div>
      </ScrollArea>

      <div className="flex gap-2 flex-wrap">{suggestions.map((s) => (<button key={s} disabled={loading} onClick={() => setInput(s)} className="px-3 py-1.5 rounded-full bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-xs font-bold text-gray-500 dark:text-slate-400 hover:bg-primary/5 dark:hover:bg-primary/10 hover:text-primary transition-colors disabled:opacity-50">{s}</button>))}</div>
      <div className="flex gap-2">
        <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder={loading ? "Aguarde a resposta..." : "Pergunte sobre Sergipe..."}
          disabled={loading} onKeyDown={(e) => { if (e.key === 'Enter') send(); }} className="flex-1 h-12 rounded-xl dark:bg-slate-800 dark:border-slate-700 dark:text-white" />
        <Button onClick={send} disabled={loading || !input.trim()} className="h-12 w-12 rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-50"><Send className="h-5 w-5 text-white" /></Button>
      </div>
    </div>
  );
}

function MobileGuia() {
  const { msgs, input, setInput, send, loading } = useChat();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 180px)', pb: 2 }}>
      {/* Premium Header for Chat */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, p: 2, bgcolor: 'white', borderRadius: 6, border: '1px solid rgba(0,0,0,0.03)', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
        <MuiAvatar sx={{ 
          bgcolor: 'rgba(237, 33, 0, 0.1)', width: 44, height: 44, border: '1px solid rgba(237, 33, 0, 0.1)'
        }}>
          <Bot size={24} color="#ED2100" />
        </MuiAvatar>
        <Box flex={1}>
           <Typography sx={{ fontWeight: 950, fontSize: '1.05rem', color: '#1A202C', letterSpacing: -0.5 }}>
             Guia Virtual
           </Typography>
           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 8, height: 8, bgcolor: '#2ECC71', borderRadius: '50%', boxShadow: '0 0 10px rgba(46,204,113,0.5)' }} />
              <Typography variant="caption" sx={{ color: '#2ECC71', fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Inteligência Ativa
              </Typography>
           </Box>
        </Box>
        <Chip label="BETA" size="small" sx={{ fontWeight: 900, fontSize: '0.6rem', bgcolor: '#F1F5F9', color: '#64748B', height: 20 }} />
      </Box>

      {/* Chat Messages Area */}
      <Box sx={{ flex: 1, overflowY: 'auto', px: 0.5, mb: 2, '&::-webkit-scrollbar': { display: 'none' } }}>
        <Stack spacing={3}>
          {msgs.map((m) => (
            <motion.div key={m.id} initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: m.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                <Paper elevation={0} sx={{ 
                  p: 2.5, 
                  maxWidth: '88%', 
                  borderRadius: m.sender === 'user' ? '24px 24px 4px 24px' : '24px 24px 24px 4px', 
                  bgcolor: m.sender === 'user' ? '#1A202C' : 'white', 
                  color: m.sender === 'user' ? 'white' : '#2D3748', 
                  border: m.sender === 'user' ? 'none' : '1px solid rgba(0,0,0,0.04)',
                  boxShadow: m.sender === 'user' ? '0 8px 20px rgba(0,0,0,0.1)' : '0 4px 15px rgba(0,0,0,0.03)'
                }}>
                  <Typography variant="body2" sx={{ lineHeight: 1.7, fontSize: '0.95rem', fontWeight: 550, whiteSpace: 'pre-wrap' }}>
                    {m.text}
                  </Typography>
                </Paper>
                <Typography variant="caption" sx={{ mt: 0.8, fontWeight: 700, fontSize: '0.65rem', color: '#94A3B8', mx: 1 }}>
                  {m.time}
                </Typography>
              </Box>
            </motion.div>
          ))}
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
               <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', p: 1.5, px: 2.5, bgcolor: '#F1F5F9', borderRadius: 4, width: 'fit-content' }}>
                  <Typography variant="caption" sx={{ color: '#ED2100', fontWeight: 900, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                     <Sparkles size={12} className="animate-pulse" /> Analisando Sergipe...
                  </Typography>
               </Box>
            </motion.div>
          )}
        </Stack>
      </Box>

      {/* Suggestions and Input Section */}
      <Box sx={{ bgcolor: 'white', borderRadius: 7, p: 2, border: '1px solid rgba(0,0,0,0.03)', boxShadow: '0 -4px 30px rgba(0,0,0,0.03)' }}>
        <Box sx={{ mb: 2, overflowX: 'auto', '&::-webkit-scrollbar': { display: 'none' } }}>
          <Stack direction="row" spacing={1.5}>
            {suggestions.map((s) => (
              <Chip 
                key={s} 
                disabled={loading} 
                label={s} 
                onClick={() => setInput(s)} 
                sx={{ 
                  bgcolor: '#F8FAFC', border: '1px solid rgba(0,0,0,0.02)', 
                  fontWeight: 750, fontSize: '0.75rem', color: '#64748B',
                  '&:active': { bgcolor: 'rgba(237, 33, 0, 0.1)', color: '#ED2100' }
                }} 
              />
            ))}
          </Stack>
        </Box>

        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
          <TextField 
            fullWidth 
            disabled={loading} 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder={loading ? "Sintonizando..." : "Pergunte sobre sua viagem..."} 
            variant="outlined"
            multiline
            maxRows={3}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
            sx={{ 
              '& .MuiOutlinedInput-root': { 
                borderRadius: 5, bgcolor: '#F8FAFC', py: 1.5, px: 2,
                border: 'none',
                '& fieldset': { border: 'none' },
                '&:hover fieldset': { border: 'none' },
              },
              '& .MuiInputBase-input': { fontWeight: 600, fontSize: '0.95rem' }
            }}
          />
          <IconButton 
            onClick={send} 
            disabled={loading || !input.trim()} 
            sx={{ 
              bgcolor: '#1A202C', color: 'white', borderRadius: '18px', width: 48, height: 48,
              boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
              '&:hover': { bgcolor: '#2D3748' },
              '&.Mui-disabled': { bgcolor: '#E2E8F0', color: '#CBD5E1' } 
            }}
          >
            {loading ? <Sparkles size={20} className="animate-spin" /> : <Send size={22} />}
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default function GuiaPage() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileGuia /> : <WebGuia />;
}
