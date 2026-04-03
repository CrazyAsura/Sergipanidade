'use client';

import { useState } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageSquare, Share2, MoreHorizontal, Image as ImageIcon, Send, Plus, Sparkles, Clock } from 'lucide-react';
import { Avatar as ShadAvatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Box, Typography, Paper, Stack, Avatar as MuiAvatar, IconButton, Chip, CardMedia, Divider, Fab, TextField, Button as MuiButton } from '@mui/material';

const posts = [
  { id: 1, user: 'Maria Silva', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop', time: '2h atrás', content: 'Acabei de chegar no Canyon do Xingó e estou sem palavras! Dicas de onde comer em Canindé?', image: 'https://images.unsplash.com/photo-1545641203-7d072a14e3b2?q=80&w=600&auto=format&fit=crop', likes: 24, comments: 5 },
  { id: 2, user: 'Ricardo Menezes', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop', time: '5h atrás', content: 'Recomendo o passeio de buggy na Barra dos Coqueiros. Vista incrível do pôr do sol!', likes: 12, comments: 2 },
];

function WebDiscussions() {
  const [posting, setPosting] = useState(false);
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between"><h1 className="text-4xl font-black text-gray-900 dark:text-white">Discussões</h1><Badge variant="outline" className="font-bold gap-1 border-orange-200 text-orange-600"><Sparkles className="h-3 w-3" /> Comunidade Ativa</Badge></div>
      <Card className="border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <CardContent className="pt-5">
          <div className="flex items-center gap-3">
            <ShadAvatar className="h-10 w-10"><AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop" /><AvatarFallback>U</AvatarFallback></ShadAvatar>
            <input placeholder="No que você está pensando?" onClick={() => setPosting(true)} className="flex-1 bg-gray-50 dark:bg-slate-800 rounded-xl px-4 py-3 text-sm border border-gray-100 dark:border-slate-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-200" />
            <Button variant="ghost" size="icon"><ImageIcon className="h-5 w-5 text-gray-400" /></Button>
          </div>
          {posting && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="flex justify-end gap-2 mt-4">
              <Button variant="ghost" onClick={() => setPosting(false)} className="text-gray-400 dark:text-slate-500">Cancelar</Button>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full px-6 shadow-lg shadow-orange-500/20">Postar</Button>
            </motion.div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-6">
        {posts.map((p) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="overflow-hidden border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-5">
                <div className="flex items-center gap-3 mb-4">
                  <ShadAvatar className="h-11 w-11 border-2 border-orange-50 dark:border-slate-800"><AvatarImage src={p.avatar} /><AvatarFallback>{p.user[0]}</AvatarFallback></ShadAvatar>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 dark:text-white leading-tight">{p.user}</h4>
                    <p className="text-xs text-gray-400 dark:text-slate-500 font-medium">{p.time}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-gray-300 dark:text-slate-700"><MoreHorizontal className="h-5 w-5" /></Button>
                </div>
                <p className="text-gray-700 dark:text-slate-300 leading-relaxed mb-4 text-sm md:text-base font-medium">{p.content}</p>
              </CardContent>
              {p.image && (
                <div className="px-5 pb-4">
                   <img src={p.image} alt="" className="w-full h-80 object-cover rounded-2xl shadow-inner border border-gray-50 dark:border-slate-800" />
                </div>
              )}
              <div className="px-5 py-3 flex items-center justify-between border-t border-gray-50 dark:border-slate-800 bg-gray-50/30 dark:bg-slate-800/20">
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="text-gray-400 dark:text-slate-500 font-bold gap-1.5 hover:text-orange-500 transition-colors">
                    <Heart className="h-4.5 w-4.5" /> {p.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-400 dark:text-slate-500 font-bold gap-1.5 hover:text-blue-500 transition-colors">
                    <MessageSquare className="h-4.5 w-4.5" /> {p.comments}
                  </Button>
                </div>
                <Button variant="ghost" size="icon" className="text-gray-300 dark:text-slate-700 hover:text-orange-500"><Share2 className="h-4.5 w-4.5" /></Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function MobileDiscussions() {
  const [posting, setPosting] = useState(false);
  return (
    <Box sx={{ py: 2, pb: 12 }}>
      {/* Header Discussion */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography sx={{ color: '#1A202C', fontSize: '1.85rem', fontWeight: 950, letterSpacing: -1.5 }}>
          Fórum
        </Typography>
        <Chip 
          icon={<Sparkles size={14} color="#E67E22" />} 
          label="MURAL ATIVO" 
          variant="outlined" 
          sx={{ 
            fontWeight: 800, borderColor: 'rgba(230,126,34,0.2)', 
            color: '#E67E22', fontSize: '0.65rem', bgcolor: 'rgba(230,126,34,0.05)',
            height: 28, letterSpacing: 1
          }} 
        />
      </Box>

      {/* Improved Create Post Section */}
      <Paper elevation={0} sx={{ 
        p: 3, mb: 5, borderRadius: 7, 
        border: '1px solid rgba(0,0,0,0.04)', 
        bgcolor: 'white', 
        boxShadow: '0 10px 30px rgba(0,0,0,0.04)' 
      }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <MuiAvatar 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop" 
            sx={{ width: 44, height: 44, border: '2px solid #E67E22', p: 0.2 }} 
          />
          <TextField 
            fullWidth 
            placeholder="Compartilhe sua jornada..." 
            variant="standard" 
            onClick={() => setPosting(true)} 
            InputProps={{ disableUnderline: true }} 
            sx={{ '& .MuiInputBase-input': { fontWeight: 700, fontSize: '0.95rem', color: '#4A5568' } }} 
          />
          <IconButton sx={{ bgcolor: '#F7FAFC' }}><Plus size={20} color="#E67E22" /></IconButton>
        </Stack>
        <AnimatePresence>
          {posting && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
              <Divider sx={{ my: 2.5, opacity: 0.5 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Stack direction="row" spacing={1}>
                   <IconButton size="small"><ImageIcon size={20} color="#999" /></IconButton>
                   <IconButton size="small"><Sparkles size={20} color="#999" /></IconButton>
                </Stack>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Typography onClick={() => setPosting(false)} variant="caption" sx={{ cursor: 'pointer', color: '#94A3B8', fontWeight: 800 }}>Cancelar</Typography>
                  <MuiButton 
                    variant="contained" 
                    sx={{ 
                      bgcolor: '#E67E22', borderRadius: 4, fontWeight: 900, 
                      textTransform: 'none', px: 3, boxShadow: '0 4px 12px rgba(230,126,34,0.3)' 
                    }}
                  >
                    Publicar
                  </MuiButton>
                </Box>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Paper>

      {/* Feed Filter Chips */}
      <Box sx={{ display: 'flex', gap: 1.5, overflowX: 'auto', mb: 4, '&::-webkit-scrollbar': { display: 'none' }, mx: -2, px: 2 }}>
         {['Destaques', 'Recentes', 'Dicas', 'Eventos'].map((f, i) => (
           <Chip 
             key={f} 
             label={f} 
             sx={{ 
               fontWeight: 800, fontSize: '0.8rem', px: 1, height: 36,
               bgcolor: i === 0 ? '#1A202C' : 'white',
               color: i === 0 ? 'white' : '#718096',
               border: '1px solid', borderColor: i === 0 ? '#1A202C' : 'rgba(0,0,0,0.04)',
               boxShadow: i === 0 ? '0 4px 12px rgba(0,0,0,0.2)' : 'none'
             }} 
           />
         ))}
      </Box>

      {/* Enhanced Multi-Layer Post Cards */}
      <Stack spacing={4}>
        {posts.map((p) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Paper elevation={0} sx={{ 
              borderRadius: 5, 
              border: '1px solid rgba(0,0,0,0.04)', 
              overflow: 'hidden', 
              bgcolor: 'white',
              boxShadow: '0 20px 40px rgba(0,0,0,0.04)'
            }}>
              <Box sx={{ p: 5 }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2.5 }}>
                  <MuiAvatar src={p.avatar} sx={{ width: 44, height: 44, border: '2px solid #F7FAFC' }} />
                  <Box flex={1}>
                    <Typography sx={{ fontWeight: 950, fontSize: '1.05rem', color: '#1A202C', letterSpacing: -0.2 }}>{p.user}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, opacity: 0.6 }}>
                       <Clock size={12} />
                       <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '0.7rem' }}>{p.time}</Typography>
                    </Box>
                  </Box>
                  <IconButton size="small" sx={{ bgcolor: 'rgba(0,0,0,0.02)' }}><MoreHorizontal size={20} color="#A0AEC0" /></IconButton>
                </Stack>
                <Typography variant="body2" sx={{ lineHeight: 1.7, fontSize: '0.95rem', color: '#4A5568', fontWeight: 600, mb: 1 }}>
                  {p.content}
                </Typography>
              </Box>
              
              {p.image && (
                <Box sx={{ px: 2, pb: 1 }}>
                  <CardMedia 
                    component="img" 
                    image={p.image} 
                    sx={{ 
                      borderRadius: 6, 
                      maxHeight: 300, 
                      objectFit: 'cover',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.1)' 
                    }} 
                  />
                </Box>
              )}

              <Box sx={{ p: 2, px: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(0,0,0,0.02)', mt: 1 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, p: 0.75, px: 1.5, borderRadius: 4, bgcolor: 'rgba(230,126,34,0.05)' }}>
                    <Heart size={18} color="#E67E22" />
                    <Typography variant="caption" sx={{ color: '#E67E22', fontWeight: 900 }}>{p.likes}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, p: 0.75, px: 1.5, borderRadius: 4, bgcolor: '#F7FAFC' }}>
                    <MessageSquare size={18} color="#718096" />
                    <Typography variant="caption" sx={{ color: '#718096', fontWeight: 900 }}>{p.comments}</Typography>
                  </Box>
                </Stack>
                <IconButton size="small" sx={{ color: '#CBD5E0' }}><Share2 size={18} /></IconButton>
              </Box>
            </Paper>
          </motion.div>
        ))}
      </Stack>

      <Fab 
        sx={{ 
          position: 'fixed', bottom: 100, right: 20, zIndex: 1100,
          background: 'linear-gradient(135deg, #E67E22, #F39C12)', 
          boxShadow: '0 8px 30px rgba(230,126,34,0.4)',
          width: 60, height: 60,
          '&:hover': { transform: 'scale(1.1)' },
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
      >
        <Plus size={30} color="white" />
      </Fab>
    </Box>
  );
}

export default function DiscussionsPage() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileDiscussions /> : <WebDiscussions />;
}
