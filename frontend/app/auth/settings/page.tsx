'use client';

import { 
  Box, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  ListItemButton,
  Divider,
  Switch,
  Stack,
  IconButton
} from '@mui/material';
import { 
  ArrowLeft,
  Bell, 
  ShieldCheck, 
  HelpCircle,
  Smartphone,
  Eye,
  Languages,
  Trash2
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface SettingItem {
  icon: React.ReactNode;
  text: string;
  route?: string;
  toggle?: boolean;
  defaultChecked?: boolean;
  value?: string;
  color?: string;
}

interface SettingGroup {
  title: string;
  items: SettingItem[];
}

export default function SettingsPage() {
  const router = useRouter();

  const settingsGroups: SettingGroup[] = [
    {
      title: 'Preferências',
      items: [
        { icon: <Bell size={20} />, text: 'Notificações Push', toggle: true, defaultChecked: true },
        { icon: <Eye size={20} />, text: 'Modo Escuro', toggle: true, defaultChecked: false },
        { icon: <Languages size={20} />, text: 'Idioma do App', value: 'Português (BR)' },
      ]
    },
    {
      title: 'Segurança & Privacidade',
      items: [
        { icon: <ShieldCheck size={20} />, text: 'Privacidade do Perfil', route: '#' },
        { icon: <Smartphone size={20} />, text: 'Dispositivos Conectados', route: '#' },
      ]
    },
    {
      title: 'Outros',
      items: [
        { icon: <HelpCircle size={20} />, text: 'Central de Ajuda', route: '#' },
        { icon: <Trash2 size={20} />, text: 'Excluir Minha Conta', color: '#F87171' },
      ]
    }
  ];

  return (
    <Box sx={{ py: 4, maxWidth: 650, mx: 'auto', px: 2 }}>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
        <IconButton onClick={() => router.back()} sx={{ color: 'text.primary' }}>
          <ArrowLeft size={24} />
        </IconButton>
        <Typography variant="h4" sx={{ color: 'text.primary', fontWeight: 900 }}>
          Configurações
        </Typography>
      </Stack>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {settingsGroups.map((group, gIdx) => (
          <Box key={group.title} sx={{ mb: 4 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1.5, mb: 1.5, px: 1 }}>
              {group.title}
            </Typography>
            <Paper elevation={0} sx={{ borderRadius: 6, overflow: 'hidden', border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
              <List sx={{ p: 0 }}>
                {group.items.map((item, idx) => (
                  <Box key={item.text}>
                    <ListItem disablePadding>
                      <ListItemButton 
                        onClick={() => item.route && router.push(item.route)}
                        sx={{ py: 2, px: 3, '&:hover': { bgcolor: 'action.hover' } }}
                      >
                        <ListItemIcon sx={{ minWidth: 44, color: item.color || '#E67E22' }}>{item.icon}</ListItemIcon>
                        <ListItemText 
                          primary={item.text} 
                          primaryTypographyProps={{ fontWeight: 700, color: item.color || 'text.primary' }}
                          secondary={item.value}
                          secondaryTypographyProps={{ fontWeight: 600, color: 'text.secondary' }}
                        />
                        {item.toggle && <Switch defaultChecked={item.defaultChecked} size="small" />}
                      </ListItemButton>
                    </ListItem>
                    {idx < group.items.length - 1 && <Divider sx={{ opacity: 0.5 }} />}
                  </Box>
                ))}
              </List>
            </Paper>
          </Box>
        ))}
      </motion.div>
    </Box>
  );
}
