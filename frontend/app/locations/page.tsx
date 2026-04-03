'use client';

import { useState } from 'react';
import { locations, transformLocationsByCategory, getPopularLocations } from '@/lib/mockData';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '@/lib/store/features/favorites/favoritesSlice';
import { RootState } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/useIsMobile';

// Icons
import { Sun, Heart, Star, Search, MapPin, TrendingUp, ChevronRight, Filter, Compass, Navigation, ArrowRight } from 'lucide-react';

// Shadcn
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// MUI
import {
  Box, Typography, Paper, Chip, Stack, CardMedia,
  Card as MuiCard, CardContent as MuiCardContent, IconButton, TextField, InputAdornment, Divider, Button as MuiButton
} from '@mui/material';

const categories = ['Tudo', 'Praias', 'Museus', 'Gastronomia', 'Natureza', 'Cultura'];

function WebLocations() {
  const [cat, setCat] = useState('Tudo');
  const [search, setSearch] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((s: RootState) => s.auth);
  const favs = useSelector((s: RootState) => s.favorites.items || []);
  
  const filtered = transformLocationsByCategory(locations, cat).filter(l => 
    l.name.toLowerCase().includes(search.toLowerCase()) || 
    l.city.toLowerCase().includes(search.toLowerCase())
  );
  
  const popular = getPopularLocations(locations);

  return (
    <div className="space-y-16 animate-in fade-in duration-700 pb-20">
      {/* Header & Search with dynamic background */}
      <section className="relative p-12 md:p-20 rounded-[3rem] overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(230,126,34,0.3) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        </div>
        <div className="relative z-10 space-y-10 max-w-4xl">
          <div className="space-y-4">
             <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-orange-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-orange-900/50">
                   <Compass size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400">Guia de Exploração</span>
                  {user && (
                    <span className="text-sm font-bold text-gray-400">Bem-vindo(a), {user.name.split(' ')[0]}!</span>
                  )}
                </div>
             </div>
             <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter uppercase italic">
                Descubra o <span className="text-orange-500">Invisível</span> <br /> em Sergipe.
             </h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
             <div className="flex-1 relative group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                <input 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar destinos, cidades ou experiências..." 
                  className="w-full h-16 pl-14 pr-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 font-bold text-white placeholder:text-gray-500 shadow-2xl focus:ring-2 focus:ring-orange-500/50 outline-none transition-all text-lg" 
                />
             </div>
          </div>
        </div>
        <Navigation size={400} className="absolute -bottom-40 -right-20 text-white/5 rotate-12" />
      </section>

      {/* Category Filter Pills (Fixed variant) */}
      <div className="flex gap-3 overflow-x-auto pb-4 scroll-hide sticky top-24 z-30 bg-[#FDFCFB]/80 dark:bg-slate-950/80 backdrop-blur-md px-2 py-2 -mx-2">
         {categories.map((c) => (
           <button
             key={c}
             onClick={() => setCat(c)}
             className={`px-8 h-12 rounded-2xl text-[10px] font-black tracking-widest uppercase transition-all whitespace-nowrap border-2
               ${cat === c 
                 ? 'bg-orange-600 border-orange-600 text-white shadow-xl shadow-orange-100 dark:shadow-none translate-y-[-2px]' 
                 : 'bg-white dark:bg-slate-900 text-gray-400 border-gray-100 dark:border-slate-800 hover:border-orange-200 hover:text-orange-600'}`}
           >
             {c}
           </button>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between mb-10 pb-4 border-b border-gray-50 dark:border-slate-800">
             <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3 uppercase italic tracking-tighter">
                <Filter className="text-orange-500" size={24} />
                {cat} em Sergipe ({filtered.length})
             </h2>
             <div className="flex gap-2">
                <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Atualizado agora</span>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <AnimatePresence mode="popLayout">
              {filtered.map((loc, idx) => (
                <motion.div key={loc.id} layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} exit={{ opacity: 0, scale: 0.9 }}>
                  <Card className="overflow-hidden cursor-pointer group border-none bg-white dark:bg-slate-900 rounded-[3rem] shadow-xl shadow-gray-100/50 dark:shadow-none hover:shadow-2xl hover:ring-2 hover:ring-orange-100 dark:hover:ring-orange-900/30 transition-all duration-500" onClick={() => router.push(`/locations/${loc.id}`)}>
                    <div className="relative h-72">
                      <img src={loc.image} alt={loc.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out" />
                      <div className="absolute top-6 right-6 z-10 flex flex-col gap-3">
                        <IconButton 
                          size="medium" 
                          className="bg-white/90 backdrop-blur-md border-none shadow-xl hover:scale-110 active:scale-95 transition-all text-gray-400"
                          onClick={(e) => { e.stopPropagation(); dispatch(toggleFavorite(loc.id)); }}
                        >
                          <Heart size={20} className={favs.includes(loc.id) ? "fill-orange-500 text-orange-500" : ""} />
                        </IconButton>
                        <div className="bg-orange-600 text-white p-2 rounded-full shadow-lg flex items-center justify-center">
                           <Star size={16} fill="white" />
                        </div>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 p-8 bg-linear-to-t from-black/90 via-black/40 to-transparent">
                          <Badge className="bg-orange-600/20 text-orange-400 border-none text-[10px] font-black uppercase tracking-widest mb-2 backdrop-blur-md">{loc.category}</Badge>
                          <h3 className="text-3xl font-black text-white leading-none uppercase italic tracking-tighter">{loc.name}</h3>
                      </div>
                    </div>
                    <CardContent className="p-8">
                       <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2 text-gray-400">
                             <MapPin size={16} className="text-orange-500" />
                             <span className="text-xs font-black uppercase tracking-[0.2em]">{loc.city}</span>
                          </div>
                          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-slate-800 rounded-xl">
                             <TrendingUp size={14} className="text-green-500" />
                             <span className="text-xs font-black text-gray-700 dark:text-slate-300">EXPLORAR</span>
                             <ChevronRight size={14} className="text-gray-300" />
                          </div>
                       </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="lg:col-span-4">
           <div className="sticky top-28 space-y-10">
              <Paper elevation={0} sx={{ p: 5, borderRadius: 10, border: '1px solid #f0f0f0', bgcolor: 'white', shadow: '0 20px 40px rgba(0,0,0,0.02)' }}>
                 <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-black text-gray-900 uppercase italic tracking-tighter flex items-center gap-3">
                       <TrendingUp className="text-orange-500" /> Em Alta
                    </h3>
                    <Badge variant="outline" className="text-[10px] font-black uppercase border-gray-100">Sergipe</Badge>
                 </div>
                 <div className="space-y-8">
                    {popular.map((loc, i) => (
                      <motion.div key={loc.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex gap-5 cursor-pointer group" onClick={() => router.push(`/locations/${loc.id}`)}>
                         <div className="relative shrink-0">
                            <img src={loc.image} className="h-20 w-20 rounded-[1.5rem] object-cover shadow-lg group-hover:scale-105 transition-transform" />
                            <div className="absolute -top-2 -right-2 h-6 w-6 bg-orange-600 rounded-full flex items-center justify-center text-[10px] font-black text-white shadow-lg border-2 border-white">{i + 1}</div>
                         </div>
                         <div className="flex flex-col justify-center">
                            <h4 className="font-black text-base text-gray-900 group-hover:text-orange-500 transition-colors leading-tight uppercase italic">{loc.name}</h4>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1.5 flex items-center gap-1">
                               <MapPin size={10} /> {loc.city}
                            </p>
                         </div>
                      </motion.div>
                    ))}
                 </div>
                 <MuiButton fullWidth className="mt-10 h-14 bg-gray-50 hover:bg-orange-50 text-gray-400 hover:text-orange-600 font-black rounded-2xl transition-all uppercase tracking-widest text-[10px]">
                    Ver Ranking Completo
                 </MuiButton>
              </Paper>
              
              <Card className="bg-orange-600 text-white rounded-[3rem] p-10 relative overflow-hidden group">
                 <div className="absolute -right-20 -top-20 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                 <div className="relative z-10 space-y-6">
                    <Sun size={48} className="text-orange-200" />
                    <h3 className="text-3xl font-black leading-none uppercase italic tracking-tighter">Planeje seu <br /> Verão 2025.</h3>
                    <p className="text-orange-100 text-sm font-medium">As melhores praias e roteiros exclusivos para o próximo verão em Sergipe.</p>
                    <Button className="w-full bg-white text-orange-600 font-black rounded-2xl h-14">VER ROTEIROS</Button>
                 </div>
              </Card>
           </div>
        </div>
      </div>
    </div>
  );
}

function MobileLocations() {
  const [cat, setCat] = useState('Tudo');
  const [search, setSearch] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();
  const favs = useSelector((s: RootState) => s.favorites.items || []);
  
  const filtered = transformLocationsByCategory(locations, cat).filter(l => 
    l.name.toLowerCase().includes(search.toLowerCase()) || 
    l.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pb-10 space-y-6">
       <div className="flex justify-between items-end">
          <div>
             <h1 className="font-black text-3xl tracking-tighter leading-none mb-1 text-foreground uppercase italic">Descubra <span className="text-primary">Sergipe</span></h1>
             <p className="text-muted-foreground font-black text-[10px] tracking-widest uppercase">Explore o invisível</p>
          </div>
          <div className="p-3 bg-primary/10 rounded-2xl text-primary">
             <Filter size={20} />
          </div>
       </div>
       
       <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cidades, praias, museus..."
            className="w-full h-14 pl-12 pr-4 rounded-2xl bg-card border border-border font-bold text-foreground placeholder:text-muted-foreground shadow-lg shadow-black/5 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
          />
       </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scroll-hide -mx-4 px-4">
        {categories.map((c) => (
          <button 
            key={c}
            onClick={() => setCat(c)}
            className={`px-6 py-2.5 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all whitespace-nowrap
              ${cat === c 
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105' 
                : 'bg-card text-muted-foreground border border-border'}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="space-y-8">
        {filtered.map((loc, idx) => (
          <motion.div key={loc.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
            <div 
               onClick={() => router.push(`/locations/${loc.id}`)} 
               className="group relative bg-card rounded-[2.5rem] overflow-hidden border border-border shadow-xl shadow-black/5 active:scale-[0.98] transition-all"
            >
              <div className="relative aspect-video">
                 <img src={loc.image} alt={loc.name} className="w-full h-full object-cover" />
                 <div className="absolute top-4 right-4 left-4 flex justify-between items-center">
                    <span className="px-3 py-1 bg-black/50 backdrop-blur-md text-white rounded-lg font-black text-[10px] uppercase tracking-widest">{loc.category}</span>
                    <button 
                       className="h-10 w-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-gray-400 shadow-lg"
                       onClick={(e) => { e.stopPropagation(); dispatch(toggleFavorite(loc.id)); }}
                    >
                       <Heart size={18} className={favs.includes(loc.id) ? "fill-primary text-primary" : ""} />
                    </button>
                 </div>
                 <div className="absolute inset-x-0 bottom-0 p-6 bg-linear-to-t from-black/90 via-black/20 to-transparent">
                    <h3 className="text-2xl font-black text-white leading-none uppercase italic tracking-tighter mb-1">{loc.name}</h3>
                    <div className="flex items-center gap-1.5 opacity-80">
                       <MapPin size={12} className="text-primary" />
                       <span className="text-[10px] font-black text-white uppercase tracking-widest">{loc.city}</span>
                    </div>
                 </div>
              </div>
              <div className="px-8 py-5 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                     <div className="h-4 w-4 bg-green-500/10 rounded flex items-center justify-center text-green-500"><Star size={10} fill="currentColor" /></div>
                     <span className="font-black text-sm text-foreground">{loc.rating}</span>
                  </div>
                  <button className="text-primary font-black text-[10px] tracking-widest uppercase flex items-center gap-1">DETALHES <ArrowRight size={14} /></button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function LocationsPage() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileLocations /> : <WebLocations />;
}
