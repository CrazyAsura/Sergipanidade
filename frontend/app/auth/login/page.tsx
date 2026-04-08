'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/lib/store/features/auth/authSlice';
import { useIsMobile } from '@/hooks/useIsMobile';
import { Mail, Lock, Eye, EyeOff, Globe, Share2, ChevronLeft } from 'lucide-react';

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
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(setCredentials({
      user: { id: '1', name: 'Alexandre Silva', email: email || 'demo@sergipanidade.com.br', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop' },
      token: 'mock-token'
    }));
    router.push('/');
  };

  return { showPw, setShowPw, email, setEmail, pw, setPw, handleLogin, router };
}

// ═══ WEB ═══
function WebLogin() {
  const { showPw, setShowPw, email, setEmail, pw, setPw, handleLogin, router } = useLoginLogic();

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <Card className="w-full max-w-md border-gray-100 shadow-2xl shadow-gray-200/50">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-3xl font-black text-gray-900">Bem-vindo de volta!</CardTitle>
          <CardDescription className="text-base">Entre para continuar sua jornada por Sergipe.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 pt-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="font-semibold">E-mail</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input id="email" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 h-12 rounded-xl" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="font-semibold">Senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input id="password" type={showPw ? 'text' : 'password'} placeholder="••••••••" value={pw} onChange={(e) => setPw(e.target.value)} className="pl-10 pr-10 h-12 rounded-xl" />
              <button onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-sm text-gray-500">
                <input type="checkbox" className="rounded" /> Lembrar-me
              </label>
              <Link href="/auth/reset-password" className="text-sm text-primary font-bold hover:underline">Esqueceu?</Link>
            </div>
          </div>
          <Button onClick={handleLogin} className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-base">
            ENTRAR
          </Button>

          <div className="relative my-6">
            <Separator />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-gray-400 font-bold">OU</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-11 rounded-xl font-bold gap-2"><Globe className="h-4 w-4" /> Google</Button>
            <Button variant="outline" className="h-11 rounded-xl font-bold gap-2"><Share2 className="h-4 w-4" /> Facebook</Button>
          </div>

          <p className="text-center text-sm text-gray-400 pt-4">
            Não tem conta? <Link href="/auth/register" className="text-primary font-bold hover:underline">Cadastre-se</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// ═══ MOBILE ═══
function MobileLogin() {
  const { showPw, setShowPw, email, setEmail, pw, setPw, handleLogin, router } = useLoginLogic();

  return (
    <Box sx={{ py: 3 }}>
      <IconButton onClick={() => router.back()} sx={{ mb: 2, bgcolor: '#f5f5f5' }}><ChevronLeft size={20} /></IconButton>
      <Typography sx={{ fontSize: '1.75rem', fontWeight: 900, color: '#2C3E50', mb: 0.5 }}>Bem-vindo de volta!</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>Entre para continuar sua jornada.</Typography>

      <Stack spacing={3}>
        <TextField fullWidth label="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com"
          InputProps={{ startAdornment: <InputAdornment position="start"><Mail size={18} color="#999" /></InputAdornment> }}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
        <Box>
          <TextField fullWidth type={showPw ? 'text' : 'password'} label="Senha" value={pw} onChange={(e) => setPw(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start"><Lock size={18} color="#999" /></InputAdornment>,
              endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPw(!showPw)} edge="end">{showPw ? <EyeOff size={18} /> : <Eye size={18} />}</IconButton></InputAdornment>,
            }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
            <FormControlLabel control={<Checkbox size="small" />} label={<Typography variant="caption" color="text.secondary">Lembrar</Typography>} />
            <Link href="/auth/reset-password" style={{ textDecoration: 'none' }}><Typography variant="caption" sx={{ color: '#ED2100', fontWeight: 700 }}>Esqueceu?</Typography></Link>
          </Box>
        </Box>
        <MuiButton fullWidth variant="contained" onClick={handleLogin} sx={{ py: 1.75, borderRadius: 3, fontWeight: 800, bgcolor: '#ED2100', '&:hover': { bgcolor: '#C41B00' } }}>ENTRAR</MuiButton>
      </Stack>

      <Box sx={{ my: 5, position: 'relative' }}>
        <Divider />
        <Typography variant="caption" sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', bgcolor: '#F5F5F5', px: 2, color: '#999', fontWeight: 700 }}>OU</Typography>
      </Box>

      <Stack direction="row" spacing={2}>
        <MuiButton fullWidth variant="outlined" startIcon={<Globe size={18} />} sx={{ py: 1.5, borderRadius: 3, borderColor: '#eee', color: '#2C3E50', fontWeight: 700 }}>Google</MuiButton>
        <MuiButton fullWidth variant="outlined" startIcon={<Share2 size={18} />} sx={{ py: 1.5, borderRadius: 3, borderColor: '#eee', color: '#2C3E50', fontWeight: 700 }}>Facebook</MuiButton>
      </Stack>

      <Typography variant="body2" sx={{ textAlign: 'center', mt: 5, color: '#999' }}>
        Não tem conta? <Link href="/auth/register" style={{ textDecoration: 'none', color: '#ED2100', fontWeight: 800 }}>Cadastre-se</Link>
      </Typography>
    </Box>
  );
}

export default function LoginPage() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileLogin /> : <WebLogin />;
}
