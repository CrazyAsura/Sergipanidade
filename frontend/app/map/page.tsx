'use client';

import { useState, useMemo, useCallback } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { locations, Location, transformLocationsByCategory } from '@/lib/mockData';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { toggleFavorite } from '@/lib/store/features/favorites/favoritesSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Mic, MapPin, Navigation, Heart, Phone, Shield, Ambulance, X, Utensils, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Box, Typography, Paper, TextField, InputAdornment, IconButton, Chip, Stack, CardMedia, Card as MuiCard, CardContent as MuiCardContent, Fab, Divider, useTheme } from '@mui/material';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, Autocomplete } from '@react-google-maps/api';

const GOOGLE_MAPS_API_KEY = "AIzaSyCR5ufBKKAVWYAovmT9-TG9F7gg66cgXDg";
const mapContainerStyle = { width: '100%', height: '100%' };
const center = { lat: -10.9472, lng: -37.0731 }; // Aracaju center

const categories = [
  { label: 'Tudo', type: 'Tudo', icon: MapPin },
  { label: 'Praias', type: 'beach', icon: Navigation },
  { label: 'Gastronomia', type: 'gastronomy', icon: Utensils },
  { label: 'Museus', type: 'museum', icon: Info },
  { label: 'Histórico', type: 'historic', icon: Shield },
];

