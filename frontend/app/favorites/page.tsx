'use client';

import { useSelector } from 'react-redux';
import { useIsMobile } from '@/hooks/useIsMobile';
import { RootState } from '@/lib/store';
import { locations } from '@/lib/mockData';
import { Heart, Star, MapPin, MessageSquare, LayoutGrid, List as ListIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { toggleFavorite } from '@/lib/store/features/favorites/favoritesSlice';
import { motion } from 'framer-motion';

// Shadcn
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

// MUI
import { Box, Typography, Paper, Stack, IconButton, Tab, Tabs as MuiTabs, Card as MuiCard, CardMedia, CardContent as MuiCardContent, Chip, Button as MuiButton } from '@mui/material';

function WebFavoritos() {
  const favIds = useSelector((s: RootState) => s.favorites.items || []);
  const favLocs = locations.filter((l) => favIds.includes(l.id));
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-black text-gray-900">Meus <span className="text-orange-500">Favoritos</span></h1>
        <Badge variant="outline" className="font-bold">{favLocs.length} salvos</Badge>
      </div>
      <Tabs defaultValue="salvos">
        <TabsList className="bg-gray-100"><TabsTrigger value="salvos" className="font-bold">Locais Salvos</TabsTrigger><TabsTrigger value="ranking" className="font-bold">Ranking</TabsTrigger></TabsList>
        <TabsContent value="salvos" className="mt-6">
          {favLocs.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
              <MessageSquare className="h-16 w-16 text-gray-200 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-400 mb-1">Nenhum local salvo</h3>
              <p className="text-gray-300">Explore Sergipe e favorite os lugares!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favLocs.map((loc) => (
                <motion.div key={loc.id} whileHover={{ y: -4 }}>
                  <Card className="overflow-hidden cursor-pointer group border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all" onClick={() => router.push(`/locations/${loc.id}`)}>
                    <div className="relative h-44 overflow-hidden"><img src={loc.image} alt={loc.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <button onClick={(e) => { e.stopPropagation(); dispatch(toggleFavorite(loc.id)); }} className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"><Heart className="h-4 w-4 fill-orange-500 text-orange-500" /></button>
                    </div>
                    <CardContent className="pt-3"><Badge variant="outline" className="text-orange-500 border-orange-200 text-[10px] font-bold mb-1">{loc.category}</Badge><h3 className="font-bold text-gray-900">{loc.name}</h3><p className="text-sm text-gray-400">{loc.city}</p></CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="ranking" className="mt-6"><p className="text-gray-400">Em breve: ranking dos destinos mais populares.</p></TabsContent>
      </Tabs>
    </div>
  );
}

function MobileFavoritos() {
  const favIds = useSelector((s: RootState) => s.favorites.items || []);
  const favLocs = locations.filter((l) => favIds.includes(l.id));
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <Box sx={{ py: 2, pb: 10 }}>
      {/* Dynamic Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Box>
           <Typography variant="h4" sx={{ color: '#1A202C', fontWeight: 950, letterSpacing: -1.5 }}>
             Salvos
           </Typography>
           <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 700 }}>
             Seus destinos favoritos
           </Typography>
        </Box>
        <Chip 
          label={`${favLocs.length} ITENS`} 
          sx={{ 
            fontWeight: 900, bgcolor: 'rgba(230,126,34,0.1)', 
            color: '#E67E22', height: 28, fontSize: '0.65rem',
            border: 'none', px: 1
          }} 
        />
      </Box>

      {/* Modern Tabs Design */}
      <MuiTabs 
        value={0} 
        variant="fullWidth" 
        sx={{ 
          mb: 4, 
          bgcolor: '#F8FAFC',
          borderRadius: 4,
          p: 0.8,
          '& .MuiTabs-indicator': { display: 'none' },
          '& .MuiTab-root': { 
            fontWeight: 800, 
            fontSize: '0.85rem', 
            textTransform: 'none',
            borderRadius: 3.5,
            minHeight: 44,
            color: '#64748B',
            '&.Mui-selected': { 
              bgcolor: 'white', 
              color: '#E67E22',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }
          } 
        }}
      >
        <Tab label="Locais Salvos" />
        <Tab label="Ranking" />
      </MuiTabs>

      {favLocs.length === 0 ? (
        <Paper elevation={0} sx={{ 
          p: 8, textAlign: 'center', borderRadius: 9, 
          bgcolor: 'white', border: '2px dashed rgba(0,0,0,0.04)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
        }}>
          <Box sx={{ p: 2, bgcolor: '#F8FAFC', borderRadius: '50%', width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
            <Heart size={32} color="#CBD5E2" />
          </Box>
          <Typography sx={{ fontWeight: 900, color: '#1A202C', mb: 1, fontSize: '1.1rem' }}>Sua lista está vazia</Typography>
          <Typography variant="body2" sx={{ color: '#94A3B8', fontWeight: 600, maxWidth: 200, mx: 'auto' }}>Favorite os lugares que você deseja visitar em Sergipe.</Typography>
          <MuiButton 
            variant="contained" 
            onClick={() => router.push('/')}
            sx={{ 
              mt: 4, borderRadius: 4, bgcolor: '#1A202C', 
              textTransform: 'none', fontWeight: 900, px: 4, py: 1.2,
              boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
            }}
          >
            Explorar agora
          </MuiButton>
        </Paper>
      ) : (
        <Stack spacing={2.5}>
          {favLocs.map((loc) => (
            <motion.div key={loc.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
              <MuiCard 
                onClick={() => router.push(`/locations/${loc.id}`)} 
                sx={{ 
                  display: 'flex', 
                  borderRadius: 6, 
                  overflow: 'hidden', 
                  cursor: 'pointer', 
                  border: '1px solid rgba(0,0,0,0.03)', 
                  boxShadow: '0 10px 25px rgba(0,0,0,0.04)',
                  bgcolor: 'white',
                  transition: 'all 0.2s ease',
                  '&:active': { transform: 'scale(0.97)' }
                }}
              >
                <CardMedia 
                  component="img" 
                  image={loc.image} 
                  sx={{ width: 120, height: 120, objectFit: 'cover' }} 
                />
                <MuiCardContent sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="caption" sx={{ color: '#E67E22', fontWeight: 900, textTransform: 'uppercase', fontSize: '0.6rem', letterSpacing: 1 }}>
                      {loc.category}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Star size={10} fill="#FFD700" color="#FFD700" />
                      <Typography variant="caption" sx={{ fontWeight: 900, color: '#1A202C' }}>{loc.rating}</Typography>
                    </Box>
                  </Box>
                  <Typography sx={{ fontWeight: 950, fontSize: '1rem', color: '#1A202C', mb: 0.5, lineHeight: 1.2 }}>
                    {loc.name}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                       <MapPin size={12} color="#94A3B8" />
                       <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 700 }}>{loc.city}</Typography>
                    </Stack>
                    <IconButton 
                      size="small" 
                      onClick={(e) => { e.stopPropagation(); dispatch(toggleFavorite(loc.id)); }}
                      sx={{ bgcolor: 'rgba(230,126,34,0.05)', color: '#E67E22' }}
                    >
                      <Heart size={16} fill="#E67E22" />
                    </IconButton>
                  </Box>
                </MuiCardContent>
              </MuiCard>
            </motion.div>
          ))}
        </Stack>
      )}
    </Box>
  );
}

export default function FavoritesPage() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileFavoritos /> : <WebFavoritos />;
}
