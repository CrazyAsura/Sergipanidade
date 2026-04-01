'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useIsMobile } from '@/hooks/useIsMobile';
import { Mail, Lock, Eye, EyeOff, User, ChevronLeft, Calendar, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Box, Typography, TextField, Button as MuiButton, Stack, IconButton, InputAdornment, Checkbox, FormControlLabel } from '@mui/material';

function WebRegister() {
  const [showPw, setShowPw] = useState(false);
  const router = useRouter();
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <Card className="w-full max-w-lg border-gray-100 shadow-2xl shadow-gray-200/50">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-3xl font-black">Crie sua conta!</CardTitle>
          <CardDescription>Junte-se à comunidade Sergipanidade.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="space-y-2"><Label className="font-semibold">Nome Completo</Label><div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" /><Input placeholder="Ex: João da Silva" className="pl-10 h-12 rounded-xl" /></div></div>
          <div className="space-y-2"><Label className="font-semibold">E-mail</Label><div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" /><Input type="email" placeholder="seu@email.com" className="pl-10 h-12 rounded-xl" /></div></div>
          <div className="space-y-2"><Label className="font-semibold">Senha</Label><div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" /><Input type={showPw ? 'text' : 'password'} placeholder="Mínimo 6 caracteres" className="pl-10 pr-10 h-12 rounded-xl" /><button onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2"><Label className="font-semibold">Nascimento</Label><div className="relative"><Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" /><Input placeholder="DD/MM/AAAA" className="pl-10 h-12 rounded-xl" /></div></div>
            <div className="space-y-2"><Label className="font-semibold">Cidade</Label><div className="relative"><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" /><Input placeholder="Aracaju, SE" className="pl-10 h-12 rounded-xl" /></div></div>
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-500"><input type="checkbox" className="rounded" /> Aceito os Termos de Uso e Política de Privacidade.</label>
          <Button className="w-full h-12 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-base">CRIAR CONTA</Button>
          <p className="text-center text-sm text-gray-400 pt-2">Já tem conta? <Link href="/login" className="text-orange-500 font-bold hover:underline">Entrar</Link></p>
        </CardContent>
      </Card>
    </div>
  );
}

function MobileRegister() {
  const [showPw, setShowPw] = useState(false);
  const router = useRouter();
  return (
    <Box sx={{ py: 3 }}>
      <IconButton onClick={() => router.back()} sx={{ mb: 2, bgcolor: '#f5f5f5' }}><ChevronLeft size={20} /></IconButton>
      <Typography sx={{ fontSize: '1.75rem', fontWeight: 900, color: '#2C3E50', mb: 0.5 }}>Crie sua conta!</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>Junte-se à comunidade.</Typography>
      <Stack spacing={2.5}>
        <TextField fullWidth label="Nome" InputProps={{ startAdornment: <InputAdornment position="start"><User size={18} color="#999" /></InputAdornment> }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
        <TextField fullWidth label="E-mail" InputProps={{ startAdornment: <InputAdornment position="start"><Mail size={18} color="#999" /></InputAdornment> }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
        <TextField fullWidth type={showPw ? 'text' : 'password'} label="Senha"
          InputProps={{ startAdornment: <InputAdornment position="start"><Lock size={18} color="#999" /></InputAdornment>, endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPw(!showPw)} edge="end">{showPw ? <EyeOff size={18} /> : <Eye size={18} />}</IconButton></InputAdornment> }}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
        <Stack direction="row" spacing={2}>
          <TextField fullWidth label="Nascimento" InputProps={{ startAdornment: <InputAdornment position="start"><Calendar size={18} color="#999" /></InputAdornment> }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
          <TextField fullWidth label="Cidade" InputProps={{ startAdornment: <InputAdornment position="start"><MapPin size={18} color="#999" /></InputAdornment> }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
        </Stack>
        <FormControlLabel control={<Checkbox size="small" />} label={<Typography variant="caption" color="text.secondary">Aceito os Termos de Uso.</Typography>} />
        <MuiButton fullWidth variant="contained" sx={{ py: 1.75, borderRadius: 3, fontWeight: 800, bgcolor: '#E67E22', '&:hover': { bgcolor: '#D35400' } }}>CRIAR CONTA</MuiButton>
      </Stack>
      <Typography variant="body2" sx={{ textAlign: 'center', mt: 4, color: '#999' }}>Já tem conta? <Link href="/login" style={{ textDecoration: 'none', color: '#E67E22', fontWeight: 800 }}>Entrar</Link></Typography>
    </Box>
  );
}

export default function RegisterPage() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileRegister /> : <WebRegister />;
}
