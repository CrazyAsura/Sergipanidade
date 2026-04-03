'use client';

import { useParams, useRouter } from 'next/navigation';
import { useIsMobile } from '@/hooks/useIsMobile';
import { locations } from '@/lib/mockData';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { toggleFavorite } from '@/lib/store/features/favorites/favoritesSlice';
import { ArrowLeft, Heart, Star, MapPin, Clock, Compass, Navigation } from 'lucide-react';
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
    <Box sx={{ p: 6, textAlign: 'center', mt: 10 }}>
      <Typography variant="h5" sx={{ fontWeight: 900, mb: 2 }}>Local não encontrado.</Typography>
      <MuiButton 
        variant="contained" 
        onClick={() => router.push('/')}
        sx={{ borderRadius: 4, bgcolor: '#E67E22' }}
      >
        Voltar para Home
      </MuiButton>
    </Box>
  );

  const isFav = favs.includes(id as string);

  return (
    <Box sx={{ pb: 12, mx: -2, mt: -2.5 }}>
      {/* Hero Image Section with Enhanced Presentation */}
      <Box sx={{ position: 'relative', height: 420, overflow: 'hidden' }}>
        <CardMedia
          component="img"
          image={loc.image}
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        
        {/* Animated Glass Controls */}
        <Box sx={{
          position: 'absolute', top: 20, left: 20, right: 20,
          display: 'flex', justifyContent: 'space-between', zIndex: 20
        }}>
          <IconButton
            onClick={() => router.back()}
            sx={{
              bgcolor: 'rgba(255,255,255,0.7)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              '&:hover': { bgcolor: 'white' }
            }}
          >
            <ArrowLeft size={22} color="#1A202C" />
          </IconButton>
          <IconButton
            onClick={() => dispatch(toggleFavorite(loc.id))}
            sx={{
              bgcolor: 'rgba(255,255,255,0.8)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              '&:hover': { bgcolor: 'white' }
            }}
          >
            <Heart size={22} fill={isFav ? '#E67E22' : 'none'} color={isFav ? '#E67E22' : '#1A202C'} />
          </IconButton>
        </Box>

        {/* Improved Overlay Gradient */}
        <Box sx={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 200,
          background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)',
          zIndex: 5
        }} />

        {/* Immersive Title Overlay */}
        <Box sx={{ position: 'absolute', bottom: 60, left: 24, right: 24, zIndex: 10 }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
             <Chip
               label={loc.category.toUpperCase()}
               sx={{
                 bgcolor: '#E67E22', color: 'white', fontWeight: 950,
                 fontSize: '0.6rem', height: 24, letterSpacing: 1.5,
                 boxShadow: '0 4px 12px rgba(230,126,34,0.4)', border: 'none'
               }}
             />
             <Box sx={{ px: 1.5, py: 0.2, bgcolor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', borderRadius: 4, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Star size={10} fill="#FFD700" color="#FFD700" />
                <Typography sx={{ color: 'white', fontWeight: 900, fontSize: '0.7rem' }}>{loc.rating}</Typography>
             </Box>
          </Box>
          <Typography variant="h3" sx={{ fontWeight: 950, color: 'white', textShadow: '0 4px 20px rgba(0,0,0,0.5)', mb: 0.5, letterSpacing: -1.5 }}>
            {loc.name}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <MapPin size={14} color="#E67E22" />
            <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '0.9rem', opacity: 0.9 }}>
              {loc.city}, Sergipe
            </Typography>
          </Stack>
        </Box>
      </Box>

      {/* Modern Floating Content Sheet */}
      <Paper elevation={0} sx={{
        position: 'relative', zIndex: 15,
        borderRadius: '40px 40px 0 0',
        p: 4, pt: 4, mt: -5,
        bgcolor: 'white',
        minHeight: '60vh',
        boxShadow: '0 -15px 50px rgba(0,0,0,0.1)'
      }}>
        {/* Handle for the sheet */}
        <Box sx={{ width: 48, height: 5, bgcolor: '#E2E8F0', borderRadius: 10, mx: 'auto', mb: 4 }} />

        <Box sx={{ mb: 4 }}>
           <Typography sx={{ fontWeight: 950, fontSize: '1.4rem', color: '#1A202C', mb: 1.5, letterSpacing: -0.5 }}>
             Sobre
           </Typography>
           <Typography variant="body1" sx={{ color: '#4A5568', lineHeight: 1.8, fontSize: '1rem', fontWeight: 500 }}>
             {loc.description}
           </Typography>
        </Box>

        {/* High-Fidelity Stats Grid */}
        <Grid container spacing={2.5} sx={{ mb: 5 }}>
          <Grid size={{ xs: 6 }}>
            <Paper elevation={0} sx={{
              p: 2.5, borderRadius: 4, bgcolor: '#FFF5EB', border: '1px solid rgba(230,126,34,0.05)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'
            }}>
              <Box sx={{ bgcolor: 'white', p: 1.5, borderRadius: 4, mb: 1.5, boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                <Navigation size={22} color="#E67E22" />
              </Box>
              <Typography variant="caption" sx={{ color: '#E67E22', fontWeight: 900, mb: 0.5, letterSpacing: 1 }}>DISTÂNCIA</Typography>
              <Typography sx={{ fontWeight: 950, color: '#1A202C', fontSize: '1.1rem' }}>{loc.distance}</Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Paper elevation={0} sx={{
              p: 2.5, borderRadius: 4, bgcolor: '#F0FFF4', border: '1px solid rgba(46,204,113,0.05)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'
            }}>
              <Box sx={{ bgcolor: 'white', p: 1.5, borderRadius: 4, mb: 1.5, boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                <Clock size={22} color="#2ECC71" />
              </Box>
              <Typography variant="caption" sx={{ color: '#2ECC71', fontWeight: 900, mb: 0.5, letterSpacing: 1 }}>TEMPO</Typography>
              <Typography sx={{ fontWeight: 950, color: '#1A202C', fontSize: '1.1rem' }}>{loc.time}</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Detailed Directions section */}
        <Box sx={{ mb: 5 }}>
           <Typography sx={{ fontWeight: 950, fontSize: '1.3rem', color: '#1A202C', mb: 3 }}>
             Ponto de Chegada
           </Typography>
           <Stack spacing={3.5}>
             {loc.directions.map((s, i) => (
               <Box key={i} sx={{ display: 'flex', gap: 3 }}>
                 <Box sx={{
                   minWidth: 36, height: 36, borderRadius: '14px',
                   bgcolor: i === 0 ? '#E67E22' : 'white',
                   color: i === 0 ? 'white' : '#1A202C',
                   border: i === 0 ? 'none' : '2px solid #F7FAFC',
                   display: 'flex', alignItems: 'center',
                   justifyContent: 'center', fontWeight: 950,
                   fontSize: '0.9rem', mt: 0.5,
                   boxShadow: i === 0 ? '0 8px 20px rgba(230,126,34,0.3)' : 'none'
                 }}>
                   {i + 1}
                 </Box>
                 <Box>
                    <Typography variant="body2" sx={{ color: '#4A5568', lineHeight: 1.7, fontSize: '0.95rem', fontWeight: 600 }}>
                      {s}
                    </Typography>
                 </Box>
               </Box>
             ))}
           </Stack>
        </Box>

        <MuiButton
          fullWidth
          variant="contained"
          startIcon={<Compass size={22} />}
          sx={{
            py: 2.2, borderRadius: 5, fontWeight: 950, fontSize: '1.05rem',
            bgcolor: '#E67E22', boxShadow: '0 12px 30px rgba(230,126,34,0.4)',
            textTransform: 'none', letterSpacing: -0.2,
            mb: 2,
            '&:hover': { bgcolor: '#D35400' }
          }}
        >
          Iniciar Viagem
        </MuiButton>
      </Paper>
    </Box>
  );
}

export default function LocationDetailPage() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileDetail /> : <WebDetail />;
}
