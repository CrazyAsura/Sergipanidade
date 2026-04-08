'use client';

import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Stack, 
  Avatar, 
  IconButton,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Divider,
  Button
} from '@mui/material';
import { 
  TrendingUp, 
  Users, 
  MapPin, 
  Heart, 
  ArrowUpRight, 
  MoreVertical,
  Calendar,
  Filter,
  Download,
  Search,
  LayoutDashboard,
  ShieldCheck,
  Award
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';
import { motion } from 'framer-motion';

// Mock data for charts
const visitorData = [
  { name: 'Jan', value: 4000 },
  { name: 'Fev', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Abr', value: 2780 },
  { name: 'Mai', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

const categoryData = [
  { name: 'Praias', value: 400 },
  { name: 'Museus', value: 300 },
  { name: 'Gastronomia', value: 300 },
  { name: 'Natureza', value: 200 },
];

const topLocations = [
  { name: 'Xingó', visits: 1200 },
  { name: 'Atalaia', visits: 1100 },
  { name: 'Laranjeiras', visits: 800 },
  { name: 'Crasto', visits: 600 },
  { name: 'Mangue Seco', visits: 500 },
];

const COLORS = ['#ED2100', '#FF5C00', '#458B8B', '#0F172A'];

const stats = [
  { label: 'Total Visitantes', value: '12.4k', icon: Users, color: '#3B82F6', change: '+12%' },
  { label: 'Locais Mapeados', value: '84', icon: MapPin, color: '#ED2100', change: '+5' },
  { label: 'Favoritos Mensais', value: '2.8k', icon: Heart, color: '#EC4899', change: '+18%' },
  { label: 'Média Avaliação', value: '4.9', icon: Award, color: '#F59E0B', change: '+0.1' },
];

const recentActivity = [
  { id: 1, user: 'Maria Souza', action: 'favoritou', target: 'Ilha de Santa Luzia', time: '5 min atrás', avatar: 'M' },
  { id: 2, user: 'Carlos Lima', action: 'avaliou', target: 'Museu da Gente Sergipana', time: '12 min atrás', avatar: 'C' },
  { id: 3, user: 'Ana Oliveira', action: 'postou', target: 'Fórum: Dicas de Itabaiana', time: '20 min atrás', avatar: 'A' },
  { id: 4, user: 'Ricardo Santos', action: 'começou a seguir', target: 'Guia Xingó', time: '35 min atrás', avatar: 'R' },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <Box sx={{ py: 4, animate: 'fade-in 0.5s ease-out' }}>
      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 6 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 900, color: 'text.primary', letterSpacing: -1, textTransform: 'uppercase', fontStyle: 'italic' }}>
            Painel de <span style={{ color: '#ED2100', fontStyle: 'italic' }}>Controle</span>
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}> Bem-vindo de volta, administrador. </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
           <Button variant="outlined" startIcon={<Download size={18} />} sx={{ borderRadius: 4, fontWeight: 800, textTransform: 'none', borderColor: 'divider', color: 'text.primary' }}>
             Exportar
           </Button>
           <Button variant="contained" startIcon={<LayoutDashboard size={18} />} sx={{ borderRadius: 4, fontWeight: 900, textTransform: 'none', bgcolor: '#ED2100', '&:hover': { bgcolor: '#C41B00' } }}>
             Novo Relatório
           </Button>
        </Stack>
      </Stack>

      <Grid container spacing={4}>
        {/* Stat Cards */}
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={s.label}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 6, border: '1px solid', borderColor: 'divider', position: 'relative', overflow: 'hidden' }}>
                  <Box sx={{ position: 'absolute', top: 0, right: 0, p: 2, opacity: 0.05 }}><Icon size={64} /></Box>
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    <Box sx={{ bgcolor: `${s.color}15`, color: s.color, p: 1.5, borderRadius: 3 }}><Icon size={20} /></Box>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1 }}>{s.label}</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="flex-end" spacing={1}>
                    <Typography variant="h4" sx={{ fontWeight: 900, color: 'text.primary' }}>{s.value}</Typography>
                    <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 900, mb: 0.5 }}>{s.change}</Typography>
                  </Stack>
                </Paper>
              </motion.div>
            </Grid>
          );
        })}

        {/* Visitors Area Chart */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 8, border: '1px solid', borderColor: 'divider' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 900, display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingUp size={20} color="#ED2100" /> Fluxo de Visitantes
              </Typography>
              <Stack direction="row" spacing={1}>
                {['D', 'S', 'M', 'A'].map(p => (
                  <IconButton key={p} size="small" sx={{ fontWeight: 900, fontSize: '0.7rem', width: 28, height: 28, bgcolor: p === 'M' ? '#ED210015' : 'transparent', color: p === 'M' ? '#ED2100' : 'text.disabled' }}>{p}</IconButton>
                ))}
              </Stack>
            </Stack>
            <Box sx={{ height: 350, width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={visitorData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ED2100" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#ED2100" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#94A3B8' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#94A3B8' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', fontWeight: 800 }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#ED2100" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Category Distribution */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 8, border: '1px solid', borderColor: 'divider', height: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 900, mb: 4 }}>Distribuição por Categoria</Typography>
            <Box sx={{ height: 250, width: '100%', position: 'relative' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 900 }}>1.2k</Typography>
                <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase' }}>Itens</Typography>
              </Box>
            </Box>
            <Stack spacing={2} sx={{ mt: 4 }}>
              {categoryData.map((c, i) => (
                <Stack key={c.name} direction="row" alignItems="center" justifyContent="space-between">
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Box sx={{ width: 10, height: 10, borderRadius: 'full', bgcolor: COLORS[i % COLORS.length] }} />
                    <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.secondary' }}>{c.name}</Typography>
                  </Stack>
                  <Typography variant="body2" sx={{ fontWeight: 900 }}>{c.value}</Typography>
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Top Locations Bar Chart */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 8, border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h6" sx={{ fontWeight: 900, mb: 4 }}>Top 5 Destinos Populares</Typography>
            <Box sx={{ height: 350, width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topLocations} layout="vertical" margin={{ left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(0,0,0,0.05)" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 900, fill: '#0F172A' }} width={100} />
                  <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="visits" fill="#458B8B" radius={[0, 10, 10, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Recent Activity */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 8, border: '1px solid', borderColor: 'divider', height: '100%' }}>
             <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 900 }}>Atividade Recente</Typography>
                <Button size="small" variant="text" sx={{ fontWeight: 800, color: 'text.secondary' }}>Ver Tudo</Button>
             </Stack>
             <Stack spacing={3}>
                {recentActivity.map((a) => (
                  <Box key={a.id}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ bgcolor: '#ED210015', color: '#ED2100', fontWeight: 900, width: 44, height: 44, border: '1px solid #ED210020' }}>{a.avatar}</Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 800 }}>
                          {a.user} <span style={{ fontWeight: 500, color: '#94A3B8' }}>{a.action}</span> {a.target}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 700 }}>{a.time}</Typography>
                      </Box>
                      <IconButton size="small"><ArrowUpRight size={16} /></IconButton>
                    </Stack>
                    {a.id < recentActivity.length && <Divider sx={{ my: 2, opacity: 0.3 }} />}
                  </Box>
                ))}
             </Stack>
             <Paper elevation={0} sx={{ mt: 5, p: 3, borderRadius: 5, bgcolor: '#ED210005', border: '1px dashed #ED210030', textAlign: 'center' }}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: '#ED2100', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                  <ShieldCheck size={14} /> Sistema Protegido & Monitorado
                </Typography>
             </Paper>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
