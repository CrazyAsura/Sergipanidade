'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import {
  Box,
  Typography,
  Paper,
  Stack,
  Avatar,
  IconButton,
  Button as MuiButton,
  Breadcrumbs,
} from '@mui/material';
import {
  Bell,
  ChevronRight,
  MessageCircle,
  Heart,
  Star as StarIcon,
  Home,
  CheckCircle2,
  Trash2,
  MoreHorizontal
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const mockNotifications = [
  {
    id: '1',
    type: 'comment',
    title: 'Novo comentário',
    description: 'João Silva comentou na sua discussão sobre as Dunas de Mangue Seco.',
    time: '2 min atrás',
    read: false,
    icon: MessageCircle,
    color: '#3B82F6'
  },
  {
    id: '2',
    type: 'favorite',
    title: 'Lugar favoritado',
    description: 'Alexandre favoritou sua foto do Cânion do Xingó.',
    time: '45 min atrás',
    read: false,
    icon: Heart,
    color: '#EF4444'
  },
  {
    id: '3',
    type: 'award',
    title: 'Nova Conquista!',
    description: 'Parabéns! Você desbloqueou o selo "Explorador de Aracaju".',
    time: '2 horas atrás',
    read: true,
    icon: StarIcon,
    color: '#F59E0B'
  },
  {
    id: '4',
    type: 'system',
    title: 'Atualização do Sistema',
    description: 'Adicionamos 5 novos destinos na região sul de Sergipe. Confira!',
    time: '5 horas atrás',
    read: true,
    icon: Bell,
    color: '#10B981'
  },
   {
    id: '5',
    type: 'comment',
    title: 'Resposta em tópico',
    description: 'Maria Oliveira respondeu à sua pergunta sobre hotéis em Canindé.',
    time: '1 dia atrás',
    read: true,
    icon: MessageCircle,
    color: '#3B82F6'
  }
];

export default function NotificationsPage() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((s: RootState) => s.auth);

  if (!isAuthenticated) {
     return (
       <Box sx={{ py: 20, textAlign: 'center' }}>
          <Typography variant="h4" fontWeight={900}>Acesso Restrito</Typography>
          <Typography color="text.secondary" sx={{ mt: 2, mb: 4 }}>Você precisa estar logado para ver suas notificações.</Typography>
          <MuiButton variant="contained" onClick={() => router.push('/auth/login')}>Entrar Agora</MuiButton>
       </Box>
     );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', py: 4, px: 2 }}>
      <Box sx={{ mb: 6 }}>
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link href="/" className="flex items-center gap-1 text-xs font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">
            <Home size={12} /> Início
          </Link>
          <Typography sx={{ textTransform: 'uppercase', fontSize: '10px', fontWeight: 900, letterSpacing: 1.5, color: 'primary.main' }}>
            Notificações
          </Typography>
        </Breadcrumbs>
        <Typography variant="h2" sx={{ fontWeight: 900, textTransform: 'uppercase', italic: true, letterSpacing: -1, fontSize: { xs: '2.5rem', md: '3.5rem' }, lineHeight: 1 }}>
          Suas <span className="text-primary italic">Notificações</span>
        </Typography>
      </Box>

      <Stack spacing={2}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1 }}>
            Recentes ({mockNotifications.filter(n => !n.read).length})
          </Typography>
          <MuiButton size="small" sx={{ fontWeight: 800, fontSize: '10px', color: 'primary.main' }}>
            Marcar todas como lidas
          </MuiButton>
        </Box>

        {mockNotifications.map((n) => {
          const Icon = n.icon;
          return (
            <Paper
              key={n.id}
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 6,
                border: '1px solid',
                borderColor: n.read ? 'divider' : 'primary.main',
                bgcolor: n.read ? 'background.paper' : 'rgba(237, 33, 0, 0.02)',
                position: 'relative',
                transition: 'all 0.3s',
                '&:hover': {
                  borderColor: 'primary.main',
                  transform: 'translateX(8px)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                }
              }}
            >
              <Stack direction="row" spacing={3} alignItems="flex-start">
                <Box sx={{
                  p: 2,
                  borderRadius: 4,
                  bgcolor: `${n.color}15`,
                  color: n.color,
                  display: 'flex',
                  boxShadow: `0 4px 12px ${n.color}20`
                }}>
                  <Icon size={24} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 900, color: 'text.primary', mb: 0.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                    {n.title}
                    {!n.read && <CheckCircle2 size={16} className="text-primary" />}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 600, lineHeight: 1.5, mb: 1.5 }}>
                    {n.description}
                  </Typography>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 900, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      {n.time}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                       <IconButton size="small" sx={{ color: 'text.disabled', '&:hover': { color: 'error.main' } }} onClick={() => alert('Notificação excluída')}>
                          <Trash2 size={16} />
                       </IconButton>
                       <IconButton size="small" sx={{ color: 'text.disabled' }}>
                          <MoreHorizontal size={16} />
                       </IconButton>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
            </Paper>
          );
        })}
      </Stack>

      <Box sx={{ mt: 10, p: 6, borderRadius: 8, bgcolor: 'primary.main', color: 'white', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
         <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography variant="h4" fontWeight={900} sx={{ textTransform: 'uppercase', mb: 2 }}>Mantenha-se Atualizado</Typography>
            <Typography sx={{ fontWeight: 700, opacity: 0.9, mb: 4 }}>Ative as notificações push para não perder nenhuma novidade sobre Sergipe.</Typography>
            <MuiButton variant="contained" sx={{ bgcolor: 'white', color: 'primary.main', fontWeight: 900, px: 6, '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' } }} onClick={() => alert('Notificações de navegador ativadas!')}>
               ATIVAR AGORA
            </MuiButton>
         </Box>
         <Bell size={200} style={{ position: 'absolute', right: -40, bottom: -40, opacity: 0.1, transform: 'rotate(-20deg)' }} />
      </Box>
    </Box>
  );
}
