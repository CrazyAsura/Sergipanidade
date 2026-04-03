'use client';

import { useIsMobile } from '@/hooks/useIsMobile';
import { motion } from 'framer-motion';
import { HelpCircle, MapPin, CreditCard, ShieldCheck, Info } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Box, Typography, Accordion as MuiAccordion, AccordionSummary, AccordionDetails, Stack, Paper } from '@mui/material';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { icon: MapPin, q: 'Quais são as melhores épocas para visitar Sergipe?', a: 'Sergipe é ótimo o ano todo, mas as festas juninas em Julho são inesquecíveis. Para praias, de Outubro a Março.' },
  { icon: CreditCard, q: 'Os passeios precisam ser agendados?', a: 'Sim, especialmente Canyon do Xingó e Crôa do Goré que dependem de marés e têm limite de passageiros.' },
  { icon: ShieldCheck, q: 'É seguro viajar sozinho?', a: 'Sim, em geral Sergipe é tranquilo. Evite locais desertos à noite e use canais oficiais para passeios.' },
  { icon: Info, q: 'O Guia IA tem custo?', a: 'Não! O Guia Virtual IA é totalmente gratuito.' },
];

function WebFAQ() {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="text-center max-w-2xl mx-auto">
        <HelpCircle className="h-14 w-14 text-orange-500 mx-auto mb-4" />
        <h1 className="text-5xl font-black tracking-tight text-gray-900 mb-3">Perguntas Frequentes</h1>
        <p className="text-xl text-gray-400">Tudo que precisa saber sobre sua viagem.</p>
      </div>
      <div className="max-w-3xl mx-auto">
        <Accordion className="space-y-3">
          {faqs.map((f, i) => { const Icon = f.icon; return (
            <AccordionItem key={i} value={`item-${i}`} className="border border-gray-100 rounded-2xl px-6 data-[state=open]:shadow-lg transition-shadow overflow-hidden bg-white">
              <AccordionTrigger className="hover:no-underline py-5">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-orange-50 rounded-xl"><Icon className="h-5 w-5 text-orange-500" /></div>
                  <span className="font-bold text-left text-gray-900">{f.q}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-500 leading-relaxed pl-14 pb-5">{f.a}</AccordionContent>
            </AccordionItem>
          ); })}
        </Accordion>
      </div>
    </div>
  );
}

function MobileFAQ() {
  return (
    <Box sx={{ py: 2 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <HelpCircle size={40} color="#E67E22" style={{ margin: '0 auto 12px' }} />
        <Typography sx={{ fontSize: '1.5rem', fontWeight: 800, color: '#2C3E50' }}>Perguntas Frequentes</Typography>
        <Typography variant="body2" color="text.secondary">Tudo sobre sua viagem.</Typography>
      </Box>
      <Stack spacing={2}>
        {faqs.map((f, i) => { const Icon = f.icon; return (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <MuiAccordion elevation={0} sx={{ borderRadius: '16px !important', border: '1px solid #eee', '&:before': { display: 'none' }, overflow: 'hidden' }}>
              <AccordionSummary expandIcon={<ChevronDown size={18} color="#ccc" />} sx={{ px: 2.5 }}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Box sx={{ bgcolor: '#FFF5EB', p: 1, borderRadius: 2, display: 'flex' }}><Icon size={18} color="#E67E22" /></Box>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>{f.q}</Typography>
                </Stack>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 2.5, pb: 2.5 }}><Typography variant="body2" color="text.secondary" sx={{ ml: 5 }}>{f.a}</Typography></AccordionDetails>
            </MuiAccordion>
          </motion.div>
        ); })}
      </Stack>
    </Box>
  );
}

export default function FAQPage() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileFAQ /> : <WebFAQ />;
}
