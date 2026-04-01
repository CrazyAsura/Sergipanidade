'use client';

import { useSelector } from 'react-redux';
import { useIsMobile } from '@/hooks/useIsMobile';
import { RootState } from '@/lib/store';
import { locations } from '@/lib/mockData';
import { LayoutGrid, List as ListIcon, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { toggleFavorite } from '@/lib/store/features/favorites/favoritesSlice';
import { motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';

// Shadcn
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

// MUI
import { Box, Typography, Paper, Stack, IconButton, Tab, Tabs as MuiTabs, Card as MuiCard, CardMedia, CardContent as MuiCardContent } from '@mui/material';

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
                  <Card className="overflow-hidden cursor-pointer group border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all" onClick={() => router.push(`/local/${loc.id}`)}>
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
    <Box sx={{ py: 2 }}>
      <Typography sx={{ color: '#E67E22', fontSize: '1.5rem', fontWeight: 800, mb: 3 }}>Meus Favoritos</Typography>
      <MuiTabs value={0} variant="fullWidth" textColor="primary" indicatorColor="primary" sx={{ mb: 3, borderBottom: '1px solid #eee', '& .MuiTab-root': { fontWeight: 700, fontSize: '0.85rem' } }}>
        <Tab label="Locais Salvos" /><Tab label="Ranking" />
      </MuiTabs>
      {favLocs.length === 0 ? (
        <Paper elevation={0} sx={{ p: 5, textAlign: 'center', borderRadius: 4, border: '1px dashed #ddd' }}>
          <MessageSquare size={40} color="#ddd" style={{ margin: '0 auto 12px' }} />
          <Typography sx={{ fontWeight: 700, color: '#aaa', mb: 0.5 }}>Nenhum local salvo</Typography>
          <Typography variant="body2" color="text.secondary">Explore e favorite lugares!</Typography>
        </Paper>
      ) : (
        <Stack spacing={1.5}>
          {favLocs.map((loc) => (
            <MuiCard key={loc.id} onClick={() => router.push(`/local/${loc.id}`)} sx={{ display: 'flex', borderRadius: 3, overflow: 'hidden', cursor: 'pointer', border: '1px solid #f0f0f0', boxShadow: 'none' }}>
              <CardMedia component="img" image={loc.image} sx={{ width: 100, objectFit: 'cover' }} />
              <MuiCardContent sx={{ p: 1.5, flex: 1 }}>
                <Typography variant="caption" sx={{ color: '#E67E22', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.6rem' }}>{loc.category}</Typography>
                <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>{loc.name}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
                  <Typography variant="caption" color="text.secondary">{loc.city}</Typography>
                  <IconButton size="small" onClick={(e) => { e.stopPropagation(); dispatch(toggleFavorite(loc.id)); }}><Heart size={14} fill="#E67E22" color="#E67E22" /></IconButton>
                </Box>
              </MuiCardContent>
            </MuiCard>
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
