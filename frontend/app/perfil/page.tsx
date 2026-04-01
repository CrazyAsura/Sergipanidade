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
  Camera
} from 'lucide-react';

export default function ProfilePage() {
  const menuItems = [
    { icon: <User size={20} />, text: 'Informações Pessoais' },
    { icon: <Settings size={20} />, text: 'Preferências de Viagem' },
    { icon: <Map size={20} />, text: 'Histórico de Destinos' },
    { icon: <Bell size={20} />, text: 'Notificações', toggle: true },
    { icon: <ShieldCheck size={20} />, text: 'Privacidade e Segurança' },
    { icon: <HelpCircle size={20} />, text: 'Central de Ajuda' },
  ];

  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="h1" sx={{ color: '#E67E22', fontSize: '1.5rem', fontWeight: 800, mb: 4 }}>
        Perfil
      </Typography>

      {/* User Header */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 5 }}>
        <Box sx={{ position: 'relative' }}>
          <Avatar 
            sx={{ width: 100, height: 100, border: '4px solid white', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"
          />
          <IconButton 
            size="small" 
            sx={{ 
              position: 'absolute', 
              bottom: 0, 
              right: 0, 
              bgcolor: 'primary.main', 
              color: 'white',
              '&:hover': { bgcolor: 'primary.dark' }
            }}
          >
            <Camera size={16} />
          </IconButton>
        </Box>
        <Typography variant="h2" sx={{ mt: 2, fontSize: '1.25rem', fontWeight: 800 }}>
          Alexandre Silva
        </Typography>
        <Typography variant="body2" color="text.secondary" fontWeight={500}>
          Viajante Curioso • Aracaju, SE
        </Typography>
      </Box>

      {/* Stats */}
      <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
        {[
          { label: 'Destinos Visitados', value: '12' },
          { label: 'Favoritos', value: '8' },
          { label: 'Roteiros', value: '3' }
        ].map((stat) => (
          <Paper key={stat.label} elevation={0} sx={{ flex: 1, p: 2, textAlign: 'center', borderRadius: 4, bgcolor: '#f8f9fa', border: '1px solid #eee' }}>
            <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 800 }}>
              {stat.value}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
              {stat.label}
            </Typography>
          </Paper>
        ))}
      </Stack>

      {/* Menu List */}
      <Paper elevation={0} sx={{ borderRadius: 4, overflow: 'hidden', border: '1px solid #eee' }}>
        <List sx={{ p: 0 }}>
          {menuItems.map((item, idx) => (
            <Box key={item.text}>
              <ListItem disablePadding>
                <ListItemButton sx={{ py: 2, px: 3 }}>
                  <ListItemIcon sx={{ minWidth: 44, color: 'primary.main' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{ fontWeight: 600, fontSize: '0.95rem' }} 
                  />
                  {item.toggle ? (
                    <Switch defaultChecked size="small" color="primary" />
                  ) : (
                    <ChevronRight size={18} color="#CBD5E0" />
                  )}
                </ListItemButton>
              </ListItem>
              {idx < menuItems.length - 1 && <Divider sx={{ mx: 3, opacity: 0.5 }} />}
            </Box>
          ))}
        </List>
      </Paper>

      <Button 
        fullWidth 
        variant="text" 
        startIcon={<LogOut size={20} />}
        sx={{ mt: 4, color: '#E53E3E', fontWeight: 700, py: 2 }}
      >
        SAIR DA CONTA
      </Button>
    </Box>
  );
}
