'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/lib/store/features/auth/authSlice';
import { useIsMobile } from '@/hooks/useIsMobile';
import { Mail, Lock, Eye, EyeOff, Globe, Share2, ChevronLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { loginSchema, LoginFormData } from '@/lib/schemas';
import api from '@/lib/api';

// Shadcn
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

// MUI
import {
  Box, Typography, TextField, Button as MuiButton, Stack, Divider,
  IconButton, InputAdornment, Checkbox, FormControlLabel
} from '@mui/material';

function useLoginLogic() {
  const [showPw, setShowPw] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await api.post('/auth/login', data);
      return response.data;
    },
    onSuccess: (data) => {
      dispatch(setCredentials({
        user: data.user,
        token: data.access_token
      }));
      localStorage.setItem('token', data.access_token);
      router.push('/');
    },
  });

  const handleLogin = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return { 
    showPw, 
    setShowPw, 
    register, 
    handleLogin, 
    router, 
    loading: mutation.isPending, 
    error: (mutation.error as any)?.response?.data?.message || mutation.error?.message,
    errors 
  };
}

// ═══ WEB ═══
function WebLogin() {
  const { showPw, setShowPw, register, handleLogin, loading, error, errors } = useLoginLogic();

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <Card className="w-full max-w-md border-gray-100 shadow-2xl shadow-gray-200/50 rounded-[2.5rem]">
        <CardHeader className="text-center pb-2 pt-10">
          <CardTitle className="text-3xl font-black text-gray-900 uppercase italic tracking-tight">Bem-vindo!</CardTitle>
          <CardDescription className="text-base font-medium">Entre para continuar sua jornada por Sergipe.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 pt-4 pb-10 px-10">
          {error && (
            <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-xl text-center">
              {error}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-gray-400">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#ED2100]" />
                <Input {...register('email')} id="email" type="email" placeholder="seu@email.com" className="pl-11 h-12 rounded-xl" />
              </div>
              {errors.email && <p className="text-[9px] font-bold text-red-500 uppercase">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#ED2100]" />
                <Input {...register('password')} id="password" type={showPw ? 'text' : 'password'} placeholder="••••••••" className="pl-11 pr-11 h-12 rounded-xl" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-[9px] font-bold text-red-500 uppercase">{errors.password.message}</p>}
              <div className="flex justify-end">
                <Link href="/auth/reset-password" className="text-xs text-[#ED2100] font-bold hover:underline">Esqueceu a senha?</Link>
              </div>
            </div>
            <Button type="submit" disabled={loading} className="w-full h-14 rounded-2xl bg-[#ED2100] hover:bg-[#C41B00] text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-red-500/20">
              {loading ? 'ENTRANDO...' : 'ENTRAR'}
            </Button>
          </form>

          <div className="relative my-6">
            <Separator />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-[10px] text-gray-400 font-black uppercase tracking-widest">ou</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-12 rounded-xl font-bold gap-2 border-gray-200"><Globe className="h-4 w-4" /> Google</Button>
            <Button variant="outline" className="h-12 rounded-xl font-bold gap-2 border-gray-200"><Share2 className="h-4 w-4" /> Facebook</Button>
          </div>

          <p className="text-center text-xs text-gray-400 font-bold pt-4">
            Não tem conta? <Link href="/auth/register" className="text-[#ED2100] font-bold hover:underline">Cadastre-se</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// ═══ MOBILE ═══
function MobileLogin() {
  const { showPw, setShowPw, register, handleLogin, router, loading, error, errors } = useLoginLogic();

  return (
    <Box sx={{ py: 3 }}>
      <IconButton onClick={() => router.back()} sx={{ mb: 2, bgcolor: '#f5f5f5' }}><ChevronLeft size={20} /></IconButton>
      <Typography sx={{ fontSize: '1.75rem', fontWeight: 950, color: '#1A202C', mb: 0.5, letterSpacing: -1 }}>Bem-vindo de volta!</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontWeight: 600 }}>Entre para continuar sua jornada.</Typography>

      {error && (
        <Typography variant="caption" sx={{ color: 'white', bgcolor: '#ED2100', px: 2, py: 1, borderRadius: 2, display: 'block', textAlign: 'center', mb: 2, fontWeight: 900, textTransform: 'uppercase', fontSize: '10px' }}>
          {error}
        </Typography>
      )}

      <Stack spacing={3} component="form" onSubmit={handleLogin}>
        <TextField {...register('email')} fullWidth label="E-mail" error={!!errors.email} helperText={errors.email?.message} placeholder="seu@email.com"
          InputProps={{ startAdornment: <InputAdornment position="start"><Mail size={18} color="#ED2100" /></InputAdornment> }}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: 'white' } }} />
        <Box>
          <TextField {...register('password')} fullWidth type={showPw ? 'text' : 'password'} label="Senha" error={!!errors.password} helperText={errors.password?.message}
            InputProps={{
              startAdornment: <InputAdornment position="start"><Lock size={18} color="#ED2100" /></InputAdornment>,
              endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPw(!showPw)} edge="end">{showPw ? <EyeOff size={18} /> : <Eye size={18} />}</IconButton></InputAdornment>,
            }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: 'white' } }} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
            <Link href="/auth/reset-password" style={{ textDecoration: 'none' }}><Typography variant="caption" sx={{ color: '#ED2100', fontWeight: 700 }}>Esqueceu a senha?</Typography></Link>
          </Box>
        </Box>
        <MuiButton type="submit" fullWidth variant="contained" disabled={loading} sx={{ py: 2, borderRadius: 4, fontWeight: 950, bgcolor: '#ED2100', '&:hover': { bgcolor: '#C41B00' } }}>
          {loading ? 'ENTRANDO...' : 'ENTRAR'}
        </MuiButton>
      </Stack>

      <Box sx={{ my: 4, position: 'relative' }}>
        <Divider />
        <Typography variant="caption" sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', bgcolor: '#F5F5F5', px: 2, color: '#999', fontWeight: 900, textTransform: 'uppercase', letterSpacing: 2, fontSize: '9px' }}>OU</Typography>
      </Box>

      <Stack direction="row" spacing={2}>
        <MuiButton fullWidth variant="outlined" startIcon={<Globe size={18} />} sx={{ py: 1.5, borderRadius: 3, borderColor: '#eee', color: '#2C3E50', fontWeight: 700 }}>Google</MuiButton>
        <MuiButton fullWidth variant="outlined" startIcon={<Share2 size={18} />} sx={{ py: 1.5, borderRadius: 3, borderColor: '#eee', color: '#2C3E50', fontWeight: 700 }}>Facebook</MuiButton>
      </Stack>

      <Typography variant="body2" sx={{ textAlign: 'center', mt: 4, color: '#999', fontWeight: 700 }}>
        Não tem conta? <Link href="/auth/register" style={{ textDecoration: 'none', color: '#ED2100', fontWeight: 900 }}>Cadastre-se</Link>
      </Typography>
    </Box>
  );
}

export default function LoginPage() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileLogin /> : <WebLogin />;
}
