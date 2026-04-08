'use client';

import { 
  Box, 
  Typography, 
  IconButton, 
  Avatar, 
  Paper,
  Stack,
  Divider,
  Button as MuiButton,
  Drawer
} from '@mui/material';
import { 
  X, 
  Bell, 
  MessageCircle, 
  Heart, 
  Star, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useIsMobile } from '@/hooks/useIsMobile';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface Notification {
  id: string;
  type: 'comment' | 'favorite' | 'rating' | 'system' | 'award';
  title: string;
  description: string;
  time: string;
  read: boolean;
  icon: any;
  color: string;
}

const mockNotifications: Notification[] = [
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
    icon: Star,
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
  }
];

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationsModal({ isOpen, onClose }: NotificationsModalProps) {
  const isMobile = useIsMobile();
  const router = useRouter();

  const content = (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      bgcolor: 'background.paper',
      color: 'text.primary'
    }}>
      {/* Header */}
      <Box sx={{ p: 3, bgcolor: '#ED2100', color: 'white' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Bell size={24} />
            <Typography variant="h6" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1 }}>
              Notificações
            </Typography>
          </Stack>
          {isMobile && (
            <IconButton onClick={onClose} size="small" sx={{ color: 'white' }}>
              <X size={20} />
            </IconButton>
          )}
        </Stack>
        <Typography variant="caption" sx={{ opacity: 0.8, fontWeight: 700, mt: 1, display: 'block' }}>
          Você tem 2 novas notificações não lidas.
        </Typography>
      </Box>

      {/* List */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: 1 }}>
        <Stack spacing={0.5}>
          {mockNotifications.map((n) => {
            const Icon = n.icon;
            return (
              <Box 
                key={n.id}
                onClick={() => {
                  onClose();
                  if (n.type === 'favorite') router.push('/favorites');
                  else if (n.type === 'comment') router.push('/discussions');
                  else router.push('/locations');
                }}
                sx={{ 
                  p: 2, 
                  borderRadius: 6, 
                  bgcolor: n.read ? 'transparent' : 'rgba(237, 33, 0, 0.03)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  border: '1px solid transparent',
                  '&:hover': { 
                    bgcolor: 'action.hover',
                    borderColor: 'divider',
                  },
                }}
              >
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Box sx={{ 
                    p: 1.5, 
                    borderRadius: 4, 
                    bgcolor: `${n.color}15`, 
                    color: n.color,
                    display: 'flex'
                  }}>
                    <Icon size={20} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'text.primary', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      {n.title}
                      {!n.read && (
                        <Box sx={{ width: 8, height: 8, bgcolor: '#ED2100', borderRadius: 'full' }} />
                      )}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600, mt: 0.5, lineHeight: 1.4, fontSize: '0.8rem' }}>
                      {n.description}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.65rem', mt: 1, display: 'block' }}>
                      {n.time}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            );
          })}
        </Stack>
      </Box>

      <Divider sx={{ opacity: 0.5 }} />

      {/* Footer */}
      <Box sx={{ p: 2, bgcolor: 'background.default' }}>
        <MuiButton 
          fullWidth 
          onClick={() => {
            onClose();
            router.push('/notifications');
          }}
          sx={{ 
            fontWeight: 800, 
            color: '#ED2100', 
            borderRadius: 4,
            '&:hover': { bgcolor: 'rgba(237, 33, 0, 0.05)' }
          }}
        >
          Ver todas as notificações
        </MuiButton>
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        anchor="bottom"
        open={isOpen}
        onClose={onClose}
        PaperProps={{
          sx: { 
            height: '85vh', 
            borderTopLeftRadius: 32, 
            borderTopRightRadius: 32,
            overflow: 'hidden'
          }
        }}
      >
        <Box sx={{ width: 40, height: 4, bgcolor: 'divider', borderRadius: 2, mx: 'auto', mt: 2, mb: 1 }} />
        {content}
      </Drawer>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-[400px] p-0 border-none shadow-2xl">
        {content}
      </SheetContent>
    </Sheet>
  );
}
