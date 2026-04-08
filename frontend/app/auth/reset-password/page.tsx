'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useIsMobile } from '@/hooks/useIsMobile';
import { Mail, CheckCircle2, ChevronLeft, ArrowRight, ShieldQuestion } from 'lucide-react';

// Shadcn
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// MUI
import {
  Box, Typography, TextField, Button as MuiButton, Stack,
  IconButton, InputAdornment, Alert
} from '@mui/material';

function useResetLogic() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const router = useRouter();

  const handleReset = () => {
    if (!email) return;
    setSent(true);
  };

  return { email, setEmail, sent, handleReset, router };
}

// ═══ WEB ═══
function WebReset() {
  const { email, setEmail, sent, handleReset, router } = useResetLogic();

  return (
    <div className="min-h-[70vh] flex items-center justify-center animate-in fade-in slide-in-from-bottom-5 duration-500">
      <Card className="w-full max-w-lg border-gray-100 shadow-2xl shadow-primary/10 p-12 rounded-[3.5rem] relative overflow-hidden bg-white">
        {!sent ? (
          <div className="space-y-10 relative z-10">
            <div className="text-center space-y-4">
              <div className="h-16 w-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShieldQuestion size={32} />
              </div>
              <h2 className="text-4xl font-black text-gray-900 leading-tight uppercase italic tracking-tighter">Esqueceu a senha?</h2>
              <p className="text-gray-500 font-medium max-w-sm mx-auto">Relaxe, acontece com os melhores exploradores. Informe seu e-mail e enviaremos um link de recuperação.</p>
            </div>
            
            <div className="space-y-6">
               <div className="space-y-2">
                 <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Seu E-mail</Label>
                 <div className="relative">
                   <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
                   <Input 
                     placeholder="seu@email.com" 
                     value={email} 
                     onChange={(e) => setEmail(e.target.value)} 
                     className="pl-12 h-14 rounded-2xl text-lg font-bold border-gray-100 bg-gray-50/30" 
                   />
                 </div>
               </div>
               <Button 
                 onClick={handleReset} 
                 className="w-full h-16 bg-primary hover:bg-primary/90 text-primary-foreground font-black rounded-2xl transition-all shadow-xl shadow-primary/20 text-lg uppercase italic group"
               >
                 ENVIAR LINK <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
               </Button>
            </div>

            <p className="text-center text-sm font-bold text-gray-400 pt-4 flex items-center justify-center gap-2 cursor-pointer hover:text-primary transition-colors" onClick={() => router.push('/auth/login')}>
               <ChevronLeft size={16} /> Voltar para o Login
            </p>
          </div>
        ) : (
          <div className="text-center space-y-8 relative z-10 py-10">
             <div className="h-20 w-20 bg-green-50 text-green-600 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-bounce">
                <CheckCircle2 size={40} />
             </div>
             <h2 className="text-4xl font-black text-gray-900 uppercase italic">E-mail Enviado!</h2>
             <p className="text-gray-500 font-medium">Verifique sua caixa de entrada em <br /><span className="text-gray-900 font-black">{email}</span> para redefinir sua senha.</p>
             <Button 
               variant="outline" 
               onClick={() => router.push('/auth/login')}
               className="w-full h-14 border-2 border-gray-100 rounded-2xl font-black text-lg transition-all hover:bg-primary/5 hover:text-primary hover:border-primary/20"
             >
                VOLTAR AO LOGIN
             </Button>
          </div>
        )}
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full -ml-16 -mb-16 blur-3xl" />
      </Card>
    </div>
  );
}

// ═══ MOBILE ═══
function MobileReset() {
  const { email, setEmail, sent, handleReset, router } = useResetLogic();

  return (
    <Box sx={{ py: 3 }}>
      <IconButton onClick={() => router.back()} sx={{ mb: 2, bgcolor: 'white', border: '1px solid #eee' }}><ChevronLeft size={20} /></IconButton>
      
      {!sent ? (
        <Box sx={{ mt: 2 }}>
          <Typography sx={{ fontSize: '2rem', fontWeight: 950, color: '#1A202C', mb: 1.5, letterSpacing: -1 }}>Recuperar <span style={{ color: '#ED2100' }}>Senha.</span></Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600, mb: 5 }}>Problemas com a senha? Digite seu e-mail e vamos te ajudar a voltar.</Typography>

          <Stack spacing={4}>
            <TextField 
              fullWidth label="E-mail de Cadastro" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><Mail size={22} color="#ED2100" /></InputAdornment> }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4, bgcolor: 'white', height: 64, fontWeight: 700 } }} 
            />
            
            <MuiButton 
              fullWidth variant="contained" 
              onClick={handleReset} 
              sx={{ py: 2, borderRadius: 4, fontWeight: 950, bgcolor: '#ED2100', shadow: '0 10px 20px rgba(237, 33, 0, 0.2)', '&:hover': { bgcolor: '#C41B00' } }}
            >
              ENVIAR RECUPERAÇÃO
            </MuiButton>
          </Stack>
        </Box>
      ) : (
        <Box sx={{ mt: 5, textAlign: 'center' }}>
           <Box sx={{ width: 80, height: 80, bgcolor: 'rgba(39,174,96,0.1)', color: '#27ae60', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 4 }}>
              <CheckCircle2 size={40} />
           </Box>
           <Typography sx={{ fontSize: '1.75rem', fontWeight: 950, mb: 1 }}>Verifique seu E-mail!</Typography>
           <Typography sx={{ color: 'text.secondary', fontWeight: 600, mb: 5 }}>Enviamos o link para {email}. </Typography>
           <MuiButton 
             fullWidth 
             onClick={() => router.push('/auth/login')}
             sx={{ fontWeight: 900, color: '#ED2100', py: 2, border: '2px solid #ED2100', borderRadius: 4, '&:hover': { bgcolor: 'rgba(237, 33, 0, 0.05)', borderColor: '#ED2100' } }}
           >
              VOLTAR AO LOGIN
           </MuiButton>
        </Box>
      )}
    </Box>
  );
}

export default function ResetPasswordPage() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileReset /> : <WebReset />;
}
