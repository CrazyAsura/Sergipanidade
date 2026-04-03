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
  if (!loc) return <p className="text-center py-20 text-muted-foreground">Local não encontrado.</p>;
  const isFav = favs.includes(id as string);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-sm font-black text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest"><ArrowLeft className="h-4 w-4" /> Voltar</button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="relative rounded-[3rem] overflow-hidden h-80 md:h-full min-h-[450px] shadow-2xl">
          <img src={loc.image} alt={loc.name} className="w-full h-full object-cover" />
          <button onClick={() => dispatch(toggleFavorite(loc.id))} className="absolute top-6 right-6 p-4 rounded-full bg-background/80 backdrop-blur-md hover:bg-background transition-all shadow-xl active:scale-90">
            <Heart className={`h-6 w-6 ${isFav ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
          </button>
        </div>
        <div className="space-y-10">
          <div className="space-y-4">
            <Badge className="bg-primary/10 text-primary border-none font-black px-4 py-1.5 rounded-full uppercase tracking-widest text-[10px]">{loc.category}</Badge>
            <h1 className="text-5xl font-black text-foreground uppercase italic tracking-tighter leading-none">{loc.name}</h1>
            <div className="flex items-center gap-2"><Star className="h-6 w-6 fill-amber-400 text-amber-400" /><span className="font-black text-2xl text-foreground">{loc.rating}</span></div>
          </div>
          <div className="space-y-4">
            <h3 className="font-black text-foreground uppercase italic tracking-tighter text-xl">Sobre este lugar</h3>
            <p className="text-muted-foreground leading-relaxed font-medium text-lg">{loc.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-card p-6 rounded-[2rem] border border-border shadow-xl shadow-black/5">
              <div className="flex items-center gap-2 mb-2"><MapPin className="h-5 w-5 text-primary" /><span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Distância</span></div>
              <p className="font-black text-foreground text-2xl ml-7">{loc.distance}</p>
            </div>
            <div className="bg-card p-6 rounded-[2rem] border border-border shadow-xl shadow-black/5">
              <div className="flex items-center gap-2 mb-2"><Clock className="h-5 w-5 text-primary" /><span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Tempo</span></div>
              <p className="font-black text-foreground text-2xl ml-7">{loc.time}</p>
            </div>
          </div>
          <div className="space-y-5">
            <h3 className="font-black text-foreground uppercase italic tracking-tighter text-xl">Como chegar</h3>
            <div className="space-y-4">
              {loc.directions.map((s,i)=>(
                <div key={i} className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xs font-black shrink-0 shadow-sm">{String.fromCharCode(65+i)}</div>
                  <p className="text-base text-muted-foreground font-bold mt-1 leading-snug">{s}</p>
                </div>
              ))}
            </div>
          </div>
          <Button className="w-full h-16 rounded-[2rem] bg-primary hover:bg-primary/90 text-primary-foreground font-black text-lg shadow-xl shadow-primary/20 active:scale-95 transition-all uppercase tracking-tight">
            <Compass className="mr-3 h-6 w-6" /> INICIAR NAVEGAÇÃO
          </Button>
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
    <div className="p-10 text-center space-y-4">
      <h2 className="text-2xl font-black text-foreground">Local não encontrado.</h2>
      <Button onClick={() => router.push('/')} className="bg-primary text-primary-foreground font-black px-8 h-14 rounded-2xl">Voltar para Home</Button>
    </div>
  );

  const isFav = favs.includes(id as string);

  return (
    <div className="pb-20 -mx-4 -mt-10 min-h-screen bg-background">
      {/* Hero Image Section */}
      <div className="relative h-[450px] overflow-hidden">
        <img src={loc.image} alt={loc.name} className="w-full h-full object-cover" />
        
        {/* Controls */}
        <div className="absolute top-6 left-6 right-6 flex justify-between z-20">
          <button
            onClick={() => router.back()}
            className="h-12 w-12 rounded-2xl bg-black/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-white active:scale-90 transition-all"
          >
            <ArrowLeft size={24} />
          </button>
          <button
            onClick={() => dispatch(toggleFavorite(loc.id))}
            className="h-12 w-12 rounded-2xl bg-black/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-white active:scale-90 transition-all"
          >
            <Heart size={24} className={isFav ? 'fill-primary text-primary' : ''} />
          </button>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-background via-background/40 to-transparent z-5" />

        {/* Title Overlay */}
        <div className="absolute bottom-12 left-6 right-6 z-10 space-y-3">
          <div className="flex gap-2">
             <span className="px-3 py-1 bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-widest rounded-lg shadow-lg shadow-primary/30">{loc.category}</span>
             <div className="px-3 py-1 bg-black/30 backdrop-blur-md text-white rounded-lg font-black text-[10px] flex items-center gap-1">
                <Star size={10} fill="#FFD700" color="#FFD700" />
                {loc.rating}
             </div>
          </div>
          <h1 className="text-4xl font-black text-foreground uppercase italic tracking-tighter leading-none">{loc.name}</h1>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin size={14} className="text-primary" />
            <span className="text-[10px] font-black uppercase tracking-widest leading-none">{loc.city}, Sergipe</span>
          </div>
        </div>
      </div>

      {/* Content Sheet */}
      <div className="relative z-15 bg-background rounded-t-[3rem] px-6 pt-8 -mt-8 space-y-10 min-h-[50vh]">
        <div className="w-12 h-1.5 bg-muted rounded-full mx-auto" />

        <div className="space-y-4">
           <h3 className="text-xl font-black text-foreground uppercase italic tracking-tighter">Sobre</h3>
           <p className="text-muted-foreground font-bold text-sm leading-relaxed">{loc.description}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-5 rounded-[2rem] bg-primary/5 border border-primary/5 flex flex-col items-center text-center space-y-2 group active:scale-95 transition-all">
            <div className="p-3 bg-card rounded-2xl shadow-xl shadow-black/5 text-primary group-hover:scale-110 transition-transform"><Navigation size={22} /></div>
            <p className="text-[9px] font-black tracking-widest uppercase text-primary/70">DISTÂNCIA</p>
            <p className="text-lg font-black text-foreground uppercase tracking-tighter italic">{loc.distance}</p>
          </div>
          <div className="p-5 rounded-[2rem] bg-primary/5 border border-primary/5 flex flex-col items-center text-center space-y-2 group active:scale-95 transition-all">
            <div className="p-3 bg-card rounded-2xl shadow-xl shadow-black/5 text-primary group-hover:scale-110 transition-transform"><Clock size={22} /></div>
            <p className="text-[9px] font-black tracking-widest uppercase text-primary/70">TEMPO</p>
            <p className="text-lg font-black text-foreground uppercase tracking-tighter italic">{loc.time}</p>
          </div>
        </div>

        {/* Directions */}
        <div className="space-y-6 pb-10">
           <h3 className="text-xl font-black text-foreground uppercase italic tracking-tighter">Ponto de Chegada</h3>
           <div className="space-y-6">
             {loc.directions.map((s, i) => (
               <div key={i} className="flex gap-4 items-start">
                 <div className={`h-10 w-10 min-w-[40px] rounded-2xl flex items-center justify-center font-black text-sm shadow-lg ${i === 0 ? 'bg-primary text-primary-foreground shadow-primary/20' : 'bg-card text-foreground border border-border'}`}>
                   {i + 1}
                 </div>
                 <p className="text-xs font-bold text-muted-foreground leading-relaxed pt-1">{s}</p>
               </div>
             ))}
           </div>
        </div>

        <Button className="w-full h-16 bg-primary text-primary-foreground font-black text-lg rounded-[2rem] shadow-2xl shadow-primary/30 active:scale-95 transition-all uppercase tracking-tight">
          <Compass className="mr-3 h-6 w-6" /> Iniciar Viagem
        </Button>
      </div>
    </div>
  );
}

export default function LocationDetailPage() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileDetail /> : <WebDetail />;
}
