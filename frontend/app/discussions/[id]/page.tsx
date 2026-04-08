'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  MessageSquare, 
  Share2, 
  MoreHorizontal, 
  Send, 
  ArrowLeft, 
  Clock, 
  Bookmark,
  ChevronLeft,
  Smile,
  ImageIcon
} from 'lucide-react';
import { Avatar as ShadAvatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Box, 
  Typography, 
  Paper, 
  Stack, 
  Avatar as MuiAvatar, 
  IconButton, 
  Divider, 
  TextField, 
  Button as MuiButton,
  Breadcrumbs
} from '@mui/material';
import Link from 'next/link';

const initialPosts = [
  { id: 1, user: 'Maria Silva', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop', time: '2h atrás', content: 'Acabei de chegar no Canyon do Xingó e estou sem palavras! A cor da água é surreal 🤩 Alguém tem dicas de onde comer em Canindé?', image: 'https://images.unsplash.com/photo-1545641203-7d072a14e3b2?q=80&w=600&auto=format&fit=crop', likes: 24, comments: 5 },
  { id: 2, user: 'Ricardo Menezes', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop', time: '5h atrás', content: 'Recomendo demais o passeio de buggy pela Barra dos Coqueiros. Vista incrível do pôr do sol! 🌅 Reserve com antecedência.', likes: 12, comments: 2 },
  { id: 3, user: 'Ana Costa', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop', time: '1d atrás', content: 'A Crôa do Goré é um paraíso escondido! Fui hoje e a água estava cristalina. Levem protetor solar e muita água! 🏝️', image: 'https://images.unsplash.com/photo-1544735038-348dfaf8ab4b?q=80&w=600&auto=format&fit=crop', likes: 45, comments: 8 },
];

const mockComments = [
  { id: 1, user: 'João Pereira', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150&auto=format&fit=crop', time: '1h atrás', content: 'A prainha da Dulce é a melhor opção em Canindé! Comida caseira deliciosa.' },
  { id: 2, user: 'Carla Souza', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop', time: '45min atrás', content: 'Tente ir no restaurante flutuante, a experiência é única!' },
  { id: 3, user: 'Lucas Oliveira', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop', time: '10min atrás', content: 'Lugar maravilhoso mesmo, aproveite!' },
];

export default function DiscussionDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const isMobile = useIsMobile();
  const post = initialPosts.find(p => p.id === Number(id)) || initialPosts[0];
  
  const [comments, setComments] = useState(mockComments);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment = {
      id: Date.now(),
      user: 'Você',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop',
      time: 'Agora',
      content: newComment,
    };
    setComments([comment, ...comments]);
    setNewComment('');
  };

  const content = (
    <Box sx={{ maxWidth: 800, mx: 'auto', pb: 10 }}>
      {/* Header / Breadcrumbs */}
      <Box sx={{ mb: 4, mt: 2 }}>
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link href="/discussions" className="flex items-center gap-1 text-xs font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">
            <ArrowLeft size={14} /> Voltar para o Fórum
          </Link>
        </Breadcrumbs>
      </Box>

      {/* Main Post */}
      <Card className="rounded-[2.5rem] border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl shadow-primary/5 dark:shadow-none overflow-hidden mb-8">
        <CardContent className="p-8">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <ShadAvatar className="h-14 w-14 border-2 border-primary ring-4 ring-primary/5">
                <AvatarImage src={post.avatar} />
                <AvatarFallback>{post.user[0]}</AvatarFallback>
              </ShadAvatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 900, color: 'text.primary', lineHeight: 1 }}>{post.user}</Typography>
                <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 800, textTransform: 'uppercase', mt: 0.5, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Clock size={12} /> {post.time}
                </Typography>
              </Box>
            </Stack>
            <IconButton sx={{ bgcolor: 'rgba(0,0,0,0.02)' }}><MoreHorizontal size={24} /></IconButton>
          </Box>

          <Typography sx={{ fontSize: '1.25rem', fontWeight: 600, color: 'text.primary', lineHeight: 1.6, mb: 4 }}>
            {post.content}
          </Typography>

          {post.image && (
            <Box sx={{ mb: 4, borderRadius: 8, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
              <img src={post.image} alt="Post content" style={{ width: '100%', maxHeight: 500, objectFit: 'cover' }} />
            </Box>
          )}

          <Divider sx={{ my: 3, opacity: 0.5 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Stack direction="row" spacing={3}>
              <Box onClick={() => setIsLiked(!isLiked)} sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', transition: 'all 0.2s', '&:hover': { opacity: 0.7 } }}>
                <Heart size={24} color={isLiked ? '#ED2100' : 'currentColor'} fill={isLiked ? '#ED2100' : 'none'} />
                <Typography sx={{ fontWeight: 900, fontSize: '1rem' }}>{post.likes + (isLiked ? 1 : 0)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <MessageSquare size={24} color="#718096" />
                <Typography sx={{ fontWeight: 900, fontSize: '1rem', color: '#718096' }}>{comments.length}</Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={1}>
              <IconButton onClick={() => setIsSaved(!isSaved)} sx={{ color: isSaved ? 'primary.main' : 'text.disabled' }}>
                <Bookmark size={24} fill={isSaved ? 'currentColor' : 'none'} />
              </IconButton>
              <IconButton sx={{ color: 'text.disabled' }}><Share2 size={24} /></IconButton>
            </Stack>
          </Box>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Box sx={{ px: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 900, textTransform: 'uppercase', fontStyle: 'italic', mb: 4, color: 'text.primary', letterSpacing: -1 }}>
          Comentários <span className="text-primary">({comments.length})</span>
        </Typography>

        {/* Comment Input */}
        <Paper elevation={0} sx={{ p: 3, mb: 6, borderRadius: 6, border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
          <Stack direction="row" spacing={2} alignItems="flex-start">
            <MuiAvatar src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop" sx={{ width: 44, height: 44, border: '2px solid', borderColor: 'primary.main', p: 0.2 }} />
            <Box sx={{ flex: 1 }}>
              <TextField 
                fullWidth 
                multiline 
                placeholder="Adicione um comentário..." 
                variant="standard" 
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                InputProps={{ disableUnderline: true }}
                sx={{ '& .MuiInputBase-input': { fontWeight: 600, color: 'text.primary' } }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                 <Stack direction="row" spacing={1}>
                    <IconButton size="small" sx={{ color: 'text.disabled' }}><Smile size={20} /></IconButton>
                    <IconButton size="small" sx={{ color: 'text.disabled' }}><ImageIcon size={20} /></IconButton>
                 </Stack>
                 <MuiButton 
                   variant="contained" 
                   onClick={handleAddComment}
                   disabled={!newComment.trim()}
                   sx={{ 
                     borderRadius: 4, px: 4, fontWeight: 900, textTransform: 'none',
                     bgcolor: 'primary.main', boxShadow: '0 8px 16px rgba(237,33,0,0.2)',
                     '&:hover': { bgcolor: 'primary.dark' }
                   }}
                 >
                   Comentar
                 </MuiButton>
              </Box>
            </Box>
          </Stack>
        </Paper>

        {/* Comments List */}
        <Stack spacing={4}>
          <AnimatePresence>
            {comments.map((c, idx) => (
              <motion.div key={c.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}>
                <Box sx={{ display: 'flex', gap: 2.5 }}>
                  <MuiAvatar src={c.avatar} sx={{ width: 40, height: 40, border: '2px solid', borderColor: 'divider' }} />
                  <Box sx={{ flex: 1 }}>
                    <Paper elevation={0} sx={{ p: 2.5, borderRadius: 5, bgcolor: idx % 2 === 0 ? 'rgba(237,33,0,0.03)' : 'rgba(0,0,0,0.02)', position: 'relative' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography sx={{ fontWeight: 900, color: 'text.primary', fontSize: '0.9rem' }}>{c.user}</Typography>
                        <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.disabled', textTransform: 'uppercase', fontSize: '0.65rem' }}>{c.time}</Typography>
                      </Box>
                      <Typography sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.95rem', lineHeight: 1.5 }}>
                        {c.content}
                      </Typography>
                    </Paper>
                    <Stack direction="row" spacing={3} sx={{ mt: 1, ml: 1 }}>
                       <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.disabled', cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>Curtir</Typography>
                       <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.disabled', cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>Responder</Typography>
                    </Stack>
                  </Box>
                </Box>
              </motion.div>
            ))}
          </AnimatePresence>
        </Stack>
      </Box>
    </Box>
  );

  return content;
}
