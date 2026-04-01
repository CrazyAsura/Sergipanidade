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
} from '@/components/ui/dropdown-menu';

// Icons
import {
  Home, Map, Heart, Users, MessageCircle, Bell, LogIn, LogOut,
  Menu, Compass, Info, Wrench, HelpCircle, Mail, X, Search,
 Share2, ExternalLink
} from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Mapa', href: '/mapa', icon: Map },
  { label: 'Guia IA', href: '/guia', icon: MessageCircle },
  { label: 'Favoritos', href: '/favoritos', icon: Heart },
  { label: 'Discussão', href: '/discussao', icon: Users },
];

const infoLinks = [
  { label: 'Sobre', href: '/sobre', icon: Info },
  { label: 'Serviços', href: '/servicos', icon: Wrench },
  { label: 'FAQ', href: '/faq', icon: HelpCircle },
  { label: 'Contato', href: '/contato', icon: Mail },
];

// Pages where layout chrome should be hidden
const authPages = ['/login', '/register', '/reset-password'];

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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/30">
        <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-gray-100/50">
          <div className="max-w-6xl mx-auto px-6 h-14 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Compass className="h-6 w-6 text-orange-500" />
              <span className="text-lg font-black bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">SERGIPANIDADE</span>
            </Link>
          </div>
        </header>
        <main className="max-w-6xl mx-auto w-full px-4 md:px-6 py-8">{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFCFB]">
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-orange-100/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo Section */}
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-2 group transition-transform duration-300 hover:scale-105">
              <div className="p-2 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl shadow-lg shadow-orange-200 group-hover:rotate-12 transition-transform">
                <Compass className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col -gap-1">
                <span className="text-xl font-black tracking-tighter bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 bg-clip-text text-transparent leading-none">
                  SERGIPANIDADE
                </span>
                <span className="text-[10px] font-bold text-orange-400 tracking-[0.2em] uppercase">Turismo & Cultura</span>
              </div>
            </Link>

            {/* Main Nav Items */}
            <nav className="hidden lg:flex items-center gap-1.5 p-1.5 bg-gray-50/50 rounded-2xl border border-gray-100">
              {navLinks.map((l) => {
                const Icon = l.icon;
                const active = pathname === l.href;
                return (
                  <Link 
                    key={l.href} 
                    href={l.href}
                    className={`relative px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 overflow-hidden
                      ${active 
                        ? 'bg-white text-orange-600 shadow-sm ring-1 ring-gray-100' 
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'}`}
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
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Buscar atrativos, cidades..." 
                className="w-full bg-gray-50 border-none rounded-2xl py-2.5 pl-10 pr-4 text-sm font-medium focus:ring-2 focus:ring-orange-100 transition-all outline-none placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Right Section: Notification & User */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-1">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-colors">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-colors">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            <div className="h-8 w-px bg-gray-100 mx-1 hidden md:block" />

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 pl-1 pr-3 py-1 bg-white border border-gray-100 rounded-2xl hover:shadow-md transition-all group overflow-hidden">
                    <div className="relative">
                      <ShadAvatar className="h-9 w-9 border-2 border-white ring-2 ring-orange-100 group-hover:ring-orange-200 transition-all">
                        <AvatarImage src={user?.avatar || ''} />
                        <AvatarFallback className="bg-gradient-to-br from-orange-400 to-amber-500 text-white font-black text-xs">
                          {user?.name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </ShadAvatar>
                      <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-white rounded-full" />
                    </div>
                    <div className="flex flex-col items-start leading-none hidden sm:flex">
                      <span className="text-sm font-bold text-gray-800">{user?.name?.split(' ')[0]}</span>
                      <span className="text-[10px] font-semibold text-gray-400">Ver Perfil</span>
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl border-orange-50 shadow-xl shadow-orange-100/50">
                  <DropdownMenuLabel className="px-3 py-2">
                    <p className="text-sm font-black text-gray-900 leading-tight">{user?.name}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{user?.email}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-50" />
                  <DropdownMenuItem className="rounded-xl px-3 py-2 cursor-pointer focus:bg-orange-50 focus:text-orange-600 transition-colors">
                    <Users className="mr-2 h-4 w-4" /> Minha Conta
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-xl px-3 py-2 cursor-pointer focus:bg-orange-50 focus:text-orange-600 transition-colors">
                    <Heart className="mr-2 h-4 w-4" /> Meus Favoritos
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-50" />
                  <DropdownMenuItem onClick={() => dispatch(logout())} className="rounded-xl px-3 py-2 cursor-pointer text-red-500 font-bold focus:bg-red-50 focus:text-red-600 transition-colors">
                    <LogOut className="mr-2 h-4 w-4" /> Encerrar Sessão
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                onClick={() => router.push('/login')} 
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black rounded-2xl px-6 py-5 shadow-lg shadow-orange-100 active:scale-95 transition-all text-sm uppercase tracking-wide"
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
                  <nav className="flex flex-col gap-1">
                    {navLinks.map((l) => { const Icon = l.icon; return (
                      <Link key={l.href} href={l.href}
                        className={`px-4 py-3 rounded-xl font-semibold flex items-center gap-3 transition-colors
                          ${pathname === l.href ? 'bg-orange-50 text-orange-600' : 'text-gray-500 hover:bg-gray-50'}`}>
                        <Icon className="h-5 w-5" />{l.label}
                      </Link>
                    ); })}
                    <div className="my-2 h-px bg-gray-100" />
                    {infoLinks.map((l) => { const Icon = l.icon; return (
                      <Link key={l.href} href={l.href} className="px-4 py-2.5 rounded-xl text-sm text-gray-400 hover:text-gray-700 flex items-center gap-3">
                        <Icon className="h-4 w-4" />{l.label}
                      </Link>
                    ); })}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-10">{children}</main>
      <footer className="bg-[#1A1A1A] text-gray-300 pt-16 pb-8 px-6 overflow-hidden relative">
        {/* Subtle Decorative Background Element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Column */}
            <div className="space-y-6">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="p-2 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl shadow-lg ring-1 ring-white/10">
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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isAuthPage = authPages.includes(pathname);

  const getNavValue = (p: string) => {
    if (p.includes('/mapa')) return 1;
    if (p.includes('/guia')) return 2;
    if (p.includes('/favoritos')) return 3;
    if (p.includes('/discussao')) return 4;
    if (p === '/') return 0;
    return -1;
  };

  const navValue = getNavValue(pathname);

  // Auth pages: minimal chrome — just a thin branded bar
  if (isAuthPage) {
    return (
      <Box sx={{ bgcolor: '#FAFAFA', minHeight: '100vh' }}>
        <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'white', borderBottom: '1px solid #f0f0f0' }}>
          <Toolbar sx={{ minHeight: '48px !important', px: 2 }}>
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
        bgcolor: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(0,0,0,0.04)',
      }}>
        <Toolbar sx={{ minHeight: '52px !important', px: 1.5, justifyContent: 'space-between' }}>
          {/* Left: Avatar + Brand */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isAuthenticated && (
              <MuiAvatar
                src={user?.avatar || ''}
                sx={{ width: 32, height: 32, border: '2px solid #E67E22', fontSize: '0.8rem' }}
              >{user?.name?.charAt(0) || 'U'}</MuiAvatar>
            )}
            <Typography
              onClick={() => router.push('/')}
              sx={{
                fontSize: '1.05rem', fontWeight: 800, cursor: 'pointer', letterSpacing: '-0.3px',
                background: 'linear-gradient(45deg, #E67E22, #F39C12)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>SERGIPANIDADE</Typography>
          </Box>

          {/* Right: Actions */}
          <Stack direction="row" spacing={0} alignItems="center">
            {!isAuthenticated ? (
              <MuiButton
                size="small" onClick={() => router.push('/login')}
                sx={{
                  borderRadius: 5, fontWeight: 800, textTransform: 'none',
                  bgcolor: '#E67E22', color: 'white', px: 2, py: 0.5,
                  fontSize: '0.7rem', minWidth: 0,
                  '&:hover': { bgcolor: '#D35400' },
                  boxShadow: '0 2px 8px rgba(230,126,34,0.3)',
                }}>Entrar</MuiButton>
            ) : (
              <IconButton size="small" onClick={() => dispatch(logout())} sx={{ color: '#999' }}>
                <LogOut size={18} />
              </IconButton>
            )}
            <IconButton size="small" onClick={() => setDrawerOpen(true)} sx={{ color: '#999', ml: 0.5 }}>
              <Menu size={20} />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Side Drawer for info links */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 260, borderRadius: '24px 0 0 24px', pt: 1 } }}>
        <Box sx={{ px: 2, py: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: '#2C3E50' }}>Menu</Typography>
          <IconButton size="small" onClick={() => setDrawerOpen(false)}><X size={18} /></IconButton>
        </Box>
        <Divider />
        <List sx={{ px: 1 }}>
          {infoLinks.map((l) => {
            const Icon = l.icon;
            const active = pathname === l.href;
            return (
              <ListItemButton key={l.href} onClick={() => { router.push(l.href); setDrawerOpen(false); }}
                sx={{ borderRadius: 3, mb: 0.5, bgcolor: active ? '#FFF5EB' : 'transparent' }}>
                <ListItemIcon sx={{ minWidth: 36 }}><Icon size={18} color={active ? '#E67E22' : '#999'} /></ListItemIcon>
                <ListItemText primary={l.label} primaryTypographyProps={{ fontWeight: active ? 800 : 600, fontSize: '0.9rem', color: active ? '#E67E22' : '#555' }} />
              </ListItemButton>
            );
          })}
        </List>
        <Divider sx={{ my: 1 }} />
        <List sx={{ px: 1 }}>
          {navLinks.map((l) => {
            const Icon = l.icon;
            const active = pathname === l.href;
            return (
              <ListItemButton key={l.href} onClick={() => { router.push(l.href); setDrawerOpen(false); }}
                sx={{ borderRadius: 3, mb: 0.5, bgcolor: active ? '#FFF5EB' : 'transparent' }}>
                <ListItemIcon sx={{ minWidth: 36 }}><Icon size={18} color={active ? '#E67E22' : '#999'} /></ListItemIcon>
                <ListItemText primary={l.label} primaryTypographyProps={{ fontWeight: active ? 800 : 600, fontSize: '0.9rem', color: active ? '#E67E22' : '#555' }} />
              </ListItemButton>
            );
          })}
        </List>
      </Drawer>

      {/* Content — edge to edge, no extra container wrapper */}
      <Box sx={{ px: 2, py: 1.5 }}>
        {children}
      </Box>

      {/* Bottom Nav — only when logged in */}
      {isAuthenticated && (
        <Paper sx={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1200,
          borderRadius: '20px 20px 0 0', overflow: 'hidden',
        }} elevation={0}>
          <Box sx={{
            height: 1, background: 'linear-gradient(90deg, transparent, rgba(230,126,34,0.2), transparent)',
          }} />
          <BottomNavigation
            value={navValue}
            onChange={(_, v) => {
              const routes = ['/', '/mapa', '/guia', '/favoritos', '/discussao'];
              router.push(routes[v]);
            }}
            showLabels
            sx={{
              height: 68, bgcolor: 'white',
              '& .MuiBottomNavigationAction-root': {
                minWidth: 0, py: 1,
                color: '#CBD5E0',
                '&.Mui-selected': { color: '#E67E22' },
              },
              '& .MuiBottomNavigationAction-label': {
                fontSize: '0.6rem', fontWeight: 700, mt: 0.25,
                '&.Mui-selected': { fontSize: '0.6rem', fontWeight: 800 },
              },
            }}
          >
            <BottomNavigationAction label="Home" icon={<Home size={20} />} />
            <BottomNavigationAction label="Mapa" icon={<Map size={20} />} />
            <BottomNavigationAction label="Guia" icon={<MessageCircle size={20} />} />
            <BottomNavigationAction label="Favoritos" icon={<Heart size={20} />} />
            <BottomNavigationAction label="Discussão" icon={<Users size={20} />} />
          </BottomNavigation>
        </Paper>
      )}
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
