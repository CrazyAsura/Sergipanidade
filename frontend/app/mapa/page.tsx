'use client';

import { useState } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { locations } from '@/lib/mockData';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { toggleFavorite } from '@/lib/store/features/favorites/favoritesSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Mic, MapPin, Navigation, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Box, Typography, Paper, TextField, InputAdornment, IconButton, Chip, Stack, CardMedia, Card as MuiCard, CardContent as MuiCardContent } from '@mui/material';

function WebMapa() {
  const [sel, setSel] = useState(locations[2]);
  const dispatch = useDispatch();
  const favs = useSelector((s: RootState) => s.favorites.items || []);
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between"><h1 className="text-4xl font-black text-gray-900">Explorar <span className="text-orange-500">Mapa</span></h1></div>
      <div className="flex gap-3 flex-wrap items-center">
        <div className="flex-1 max-w-md relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" /><Input placeholder="Buscar pontos turísticos..." className="pl-10 h-11 rounded-xl" /></div>
        {['Tudo','Praias','Histórico','Gastronomia'].map((c,i)=>(<button key={c} className={`px-4 py-2 rounded-full text-sm font-bold ${i===0?'bg-orange-500 text-white':'bg-white text-gray-500 border border-gray-100 hover:bg-orange-50'}`}>{c}</button>))}
      </div>
      <div className="relative rounded-3xl overflow-hidden bg-slate-100 h-[50vh]" style={{backgroundImage:'radial-gradient(#CBD5E0 1px, transparent 1px)',backgroundSize:'30px 30px'}}>
        {locations.map((loc,i)=>(<motion.div key={loc.id} animate={{y:[0,-6,0]}} transition={{repeat:Infinity,duration:2+i*0.5}} style={{position:'absolute',top:`${25+i*15}%`,left:`${30+i*15}%`}} className="cursor-pointer" onClick={()=>setSel(loc)}><MapPin className={`h-10 w-10 ${sel.id===loc.id?'text-orange-500 fill-orange-500':'text-orange-400 fill-white'} drop-shadow-lg`} /></motion.div>))}
        {sel && (
          <motion.div initial={{y:100,opacity:0}} animate={{y:0,opacity:1}} className="absolute bottom-6 left-6 right-6">
            <Card className="flex overflow-hidden shadow-2xl border-none"><img src={sel.image} alt={sel.name} className="w-32 h-32 object-cover" />
              <CardContent className="flex flex-col justify-center py-3"><div className="flex items-center justify-between"><h3 className="text-lg font-black text-gray-900">{sel.name}</h3><button onClick={()=>dispatch(toggleFavorite(sel.id))}><Heart className={`h-5 w-5 ${favs.includes(sel.id)?'fill-orange-500 text-orange-500':'text-gray-300'}`} /></button></div><p className="text-sm text-gray-400">{sel.city}</p><div className="flex gap-2 mt-2"><Badge className="bg-orange-50 text-orange-600 border-orange-200 font-bold">ABERTO</Badge><span className="text-xs text-gray-400 flex items-center gap-1"><Navigation className="h-3 w-3" />{sel.distance}</span></div></CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function MobileMapa() {
  const [sel, setSel] = useState(locations[2]);
  const dispatch = useDispatch();
  const favs = useSelector((s: RootState) => s.favorites.items || []);
  return (
    <Box sx={{ height:'calc(100vh - 140px)', position:'relative', mx:-2, mt:-2, overflow:'hidden' }}>
      <Box sx={{ position:'absolute', top:16, left:16, right:16, zIndex:10 }}>
        <TextField fullWidth placeholder="Buscar..." size="small" sx={{'& .MuiOutlinedInput-root':{borderRadius:3,bgcolor:'white',boxShadow:'0 4px 20px rgba(0,0,0,0.08)','& fieldset':{border:'none'}}}} InputProps={{startAdornment:<InputAdornment position="start"><Search size={18} color="#999" /></InputAdornment>,endAdornment:<InputAdornment position="end"><IconButton size="small"><Mic size={18} color="#999" /></IconButton></InputAdornment>}} />
        <Stack direction="row" spacing={1} sx={{mt:1.5}}>
          {['Tudo','Praias','Histórico','Gastronomia'].map((c,i)=>(<Chip key={c} label={c} sx={{bgcolor:i===0?'#E67E22':'white',color:i===0?'white':'#666',boxShadow:'0 2px 8px rgba(0,0,0,0.04)',fontWeight:700,border:'none',fontSize:'0.7rem'}} />))}
        </Stack>
      </Box>
      <Box sx={{width:'100%',height:'100%',bgcolor:'#E2E8F0',backgroundImage:'radial-gradient(#CBD5E0 1px, transparent 1px)',backgroundSize:'30px 30px',position:'relative'}}>
        {locations.map((loc,i)=>(<motion.div key={loc.id} animate={{y:[0,-5,0]}} transition={{repeat:Infinity,duration:2+i*0.5}} style={{position:'absolute',top:`${25+i*15}%`,left:`${30+i*15}%`}} onClick={()=>setSel(loc)}><MapPin size={32} color="#E67E22" fill={sel.id===loc.id?'#E67E22':'white'} /></motion.div>))}
      </Box>
      <AnimatePresence>{sel && (
        <motion.div initial={{y:200}} animate={{y:0}} exit={{y:200}} transition={{type:'spring',damping:25}} style={{position:'absolute',bottom:16,left:16,right:16,zIndex:10}}>
          <MuiCard sx={{display:'flex',p:1.5,borderRadius:4,boxShadow:'0 12px 40px rgba(0,0,0,0.12)',border:'1px solid #eee'}}>
            <CardMedia component="img" image={sel.image} sx={{width:100,height:100,borderRadius:3,objectFit:'cover'}} />
            <MuiCardContent sx={{flex:1,p:1.5,display:'flex',flexDirection:'column',justifyContent:'center'}}>
              <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><Typography sx={{fontWeight:800,fontSize:'0.9rem'}}>{sel.name}</Typography><IconButton size="small" onClick={()=>dispatch(toggleFavorite(sel.id))}><Heart size={16} fill={favs.includes(sel.id)?'#E67E22':'none'} color={favs.includes(sel.id)?'#E67E22':'#999'} /></IconButton></Box>
              <Typography variant="caption" color="text.secondary">{sel.city}</Typography>
              <Box sx={{display:'flex',gap:1,mt:1}}><Chip label="ABERTO" size="small" sx={{bgcolor:'#FFF5EB',color:'#E67E22',fontWeight:800,height:22,fontSize:'0.6rem'}} /><Box sx={{display:'flex',alignItems:'center',gap:0.5}}><Navigation size={12} color="#999" /><Typography variant="caption" sx={{fontWeight:800}}>{sel.distance}</Typography></Box></Box>
            </MuiCardContent>
          </MuiCard>
        </motion.div>
      )}</AnimatePresence>
    </Box>
  );
}

export default function MapaPage() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileMapa /> : <WebMapa />;
}
