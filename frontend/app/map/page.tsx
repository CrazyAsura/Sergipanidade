'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
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
import { useSearchParams } from 'next/navigation';

const GOOGLE_MAPS_API_KEY = "AIzaSyCR5ufBKKAVWYAovmT9-TG9F7gg66cgXDg";
const mapContainerStyle = { width: '100%', height: '100%' };
const center = { lat: -10.9472, lng: -37.0731 }; // Aracaju center
const libraries: ("places" | "drawing" | "geometry" | "localContext" | "visualization" | "routes")[] = ['places', 'routes'];

const categories = [
  { label: 'Tudo', type: 'Tudo', icon: MapPin },
  { label: 'Praias', type: 'beach', icon: Navigation },
  { label: 'Gastronomia', type: 'gastronomy', icon: Utensils },
  { label: 'Museus', type: 'museum', icon: Info },
  { label: 'Histórico', type: 'historic', icon: Shield },
];

function LocationCard({ sel, onClose, isMobile, onNavigate }: { sel: Location, onClose: () => void, isMobile: boolean, onNavigate: (loc: Location) => void }) {
  const dispatch = useDispatch();
  const favs = useSelector((s: RootState) => s.favorites.items || []);
  const isFav = favs.includes(sel.id);
  
  const handleNavigate = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${sel.lat},${sel.lng}&travelmode=driving`, '_blank');
  };

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
                <Heart className={`h-6 w-6 ${isFav ? 'fill-primary text-primary' : 'text-gray-300 dark:text-slate-700'}`} />
              </IconButton>
            </div>

            <div className="flex gap-2 items-center">
              <Badge className="bg-primary/10 text-primary border-primary/20">ABERTO</Badge>
              <div className="flex items-center gap-1 text-xs font-bold text-gray-400">
                <Navigation size={12} /> {sel.distance}
              </div>
            </div>

            <p className="text-xs text-gray-500 line-clamp-2 mt-1 font-medium">{sel.description}</p>

            {sel.menu && (
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2 text-xs font-black text-primary uppercase">
                  <Utensils size={14} /> Cardápio / Produtos
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {sel.menu.map((item, idx) => (
                    <div key={idx} className="shrink-0 w-24 space-y-1">
                      <img src={item.image} alt={item.name} className="w-24 h-16 object-cover rounded-lg shadow-sm border border-primary/10 dark:border-slate-800" />
                      <p className="text-[10px] font-black text-gray-800 dark:text-slate-200 leading-tight truncate">{item.name}</p>
                      <p className="text-[10px] font-bold text-primary">{item.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button 
              onClick={() => onNavigate(sel)}
              className="mt-3 w-full bg-primary hover:bg-primary/90 text-primary-foreground font-black rounded-xl h-10 shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
            >
              <Navigation size={16} /> NAVEGAR AGORA
            </Button>
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
    libraries
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [sel, setSel] = useState<Location | null>(null);
  const [category, setCategory] = useState('Tudo');
  
  const [routePolylines, setRoutePolylines] = useState<google.maps.Polyline[]>([]);
  const [routeMarkers, setRouteMarkers] = useState<any[]>([]);
  const [routeInfo, setRouteInfo] = useState<{ distance: string, duration: string, steps: any[] } | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const searchParams = useSearchParams();
  const navigateId = searchParams.get('navigate');

  const clearRoute = () => {
    routePolylines.forEach(p => p.setMap(null));
    routeMarkers.forEach(m => m.setMap(null));
    setRoutePolylines([]);
    setRouteMarkers([]);
    setRouteInfo(null);
    setIsNavigating(false);
  };

  const handleStartNavigation = (loc: Location) => {
    setIsNavigating(true);
  };

  useEffect(() => {
    if (navigateId && isLoaded) {
      const loc = locations.find(l => l.id === navigateId);
      if (loc) {
        setSel(loc);
        handleStartNavigation(loc);
      }
    }
  }, [navigateId, isLoaded]);

  useEffect(() => {
    const computeNewRoute = async () => {
      if (!isNavigating || !sel || !isLoaded || !map) return;

      try {
        // @ts-ignore - Using the new Routes library
        const { Route } = await google.maps.importLibrary("routes");
        
        // Official format per Google migration guide
        const request = {
          origin: `${center.lat},${center.lng}`,
          destination: `${sel.lat},${sel.lng}`,
          travelMode: 'DRIVING',
          fields: ['path'],  // Request fields needed to draw polylines
        };

        // @ts-ignore
        const { routes } = await Route.computeRoutes(request);
        
        if (routes && routes.length > 0) {
          const route = routes[0];

          // Use built-in createPolylines() from the Route class
          const polylines = route.createPolylines();
          polylines.forEach((polyline: google.maps.Polyline) => {
            polyline.setOptions({
              strokeColor: '#ED2100',
              strokeOpacity: 0.85,
              strokeWeight: 5,
            });
            polyline.setMap(map);
          });
          setRoutePolylines(polylines);

          // Create waypoint markers
          try {
            const markers = await route.createWaypointAdvancedMarkers();
            markers.forEach((marker: any) => marker.setMap(map));
            setRouteMarkers(markers);
          } catch {
            // Advanced markers may require a mapId; skip if unavailable
          }

          // Extract route info for the overlay panel
          setRouteInfo({
            distance: route.distanceMeters ? `${(route.distanceMeters / 1000).toFixed(1)} km` : sel.distance || '---',
            duration: route.duration ? `${Math.round(parseInt(route.duration) / 60)} min` : sel.time || '---',
            steps: route.legs?.[0]?.steps || []
          });
        }
      } catch (error) {
        console.error("Error computing route with new API:", error);
        // Fallback: show basic route info from mock data
        setRouteInfo({
          distance: sel.distance || '---',
          duration: sel.time || '---',
          steps: sel.directions?.map((d, i) => ({ instruction: d, index: i })) || []
        });
      }
    };

    computeNewRoute();
  }, [isNavigating, sel, isLoaded, map]);

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
              startAdornment: <InputAdornment position="start"><Search size={18} color="#ED2100" /></InputAdornment>
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
                ? 'bg-primary text-primary-foreground translate-y-[-2px]' 
                : 'bg-white/90 dark:bg-slate-800/90 text-gray-600 dark:text-slate-300 backdrop-blur-md hover:bg-primary/5 dark:hover:bg-slate-700'}`}
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
          sx={{ boxShadow: '0 8px 16px rgba(237, 33, 0, 0.4)', bgcolor: '#ED2100', '&:hover': { bgcolor: '#C41B00' } }}
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
        {!isNavigating && filteredLocations.map((loc) => (
          <Marker
            key={loc.id}
            position={{ lat: loc.lat, lng: loc.lng }}
            onClick={() => setSel(loc)}
            icon={{
              url: 'https://cdn-icons-png.flaticon.com/512/854/854866.png',
              scaledSize: new google.maps.Size(40, 40)
            }}
          />
        ))}

      </GoogleMap>

      {/* Navigation Overlay */}
      <AnimatePresence>
        {isNavigating && routeInfo && (
          <motion.div 
            initial={{ x: -400 }} 
            animate={{ x: 0 }} 
            exit={{ x: -400 }}
            className={`absolute ${isMobile ? 'bottom-0 left-0 right-0' : 'top-4 left-4 w-96'} z-50 bg-white dark:bg-slate-900 shadow-2xl ${!isMobile && 'rounded-3xl'} overflow-hidden border border-primary/10`}
          >
            <div className="bg-primary p-6 text-white">
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <div className="flex items-center gap-3">
                   <div className="h-10 w-10 bg-white/20 rounded-xl flex items-center justify-center">
                     <Navigation size={22} className="animate-pulse" />
                   </div>
                   <div>
                     <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Navegando para</p>
                     <h4 className="text-xl font-black uppercase italic tracking-tighter leading-none">{sel?.name}</h4>
                   </div>
                 </div>
                <IconButton onClick={clearRoute} sx={{ color: 'white' }}>
                  <X size={20} />
                </IconButton>
              </Stack>
            </div>
            
            <div className="max-h-80 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-slate-900/50">
                   {routeInfo.steps.map((step, i) => (
                 <div key={i} className="flex gap-4 items-start p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-black/5 dark:border-white/5">
                    <div className="h-8 w-8 bg-gray-100 dark:bg-slate-700 rounded-lg flex items-center justify-center text-primary font-black text-xs shrink-0">{i + 1}</div>
                    <div className="space-y-1">
                      <div className="text-sm font-bold text-gray-800 dark:text-slate-200">{step.instruction || step.instructions || `Passo ${i + 1}`}</div>
                    </div>
                 </div>
               ))}
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 border-t border-black/5 dark:border-white/5">
               <Stack direction="row" spacing={2}>
                 <div className="flex-1 p-3 bg-primary/5 rounded-2xl text-center">
                   <p className="text-[9px] font-black text-primary uppercase">Chegada em</p>
                   <p className="text-lg font-black text-gray-900 dark:text-white uppercase italic tracking-tighter">{routeInfo.duration}</p>
                 </div>
                 <div className="flex-1 p-3 bg-primary/5 rounded-2xl text-center">
                   <p className="text-[9px] font-black text-primary uppercase">Distância</p>
                   <p className="text-lg font-black text-gray-900 dark:text-white uppercase italic tracking-tighter">{routeInfo.distance}</p>
                 </div>
               </Stack>
               <Button onClick={clearRoute} className="w-full mt-4 h-12 bg-gray-100 dark:bg-slate-800 text-gray-500 font-black rounded-xl hover:bg-red-50 hover:text-red-500 transition-all uppercase tracking-widest text-[10px]">Encerrar Viagem</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selection Card */}
      <AnimatePresence>
        {sel && <LocationCard sel={sel} onClose={() => setSel(null)} isMobile={isMobile} onNavigate={handleStartNavigation} />}
      </AnimatePresence>
    </div>
  );
}

function WebMapa() {
  return (
    <div className="h-[calc(100vh-200px)] flex flex-col gap-4">
      <div className="flex items-center justify-between shrink-0">
        <h1 className="text-4xl font-black text-gray-900 dark:text-white">Explorar <span className="text-primary font-black">Mapa</span></h1>
      </div>
      <div className="flex-1 relative rounded-[40px] overflow-hidden border-2 border-primary/20 dark:border-slate-800 shadow-2xl">
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
