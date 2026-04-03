'use client';

import { ReactNode, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { logout } from '@/lib/store/features/auth/authSlice';
import { useIsMobile } from '@/hooks/useIsMobile';
import Link from 'next/link';

// MUI imports (mobile)
import {
  Paper, Box, AppBar, Toolbar, Typography,
  IconButton, Avatar as MuiAvatar, Stack, Button as MuiButton,
  BottomNavigation, BottomNavigationAction, Drawer, List, ListItemButton,
  ListItemIcon, ListItemText, Divider
} from '@mui/material';

// Shadcn imports (web)
import { Button } from '@/components/ui/button';
import {
  Avatar as ShadAvatar, AvatarImage, AvatarFallback
} from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
  DropdownMenuGroup
} from '@/components/ui/dropdown-menu';

// Icons
import {
  Home, Map, Heart, Users, MessageCircle, Bell, LogIn, LogOut,
  Menu, Compass, Info, Wrench, HelpCircle, Mail, X, Search,
  Share2, ExternalLink, User, Settings
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const navLinks = [
  { label: 'Início', href: '/', icon: Home },
  { label: 'Mapa', href: '/map', icon: Map },
  { label: 'Guia IA', href: '/guide', icon: MessageCircle },
  { label: 'Favoritos', href: '/favorites', icon: Heart },
  { label: 'Discussões', href: '/discussions', icon: Users },
];

const infoLinks = [
  { label: 'Sobre', href: '/about', icon: Info },
  { label: 'Serviços', href: '/services', icon: Wrench },
  { label: 'FAQ', href: '/faq', icon: HelpCircle },
  { label: 'Contato', href: '/contact', icon: Mail },
];

// Pages where layout chrome should be hidden
const authPages = ['/auth/login', '/auth/register', '/auth/reset-password'];

interface LayoutProps { children: ReactNode }

// ═══════════════════════════════════════════
// WEB LAYOUT — Shadcn/Tailwind
// ═══════════════════════════════════════════
function WebLayout({ children }: LayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((s: RootState) => s.auth);
  const isAuthPage = authPages.includes(pathname);

  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-orange-50/30">
        <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-gray-100/50">
          <div className="max-w-6xl mx-auto px-6 h-14 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Compass className="h-6 w-6 text-orange-500" />
              <span className="text-lg font-black bg-linear-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">SERGIPANIDADE</span>
            </Link>
          </div>
        </header>
        <main className="max-w-6xl mx-auto w-full px-4 md:px-6 py-8">{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFCFB] dark:bg-slate-950 transition-colors duration-300">
      <header className="sticky top-0 z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-orange-100/30 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo Section */}
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-2 group transition-transform duration-300 hover:scale-105">
              <div className="aspect-square rounded-2xl bg-linear-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-orange-200/50 dark:shadow-none group-hover:rotate-12 transition-transform">
                <Compass className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col -gap-1">
                <span className="text-xl font-black tracking-tighter bg-linear-to-r from-orange-600 via-amber-600 to-orange-500 bg-clip-text text-transparent leading-none">
                  SERGIPANIDADE
                </span>
                <span className="text-[10px] font-bold text-orange-400 dark:text-orange-500/80 tracking-[0.2em] uppercase">Turismo & Cultura</span>
              </div>
            </Link>
            <div className="ml-2">
              <ThemeToggle />
            </div>
            
            {/* Main Nav Items */}
            <nav className="hidden lg:flex items-center gap-1.5 p-1.5 bg-gray-50/50 dark:bg-slate-800/30 rounded-2xl border border-gray-100 dark:border-slate-800">
              {navLinks.map((l) => {
                const Icon = l.icon;
                const active = pathname === l.href;
                return (
                  <Link 
                    key={l.href} 
                    href={l.href}
                    className={`relative px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 overflow-hidden
                      ${active 
                        ? 'bg-white dark:bg-slate-800 text-orange-600 dark:text-orange-500 shadow-sm ring-1 ring-gray-100 dark:ring-slate-700' 
                        : 'text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-200 hover:bg-gray-100/50 dark:hover:bg-slate-800/50'}`}
                  >
                    <Icon className={`h-4 w-4 transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`} />
                    {l.label}
                    {active && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-600/20" />}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Search Bar - Desktop Only */}
          <div className="hidden xl:flex flex-1 max-w-sm">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-slate-500 group-focus-within:text-orange-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Buscar atrativos, cidades..." 
                className="w-full bg-gray-50 dark:bg-slate-800/50 border-none rounded-2xl py-2.5 pl-10 pr-4 text-sm font-medium focus:ring-2 focus:ring-orange-100 dark:focus:ring-orange-900/30 transition-all outline-none placeholder:text-gray-400 dark:placeholder:text-slate-500 dark:text-slate-200"
              />
            </div>
          </div>

          {/* Right Section: Notification & User */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-1">
              <Button variant="ghost" size="icon" className="text-gray-400 dark:text-slate-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/30 rounded-xl transition-colors">
                <Bell className="h-5 w-5" />
              </Button>
            </div>

            <div className="h-8 w-px bg-gray-100 dark:bg-slate-800 mx-1 hidden md:block" />

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 pl-1 pr-3 py-1 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl hover:shadow-md transition-all group overflow-hidden">
                    <div className="relative">
                      <ShadAvatar className="h-9 w-9 border-2 border-white dark:border-slate-800 ring-2 ring-orange-100 dark:ring-orange-900/30 group-hover:ring-orange-200 transition-all">
                        <AvatarImage src={user?.avatar || ''} />
                        <AvatarFallback className="bg-linear-to-br from-orange-400 to-amber-500 text-white font-black text-xs">
                          {user?.name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </ShadAvatar>
                      <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full" />
                    </div>
                    <div className="hidden sm:flex flex-col items-start leading-none">
                      <span className="text-sm font-bold text-gray-800 dark:text-slate-200">{user?.name?.split(' ')[0]}</span>
                      <span className="text-[10px] font-semibold text-gray-400 dark:text-slate-500">Ver Perfil</span>
                    </div>
                  </button>
                </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl border-orange-50 dark:border-slate-800 shadow-xl shadow-orange-100/50 dark:shadow-slate-950/70 bg-white dark:bg-slate-900 transition-all duration-300">
                      <DropdownMenuGroup>
                        <DropdownMenuLabel className="px-3 py-2">
                          <p className="text-sm font-black text-gray-900 dark:text-slate-100 leading-tight">{user?.name}</p>
                          <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider">{user?.email}</p>
                        </DropdownMenuLabel>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator className="bg-gray-50 dark:bg-slate-800" />
                      <DropdownMenuGroup>
                        <DropdownMenuItem onSelect={() => router.push('/auth/profile')} className="rounded-xl px-3 py-2.5 cursor-pointer text-gray-700 dark:text-slate-300 font-bold focus:bg-orange-50 dark:focus:bg-slate-800 focus:text-orange-600 transition-colors flex items-center">
                          <User className="mr-3 h-4.5 w-4.5 opacity-70" /> Meu Perfil
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => router.push('/auth/settings')} className="rounded-xl px-3 py-2.5 cursor-pointer text-gray-700 dark:text-slate-300 font-bold focus:bg-orange-50 dark:focus:bg-slate-800 focus:text-orange-600 transition-colors flex items-center">
                          <Settings className="mr-3 h-4.5 w-4.5 opacity-70" /> Configurações
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator className="bg-gray-50 dark:bg-slate-800" />
                      <DropdownMenuGroup>
                        <DropdownMenuItem onSelect={() => dispatch(logout())} className="rounded-xl px-3 py-2.5 cursor-pointer text-red-500 font-bold focus:bg-red-50 dark:focus:bg-red-950/30 focus:text-red-600 transition-colors flex items-center text-sm">
                          <LogOut className="mr-3 h-4.5 w-4.5" /> Sair da Conta
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                onClick={() => router.push('/auth/login')} 
                className="bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black rounded-2xl px-6 py-5 shadow-lg shadow-orange-100 active:scale-95 transition-all text-sm uppercase tracking-wide"
              >
                <LogIn className="mr-2 h-4 w-4" /> Entrar Agora
              </Button>
            )}

            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="bg-gray-50 rounded-xl hover:bg-orange-50 hover:text-orange-500 transition-colors">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-72 pt-10">
                  <div className="flex flex-col gap-1.5 dark-text-contrast">
                    {navLinks.map((l) => {
                      const Icon = l.icon;
                      const active = pathname === l.href;
                      return (
                        <Link key={l.href} href={l.href} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${active ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'text-gray-600 dark:text-slate-400 hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-orange-500'}`}>
                          <Icon className={`h-4 w-4 ${active ? 'animate-pulse' : ''}`} />
                          {l.label}
                        </Link>
                      );
                    })}
                    <div className="my-2 h-px bg-gray-100" />
                    {infoLinks.map((l) => { const Icon = l.icon; return (
                      <Link key={l.href} href={l.href} className="px-4 py-2.5 rounded-xl text-sm text-gray-400 dark:text-slate-500 hover:text-gray-700 dark:hover:text-slate-200 flex items-center gap-3 transition-colors">
                        <Icon className="h-4 w-4" />{l.label}
                      </Link>
                    ); })}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-10">{children}</main>
      <footer className="bg-[#1A1A1A] text-gray-300 pt-16 pb-8 px-6 overflow-hidden relative">
        {/* Subtle Decorative Background Element */}
        <div className="absolute top-0 right-0 w-[50%] h-full bg-linear-to-l from-orange-500/10 to-transparent skew-x-12 transform translate-x-20" />
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Column */}
            <div className="space-y-6">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="p-2 bg-linear-to-br from-orange-500 to-amber-500 rounded-xl shadow-lg ring-1 ring-white/10">
                  <Compass className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-black tracking-tighter text-white">SERGIPANIDADE</span>
              </Link>
              <p className="text-sm leading-relaxed text-gray-400 font-medium">
                Sua porta de entrada para vivenciar o melhor de Sergipe. Descubra paisagens, cultura e uma gastronomia inigualável com o seu guia definitivo do estado.
              </p>
              
            </div>

            {/* Platform Column */}
            <div className="space-y-6">
              <h3 className="text-white font-bold text-sm uppercase tracking-widest px-1 border-l-2 border-orange-500">Plataforma</h3>
              <ul className="space-y-4">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm font-semibold hover:text-orange-400 transition-colors flex items-center gap-2 group">
                      <div className="h-1 w-1 rounded-full bg-orange-500 scale-0 group-hover:scale-100 transition-transform" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Column */}
            <div className="space-y-6">
              <h3 className="text-white font-bold text-sm uppercase tracking-widest px-1 border-l-2 border-orange-500">Recursos</h3>
              <ul className="space-y-4">
                {infoLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm font-semibold hover:text-orange-400 transition-colors flex items-center gap-2 group">
                       <div className="h-1 w-1 rounded-full bg-orange-500 scale-0 group-hover:scale-100 transition-transform" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter/Contact Column */}
            <div className="space-y-6">
              <h3 className="text-white font-bold text-sm uppercase tracking-widest px-1 border-l-2 border-orange-500">Fique por dentro</h3>
              <p className="text-xs text-gray-400 font-medium">Receba dicas exclusivas sobre Sergipe diretamente no seu e-mail.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Seu e-mail" 
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:ring-1 focus:ring-orange-500 outline-none w-full transition-all"
                />
                <Button size="icon" className="bg-orange-500 hover:bg-orange-600 rounded-xl shrink-0"><Mail className="h-4 w-4" /></Button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap justify-center gap-8 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
              <Link href="#" className="hover:text-white transition-colors">Termos de Uso</Link>
              <Link href="#" className="hover:text-white transition-colors">Privacidade</Link>
              <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
            </div>
            <p className="text-xs font-semibold text-gray-400 flex items-center gap-1.5 order-first md:order-last">
              Made with <Heart className="h-3 w-3 text-red-500 fill-red-500 animate-pulse" /> for Sergipe
            </p>
          </div>
          
          <div className="mt-8 text-center text-[10px] text-gray-600 font-bold uppercase tracking-[0.3em]">
            © 2026 Sergipanidade • Desenvolvido pela Equipe Sergipana
          </div>
        </div>
      </footer>
    </div>
  );
}

// ═══════════════════════════════════════════
// MOBILE LAYOUT — MUI (Refined)
// ═══════════════════════════════════════════
function MobileLayout({ children }: LayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((s: RootState) => s.auth);
  const isAuthPage = authPages.includes(pathname);

  const getNavValue = (p: string) => {
    if (p.includes('/map')) return 1;
    if (p.includes('/guide')) return 2;
    if (p.includes('/favorites')) return 3;
    if (p.includes('/discussions')) return 4;
    if (p === '/') return 0;
    return -1;
  };

  const navValue = getNavValue(pathname);

  // Auth pages: minimal chrome — just a thin branded bar
  if (isAuthPage) {
    return (
      <Box sx={{ bgcolor: '#FAFAFA', minHeight: '100vh' }}>
        <AppBar position="sticky" elevation={0} sx={{ 
        bgcolor: 'background.paper', 
        borderBottom: '1px solid', 
        borderColor: 'divider',
        backdropFilter: 'blur(30px)',
        zIndex: 1100,
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0, left: 0, right: 0, height: '3px',
          background: 'linear-gradient(90deg, #E67E22, #F39C12, #E67E22)',
          opacity: 0.9,
          boxShadow: '0 2px 10px rgba(230,126,34,0.4)'
        }
      }}>
        <Toolbar sx={{ justifyContent: 'space-between', height: 72, px: 2.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} onClick={() => router.push('/')}>
              <Typography sx={{
                fontSize: '1rem', fontWeight: 800, cursor: 'pointer',
                background: 'linear-gradient(45deg, #E67E22, #F39C12)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>SERGIPANIDADE</Typography>
            </Box>
        </Toolbar>
      </AppBar>
        <Box sx={{ px: 2, py: 1 }}>{children}</Box>
      </Box>
    );
  }

  return (
    <Box sx={{ pb: isAuthenticated ? '72px' : 0, bgcolor: '#FAFAFA', minHeight: '100vh' }}>
      {/* Compact Top Bar */}
      <AppBar position="sticky" elevation={0} sx={{
        bgcolor: 'rgba(255, 255, 255, 0.75)',
        backdropFilter: 'blur(15px)',
        borderBottom: '1px solid',
        borderColor: 'rgba(0,0,0,0.05)',
        zIndex: 1100,
      }}>
        <Toolbar sx={{ minHeight: '64px !important', px: 2, justifyContent: 'space-between' }}>
          {/* Left: Logo/Brand */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }} onClick={() => router.push('/')}>
            <Box sx={{
              p: 0.8,
              background: 'linear-gradient(135deg, #E67E22, #F39C12)',
              borderRadius: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(230,126,34,0.4)'
            }}>
              <Compass size={20} color="white" />
            </Box>
            <Typography
              sx={{
                fontSize: '1rem', fontWeight: 950, letterSpacing: '-0.8px',
                background: 'linear-gradient(45deg, #E67E22, #F39C12)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>SERGIPANIDADE</Typography>
          </Box>

          {/* Right: Actions */}
          <Stack direction="row" spacing={0.5} alignItems="center">
            <IconButton size="small" sx={{ color: 'text.secondary', bgcolor: 'rgba(0,0,0,0.03)', mr: 0.5 }}>
              <Bell size={20} />
            </IconButton>
            {!isAuthenticated ? (
              <MuiButton
                size="small" onClick={() => router.push('/auth/login')}
                sx={{
                  borderRadius: 6, fontWeight: 900, textTransform: 'none',
                  bgcolor: '#E67E22', color: 'white', px: 2.5, py: 0.75,
                  fontSize: '0.75rem', minWidth: 0,
                  '&:hover': { bgcolor: '#D35400' },
                  boxShadow: '0 6px 20px rgba(230,126,34,0.4)',
                }}>Entrar</MuiButton>
            ) : (
              <Box sx={{ ml: 0.5 }}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <IconButton size="small" sx={{ p: 0 }}>
                      <MuiAvatar
                        src={user?.avatar || ''}
                        sx={{ 
                          width: 36, height: 36, 
                          border: '2px solid #E67E22',
                          boxShadow: '0 4px 10px rgba(230,126,34,0.2)'
                        }}
                      >{user?.name?.charAt(0) || 'U'}</MuiAvatar>
                    </IconButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-60 p-2 rounded-2xl border-orange-50 dark:border-slate-800 shadow-2xl shadow-orange-200/50 dark:shadow-slate-950 bg-white dark:bg-slate-900 animate-in slide-in-from-top-2 duration-300">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="px-4 py-3">
                        <p className="text-base font-black text-gray-900 dark:text-white leading-tight">{user?.name}</p>
                        <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">{user?.email}</p>
                      </DropdownMenuLabel>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator className="bg-gray-100 dark:bg-slate-800" />
                    <DropdownMenuGroup>
                      <DropdownMenuItem onSelect={() => router.push('/auth/profile')} className="rounded-xl px-4 py-3 cursor-pointer text-gray-700 dark:text-slate-300 font-bold focus:bg-orange-50 dark:focus:bg-orange-950/30 focus:text-orange-600 transition-colors flex items-center">
                        <User className="mr-3 h-5 w-5 opacity-80" /> <span className="flex-1">Meu Perfil</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => router.push('/auth/settings')} className="rounded-xl px-4 py-3 cursor-pointer text-gray-700 dark:text-slate-300 font-bold focus:bg-orange-50 dark:focus:bg-orange-950/30 focus:text-orange-600 transition-colors flex items-center">
                        <Settings className="mr-3 h-5 w-5 opacity-80" /> <span className="flex-1">Configurações</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator className="bg-gray-100 dark:bg-slate-800" />
                    <DropdownMenuGroup>
                      <DropdownMenuItem onSelect={() => dispatch(logout())} className="rounded-xl px-4 py-3 cursor-pointer text-red-500 font-black focus:bg-red-50 dark:focus:bg-red-900/20 focus:text-red-600 transition-colors flex items-center">
                        <LogOut className="mr-3 h-5 w-5" /> Sair
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </Box>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Content — edge to edge, no extra container wrapper */}
      <Box sx={{ px: 3, py: 2.5, pb: 14 }}>
        {children}
      </Box>

      {/* Bottom Nav */}
      <Paper sx={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1200,
        borderRadius: '32px 32px 0 0', overflow: 'hidden',
        boxShadow: '0 -10px 40px rgba(0,0,0,0.12)',
        bgcolor: 'transparent',
      }} elevation={0}>
        <Box sx={{
          height: 2, background: 'linear-gradient(90deg, transparent, rgba(230,126,34,0.5), transparent)',
        }} />
        <BottomNavigation
          value={navValue}
          onChange={(_, v) => {
            const routes = ['/', '/map', '/guide', '/favorites', '/discussions'];
            router.push(routes[v]);
          }}
          showLabels
          sx={{
            height: 96, 
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid', borderColor: 'rgba(0,0,0,0.05)',
            pb: 2,
            pt: 1,
            '& .MuiBottomNavigationAction-root': {
              minWidth: 0, py: 1,
              color: 'text.secondary',
              '&.Mui-selected': { 
                color: 'primary.main',
                '& .MuiSvgIcon-root, & svg': {
                  transform: 'translateY(-4px) scale(1.2)',
                  filter: 'drop-shadow(0 4px 8px rgba(230,126,34,0.3))'
                }
              },
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            },
            '& .MuiBottomNavigationAction-label': {
              fontSize: '0.65rem', fontWeight: 700, mt: 0.5,
              opacity: 0.7,
              '&.Mui-selected': { 
                fontSize: '0.7rem', fontWeight: 900, transform: 'scale(1.05)',
                opacity: 1
              },
              transition: 'all 0.3s ease',
            },
          }}
        >
          <BottomNavigationAction label="Início" icon={<Home size={22} />} />
          <BottomNavigationAction label="Mapa" icon={<Map size={22} />} />
          <BottomNavigationAction label="Guia IA" icon={<Box sx={{ position: 'relative' }}><MessageCircle size={22} /><Box sx={{ position: 'absolute', top: -4, right: -4, width: 8, height: 8, bgcolor: '#2ECC71', borderRadius: '50%', border: '2px solid white' }} /></Box>} />
          <BottomNavigationAction label="Favoritos" icon={<Heart size={22} />} />
          <BottomNavigationAction label="Fórum" icon={<Users size={22} />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

// ═══════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════
export default function AppLayout({ children }: LayoutProps) {
  const isMobile = useIsMobile();
  return isMobile ? <MobileLayout>{children}</MobileLayout> : <WebLayout>{children}</WebLayout>;
}
