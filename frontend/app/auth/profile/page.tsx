'use client';

import { 
  Box, 
  Typography, 
  Avatar, 
  Paper, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  ListItemButton,
  Divider,
  Switch,
  Button,
  Stack,
  IconButton
} from '@mui/material';
import { 
  User, 
  Settings, 
  Map, 
  Bell, 
  ShieldCheck, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Camera,
  Edit3,
  Mail,
  MapPin,
  Calendar,
  Heart,
  Users
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const router = useRouter();
  
  // Mock detailed user data
  const userData = {
    name: 'Alexandre Silva',
    email: 'alexandre.silva@email.com',
    location: 'Aracaju, SE',
    bio: 'Apaixonado por descobrir novos lugares e culturas. Em busca das melhores experiências em Sergipe!',
    memberSince: 'Março 2024',
    occupation: 'Viajante Curioso'
  };

  const menuItems = [
    { icon: <Map size={20} />, text: 'Meus Roteiros', route: '#' },
    { icon: <Heart size={20} />, text: 'Meus Favoritos', route: '/favorites' },
    { icon: <Users size={20} />, text: 'Minhas Discussões', route: '/discussions' },
    { icon: <Settings size={20} />, text: 'Configurações do App', route: '/auth/settings' },
  ];

  return (
    <Box sx={{ py: 4, maxWidth: 650, mx: 'auto', px: 2 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ color: 'text.primary', fontWeight: 900 }}>
          Meu <span style={{ color: '#E67E22' }}>Perfil</span>
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<Edit3 size={16} />}
          onClick={() => router.push('/auth/profile/edit')}
          sx={{ 
            borderRadius: 4, 
            fontWeight: 800, 
            textTransform: 'none',
            bgcolor: '#E67E22',
            '&:hover': { bgcolor: '#D35400' },
            boxShadow: '0 8px 20px rgba(230,126,34,0.3)'
          }}
        >
          Editar Tudo
        </Button>
      </Stack>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
        {/* User Header Card */}
        <Paper elevation={0} sx={{ 
          p: 4, borderRadius: 8, 
          bgcolor: 'background.paper', 
          border: '1px solid', borderColor: 'divider', 
          mb: 4, position: 'relative', overflow: 'hidden'
        }}>
          <Box sx={{ 
            position: 'absolute', top: 0, left: 0, width: '100%', height: 100, 
            background: 'linear-gradient(135deg, #E67E22 0%, #F39C12 100%)',
            opacity: 0.1
          }} />
          
          <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
              <Avatar 
                sx={{ width: 130, height: 130, border: '4px solid', borderColor: 'background.paper', boxShadow: '0 12px 40px rgba(0,0,0,0.15)' }}
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
              />
              <IconButton 
                size="small" 
                sx={{ 
                  position: 'absolute', bottom: 4, right: 4, 
                  bgcolor: '#E67E22', color: 'white',
                  '&:hover': { bgcolor: '#D35400' },
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}
              >
                <Camera size={18} />
              </IconButton>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 900, color: 'text.primary' }}>{userData.name}</Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 600 }}>{userData.occupation} • {userData.location}</Typography>
          </Box>
          
          <Stack direction="row" spacing={2} sx={{ mt: 4, px: 2 }}>
            {[
              { label: 'Roteiros', value: '14' },
              { label: 'Favoritos', value: '28' },
              { label: 'Mural', value: '52' }
            ].map((stat) => (
              <Box key={stat.label} sx={{ flex: 1, textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 900, color: '#E67E22' }}>{stat.value}</Typography>
                <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1 }}>{stat.label}</Typography>
              </Box>
            ))}
          </Stack>
        </Paper>

        {/* Dados Cadastrados Section */}
        <Typography variant="h6" sx={{ fontWeight: 900, mb: 2, px: 1, color: 'text.primary' }}>
          Dados Cadastrados
        </Typography>
        <Paper elevation={0} sx={{ p: 3, borderRadius: 6, border: '1px solid', borderColor: 'divider', mb: 4, bgcolor: 'background.paper' }}>
          <Stack spacing={3}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box sx={{ p: 1.5, bgcolor: 'orange.50', color: '#E67E22', borderRadius: 3, display: 'flex', alignItems: 'center' }}>
                <Mail size={20} />
              </Box>
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase' }}>E-mail de Contato</Typography>
                <Typography variant="body1" sx={{ fontWeight: 700, color: 'text.primary' }}>{userData.email}</Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box sx={{ p: 1.5, bgcolor: 'orange.50', color: '#E67E22', borderRadius: 3, display: 'flex', alignItems: 'center' }}>
                <MapPin size={20} />
              </Box>
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase' }}>Localização Atual</Typography>
                <Typography variant="body1" sx={{ fontWeight: 700, color: 'text.primary' }}>{userData.location}</Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box sx={{ p: 1.5, bgcolor: 'orange.50', color: '#E67E22', borderRadius: 3, display: 'flex', alignItems: 'center' }}>
                <Calendar size={20} />
              </Box>
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase' }}>Membro desde</Typography>
                <Typography variant="body1" sx={{ fontWeight: 700, color: 'text.primary' }}>{userData.memberSince}</Typography>
              </Box>
            </Box>

            <Box sx={{ pt: 1 }}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase' }}>Biografia</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary', leadingHeight: 1.6, mt: 0.5 }}>
                {userData.bio}
              </Typography>
            </Box>
          </Stack>
        </Paper>

        {/* Action Menu */}
        <Typography variant="h6" sx={{ fontWeight: 900, mb: 2, px: 1, color: 'text.primary' }}>
          Mais Opções
        </Typography>
        <Paper elevation={0} sx={{ borderRadius: 6, overflow: 'hidden', border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', mb: 4 }}>
          <List sx={{ p: 0 }}>
            {menuItems.map((item, idx) => (
              <Box key={item.text}>
                <ListItem disablePadding>
                  <ListItemButton 
                    onClick={() => item.route && router.push(item.route)}
                    sx={{ py: 2, px: 3, '&:hover': { bgcolor: 'action.hover' } }}
                  >
                    <ListItemIcon sx={{ minWidth: 44, color: '#E67E22' }}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 700, color: 'text.primary' }} />
                    <ChevronRight size={18} opacity={0.3} />
                  </ListItemButton>
                </ListItem>
                {idx < menuItems.length - 1 && <Divider sx={{ opacity: 0.5 }} />}
              </Box>
            ))}
          </List>
        </Paper>

        <Button 
          fullWidth variant="outlined" startIcon={<LogOut size={20} />}
          sx={{ 
            color: '#F87171', borderColor: '#FEE2E2', py: 2, borderRadius: 4, fontWeight: 900,
            '&:hover': { bgcolor: '#FEF2F2', borderColor: '#F87171' }
          }}
        >
          ENCERRAR SESSÃO NO DISPOSITIVO
        </Button>
      </motion.div>
    </Box>
  );
}
