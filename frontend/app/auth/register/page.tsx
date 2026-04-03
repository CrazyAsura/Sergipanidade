'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/lib/store/features/auth/authSlice';
import { useIsMobile } from '@/hooks/useIsMobile';
import { Mail, Lock, User, Globe, Share2, ChevronLeft, ShieldCheck } from 'lucide-react';

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

function useRegisterLogic() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const handleRegister = () => {
    dispatch(setCredentials({
      user: { id: '1', name: name || 'Novo Explorador', email: email, avatar: '' },
      token: 'mock-token'
    }));
    router.push('/locations');
  };

  return { name, setName, email, setEmail, pw, setPw, handleRegister, router };
}

// ═══ WEB ═══
function WebRegister() {
  const { name, setName, email, setEmail, pw, setPw, handleRegister, router } = useRegisterLogic();

  return (
    <div className="min-h-[80vh] flex items-center justify-center animate-in fade-in zoom-in duration-500">
      <Card className="w-full max-w-lg border-gray-100 shadow-2xl shadow-orange-100/30 overflow-hidden rounded-[2.5rem]">
         <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-orange-600 p-10 text-white flex flex-col justify-between relative overflow-hidden">
               <div className="relative z-10">
                  <ShieldCheck size={48} className="mb-8 text-orange-200" />
                  <h3 className="text-3xl font-black italic uppercase leading-none mb-4">Faça parte <br />do Sergipe <br />Invisível.</h3>
                  <p className="text-orange-100 font-medium text-sm leading-relaxed">Crie sua conta e comece a salvar seus lugares favoritos agora mesmo.</p>
               </div>
               <div className="absolute -right-20 -bottom-20 h-64 w-64 bg-white/10 rounded-full blur-3xl" />
            </div>
            <div className="p-10">
               <CardHeader className="p-0 mb-8">
                  <CardTitle className="text-2xl font-black text-gray-900 uppercase italic">Cadastro</CardTitle>
               </CardHeader>
               <CardContent className="p-0 space-y-6">
                  <div className="space-y-4">
                     <div className="space-y-1.5">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Nome Completo</Label>
                        <div className="relative">
                           <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-500" />
                           <Input placeholder="Seu Nome" value={name} onChange={(e) => setName(e.target.value)} className="pl-10 h-12 rounded-xl" />
                        </div>
                     </div>
                     <div className="space-y-1.5">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">E-mail</Label>
                        <div className="relative">
                           <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-500" />
                           <Input placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 h-12 rounded-xl" />
                        </div>
                     </div>
                     <div className="space-y-1.5">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Senha</Label>
                        <div className="relative">
                           <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-500" />
                           <Input type="password" placeholder="••••••••" value={pw} onChange={(e) => setPw(e.target.value)} className="pl-10 h-12 rounded-xl" />
                        </div>
                     </div>
                  </div>
                  <Button onClick={handleRegister} className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-black rounded-xl transition-all shadow-lg shadow-orange-200">CRIAR CONTA</Button>
                  <p className="text-center text-xs font-bold text-gray-400 pt-4">
                     Já tem uma conta? <Link href="/auth/login" className="text-orange-500 font-bold hover:underline">Entre aqui</Link>
                  </p>
               </CardContent>
            </div>
         </div>
      </Card>
    </div>
  );
}

// ═══ MOBILE ═══
function MobileRegister() {
  const { name, setName, email, setEmail, pw, setPw, handleRegister, router } = useRegisterLogic();

  return (
    <Box sx={{ py: 3 }}>
      <IconButton onClick={() => router.back()} sx={{ mb: 2, bgcolor: 'white', border: '1px solid #eee' }}><ChevronLeft size={20} /></IconButton>
      <Typography sx={{ fontSize: '2rem', fontWeight: 950, color: '#1A202C', mb: 1, letterSpacing: -1, lineHeight: 1 }}>Crie sua <br /><span style={{ color: '#E67E22' }}>Conta.</span></Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600, mb: 4 }}>Junte-se a milhares de exploradores.</Typography>

      <Stack spacing={2.5}>
        <TextField fullWidth label="Nome Completo" value={name} onChange={(e) => setName(e.target.value)}
          InputProps={{ startAdornment: <InputAdornment position="start"><User size={20} color="#E67E22" /></InputAdornment> }}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4, bgcolor: 'white' } }} />
        <TextField fullWidth label="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}
          InputProps={{ startAdornment: <InputAdornment position="start"><Mail size={20} color="#E67E22" /></InputAdornment> }}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4, bgcolor: 'white' } }} />
        <TextField fullWidth type="password" label="Senha" value={pw} onChange={(e) => setPw(e.target.value)}
          InputProps={{ startAdornment: <InputAdornment position="start"><Lock size={20} color="#E67E22" /></InputAdornment> }}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4, bgcolor: 'white' } }} />
        
        <FormControlLabel 
           control={<Checkbox defaultChecked sx={{ color: '#E67E22', '&.Mui-checked': { color: '#E67E22' } }} />} 
           label={<Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>Eu concordo com os Termos e Privacidade.</Typography>} 
        />

        <MuiButton fullWidth variant="contained" onClick={handleRegister} sx={{ py: 2, borderRadius: 4, fontWeight: 950, bgcolor: '#E67E22', shadow: '0 10px 20px rgba(230,126,34,0.2)' }}>CADASTRAR AGORA</MuiButton>
      </Stack>

      <Typography variant="body2" sx={{ textAlign: 'center', mt: 4, fontWeight: 700, color: '#A0AEC0' }}>
         Já é de casa? <Link href="/auth/login" style={{ textDecoration: 'none', color: '#E67E22', fontWeight: 900 }}>Entre aqui</Link>
      </Typography>
    </Box>
  );
}

export default function RegisterPage() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileRegister /> : <WebRegister />;
}
