'use client';

import { useState } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageSquare, Share2, MoreHorizontal, Image as ImageIcon, Send, Plus, Sparkles } from 'lucide-react';
import { Avatar as ShadAvatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Box, Typography, Paper, Stack, Avatar as MuiAvatar, IconButton, Chip, CardMedia, Divider, Fab, TextField } from '@mui/material';

const posts = [
  { id: 1, user: 'Maria Silva', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop', time: '2h atrás', content: 'Acabei de chegar no Canyon do Xingó e estou sem palavras! Dicas de onde comer em Canindé?', image: 'https://images.unsplash.com/photo-1545641203-7d072a14e3b2?q=80&w=600&auto=format&fit=crop', likes: 24, comments: 5 },
  { id: 2, user: 'Ricardo Menezes', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop', time: '5h atrás', content: 'Recomendo o passeio de buggy na Barra dos Coqueiros. Vista incrível do pôr do sol!', likes: 12, comments: 2 },
];

function WebDiscussao() {
  const [posting, setPosting] = useState(false);
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between"><h1 className="text-4xl font-black text-gray-900">Discussão</h1><Badge variant="outline" className="font-bold gap-1"><Sparkles className="h-3 w-3 text-orange-500" /> Comunidade Ativa</Badge></div>
      <Card className="border-gray-100">
        <CardContent className="pt-5">
          <div className="flex items-center gap-3">
            <ShadAvatar className="h-10 w-10"><AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop" /><AvatarFallback>U</AvatarFallback></ShadAvatar>
            <input placeholder="No que você está pensando?" onClick={() => setPosting(true)} className="flex-1 bg-gray-50 rounded-xl px-4 py-3 text-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-200" />
            <Button variant="ghost" size="icon"><ImageIcon className="h-5 w-5 text-gray-400" /></Button>
          </div>
          {posting && (<div className="flex justify-end gap-2 mt-4"><Button variant="ghost" onClick={() => setPosting(false)}>Cancelar</Button><Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full px-6">Postar</Button></div>)}
        </CardContent>
      </Card>

      <div className="space-y-6">
        {posts.map((p) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="overflow-hidden border-gray-100 hover:shadow-lg transition-shadow">
              <CardContent className="pt-5">
                <div className="flex items-center gap-3 mb-4">
                  <ShadAvatar className="h-11 w-11"><AvatarImage src={p.avatar} /><AvatarFallback>{p.user[0]}</AvatarFallback></ShadAvatar>
                  <div className="flex-1"><h4 className="font-bold text-gray-900">{p.user}</h4><p className="text-xs text-gray-400">{p.time}</p></div>
                  <Button variant="ghost" size="icon"><MoreHorizontal className="h-5 w-5 text-gray-300" /></Button>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">{p.content}</p>
              </CardContent>
              {p.image && <img src={p.image} alt="" className="w-full h-64 object-cover" />}
              <div className="px-5 py-3 flex items-center justify-between border-t border-gray-50">
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="text-gray-400 font-bold gap-1"><Heart className="h-4 w-4" /> {p.likes}</Button>
                  <Button variant="ghost" size="sm" className="text-gray-400 font-bold gap-1"><MessageSquare className="h-4 w-4" /> {p.comments}</Button>
                </div>
                <Button variant="ghost" size="icon"><Share2 className="h-4 w-4 text-gray-300" /></Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function MobileDiscussao() {
  const [posting, setPosting] = useState(false);
  return (
    <Box sx={{ py: 2, pb: 10 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography sx={{ color: '#E67E22', fontSize: '1.5rem', fontWeight: 800 }}>Discussão</Typography>
        <Chip icon={<Sparkles size={14} color="#E67E22" />} label="Ativa" variant="outlined" sx={{ fontWeight: 700, borderColor: '#eee', color: '#999', fontSize: '0.7rem' }} />
      </Box>
      <Paper elevation={0} sx={{ p: 2, mb: 3, borderRadius: 4, border: '1px solid #eee' }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <MuiAvatar src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop" sx={{ width: 36, height: 36 }} />
          <TextField fullWidth placeholder="No que está pensando?" variant="standard" onClick={() => setPosting(true)} InputProps={{ disableUnderline: true }} sx={{ '& .MuiInputBase-input': { fontWeight: 500, fontSize: '0.85rem' } }} />
        </Stack>
        <AnimatePresence>{posting && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}><Divider sx={{ my: 1.5 }} /><Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Typography onClick={() => setPosting(false)} variant="caption" sx={{ cursor: 'pointer', color: '#999', fontWeight: 700, mt: 0.5 }}>Cancelar</Typography>
          <Chip label="Postar" sx={{ bgcolor: '#E67E22', color: 'white', fontWeight: 800 }} />
        </Box></motion.div>)}</AnimatePresence>
      </Paper>
      <Stack spacing={2}>
        {posts.map((p) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
            <Paper elevation={0} sx={{ borderRadius: 4, border: '1px solid #eee', overflow: 'hidden' }}>
              <Box sx={{ p: 2 }}>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                  <MuiAvatar src={p.avatar} sx={{ width: 36, height: 36 }} />
                  <Box flex={1}><Typography sx={{ fontWeight: 800, fontSize: '0.85rem' }}>{p.user}</Typography><Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>{p.time}</Typography></Box>
                </Stack>
                <Typography variant="body2" sx={{ lineHeight: 1.6, fontSize: '0.85rem' }}>{p.content}</Typography>
              </Box>
              {p.image && <CardMedia component="img" image={p.image} sx={{ height: 200 }} />}
              <Box sx={{ p: 1.5, display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f5f5f5' }}>
                <Stack direction="row" spacing={0.5}><IconButton size="small"><Heart size={16} color="#999" /></IconButton><Typography variant="caption" sx={{ mt: 0.75, color: '#999', fontWeight: 700 }}>{p.likes}</Typography><IconButton size="small"><MessageSquare size={16} color="#999" /></IconButton><Typography variant="caption" sx={{ mt: 0.75, color: '#999', fontWeight: 700 }}>{p.comments}</Typography></Stack>
                <IconButton size="small"><Share2 size={16} color="#999" /></IconButton>
              </Box>
            </Paper>
          </motion.div>
        ))}
      </Stack>
      <Fab color="primary" sx={{ position: 'fixed', bottom: 80, right: 16, bgcolor: '#E67E22', boxShadow: '0 6px 20px rgba(230,126,34,0.4)', '&:hover': { bgcolor: '#D35400' } }}><Plus size={24} /></Fab>
    </Box>
  );
}

export default function DiscussaoPage() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileDiscussao /> : <WebDiscussao />;
}
