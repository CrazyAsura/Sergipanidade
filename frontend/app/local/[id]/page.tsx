'use client';

import { useParams, useRouter } from 'next/navigation';
import { useIsMobile } from '@/hooks/useIsMobile';
import { locations } from '@/lib/mockData';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { toggleFavorite } from '@/lib/store/features/favorites/favoritesSlice';
import { ArrowLeft, Heart, Star, MapPin, Clock, Compass } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Box, Typography, Paper, IconButton, Grid, Stack,
  Button as MuiButton, CardMedia, Chip, Rating
} from '@mui/material';

function WebDetail() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const loc = locations.find(l => l.id === id);
  const favs = useSelector((s: RootState) => s.favorites.items || []);
  if (!loc) return <p className="text-center py-20 text-gray-400">Local não encontrado.</p>;
  const isFav = favs.includes(id as string);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-gray-700"><ArrowLeft className="h-4 w-4" /> Voltar</button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative rounded-3xl overflow-hidden h-80 md:h-full min-h-[350px]">
          <img src={loc.image} alt={loc.name} className="w-full h-full object-cover" />
          <button onClick={() => dispatch(toggleFavorite(loc.id))} className="absolute top-4 right-4 p-3 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors">
            <Heart className={`h-5 w-5 ${isFav ? 'fill-orange-500 text-orange-500' : 'text-gray-600'}`} />
          </button>
        </div>
        <div className="space-y-6">
          <div>
            <Badge className="bg-orange-50 text-orange-600 border-orange-200 font-bold mb-3">{loc.category}</Badge>
            <h1 className="text-4xl font-black text-gray-900 mb-1">{loc.name}</h1>
            <div className="flex items-center gap-2"><Star className="h-5 w-5 fill-amber-400 text-amber-400" /><span className="font-black text-lg text-gray-700">{loc.rating}</span></div>
          </div>
          <div><h3 className="font-bold text-gray-900 mb-2">Sobre este lugar</h3><p className="text-gray-500 leading-relaxed">{loc.description}</p></div>
          <div className="grid grid-cols-2 gap-3">
            <Card className="border-gray-100"><CardContent className="pt-4"><div className="flex items-center gap-2 mb-1"><MapPin className="h-4 w-4 text-orange-500" /><span className="text-xs text-gray-400 font-bold">Distância</span></div><p className="font-black text-gray-900 text-lg ml-6">{loc.distance}</p></CardContent></Card>
            <Card className="border-gray-100"><CardContent className="pt-4"><div className="flex items-center gap-2 mb-1"><Clock className="h-4 w-4 text-orange-500" /><span className="text-xs text-gray-400 font-bold">Tempo</span></div><p className="font-black text-gray-900 text-lg ml-6">{loc.time}</p></CardContent></Card>
          </div>
          <div><h3 className="font-bold text-gray-900 mb-3">Como chegar</h3><div className="space-y-3">{loc.directions.map((s,i)=>(<div key={i} className="flex items-start gap-3"><div className="h-7 w-7 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center text-xs font-black shrink-0">{String.fromCharCode(65+i)}</div><p className="text-sm text-gray-500 mt-0.5">{s}</p></div>))}</div></div>
          <Button className="w-full h-12 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold"><Compass className="mr-2 h-5 w-5" /> INICIAR NAVEGAÇÃO</Button>
        </div>
      </div>
    </div>
  );
}