function LocationCard({ sel, onClose, isMobile }: { sel: Location, onClose: () => void, isMobile: boolean }) {
  const dispatch = useDispatch();
  const favs = useSelector((s: RootState) => s.favorites.items || []);
  const isFav = favs.includes(sel.id);

  return (
    <motion.div 
      initial={{ y: 200, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      exit={{ y: 200, opacity: 0 }}
      className={`absolute ${isMobile ? 'bottom-28' : 'bottom-6'} left-4 right-4 md:left-6 md:right-6 z-50`}
    >
      <Card className="overflow-hidden shadow-2xl border-none bg-white/95 dark:bg-slate-900/95 backdrop-blur-md ring-1 ring-black/5 dark:ring-white/10">
        <div className="flex relative">
          <img src={sel.image} alt={sel.name} className="w-1/3 h-48 object-cover" />
          <IconButton 
            onClick={onClose} 
            size="small" 
            className="absolute top-2 right-2 bg-white/50 hover:bg-white transition-colors"
          >
            <X size={16} />
          </IconButton>
          
          <CardContent className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto max-h-64">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white leading-tight">{sel.name}</h3>
                <p className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-tighter">{sel.city}</p>
              </div>
              <IconButton onClick={() => dispatch(toggleFavorite(sel.id))}>
                <Heart className={`h-6 w-6 ${isFav ? 'fill-orange-500 text-orange-500' : 'text-gray-300 dark:text-slate-700'}`} />
              </IconButton>
            </div>

            <div className="flex gap-2 items-center">
              <Badge className="bg-orange-50 text-orange-600 border-orange-200">ABERTO</Badge>
              <div className="flex items-center gap-1 text-xs font-bold text-gray-400">
                <Navigation size={12} /> {sel.distance}
              </div>
            </div>

            <p className="text-xs text-gray-500 line-clamp-2 mt-1 font-medium">{sel.description}</p>

            {sel.menu && (
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2 text-xs font-black text-orange-600 uppercase">
                  <Utensils size={14} /> Cardápio / Produtos
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {sel.menu.map((item, idx) => (
                    <div key={idx} className="shrink-0 w-24 space-y-1">
                      <img src={item.image} alt={item.name} className="w-24 h-16 object-cover rounded-lg shadow-sm border border-orange-50 dark:border-slate-800" />
                      <p className="text-[10px] font-black text-gray-800 dark:text-slate-200 leading-tight truncate">{item.name}</p>
                      <p className="text-[10px] font-bold text-orange-500">{item.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
}

function MapInterface({ isMobile }: { isMobile: boolean }) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ['places']
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [sel, setSel] = useState<Location | null>(null);
  const [category, setCategory] = useState('Tudo');

  const filteredLocations = useMemo(() => transformLocationsByCategory(locations, category), [category]);

  const onMapLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  }, []);

  const handleCall = (num: string) => {
    window.open(`tel:${num}`, '_self');
  };

  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  const onAutocompleteLoad = (auto: google.maps.places.Autocomplete) => {
    setAutocomplete(auto);
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location && map) {
        map.panTo(place.geometry.location);
        map.setZoom(15);
      }
    }
  };

  const mapStyles = isDarkMode ? [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
    { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
    { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
    { featureType: "road", elementType: "geometry", stylers: [{ color: "#38414e" }] },
    { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#212a37" }] },
    { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9ca5b3" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] },
  ] : [
    { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] }
  ];

  if (!isLoaded) return <div className="w-full h-full bg-slate-100 dark:bg-slate-950 animate-pulse flex items-center justify-center font-black text-slate-300 dark:text-slate-800">Carregando Mapa...</div>;

  return (
    <div className="relative w-full h-full">
      {/* Search Bar */}
      <div className="absolute top-16 left-4 right-16 z-20 md:top-4 md:left-[210px] md:right-[210px] transition-all">
        <Autocomplete onLoad={onAutocompleteLoad} onPlaceChanged={onPlaceChanged}>
          <TextField 
            fullWidth 
            placeholder="Buscar local..." 
            size="small" 
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 4,
                bgcolor: isDarkMode ? 'rgba(30, 41, 59, 0.9)' : 'white',
                backdropFilter: 'blur(10px)',
                boxShadow: isDarkMode ? '0 8px 32px rgba(0,0,0,0.4)' : '0 8px 32px rgba(0,0,0,0.12)',
                '& fieldset': { border: 'none' },
                color: isDarkMode ? 'white' : 'inherit'
              }
            }}
            InputProps={{
              startAdornment: <InputAdornment position="start"><Search size={18} color="#E67E22" /></InputAdornment>
            }}
          />
        </Autocomplete>
      </div>

      {/* Category Filter */}
      <div className={`absolute top-4 left-4 right-4 z-10 flex gap-2 overflow-x-auto pb-2 scrollbar-hide md:left-4 md:right-auto md:flex-col md:top-4 md:w-48`}>
        {categories.map((c) => (
          <button
            key={c.type}
            onClick={() => setCategory(c.type)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-black transition-all whitespace-nowrap shadow-lg
              ${category === c.type 
                ? 'bg-orange-500 text-white translate-y-[-2px]' 
                : 'bg-white/90 dark:bg-slate-800/90 text-gray-600 dark:text-slate-300 backdrop-blur-md hover:bg-orange-50 dark:hover:bg-slate-700'}`}
          >
            <c.icon size={16} />
            {c.label}
          </button>
        ))}
      </div>

      {/* Emergency Buttons */}
      <div className="absolute right-4 top-20 z-10 flex flex-col gap-3">
        <Fab 
          size="small" 
          color="error" 
          onClick={() => handleCall('190')}
          sx={{ boxShadow: '0 8px 16px rgba(244, 67, 54, 0.4)' }}
          title="Polícia (190)"
        >
          <Shield size={20} />
        </Fab>
        <Fab 
          size="small" 
          color="warning" 
          onClick={() => handleCall('192')}
          sx={{ boxShadow: '0 8px 16px rgba(255, 152, 0, 0.4)', bgcolor: '#E67E22', '&:hover': { bgcolor: '#D35400' } }}
          title="Ambulância (192)"
        >
          <Ambulance size={20} />
        </Fab>
      </div>

      {/* Main Map */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={13}
        onLoad={onMapLoad}
        options={{
          disableDefaultUI: true,
          styles: mapStyles
        }}
      >
        {filteredLocations.map((loc) => (
          <Marker
            key={loc.id}
            position={{ lat: loc.lat, lng: loc.lng }}
            onClick={() => setSel(loc)}
            icon={{
              url: 'https://cdn-icons-png.flaticon.com/512/854/854866.png', // Custom marker
              scaledSize: new google.maps.Size(40, 40)
            }}
          />
        ))}
      </GoogleMap>

      {/* Selection Card */}
      <AnimatePresence>
        {sel && <LocationCard sel={sel} onClose={() => setSel(null)} isMobile={isMobile} />}
      </AnimatePresence>
    </div>
  );
}

function WebMapa() {
  return (
    <div className="h-[calc(100vh-200px)] flex flex-col gap-4">
      <div className="flex items-center justify-between shrink-0">
        <h1 className="text-4xl font-black text-gray-900 dark:text-white">Explorar <span className="text-orange-500 font-black">Mapa</span></h1>
      </div>
      <div className="flex-1 relative rounded-[40px] overflow-hidden border-2 border-orange-50 dark:border-slate-800 shadow-2xl">
        <MapInterface isMobile={false} />
      </div>
    </div>
  );
}

function MobileMapa() {
  return (
    <Box sx={{ 
      position: 'fixed', 
      top: 72, 
      bottom: 92, 
      left: 0, 
      right: 0, 
      zIndex: 100,
      bgcolor: 'background.default',
      overflow: 'hidden'
    }}>
      <MapInterface isMobile={true} />
    </Box>
  );
}

export default function MapaPage() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileMapa /> : <WebMapa />;
}
