'use client';

import { useState } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageSquare, Share2, MoreHorizontal, Image as ImageIcon, Send, Plus, Sparkles, Clock, Bookmark } from 'lucide-react';
import { Avatar as ShadAvatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Box, Typography, Paper, Stack, Avatar as MuiAvatar, IconButton, Chip, CardMedia, Divider, Fab, TextField, Button as MuiButton } from '@mui/material';

const initialPosts = [
  { id: 1, user: 'Maria Silva', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop', time: '2h atrás', content: 'Acabei de chegar no Canyon do Xingó e estou sem palavras! A cor da água é surreal 🤩 Alguém tem dicas de onde comer em Canindé?', image: 'https://images.unsplash.com/photo-1545641203-7d072a14e3b2?q=80&w=600&auto=format&fit=crop', likes: 24, comments: 5 },
  { id: 2, user: 'Ricardo Menezes', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop', time: '5h atrás', content: 'Recomendo demais o passeio de buggy pela Barra dos Coqueiros. Vista incrível do pôr do sol! 🌅 Reserve com antecedência.', likes: 12, comments: 2 },
  { id: 3, user: 'Ana Costa', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop', time: '1d atrás', content: 'A Crôa do Goré é um paraíso escondido! Fui hoje e a água estava cristalina. Levem protetor solar e muita água! 🏝️', image: 'https://images.unsplash.com/photo-1544735038-348dfaf8ab4b?q=80&w=600&auto=format&fit=crop', likes: 45, comments: 8 },
];

function WebDiscussions() {
  const router = useRouter();
  const [posting, setPosting] = useState(false);
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState(initialPosts);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [savedPosts, setSavedPosts] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    if (likedPosts.includes(id)) {
      setLikedPosts(likedPosts.filter(p => p !== id));
      setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes - 1 } : p));
    } else {
      setLikedPosts([...likedPosts, id]);
      setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
    }
  };

  const toggleSave = (id: number) => {
    setSavedPosts(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  const handlePost = () => {
    if (!newPost.trim()) return;
    const post = {
      id: Date.now(),
      user: 'Você',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop',
      time: 'Agora',
      content: newPost,
      likes: 0,
      comments: 0,
    };
    setPosts([post, ...posts]);
    setNewPost('');
    setPosting(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter">Fórum</h1>
          <p className="text-sm text-gray-400 font-medium mt-1">Compartilhe suas experiências sergipanas.</p>
        </div>
        <Badge variant="outline" className="font-black gap-1.5 border-primary/20 text-primary px-4 py-1.5 rounded-full">
          <Sparkles className="h-3 w-3" /> Comunidade Ativa
        </Badge>
      </div>

      {/* Create Post */}
      <Card className="border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg shadow-primary/5 dark:shadow-none rounded-[2rem] overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <ShadAvatar className="h-11 w-11 border-2 border-primary/10 dark:border-slate-800 shrink-0">
              <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop" />
              <AvatarFallback>U</AvatarFallback>
            </ShadAvatar>
            <textarea
              value={newPost}
              onChange={(e) => { setNewPost(e.target.value); if (!posting) setPosting(true); }}
              onFocus={() => setPosting(true)}
              placeholder="No que você está pensando? 💭"
              className="flex-1 bg-gray-50 dark:bg-slate-800 rounded-2xl px-5 py-4 text-sm border border-gray-100 dark:border-slate-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none min-h-[56px] font-medium"
              rows={posting ? 3 : 1}
            />
          </div>
          <AnimatePresence>
            {posting && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="flex justify-between items-center mt-4 pt-4 border-t border-gray-50 dark:border-slate-800">
                <Button variant="ghost" size="icon" className="text-gray-400"><ImageIcon className="h-5 w-5" /></Button>
                <div className="flex gap-3">
                  <Button variant="ghost" onClick={() => { setPosting(false); setNewPost(''); }} className="text-gray-400 dark:text-slate-500 font-bold">Cancelar</Button>
                  <Button onClick={handlePost} disabled={!newPost.trim()} className="bg-primary hover:bg-primary/90 text-white font-black rounded-full px-8 shadow-lg shadow-primary/20 dark:shadow-none disabled:opacity-50">
                    Publicar
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Posts */}
      <div className="space-y-8">
        <AnimatePresence>
          {posts.map((p) => {
            const isLiked = likedPosts.includes(p.id);
            const isSaved = savedPosts.includes(p.id);
            return (
              <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} layout>
                <Card className="overflow-hidden border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-xl transition-all duration-300 rounded-[2rem]">
                  <CardContent className="p-6 cursor-pointer" onClick={() => router.push(`/discussions/${p.id}`)}>
                    <div className="flex items-center gap-4 mb-4">
                      <ShadAvatar className="h-12 w-12 border-2 border-primary/5 dark:border-slate-800">
                        <AvatarImage src={p.avatar} />
                        <AvatarFallback>{p.user[0]}</AvatarFallback>
                      </ShadAvatar>
                      <div className="flex-1">
                        <h4 className="font-black text-gray-900 dark:text-white leading-tight">{p.user}</h4>
                        <p className="text-xs text-gray-400 dark:text-slate-500 font-bold flex items-center gap-1"><Clock size={10} /> {p.time}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="text-gray-300 dark:text-slate-700"><MoreHorizontal className="h-5 w-5" /></Button>
                    </div>
                    <p className="text-gray-700 dark:text-slate-300 leading-relaxed mb-4 text-[15px] font-medium">{p.content}</p>
                  </CardContent>
                  {p.image && (
                    <div className="px-6 pb-2 cursor-pointer" onClick={() => router.push(`/discussions/${p.id}`)}>
                      <img src={p.image} alt="" className="w-full h-80 object-cover rounded-2xl shadow-inner border border-gray-50 dark:border-slate-800" />
                    </div>
                  )}
                  <div className="px-6 py-4 flex items-center justify-between border-t border-gray-50 dark:border-slate-800">
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleLike(p.id)}
                        className={`font-black gap-1.5 transition-all ${isLiked ? 'text-primary hover:text-primary' : 'text-gray-400 dark:text-slate-500 hover:text-primary'}`}
                      >
                        <Heart className={`h-[18px] w-[18px] transition-all ${isLiked ? 'fill-primary' : ''}`} /> {p.likes}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => router.push(`/discussions/${p.id}`)}
                        className="text-gray-400 dark:text-slate-500 font-black gap-1.5 hover:text-blue-500"
                      >
                        <MessageSquare className="h-[18px] w-[18px]" /> {p.comments}
                      </Button>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleSave(p.id)}
                        className={`transition-colors ${isSaved ? 'text-primary' : 'text-gray-300 dark:text-slate-700 hover:text-primary'}`}
                      >
                        <Bookmark className={`h-[18px] w-[18px] ${isSaved ? 'fill-primary' : ''}`} />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-gray-300 dark:text-slate-700 hover:text-primary">
                        <Share2 className="h-[18px] w-[18px]" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

function MobileDiscussions() {
  const router = useRouter();
  const [posting, setPosting] = useState(false);
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState(initialPosts);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    if (likedPosts.includes(id)) {
      setLikedPosts(likedPosts.filter(p => p !== id));
      setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes - 1 } : p));
    } else {
      setLikedPosts([...likedPosts, id]);
      setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
    }
  };

  const handlePost = () => {
    if (!newPost.trim()) return;
    const post = {
      id: Date.now(),
      user: 'Você',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop',
      time: 'Agora',
      content: newPost,
      likes: 0,
      comments: 0,
    };
    setPosts([post, ...posts]);
    setNewPost('');
    setPosting(false);
  };

  return (
    <Box sx={{ py: 2, pb: 12 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography sx={{ color: '#1A202C', fontSize: '1.85rem', fontWeight: 950, letterSpacing: -1.5 }}>Fórum</Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700 }}>Compartilhe sua jornada</Typography>
        </Box>
        <Chip icon={<Sparkles size={14} color="#ED2100" />} label="ATIVO" variant="outlined" sx={{ fontWeight: 900, borderColor: 'rgba(237, 33, 0, 0.2)', color: '#ED2100', fontSize: '0.65rem', bgcolor: 'rgba(237, 33, 0, 0.05)', height: 28 }} />
      </Box>

      {/* Create Post */}
      <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 6, border: '1px solid rgba(0,0,0,0.04)', bgcolor: 'white', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <MuiAvatar src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop" sx={{ width: 40, height: 40, border: '2px solid #ED2100', p: 0.2 }} />
          <TextField
            fullWidth
            multiline
            rows={posting ? 3 : 1}
            value={newPost}
            onChange={(e) => { setNewPost(e.target.value); if (!posting) setPosting(true); }}
            onFocus={() => setPosting(true)}
            placeholder="Compartilhe sua jornada... 💭"
            variant="standard"
            InputProps={{ disableUnderline: true }}
            sx={{ '& .MuiInputBase-input': { fontWeight: 600, fontSize: '0.95rem', color: '#4A5568' } }}
          />
        </Stack>
        <AnimatePresence>
          {posting && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
              <Divider sx={{ my: 2, opacity: 0.5 }} />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Typography onClick={() => { setPosting(false); setNewPost(''); }} variant="caption" sx={{ cursor: 'pointer', color: '#94A3B8', fontWeight: 800, alignSelf: 'center' }}>Cancelar</Typography>
                <MuiButton variant="contained" onClick={handlePost} disabled={!newPost.trim()} sx={{ bgcolor: '#ED2100', borderRadius: 4, fontWeight: 900, textTransform: 'none', px: 3, boxShadow: '0 4px 12px rgba(237, 33, 0, 0.3)', '&:hover': { bgcolor: '#C41B00' } }}>
                  Publicar
                </MuiButton>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Paper>

      {/* Feed */}
      <Stack spacing={4}>
        {posts.map((p) => {
          const isLiked = likedPosts.includes(p.id);
          return (
            <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} layout>
              <Paper elevation={0} sx={{ borderRadius: 6, border: '1px solid rgba(0,0,0,0.04)', overflow: 'hidden', bgcolor: 'white', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
                <Box sx={{ p: 3, cursor: 'pointer' }} onClick={() => router.push(`/discussions/${p.id}`)}>
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2.5 }}>
                    <MuiAvatar src={p.avatar} sx={{ width: 44, height: 44, border: '2px solid #F7FAFC' }} />
                    <Box flex={1}>
                      <Typography sx={{ fontWeight: 950, fontSize: '1rem', color: '#1A202C', letterSpacing: -0.2 }}>{p.user}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, opacity: 0.6 }}>
                        <Clock size={12} />
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '0.7rem' }}>{p.time}</Typography>
                      </Box>
                    </Box>
                    <IconButton size="small" sx={{ bgcolor: 'rgba(0,0,0,0.02)' }}><MoreHorizontal size={20} color="#A0AEC0" /></IconButton>
                  </Stack>
                  <Typography variant="body2" sx={{ lineHeight: 1.7, fontSize: '0.95rem', color: '#4A5568', fontWeight: 600 }}>{p.content}</Typography>
                </Box>

                {p.image && (
                  <Box sx={{ px: 2, pb: 1, cursor: 'pointer' }} onClick={() => router.push(`/discussions/${p.id}`)}>
                    <CardMedia component="img" image={p.image} sx={{ borderRadius: 5, maxHeight: 280, objectFit: 'cover', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }} />
                  </Box>
                )}

                <Box sx={{ p: 2, px: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(0,0,0,0.02)', mt: 1 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box onClick={() => toggleLike(p.id)} sx={{ display: 'flex', alignItems: 'center', gap: 0.75, p: 0.75, px: 1.5, borderRadius: 4, bgcolor: isLiked ? 'rgba(237, 33, 0, 0.15)' : 'rgba(237, 33, 0, 0.05)', cursor: 'pointer', transition: 'all 0.2s', '&:active': { transform: 'scale(0.9)' } }}>
                      <Heart size={18} color="#ED2100" fill={isLiked ? "#ED2100" : "none"} />
                      <Typography variant="caption" sx={{ color: '#ED2100', fontWeight: 900 }}>{p.likes}</Typography>
                    </Box>
                    <Box onClick={() => router.push(`/discussions/${p.id}`)} sx={{ display: 'flex', alignItems: 'center', gap: 0.75, p: 0.75, px: 1.5, borderRadius: 4, bgcolor: '#F7FAFC', cursor: 'pointer' }}>
                      <MessageSquare size={18} color="#718096" />
                      <Typography variant="caption" sx={{ color: '#718096', fontWeight: 900 }}>{p.comments}</Typography>
                    </Box>
                  </Stack>
                  <IconButton size="small" sx={{ color: '#CBD5E0' }}><Share2 size={18} /></IconButton>
                </Box>
              </Paper>
            </motion.div>
          );
        })}
      </Stack>

      <Fab onClick={() => setPosting(true)} sx={{ position: 'fixed', bottom: 100, right: 20, zIndex: 1100, background: 'linear-gradient(135deg, #ED2100, #FF5C00)', boxShadow: '0 8px 30px rgba(237, 33, 0, 0.4)', width: 60, height: 60 }}>
        <Plus size={30} color="white" />
      </Fab>
    </Box>
  );
}

export default function DiscussionsPage() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileDiscussions /> : <WebDiscussions />;
}