function MobileDetail() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const loc = locations.find(l => l.id === id);
  const favs = useSelector((s: RootState) => s.favorites.items || []);

  if (!loc) return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h6" color="text.secondary">Local não encontrado.</Typography>
      <MuiButton onClick={() => router.push('/')} sx={{ mt: 2 }}>Voltar para Home</MuiButton>
    </Box>
  );

  const isFav = favs.includes(id as string);

  return (
    <Box sx={{ pb: 10, mx: -2, mt: -1.5 }}>
      {/* Hero Image Section */}
      <Box sx={{ position: 'relative', height: 380, overflow: 'hidden' }}>
        <CardMedia
          component="img"
          image={loc.image}
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* Top Controls */}
        <Box sx={{
          position: 'absolute', top: 16, left: 16, right: 16,
          display: 'flex', justifyContent: 'space-between', zIndex: 10
        }}>
          <IconButton
            onClick={() => router.back()}
            sx={{
              bgcolor: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(8px)',
              '&:hover': { bgcolor: 'white' }
            }}
          >
            <ArrowLeft size={20} color="#2C3E50" />
          </IconButton>
          <IconButton
            onClick={() => dispatch(toggleFavorite(loc.id))}
            sx={{
              bgcolor: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(8px)',
              '&:hover': { bgcolor: 'white' }
            }}
          >
            <Heart size={20} fill={isFav ? '#E67E22' : 'none'} color={isFav ? '#E67E22' : '#2C3E50'} />
          </IconButton>
        </Box>

        {/* Bottom Image Gradient Overlay */}
        <Box sx={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 160,
          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
          zIndex: 5
        }} />

        {/* Title Overlay while on image */}
        <Box sx={{ position: 'absolute', bottom: 40, left: 24, right: 24, zIndex: 10 }}>
          <Chip
            label={loc.category}
            size="small"
            sx={{
              bgcolor: '#E67E22', color: 'white', fontWeight: 900,
              fontSize: '0.65rem', mb: 1, height: 22, border: 'none'
            }}
          />
          <Typography variant="h4" sx={{ fontWeight: 900, color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
            {loc.name}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
            <Rating value={loc.rating} readOnly size="small" sx={{ color: '#FFD700' }} />
            <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '0.85rem', opacity: 0.9 }}>
              {loc.rating} • {loc.city}
            </Typography>
          </Stack>
        </Box>
      </Box>

      {/* Content Sheet */}
      <Paper elevation={0} sx={{
        position: 'relative', zIndex: 15,
        borderRadius: '32px 32px 0 0',
        p: 3, pt: 4, mt: -4,
        bgcolor: '#FAFAFA',
        minHeight: 500,
        boxShadow: '0 -10px 40px rgba(0,0,0,0.1)'
      }}>
        <Box sx={{ width: 40, height: 4, bgcolor: '#eee', borderRadius: 2, mx: 'auto', mb: 4 }} />

        <Typography sx={{ fontWeight: 900, fontSize: '1.2rem', color: '#2C3E50', mb: 2 }}>
          Sobre este destino
        </Typography>
        <Typography variant="body1" sx={{ color: '#5D6D7E', lineHeight: 1.8, mb: 4, fontSize: '0.95rem' }}>
          {loc.description}
        </Typography>

        {/* Info Grid */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid size={{ xs: 6 }}>
            <Paper elevation={0} sx={{
              p: 2, borderRadius: 4, bgcolor: 'white', border: '1px solid #f0f0f0',
              display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'
            }}>
              <Box sx={{ bgcolor: '#EBF5FB', p: 1, borderRadius: 2, mb: 1 }}>
                <MapPin size={20} color="#3498DB" />
              </Box>
              <Typography variant="caption" sx={{ color: '#95A5A6', fontWeight: 800, mb: 0.5 }}>DISTÂNCIA</Typography>
              <Typography sx={{ fontWeight: 900, color: '#2C3E50' }}>{loc.distance}</Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Paper elevation={0} sx={{
              p: 2, borderRadius: 4, bgcolor: 'white', border: '1px solid #f0f0f0',
              display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'
            }}>
              <Box sx={{ bgcolor: '#FEF9E7', p: 1, borderRadius: 2, mb: 1 }}>
                <Clock size={20} color="#F1C40F" />
              </Box>
              <Typography variant="caption" sx={{ color: '#95A5A6', fontWeight: 800, mb: 0.5 }}>TEMPO MÉDIO</Typography>
              <Typography sx={{ fontWeight: 900, color: '#2C3E50' }}>{loc.time}</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Directions */}
        <Typography sx={{ fontWeight: 900, fontSize: '1.2rem', color: '#2C3E50', mb: 3 }}>
          Como chegar
        </Typography>
        <Stack spacing={3} sx={{ mb: 4 }}>
          {loc.directions.map((s, i) => (
            <Box key={i} sx={{ display: 'flex', gap: 2.5 }}>
              <Box sx={{
                minWidth: 32, height: 32, borderRadius: '12px',
                bgcolor: i === 0 ? '#E67E22' : '#2C3E50',
                color: 'white', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontWeight: 900,
                fontSize: '0.8rem', mt: 0.5,
                boxShadow: `0 4px 10px ${i === 0 ? 'rgba(230,126,34,0.3)' : 'rgba(44,62,80,0.2)'}`
              }}>
                {String.fromCharCode(65 + i)}
              </Box>
              <Typography variant="body2" sx={{ color: '#5D6D7E', lineHeight: 1.6, fontSize: '0.9rem' }}>
                {s}
              </Typography>
            </Box>
          ))}
        </Stack>

        <MuiButton
          fullWidth
          variant="contained"
          startIcon={<Compass size={20} />}
          sx={{
            py: 2, borderRadius: 4, fontWeight: 900, fontSize: '1rem',
            bgcolor: '#E67E22', boxShadow: '0 8px 25px rgba(230,126,34,0.4)',
            textTransform: 'none',
            '&:hover': { bgcolor: '#D35400' }
          }}
        >
          Iniciar Navegação
        </MuiButton>
      </Paper>
    </Box>
  );
}

export default function LocationDetail() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileDetail /> : <WebDetail />;
}
