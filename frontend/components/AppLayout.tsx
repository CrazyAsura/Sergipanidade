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
  Menu, Compass, Info, Wrench, HelpCircle, Mail, X
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
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100/60">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <Compass className="h-7 w-7 text-orange-500" />
              <span className="text-xl font-black tracking-tight bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">SERGIPANIDADE</span>
            </Link>
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((l) => {
                const Icon = l.icon;
                const active = pathname === l.href;
                return (
                  <Link key={l.href} href={l.href}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5
                      ${active ? 'bg-orange-50 text-orange-600' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
                    <Icon className="h-4 w-4" />{l.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1 mr-2">
              {infoLinks.map((l) => (
                <Link key={l.href} href={l.href}
                  className={`px-2.5 py-1.5 rounded-md text-xs font-bold uppercase tracking-wide transition-colors
                    ${pathname === l.href ? 'text-orange-600' : 'text-gray-400 hover:text-gray-700'}`}>
                  {l.label}
                </Link>
              ))}
            </div>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-700"><Bell className="h-5 w-5" /></Button>
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <button className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full hover:bg-gray-50 transition-colors border border-gray-100">
                    <ShadAvatar className="h-8 w-8 ring-2 ring-orange-400">
                      <AvatarImage src={user?.avatar || ''} />
                      <AvatarFallback className="bg-orange-100 text-orange-600 font-bold text-sm">{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                    </ShadAvatar>
                    <span className="text-sm font-semibold text-gray-700 hidden sm:inline">{user?.name?.split(' ')[0]}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel className="font-bold">{user?.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => dispatch(logout())} className="text-red-500 font-semibold cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => router.push('/login')} className="bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full px-5">
                <LogIn className="mr-2 h-4 w-4" />Entrar
              </Button>
            )}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger><Button variant="ghost" size="icon"><Menu className="h-5 w-5" /></Button></SheetTrigger>
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
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 md:px-6 py-8">{children}</main>
      <footer className="border-t border-gray-100 bg-white py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-gray-400"><Compass className="h-5 w-5 text-orange-400" /><span className="font-bold text-sm">SERGIPANIDADE</span></div>
          <div className="flex gap-6">{infoLinks.map((l) => (<Link key={l.href} href={l.href} className="text-xs text-gray-400 font-semibold hover:text-orange-500 uppercase">{l.label}</Link>))}</div>
          <p className="text-xs text-gray-300">© 2026 Sergipanidade</p>
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
