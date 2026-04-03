'use client';

import { ReactNode, useState, useEffect } from 'react';
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
  Share2, ExternalLink, User, Settings, ChevronRight
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const publicLinks = [
  { label: 'Início', href: '/', icon: Home },
  { label: 'Sobre', href: '/about', icon: Info },
  { label: 'Serviços', href: '/services', icon: Wrench },
  { label: 'FAQ', href: '/faq', icon: HelpCircle },
  { label: 'Contato', href: '/contact', icon: Mail },
];

const appLinks = [
  { label: 'Explorar', href: '/locations', icon: Compass },
  { label: 'Mapa', href: '/map', icon: Map },
  { label: 'IA Guia', href: '/guide', icon: MessageCircle },
  { label: 'Favoritos', href: '/favorites', icon: Heart },
  { label: 'Fórum', href: '/discussions', icon: Users },
];

const authPages = ['/auth/login', '/auth/register', '/auth/reset-password'];

interface LayoutProps { children: ReactNode }

// ═══════════════════════════════════════════
// FOOTER COMPONENT
// ═══════════════════════════════════════════
function Footer() {
  return (
    <footer className="bg-card text-card-foreground border-t border-border pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <Compass className="h-8 w-8 text-primary" />
            <span className="text-xl font-black text-foreground tracking-tighter">SERGIPANIDADE</span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-medium">
            Descubra as riquezas naturais, históricas e culturais do estado de Sergipe com a nossa guia inteligente.
          </p>
          <div className="flex gap-4">
             {['facebook', 'instagram', 'twitter', 'youtube'].map(s => (
               <div key={s} className="h-9 w-9 rounded-xl bg-gray-50 dark:bg-slate-800 flex items-center justify-center text-gray-400 dark:text-slate-500 hover:text-orange-500 hover:bg-orange-50 transition-all cursor-pointer border border-gray-100 dark:border-slate-800">
                 <Share2 size={16} />
               </div>
             ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-black text-gray-900 dark:text-white mb-6 uppercase text-xs tracking-widest">Navegação</h4>
          <ul className="space-y-4">
            {publicLinks.map(l => (
              <li key={l.href}><Link href={l.href} className="text-sm font-bold text-gray-500 dark:text-slate-400 hover:text-orange-500 transition-colors">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-black text-gray-900 dark:text-white mb-6 uppercase text-xs tracking-widest">Plataforma</h4>
          <ul className="space-y-4">
            {appLinks.slice(0, 4).map(l => (
              <li key={l.href}><Link href={l.href} className="text-sm font-bold text-gray-500 dark:text-slate-400 hover:text-orange-500 transition-colors">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-black text-gray-900 dark:text-white mb-6 uppercase text-xs tracking-widest">Contato</h4>
          <p className="text-sm text-gray-500 dark:text-slate-400 font-bold mb-2">contato@sergipanidade.com.br</p>
          <p className="text-sm text-gray-500 dark:text-slate-400 font-bold">(79) 99999-9999</p>
          <div className="mt-8 p-4 bg-orange-50 dark:bg-orange-950/20 rounded-2xl border border-orange-100 dark:border-orange-900/30">
            <p className="text-[10px] font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest mb-1">Newsletter</p>
            <div className="flex gap-2">
              <input type="text" placeholder="Seu email" className="bg-white dark:bg-slate-900 text-[10px] rounded-lg px-3 py-2 w-full border-none outline-none focus:ring-1 focus:ring-orange-200" />
              <Button size="icon" className="h-8 w-8 bg-orange-600 hover:bg-orange-700 shrink-0"><ChevronRight size={14} /></Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs font-bold text-muted-foreground">© 2024 Sergipanidade Turismo. Todos os direitos reservados.</p>
        <div className="flex gap-6">
           <a href="#" className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors">Termos de Uso</a>
           <a href="#" className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors">Privacidade</a>
        </div>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════
// WEB LAYOUT
// ═══════════════════════════════════════════
function WebLayout({ children }: LayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((s: RootState) => s.auth);
  const isAuthPage = authPages.includes(pathname);
  const isPrivatePath = appLinks.some(link => pathname.startsWith(link.href)) || pathname === '/favorites';

  useEffect(() => {
    if (!isAuthenticated && isPrivatePath) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, isPrivatePath, router]);

  useEffect(() => {
    if (isAuthenticated && pathname === '/') {
      router.push('/locations');
    }
  }, [isAuthenticated, pathname, router]);

  if (!isAuthenticated && isPrivatePath) return null;

  const currentLinks = isAuthenticated ? appLinks : publicLinks;

  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-orange-50/30">
        <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-gray-100/50">
          <div className="max-w-6xl mx-auto px-6 h-14 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Compass className="h-6 w-6 text-orange-500" />
              <span className="text-lg font-black bg-linear-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent uppercase">Sergipanidade</span>
            </Link>
          </div>
        </header>
        <main className="max-w-6xl mx-auto w-full px-6 py-12">{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <header className="sticky top-0 z-50 bg-background/70 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-10">
            <Link href={isAuthenticated ? "/locations" : "/"} className="flex items-center gap-2 group transition-transform duration-300 hover:scale-105">
              <div className="aspect-square rounded-2xl bg-linear-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-orange-200/50 dark:shadow-none group-hover:rotate-12 transition-transform h-10 w-10">
                <Compass className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col -gap-1">
                <span className="text-xl font-black tracking-tighter bg-linear-to-r from-orange-600 via-amber-600 to-orange-500 bg-clip-text text-transparent leading-none uppercase">
                  SERGIPANIDADE
                </span>
                <span className="text-[10px] font-bold text-orange-400 dark:text-orange-500/80 tracking-[0.2em] uppercase">Turismo & Cultura</span>
              </div>
            </Link>
            <div className="ml-2">
              <ThemeToggle />
            </div>
            
            <nav className="hidden lg:flex items-center gap-1.5 p-1.5 bg-gray-50/50 dark:bg-slate-800/30 rounded-2xl border border-gray-100 dark:border-slate-800">
              {currentLinks.map((l) => {
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
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <div className="hidden md:flex items-center gap-1">
                <Button variant="ghost" size="icon" className="text-gray-400 dark:text-slate-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/30 rounded-xl transition-colors">
                  <Bell className="h-5 w-5" />
                </Button>
              </div>
            )}

            <div className="h-8 w-px bg-gray-100 dark:bg-slate-800 mx-1 hidden md:block" />

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <button className="flex items-center gap-3 pl-1 pr-3 py-1 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl hover:shadow-md transition-all group overflow-hidden outline-none">
                    <div className="relative">
                      <ShadAvatar className="h-9 w-9 border-2 border-white dark:border-slate-800 ring-2 ring-orange-100 dark:ring-orange-900/30 group-hover:ring-orange-200 transition-all">
                        <AvatarImage src={user?.avatar || ''} />
                        <AvatarFallback className="bg-linear-to-br from-orange-400 to-amber-500 text-white font-black text-xs uppercase">
                          {user?.name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </ShadAvatar>
                      <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full" />
                    </div>
                    <div className="hidden sm:flex flex-col items-start leading-none">
                      <span className="text-sm font-bold text-gray-800 dark:text-slate-200">{user?.name?.split(' ')[0]}</span>
                      <span className="text-[10px] font-semibold text-gray-400 dark:text-slate-500">Perfil</span>
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl border-orange-50 dark:border-slate-800 shadow-xl bg-white dark:bg-slate-900">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="px-3 py-2">
                      <p className="text-sm font-black text-gray-900 dark:text-slate-100 leading-tight">{user?.name}</p>
                      <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 truncate">{user?.email}</p>
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="bg-gray-50 dark:bg-slate-800" />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => router.push('/auth/profile')} className="rounded-xl px-3 py-2.5 cursor-pointer text-gray-700 dark:text-slate-300 font-bold focus:bg-orange-50 dark:focus:bg-slate-800 focus:text-orange-600 transition-colors flex items-center">
                      <User className="mr-3 h-4.5 w-4.5 opacity-70" /> Meu Perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/auth/settings')} className="rounded-xl px-3 py-2.5 cursor-pointer text-gray-700 dark:text-slate-300 font-bold focus:bg-orange-50 dark:focus:bg-slate-800 focus:text-orange-600 transition-colors flex items-center">
                      <Settings className="mr-3 h-4.5 w-4.5 opacity-70" /> Configurações
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="bg-gray-50 dark:bg-slate-800" />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => dispatch(logout())} className="rounded-xl px-3 py-2.5 cursor-pointer text-red-500 font-bold focus:bg-red-50 dark:focus:bg-red-950/30 focus:text-red-600 transition-colors flex items-center">
                      <LogOut className="mr-3 h-4.5 w-4.5" /> Sair da Conta
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                onClick={() => router.push('/auth/login')} 
                className="bg-orange-500 hover:bg-orange-600 text-white font-black rounded-2xl px-6 py-2 transition-all active:scale-95"
              >
                ENTRAR
              </Button>
            )}
            
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger>
                  <Button variant="ghost" size="icon" className="bg-gray-50 dark:bg-slate-800 rounded-xl">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-72">
                  <div className="flex flex-col gap-2 mt-8">
                    {currentLinks.map((l) => {
                      const Icon = l.icon;
                      const active = pathname === l.href;
                      return (
                        <Link key={l.href} href={l.href} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${active ? 'bg-orange-500 text-white' : 'text-gray-600 dark:text-slate-400 hover:bg-orange-50 dark:hover:bg-slate-800'}`}>
                          <Icon size={18} />
                          {l.label}
                        </Link>
                      );
                    })}
                    {!isAuthenticated && (
                       <Button onClick={() => router.push('/auth/login')} className="mt-4 w-full bg-orange-600 text-white font-black rounded-xl h-12">ENTRAR AGORA</Button>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-10">
        {children}
      </main>
      {!isAuthenticated && <Footer />}
    </div>
  );
}

// ═══════════════════════════════════════════
// MOBILE LAYOUT
// ═══════════════════════════════════════════
function MobileLayout({ children }: LayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((s: RootState) => s.auth);
  const isPrivatePath = appLinks.some(link => pathname.startsWith(link.href)) || pathname === '/favorites';
  const isAuthPage = authPages.includes(pathname);

  useEffect(() => {
    if (!isAuthenticated && isPrivatePath) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, isPrivatePath, router]);

  useEffect(() => {
    if (isAuthenticated && pathname === '/') {
      router.push('/locations');
    }
  }, [isAuthenticated, pathname, router]);

  if (!isAuthenticated && isPrivatePath) return null;

  const currentLinks = isAuthenticated ? appLinks : publicLinks;

  const getNavValue = (p: string) => {
    if (p.startsWith('/locations')) return 0;
    if (p.startsWith('/map')) return 1;
    if (p.startsWith('/guide')) return 2;
    if (p.startsWith('/favorites')) return 3;
    if (p.startsWith('/discussions')) return 4;
    return -1;
  };

  const navValue = getNavValue(pathname);

  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <header className="sticky top-0 z-50 bg-background/70 backdrop-blur-md border-b border-border py-4 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass size={22} className="text-primary" />
            <span className="font-black text-primary tracking-tighter uppercase">SERGIPANIDADE</span>
          </div>
          <ThemeToggle />
        </header>
        <main className="flex-1 p-4">{children}</main>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col bg-background text-foreground ${isAuthenticated ? 'pb-20' : ''}`}>
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2" onClick={() => router.push(isAuthenticated ? '/locations' : '/')}>
          <div className="bg-primary p-1.5 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <Compass size={18} className="text-primary-foreground" />
          </div>
          <span className="font-black text-sm tracking-tighter text-foreground uppercase">SERGIPANIDADE</span>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {isAuthenticated ? (
             <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <div className="h-8 w-8 rounded-full border-2 border-primary ring-2 ring-primary/20 overflow-hidden">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-black">
                        {user?.name?.charAt(0)}
                      </div>
                    )}
                  </div>
                </DropdownMenuTrigger>
                 <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl bg-popover text-popover-foreground shadow-2xl border-border">
                    <DropdownMenuItem onClick={() => router.push('/auth/profile')} className="rounded-xl px-4 py-3 font-bold focus:bg-accent">Perfil</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/auth/settings')} className="rounded-xl px-4 py-3 font-bold focus:bg-accent">Configurações</DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-border" />
                    <DropdownMenuItem onClick={() => dispatch(logout())} className="rounded-xl px-4 py-3 text-destructive font-bold focus:bg-destructive/10">Sair</DropdownMenuItem>
                 </DropdownMenuContent>
             </DropdownMenu>
          ) : (
             <button 
               onClick={() => router.push('/auth/login')} 
               className="bg-primary text-primary-foreground font-black rounded-xl text-xs px-4 py-2 shadow-lg shadow-primary/20 active:scale-95 transition-all"
             >
               ENTRAR
             </button>
          )}
        </div>
      </header>

      <main className="flex-1 p-4">
        {children}
      </main>

      {!isAuthenticated && <Footer />}

      {isAuthenticated && (
        <nav className="fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-xl border-t border-border px-4 pt-3 pb-6 flex items-center justify-between z-50">
          {appLinks.map((l, idx) => {
            const Icon = l.icon;
            const active = pathname.startsWith(l.href);
            return (
              <Link 
                key={l.href} 
                href={l.href}
                className={`flex flex-col items-center gap-1 transition-all duration-300 ${active ? 'text-primary' : 'text-muted-foreground'}`}
              >
                <div className={`p-2 rounded-xl transition-all ${active ? 'bg-primary/10' : ''}`}>
                  <Icon size={active ? 22 : 20} className={active ? 'stroke-[2.5px]' : ''} />
                </div>
                <span className={`text-[10px] font-bold ${active ? 'opacity-100' : 'opacity-70'}`}>{l.label}</span>
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}

export default function AppLayout({ children }: LayoutProps) {
  const isMobile = useIsMobile();
  return isMobile ? <MobileLayout>{children}</MobileLayout> : <WebLayout>{children}</WebLayout>;
}
