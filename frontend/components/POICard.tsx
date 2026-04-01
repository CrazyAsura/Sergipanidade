'use client';

import { Card, CardContent, CardMedia, Typography, Box, IconButton, Rating } from '@mui/material';
import { Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '@/lib/store/features/favorites/favoritesSlice';
import { RootState } from '@/lib/store';
import { Location } from '@/lib/mockData';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface POICardProps {
  location: Location;
  isWide?: boolean;
}

export default function POICard({ location, isWide = false }: POICardProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const favorites = useSelector((state: RootState) => state.favorites.items || []);
  const isFavorite = Array.isArray(favorites) && favorites.includes(location.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleFavorite(location.id));
  };

  const handleCardClick = () => {
    router.push(`/local/${location.id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        onClick={handleCardClick}
        sx={{ 
          borderRadius: 4, 
          overflow: 'hidden', 
          cursor: 'pointer',
          position: 'relative',
          display: isWide ? 'flex' : 'block',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          mb: 2,
          minWidth: isWide ? '100%' : 260,
          border: '1px solid #f0f0f0'
        }}
      >
        <CardMedia
          component="img"
          height={isWide ? 100 : 160}
          image={location.image}
          alt={location.name}
          sx={{ width: isWide ? 120 : '100%', objectFit: 'cover' }}
        />
        <IconButton 
          onClick={handleFavoriteClick}
          sx={{ 
            position: 'absolute', 
            top: 10, 
            right: 10, 
            bgcolor: 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(4px)',
            '&:hover': { bgcolor: 'white' }
          }}
          size="small"
        >
          <Heart 
            size={18} 
            fill={isFavorite ? '#E67E22' : 'none'} 
            color={isFavorite ? '#E67E22' : '#2C3E50'} 
          />
        </IconButton>
        
        <CardContent sx={{ p: 2, flex: 1 }}>
          <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 600, mb: 0.5, textTransform: 'uppercase', fontSize: '0.65rem' }}>
            {location.category}
          </Typography>
          <Typography variant="h2" sx={{ fontSize: isWide ? '1rem' : '1.1rem', mb: 0.5, fontWeight: 700 }}>
            {location.name}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="caption" color="text.secondary">
              {location.city}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="caption" sx={{ mr: 0.5, fontWeight: 700, color: 'text.primary' }}>
                {location.rating}
              </Typography>
              <Rating value={1} max={1} readOnly size="small" />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}
