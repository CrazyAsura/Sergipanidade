'use client';

import { useState } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { locations, transformLocationsByCategory, getPopularLocations } from '@/lib/mockData';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '@/lib/store/features/favorites/favoritesSlice';
import { RootState } from '@/lib/store';
import { motion } from 'framer-motion';

// Icons
import { Sun, ChevronRight, Lightbulb, Heart, Star, Search } from 'lucide-react';

// Shadcn
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

// MUI
import {
  Box, Typography, Paper, Chip, Stack, CardMedia,
  Card as MuiCard, CardContent as MuiCardContent, IconButton, Rating, TextField, InputAdornment,
  Button as MuiButton
} from '@mui/material';

// ═══ SHARED DATA ═══
const categories = ['Tudo', 'Praias', 'Museus', 'Gastronomia', 'Natureza', 'Cultura'];

// ═══ WEB HOME ═══
function WebHome() {
  const [cat, setCat] = useState('Tudo');
  const router = useRouter();
  const dispatch = useDispatch();
  const favs = useSelector((s: RootState) => s.favorites.items || []);
  const filtered = transformLocationsByCategory(locations, cat);
  const popular = getPopularLocations(locations);

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Hero */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-orange-500 to-amber-400 p-10 md:p-14">
        <div className="relative z-10">
          <p className="text-orange-100 text-sm font-bold uppercase tracking-widest mb-2">Aracaju, SE • 28°C Ensolarado</p>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            Descubra o<br />melhor de Sergipe
          </h1>
          <div className="flex gap-3 mt-6">
            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-300" />
              <Input placeholder="Buscar destinos..." className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-orange-100 rounded-xl h-11 backdrop-blur-sm" />
            </div>
          </div>
        </div>
        <Sun className="absolute -bottom-8 -right-8 h-48 w-48 text-white/10" />
      </section>

      {/* Categories */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all
              ${cat === c ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' : 'bg-white text-gray-500 hover:bg-orange-50 border border-gray-100'}`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Featured */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-gray-900">Destaques da Semana</h2>
          <Button variant="ghost" className="text-gray-400 font-bold">Ver tudo <ChevronRight className="ml-1 h-4 w-4" /></Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {popular.map((loc, i) => (
            <motion.div key={loc.id} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300 }}>
              <Card className="overflow-hidden cursor-pointer group border-gray-100 hover:border-orange-200 transition-colors hover:shadow-xl" onClick={() => router.push(`/local/${loc.id}`)}>
                <div className="relative h-48 overflow-hidden">
                  <img src={loc.image} alt={loc.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <button onClick={(e) => { e.stopPropagation(); dispatch(toggleFavorite(loc.id)); }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors">
                    <Heart className={`h-4 w-4 ${favs.includes(loc.id) ? 'fill-orange-500 text-orange-500' : 'text-gray-600'}`} />
                  </button>
                  <Badge className="absolute bottom-3 left-3 bg-white/90 text-orange-600 font-bold backdrop-blur-sm">{loc.category}</Badge>
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-bold text-lg text-gray-900">{loc.name}</h3>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-gray-400">{loc.city}</p>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-black text-gray-700">{loc.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Guide Tip */}
      <Card className="bg-slate-900 border-none text-white p-8 rounded-3xl relative overflow-hidden">
        <div className="relative z-10 flex items-center gap-6">
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm shrink-0">
            <Lightbulb className="h-8 w-8 text-amber-400" />
          </div>
          <div>
            <h3 className="text-lg font-black mb-1">Dica do Guia</h3>
            <p className="text-slate-300">Não deixe de provar o Caranguejo na Passarela do Caranguejo hoje!</p>
          </div>
        </div>
      </Card>

      {/* All Locations */}
      <section>
        <h2 className="text-2xl font-black text-gray-900 mb-6">
          {cat === 'Tudo' ? 'Explorar Sergipe' : `Melhores em ${cat}`}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((loc) => (
            <Card key={loc.id} className="flex overflow-hidden cursor-pointer group border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all" onClick={() => router.push(`/local/${loc.id}`)}>
              <img src={loc.image} alt={loc.name} className="w-28 h-28 object-cover shrink-0 group-hover:scale-105 transition-transform duration-300" />
              <CardContent className="flex flex-col justify-center py-3">
                <Badge variant="outline" className="w-fit text-orange-500 border-orange-200 text-[10px] font-bold mb-1">{loc.category}</Badge>
                <h3 className="font-bold text-gray-900">{loc.name}</h3>
                <p className="text-xs text-gray-400">{loc.city}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

// ═══ MUI MOBILE HOME ═══
function MobileHome() {
  const [cat, setCat] = useState('Tudo');
  const router = useRouter();
  const dispatch = useDispatch();
  const favs = useSelector((s: RootState) => s.favorites.items || []);
  const filtered = transformLocationsByCategory(locations, cat);
  const popular = getPopularLocations(locations);

  return (
    <Box sx={{ pb: 4 }}>
      {/* Search Bar - Sticky/Floating feel */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Para onde quer ir hoje?"
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={18} color="#999" />
              </InputAdornment>
            ),
            sx: {
              borderRadius: 3,
              bgcolor: 'white',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              '& fieldset': { border: '1px solid #eee' },
            }
          }}
        />
      </Box>

      {/* Hero / Highlights Section */}
      <Box sx={{
        mb: 4,
        p: 3,
        borderRadius: 6,
        background: 'linear-gradient(135deg, #E67E22 0%, #F39C12 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(230,126,34,0.3)',
      }}>
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="caption" sx={{ fontWeight: 800, opacity: 0.9, letterSpacing: 1.2 }}>
            CLIMA EM ARACAJU
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 900, mb: 0.5 }}>28°C</Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Sun size={16} fill="white" />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>Ensolarado • Hoje</Typography>
          </Stack>
        </Box>
        <Sun
          size={120}
          style={{
            position: 'absolute',
            bottom: -30,
            right: -30,
            opacity: 0.2,
            color: 'white'
          }}
        />
      </Box>

      {/* Categories Scroller */}
      <Box sx={{ mb: 4 }}>
        <Typography sx={{ fontSize: '1rem', fontWeight: 800, color: '#2C3E50', mb: 2 }}>
          Categorias
        </Typography>
        <Box sx={{ overflowX: 'auto', display: 'flex', gap: 1.5, '&::-webkit-scrollbar': { display: 'none' }, mx: -2, px: 2 }}>
          {categories.map((c) => (
            <Chip
              key={c}
              label={c}
              onClick={() => setCat(c)}
              sx={{
                height: 40,
                px: 1,
                fontWeight: 800,
                fontSize: '0.85rem',
                border: 'none',
                bgcolor: cat === c ? '#2C3E50' : 'white',
                color: cat === c ? 'white' : '#7F8C8D',
                boxShadow: cat === c ? '0 4px 12px rgba(44,62,80,0.3)' : '0 2px 6px rgba(0,0,0,0.03)',
                transition: 'all 0.2s',
                '&:active': { transform: 'scale(0.95)' }
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Featured Horizontal Scroll */}
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography sx={{ fontSize: '1.2rem', fontWeight: 800, color: '#2C3E50' }}>Destaques</Typography>
          <MuiButton size="small" endIcon={<ChevronRight size={16} />} sx={{ fontWeight: 800, color: '#E67E22', textTransform: 'none' }}>
            Ver tudo
          </MuiButton>
        </Stack>
        <Box sx={{ overflowX: 'auto', display: 'flex', gap: 2, '&::-webkit-scrollbar': { display: 'none' }, mx: -2, px: 2, pb: 1 }}>
          {popular.map((loc) => (
            <MuiCard
              key={loc.id}
              onClick={() => router.push(`/local/${loc.id}`)}
              sx={{
                minWidth: 260,
                borderRadius: 5,
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                border: 'none',
                transition: 'transform 0.2s',
                '&:active': { transform: 'scale(0.98)' }
              }}
            >
              <Box sx={{ position: 'relative', height: 180 }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={loc.image}
                  sx={{ objectFit: 'cover' }}
                />
                <Box sx={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)'
                }} />
                <IconButton
                  size="small"
                  onClick={(e) => { e.stopPropagation(); dispatch(toggleFavorite(loc.id)); }}
                  sx={{
                    position: 'absolute', top: 12, right: 12,
                    bgcolor: 'rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(4px)',
                    '&:hover': { bgcolor: 'white' }
                  }}
                >
                  <Heart size={18} fill={favs.includes(loc.id) ? '#E67E22' : 'none'} color={favs.includes(loc.id) ? '#E67E22' : '#666'} />
                </IconButton>
                <Box sx={{ position: 'absolute', bottom: 12, left: 12, display: 'flex', alignItems: 'center', gap: 1 }}>
                   <Rating value={loc.rating} readOnly size="small" precision={0.5} sx={{ color: '#FFD700' }} />
                   <Typography sx={{ color: 'white', fontWeight: 900, fontSize: '0.75rem' }}>{loc.rating}</Typography>
                </Box>
              </Box>
              <MuiCardContent sx={{ p: 2 }}>
                <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: '#2C3E50', mb: 0.5 }}>{loc.name}</Typography>
                <Typography sx={{ color: '#7F8C8D', fontSize: '0.8rem', fontWeight: 600 }}>{loc.city}</Typography>
              </MuiCardContent>
            </MuiCard>
          ))}
        </Box>
      </Box>

      {/* Guide Tip Card */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 5,
          bgcolor: '#2C3E50',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Box sx={{
            bgcolor: 'rgba(230,126,34,0.2)',
            p: 1.5,
            borderRadius: 3,
            display: 'flex',
            border: '1px solid rgba(230,126,34,0.3)'
          }}>
            <Lightbulb size={24} color="#E67E22" />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 900, fontSize: '1rem', mb: 0.5, color: '#E67E22' }}>Dica de Hoje</Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, fontSize: '0.85rem', lineHeight: 1.5 }}>
              O pôr do sol na Orla de Atalaia é imperdível hoje às 17:45.
            </Typography>
          </Box>
        </Stack>
      </Paper>

      {/* Main List */}
      <Typography sx={{ fontSize: '1.2rem', fontWeight: 800, color: '#2C3E50', mb: 2 }}>
        {cat === 'Tudo' ? 'Explorar Sergipe' : `Melhores em ${cat}`}
      </Typography>
      <Stack spacing={2}>
        {filtered.map((loc) => (
          <Paper
            key={loc.id}
            onClick={() => router.push(`/local/${loc.id}`)}
            elevation={0}
            sx={{
              display: 'flex',
              borderRadius: 4,
              overflow: 'hidden',
              cursor: 'pointer',
              border: '1px solid #f0f0f0',
              bgcolor: 'white',
              transition: 'all 0.2s',
              '&:active': { transform: 'scale(0.98)', bgcolor: '#fafafa' }
            }}
          >
            <CardMedia
              component="img"
              image={loc.image}
              sx={{ width: 110, height: 110, objectFit: 'cover' }}
            />
            <Box sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="caption" sx={{ color: '#E67E22', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.65rem', mb: 0.5, letterSpacing: 0.5 }}>
                {loc.category}
              </Typography>
              <Typography sx={{ fontWeight: 800, fontSize: '0.95rem', color: '#2C3E50', mb: 0.5 }}>{loc.name}</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="caption" sx={{ color: '#7F8C8D', fontWeight: 600 }}>{loc.city}</Typography>
                <IconButton size="small" onClick={(e) => { e.stopPropagation(); dispatch(toggleFavorite(loc.id)); }}>
                  <Heart size={16} fill={favs.includes(loc.id) ? '#E67E22' : 'none'} color={favs.includes(loc.id) ? '#E67E22' : '#BDC3C7'} />
                </IconButton>
              </Box>
            </Box>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}

export default function HomePage() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileHome /> : <WebHome />;
}
