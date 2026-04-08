'use client';

import { 
  Box, 
  Typography, 
  Avatar, 
  Paper, 
  Stack, 
  IconButton, 
  TextField, 
  Button,
  Grid
} from '@mui/material';
import { 
  Camera, 
  ArrowLeft,
  Save,
  User,
  Mail,
  MapPin,
  Briefcase
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function EditProfilePage() {
  const router = useRouter();

  return (
    <Box sx={{ py: 4, maxWidth: 600, mx: 'auto' }}>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
        <IconButton onClick={() => router.back()} sx={{ color: 'text.primary' }}>
          <ArrowLeft size={24} />
        </IconButton>
        <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 900 }}>
          Editar Perfil
        </Typography>
      </Stack>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Paper elevation={0} sx={{ p: 4, borderRadius: 6, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 6 }}>
            <Box sx={{ position: 'relative' }}>
              <Avatar 
                sx={{ width: 140, height: 140, border: '4px solid', borderColor: 'primary.main', boxShadow: '0 12px 40px rgba(0,0,0,0.15)' }}
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"
              />
              <IconButton 
                sx={{ 
                  position: 'absolute', 
                  bottom: 8, 
                  right: 8, 
                  bgcolor: 'white', 
                  color: 'primary.main',
                  '&:hover': { bgcolor: '#f0f0f0' },
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              >
                <Camera size={20} />
              </IconButton>
            </Box>
            <Typography variant="caption" sx={{ mt: 2, fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase' }}>
              Alterar foto de perfil
            </Typography>
          </Box>

          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Nome Completo"
              defaultValue="Alexandre Silva"
              variant="outlined"
              InputProps={{
                startAdornment: <User size={18} style={{ marginRight: 12, opacity: 0.5 }} />
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
            />
            
            <TextField
              fullWidth
              label="E-mail"
              defaultValue="alexandre.silva@email.com"
              variant="outlined"
              InputProps={{
                startAdornment: <Mail size={18} style={{ marginRight: 12, opacity: 0.5 }} />
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
            />

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Cidade"
                  defaultValue="Aracaju"
                  variant="outlined"
                  InputProps={{
                    startAdornment: <MapPin size={18} style={{ marginRight: 12, opacity: 0.5 }} />
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Estado"
                  defaultValue="SE"
                  variant="outlined"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                />
              </Grid>
            </Grid>

            <TextField
              fullWidth
              label="Ocupação"
              defaultValue="Viajante Curioso"
              variant="outlined"
              InputProps={{
                startAdornment: <Briefcase size={18} style={{ marginRight: 12, opacity: 0.5 }} />
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
            />

            <TextField
              fullWidth
              label="Bio"
              multiline
              rows={3}
              defaultValue="Apaixonado por descobrir novos lugares e culturas. Em busca das melhores experiências em Sergipe!"
              variant="outlined"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
            />

            <Box sx={{ pt: 2 }}>
              <Button 
                fullWidth 
                variant="contained" 
                size="large"
                startIcon={<Save size={20} />}
                onClick={() => router.push('/auth/profile')}
                sx={{ 
                  py: 2, 
                  borderRadius: 4, 
                  fontWeight: 900,
                  boxShadow: '0 12px 24px rgba(237, 33, 0, 0.3)',
                  bgcolor: '#ED2100',
                  '&:hover': { bgcolor: '#C41B00' }
                }}
              >
                SALVAR ALTERAÇÕES
              </Button>
              <Button 
                fullWidth 
                variant="text" 
                sx={{ mt: 1, fontWeight: 700, color: 'text.secondary' }}
                onClick={() => router.back()}
              >
                CANCELAR
              </Button>
            </Box>
          </Stack>
        </Paper>
      </motion.div>
    </Box>
  );
}
