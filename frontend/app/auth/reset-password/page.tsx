'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useIsMobile } from '@/hooks/useIsMobile';
import { Mail, ChevronLeft, Key, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Box, Typography, TextField, Button as MuiButton, Stack, IconButton, InputAdornment, Paper } from '@mui/material';

function WebReset() {
  const [sent, setSent] = useState(false);
  const router = useRouter();
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <Card className="w-full max-w-md border-gray-100 shadow-2xl shadow-gray-200/50">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-orange-50 flex items-center justify-center">
            {sent ? <CheckCircle2 className="h-8 w-8 text-green-500" /> : <Key className="h-8 w-8 text-orange-500" />}
          </div>
          <CardTitle className="text-2xl font-black">{sent ? 'E-mail Enviado!' : 'Recuperar Senha'}</CardTitle>
          <CardDescription>{sent ? 'Verifique sua caixa de entrada.' : 'Insira o e-mail da sua conta.'}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!sent ? (
            <>
              <div className="space-y-2"><Label className="font-semibold">E-mail</Label><div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" /><Input type="email" placeholder="seu@email.com" className="pl-10 h-12 rounded-xl" /></div></div>
              <Button onClick={() => setSent(true)} className="w-full h-12 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold">ENVIAR LINK</Button>
            </>
          ) : (
            <Button variant="outline" onClick={() => router.push('/auth/login')} className="w-full h-12 rounded-xl font-bold">VOLTAR AO LOGIN</Button>
          )}
          <Alert className="mt-6"><AlertCircle className="h-4 w-4" /><AlertTitle className="font-bold">Dica</AlertTitle><AlertDescription>Verifique a pasta de spam.</AlertDescription></Alert>
        </CardContent>
      </Card>
    </div>
  );
}

function MobileReset() {
  const [sent, setSent] = useState(false);
  const router = useRouter();
  return (
    <Box sx={{ py: 3 }}>
      <IconButton onClick={() => router.back()} sx={{ mb: 2, bgcolor: '#f5f5f5' }}><ChevronLeft size={20} /></IconButton>
      <AnimatePresence mode="wait">
        {!sent ? (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Box sx={{ mx: 'auto', mb: 3, width: 64, height: 64, bgcolor: '#FFF5EB', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Key size={28} color="#E67E22" /></Box>
            <Typography sx={{ fontSize: '1.5rem', fontWeight: 900, color: '#2C3E50', textAlign: 'center', mb: 0.5 }}>Recuperar Senha</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 4 }}>Insira o e-mail da sua conta.</Typography>
            <Stack spacing={3}>
              <TextField fullWidth label="E-mail" InputProps={{ startAdornment: <InputAdornment position="start"><Mail size={18} color="#999" /></InputAdornment> }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
              <MuiButton fullWidth variant="contained" onClick={() => setSent(true)} sx={{ py: 1.75, borderRadius: 3, fontWeight: 800, bgcolor: '#E67E22', '&:hover': { bgcolor: '#D35400' } }}>ENVIAR LINK</MuiButton>
            </Stack>
          </motion.div>
        ) : (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <Box sx={{ mx: 'auto', mb: 3, width: 64, height: 64, bgcolor: '#EBF4FF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckCircle2 size={28} color="#3182CE" /></Box>
            <Typography sx={{ fontSize: '1.5rem', fontWeight: 900, color: '#2C3E50', textAlign: 'center', mb: 0.5 }}>E-mail Enviado!</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 4 }}>Verifique sua caixa de entrada.</Typography>
            <MuiButton fullWidth variant="outlined" onClick={() => router.push('/auth/login')} sx={{ py: 1.75, borderRadius: 3, fontWeight: 800, borderColor: '#eee' }}>VOLTAR AO LOGIN</MuiButton>
          </motion.div>
        )}
      </AnimatePresence>
      <Paper elevation={0} sx={{ mt: 6, p: 2, borderRadius: 3, bgcolor: '#fdfdfd', border: '1px solid #eee', display: 'flex', gap: 2, alignItems: 'center' }}>
        <AlertCircle size={18} color="#999" />
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>Dica: Verifique a pasta de spam.</Typography>
      </Paper>
    </Box>
  );
}

export default function ResetPasswordPage() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileReset /> : <WebReset />;
}
