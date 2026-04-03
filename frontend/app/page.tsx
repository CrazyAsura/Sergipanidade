'use client';

import { useState } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { locations, transformLocationsByCategory, getPopularLocations } from '@/lib/mockData';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '@/lib/store/features/favorites/favoritesSlice';
import { RootState } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';

// Icons
import { Sun, ChevronRight, Lightbulb, Heart, Star, Search, MapPin, TrendingUp, Bot, Sparkles, Navigation } from 'lucide-react';

// Shadcn
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

// MUI
import {
  Box, Typography, Paper, Chip, Stack, CardMedia,
  Card as MuiCard, CardContent as MuiCardContent, IconButton, Rating, TextField, InputAdornment,
  Button as MuiButton, Avatar
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
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Hero */}
      <section className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-orange-600 to-amber-500 p-12 md:p-20 shadow-2xl shadow-orange-500/20">
        <div className="relative z-10 max-w-2xl">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <p className="text-orange-100 text-sm font-black uppercase tracking-[0.3em] mb-4">Explore Sergipe • Brasil</p>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-8">
              A alma do <br />Nordeste <span className="text-amber-200 underline decoration-wavy decoration-orange-400">pulsa</span> aqui.
            </h1>
            <div className="flex gap-4 p-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] shadow-2xl">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-orange-200" />
                <Input placeholder="Onde a sua jornada começa?" className="pl-12 bg-transparent border-none text-white placeholder:text-orange-100 h-14 text-lg font-medium focus-visible:ring-0" />
              </div>
              <Button className="bg-white text-orange-600 hover:bg-orange-50 h-14 px-8 rounded-full font-black text-lg transition-transform hover:scale-105 active:scale-95">
                BUSCAR
              </Button>
            </div>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
           <div className="absolute top-0 right-0 w-[50%] h-full bg-linear-to-l from-orange-500/10 to-transparent skew-x-12 transform translate-x-20" />
           <img src="https://images.unsplash.com/photo-1596739942337-332463eacc76?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 mix-blend-overlay" />
        </div>
      </section>

      {/* Categories */}
      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-8 py-3.5 rounded-2xl text-base font-black transition-all whitespace-nowrap
              ${cat === c 
                ? 'bg-orange-500 text-white shadow-xl shadow-orange-500/30 -translate-y-1' 
                : 'bg-white dark:bg-slate-900 text-gray-500 dark:text-slate-400 hover:bg-orange-50 dark:hover:bg-slate-800 border border-gray-100 dark:border-slate-800'}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: List */}
        <div className="lg:col-span-8 space-y-10">
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-black dark-text-contrast flex items-center gap-3">
                <MapPin className="text-orange-500" size={28} />
                {cat === 'Tudo' ? 'Explorar Sergipe' : `Melhores em ${cat}`}
              </h2>
              <Badge variant="outline" className="px-4 py-1.5 rounded-full border-orange-200 text-orange-600 dark:text-orange-400 font-black">{filtered.length} Locais</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.map((loc) => (
                <motion.div key={loc.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Card className="flex overflow-hidden cursor-pointer group border-none bg-white dark:bg-slate-900 shadow-lg hover:shadow-2xl transition-all h-32 rounded-3xl" onClick={() => router.push(`/locations/${loc.id}`)}>
                    <div className="w-32 h-full overflow-hidden shrink-0">
                      <img src={loc.image} alt={loc.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <CardContent className="flex flex-col justify-center p-5">
                      <p className="text-[10px] font-black tracking-widest text-orange-500 uppercase mb-1">{loc.category}</p>
                      <h3 className="font-black text-xl text-gray-900 dark:text-white leading-tight mb-1">{loc.name}</h3>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">{loc.city}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Trending */}
        <div className="lg:col-span-4 space-y-8">
          <section className="sticky top-28">
            <Paper elevation={0} sx={{ p: 4, borderRadius: 8, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="text-orange-500" size={24} />
                <h2 className="text-xl font-black dark-text-contrast">Em Alta</h2>
              </div>
              <div className="space-y-6">
                {popular.map((loc) => (
                  <div key={loc.id} className="flex gap-4 cursor-pointer group" onClick={() => router.push(`/locations/${loc.id}`)}>
                    <div className="relative w-20 h-20 shrink-0">
                       <img src={loc.image} className="w-full h-full object-cover rounded-2xl shadow-md group-hover:scale-105 transition-transform" />
                       <div className="absolute -top-2 -left-2 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-[10px] font-black shadow-lg">
                          <Star size={8} fill="white" className="mr-0.5" />
                          {loc.rating}
                       </div>
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="font-black text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors leading-tight">{loc.name}</h4>
                      <p className="text-xs font-bold text-gray-400 uppercase">{loc.city}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-8 bg-slate-900 dark:bg-orange-500 text-white hover:bg-slate-800 dark:hover:bg-orange-600 h-12 rounded-2xl font-black">
                VER TODOS OS DESTAQUES
              </Button>
            </Paper>

            {/* AI Tip */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Card className="mt-8 bg-orange-500 border-none text-white p-6 rounded-[2rem] shadow-xl shadow-orange-500/20 relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm group-hover:rotate-12 transition-transform">
                      <Lightbulb size={20} className="text-amber-200" />
                    </div>
                    <span className="font-black text-xs uppercase tracking-widest">IA Sergipanidade</span>
                  </div>
                  <p className="text-lg font-bold leading-tight">"Hoje o Mercado Municipal está com ótimas opções de artesanato típico."</p>
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
              </Card>
            </motion.div>
          </section>
        </div>
      </div>
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
    <Box sx={{ pb: 6 }}>
      {/* Welcome Header */}
      <Box sx={{ mb: 4 }}>
         <Typography variant="h4" sx={{ fontWeight: 950, color: 'text.primary', mb: 0.5, letterSpacing: -1.5 }}>
           Olá, <span style={{ color: '#E67E22' }}>Viajante!</span>
         </Typography>
         <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600, mb: 3 }}>
           O que vamos descobrir hoje em Sergipe?
         </Typography>
        <TextField
          fullWidth
          placeholder="Praias, Museus, Restaurantes..."
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={22} color="#E67E22" />
              </InputAdornment>
            ),
            sx: {
              borderRadius: 5,
              bgcolor: 'white',
              height: 56,
              boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
              '& fieldset': { border: '1px solid rgba(0,0,0,0.03)' },
              '&:hover fieldset': { borderColor: 'rgba(230,126,34,0.2)' },
              fontWeight: 700,
              fontSize: '0.95rem'
            }
          }}
        />
      </Box>

      {/* Hero / Weather Card */}
      <Box sx={{
        mb: 5,
        p: 3.5,
        borderRadius: 6,
        background: 'linear-gradient(135deg, #E67E22 0%, #F39C12 50%, #D35400 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(230,126,34,0.4)',
      }}>
        {/* Subtle texture overlay */}
        <Box sx={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
          backgroundSize: '24px 24px',
          opacity: 0.3
        }} />
        
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
             <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                   <MapPin size={14} color="white" />
                   <Typography variant="caption" sx={{ fontWeight: 900, opacity: 0.9, letterSpacing: 1.5, fontSize: '0.65rem', textTransform: 'uppercase' }}>
                     Aracaju, Sergipe
                   </Typography>
                </Box>
                <Typography variant="h2" sx={{ fontWeight: 950, mb: 0.5, lineHeight: 1, letterSpacing: -2 }}>28°C</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 1.5 }}>
                   <Box sx={{ px: 1.5, py: 0.5, bgcolor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', borderRadius: 2 }}>
                      <Typography sx={{ fontWeight: 800, fontSize: '0.75rem' }}>☀️ Ensolarado</Typography>
                   </Box>
                   <Typography variant="caption" sx={{ fontWeight: 700, opacity: 0.8 }}>Um ótimo dia pra praia!</Typography>
                </Box>
             </Box>
             <Box sx={{ p: 1.5, bgcolor: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(10px)', borderRadius: 3.5, boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                <TrendingUp size={24} />
             </Box>
          </Stack>
        </Box>
        <Sun size={200} style={{ position: 'absolute', bottom: -70, right: -70, opacity: 0.2, color: 'white', filter: 'blur(2px)' }} />
      </Box>

      {/* Categories Scroller */}
      <Box sx={{ mb: 5 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.5 }}>
          <Typography sx={{ fontSize: '1.2rem', fontWeight: 950, color: 'text.primary', letterSpacing: -0.5 }}>
            Categorias
          </Typography>
          <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 800, cursor: 'pointer' }}>Ver tudo</Typography>
        </Stack>
        <Box sx={{ overflowX: 'auto', display: 'flex', gap: 2, '&::-webkit-scrollbar': { display: 'none' }, mx: -2, px: 2, py: 1 }}>
          {categories.map((c) => (
            <Box
              key={c}
              onClick={() => setCat(c)}
              sx={{
                flexShrink: 0,
                height: 52,
                px: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '0.9rem',
                borderRadius: 4,
                bgcolor: cat === c ? 'primary.main' : 'white',
                color: cat === c ? 'white' : 'text.secondary',
                boxShadow: cat === c ? '0 10px 20px rgba(230,126,34,0.35)' : '0 4px 15px rgba(0,0,0,0.03)',
                border: '1px solid',
                borderColor: cat === c ? 'transparent' : 'rgba(0,0,0,0.03)',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                cursor: 'pointer',
                '&:active': { transform: 'scale(0.9)' }
              }}
            >
              {c}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Featured Grid */}
      <Box sx={{ mb: 6 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.5 }}>
          <Typography sx={{ fontSize: '1.3rem', fontWeight: 950, color: 'text.primary', letterSpacing: -0.5 }}>Para você</Typography>
          <IconButton sx={{ color: 'primary.main', bgcolor: 'rgba(230,126,34,0.05)' }}><ChevronRight size={20} /></IconButton>
        </Stack>
        <Box sx={{ overflowX: 'auto', display: 'flex', gap: 3, '&::-webkit-scrollbar': { display: 'none' }, mx: -2, px: 2, pb: 2 }}>
          {popular.map((loc) => (
            <MuiCard
              key={loc.id}
              onClick={() => router.push(`/locations/${loc.id}`)}
              sx={{
                minWidth: 300,
                borderRadius: 5,
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
                border: 'none',
                bgcolor: 'background.paper',
                transition: 'all 0.3s ease',
                '&:active': { transform: 'scale(0.96)' }
              }}
            >
              <Box sx={{ position: 'relative', height: 220 }}>
                <CardMedia component="img" height="220" image={loc.image} sx={{ objectFit: 'cover' }} />
                <Box sx={{
                  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 40%, transparent 70%)'
                }} />
                
                {/* Floating Elements on Card */}
                <Box sx={{ position: 'absolute', top: 16, left: 16 }}>
                   <Box sx={{ px: 1.5, py: 0.5, bgcolor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', borderRadius: 2, border: '1px solid rgba(255,255,255,0.1)' }}>
                      <Typography sx={{ color: 'white', fontWeight: 900, fontSize: '0.65rem' }}>FEATURED</Typography>
                   </Box>
                </Box>

                <IconButton
                  size="small"
                  onClick={(e) => { e.stopPropagation(); dispatch(toggleFavorite(loc.id)); }}
                  sx={{
                    position: 'absolute', top: 16, right: 16,
                    bgcolor: 'rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(8px)',
                    color: favs.includes(loc.id) ? '#E67E22' : '#999',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                    '&:active': { transform: 'scale(1.2)' }
                  }}
                >
                  <Heart size={22} fill={favs.includes(loc.id) ? '#E67E22' : 'none'} />
                </IconButton>

                <Box sx={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
                   <Typography sx={{ color: 'white', fontWeight: 950, fontSize: '1.25rem', mb: 0.5, lineHeight: 1.2 }}>{loc.name}</Typography>
                   <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" spacing={1} alignItems="center">
                         <MapPin size={14} color="#E67E22" />
                         <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 700, fontSize: '0.85rem' }}>{loc.city}</Typography>
                      </Stack>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                         <Star size={14} fill="#FFD700" color="#FFD700" />
                         <Typography sx={{ color: 'white', fontWeight: 900, fontSize: '0.85rem' }}>{loc.rating}</Typography>
                      </Box>
                   </Stack>
                </Box>
              </Box>
            </MuiCard>
          ))}
        </Box>
      </Box>

      {/* Guide Card (Premium) */}
      <Box sx={{ 
        bgcolor: 'white', 
        borderRadius: 9, 
        p: 3.5, 
        border: '1px solid rgba(0,0,0,0.04)', 
        mb: 4,
        boxShadow: '0 15px 45px rgba(0,0,0,0.06)',
        position: 'relative',
        overflow: 'hidden'
      }}>
         <Box sx={{ position: 'absolute', top: -20, right: -20, width: 120, height: 120, background: 'radial-gradient(circle, rgba(230,126,34,0.08) 0%, transparent 70%)', borderRadius: '50%' }} />
         
         <Stack direction="row" spacing={2.5} alignItems="center" sx={{ mb: 3.5 }}>
            <Box sx={{ p: 2, bgcolor: '#FFF5EB', borderRadius: 4, boxShadow: 'inset 0 2px 10px rgba(230,126,34,0.1)' }}>
               <Bot size={30} color="#E67E22" />
            </Box>
            <Box>
               <Typography sx={{ fontWeight: 950, fontSize: '1.1rem', color: 'text.primary', letterSpacing: -0.5 }}>Guia Inteligente</Typography>
               <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  Exploração baseada em seu estilo <Sparkles size={10} color="#E67E22" />
               </Typography>
            </Box>
         </Stack>

         <Stack spacing={2.5}>
           {filtered.slice(0, 3).map((loc, idx) => (
             <Box 
               key={loc.id} 
               onClick={() => router.push(`/locations/${loc.id}`)} 
               sx={{ 
                 display: 'flex', 
                 gap: 2.5, 
                 alignItems: 'center',
                 p: 1.5,
                 borderRadius: 5,
                 transition: 'all 0.2s ease',
                 '&:active': { bgcolor: 'rgba(230,126,34,0.05)', transform: 'translateY(-2px)' }
               }}
             >
                <Avatar 
                  variant="rounded" 
                  src={loc.image} 
                  sx={{ width: 72, height: 72, borderRadius: 4, boxShadow: '0 8px 20px rgba(0,0,0,0.08)', border: '2px solid white' }} 
                />
                <Box sx={{ flex: 1 }}>
                   <Typography sx={{ fontWeight: 900, fontSize: '1rem', color: 'text.primary', mb: 0.5 }}>{loc.name}</Typography>
                   <Stack direction="row" spacing={1} alignItems="center" sx={{ opacity: 0.7 }}>
                      <Navigation size={12} />
                      <Typography variant="caption" sx={{ fontWeight: 750, letterSpacing: 0.5 }}>{loc.city}</Typography>
                   </Stack>
                </Box>
                <IconButton size="small" sx={{ color: '#E2E8F0', bgcolor: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                   <ChevronRight size={18} />
                </IconButton>
             </Box>
           ))}
           <MuiButton 
             fullWidth 
             variant="outlined" 
             sx={{ 
               mt: 1, p: 1.5, borderRadius: 4, fontWeight: 900, fontSize: '0.85rem', 
               borderColor: 'rgba(230,126,34,0.2)', color: 'primary.main',
               textTransform: 'none',
               '&:hover': { bgcolor: 'rgba(230,126,34,0.03)', borderColor: 'primary.main' }
             }}
           >
             Ver todas as sugestões
           </MuiButton>
         </Stack>
      </Box>
    </Box>
  );
}

export default function HomePage() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileHome /> : <WebHome />;
}
