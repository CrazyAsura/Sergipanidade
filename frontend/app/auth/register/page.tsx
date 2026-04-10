'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/lib/store/features/auth/authSlice';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import {
  personalInfoSchema, PersonalInfoData,
  addressSchema, AddressData,
  phoneSchema, PhoneData,
  accessSchema, AccessData,
} from '@/lib/schemas';
import api from '@/lib/api';

import { User, Mail, Lock, MapPin, Phone, ChevronLeft, ChevronRight, Check, ShieldCheck, Eye, EyeOff, Search, Loader2, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// ═══════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════
interface IBGEState { id: number; sigla: string; nome: string; }
interface IBGECity { id: number; nome: string; }

// ═══════════════════════════════════════════
// MASK UTILITY
// ═══════════════════════════════════════════
function applyMask(value: string, mask: string): string {
  let i = 0;
  const clean = value.replace(/\D/g, '');
  return mask.replace(/9/g, () => clean[i++] || '').replace(/[^0-9]+$/, '');
}

function cpfMask(v: string) { return applyMask(v, '999.999.999-99'); }
function cepMask(v: string) { return applyMask(v, '99999-999'); }
function phoneMask(v: string) {
  const clean = v.replace(/\D/g, '');
  return clean.length <= 8
    ? applyMask(v, '9999-9999')
    : applyMask(v, '99999-9999');
}

// ═══════════════════════════════════════════
// STEPS CONFIG
// ═══════════════════════════════════════════
const STEPS = [
  { label: 'Pessoal', icon: User, color: '#ED2100' },
  { label: 'Endereço', icon: MapPin, color: '#3B82F6' },
  { label: 'Telefone', icon: Phone, color: '#8B5CF6' },
  { label: 'Acesso', icon: Lock, color: '#10B981' },
];

// ═══════════════════════════════════════════
// STEP INDICATOR
// ═══════════════════════════════════════════
function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-between mb-10">
      {STEPS.map((step, i) => {
        const Icon = step.icon;
        const isActive = i === currentStep;
        const isDone = i < currentStep;
        return (
          <div key={i} className="flex flex-col items-center gap-2 flex-1">
            <div className={`
              relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border-2
              ${isDone ? 'bg-emerald-500 border-emerald-500 text-white scale-90' : ''}
              ${isActive ? 'border-[color:var(--step-color)] bg-[color:var(--step-color)]/10 text-[color:var(--step-color)] scale-110 shadow-lg' : ''}
              ${!isDone && !isActive ? 'border-gray-200 text-gray-300 bg-gray-50' : ''}
            `} style={{ '--step-color': step.color } as React.CSSProperties}>
              {isDone ? <Check size={20} /> : <Icon size={20} />}
            </div>
            <span className={`text-[9px] font-black uppercase tracking-[0.2em] transition-colors ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
              {step.label}
            </span>
            {i < STEPS.length - 1 && (
              <div className={`absolute h-[2px] w-[calc(25%-3rem)] transition-all duration-500 ${isDone ? 'bg-emerald-500' : 'bg-gray-200'}`}
                style={{ left: `calc(${(i + 0.5) * 25}% + 1.5rem)`, top: '1.5rem' }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════
// STEP 1: Personal Info
// ═══════════════════════════════════════════
function StepPersonal({ onNext, defaultValues }: { onNext: (data: PersonalInfoData) => void; defaultValues?: Partial<PersonalInfoData> }) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<PersonalInfoData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-5">
      <div className="space-y-1">
        <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1.5 block ml-1">Nome Completo</Label>
        <div className="relative">
          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#ED2100]" />
          <Input {...register('name')} placeholder="João da Silva Santos" className="pl-11 h-12 rounded-xl bg-gray-50 border-gray-200 focus-visible:ring-[#ED2100]/20" />
        </div>
        {errors.name && <p className="text-[10px] font-bold text-red-500 uppercase ml-1 mt-1">{errors.name.message}</p>}
      </div>
      <div className="space-y-1">
        <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1.5 block ml-1">CPF</Label>
        <div className="relative">
          <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#ED2100]" />
          <Input
            {...register('cpf')}
            placeholder="000.000.000-00"
            maxLength={14}
            onChange={(e) => {
              setValue('cpf', cpfMask(e.target.value), { shouldValidate: true, shouldDirty: true });
            }}
            className="pl-11 h-12 rounded-xl bg-gray-50 border-gray-200 focus-visible:ring-[#ED2100]/20"
          />
        </div>
        {errors.cpf && <p className="text-[10px] font-bold text-red-500 uppercase ml-1 mt-1">{errors.cpf.message}</p>}
      </div>
      <div className="space-y-1 pb-4">
        <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1.5 block ml-1">E-mail</Label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#ED2100]" />
          <Input {...register('email')} type="email" placeholder="seu@email.com" className="pl-11 h-12 rounded-xl bg-gray-50 border-gray-200 focus-visible:ring-[#ED2100]/20" />
        </div>
        {errors.email && <p className="text-[10px] font-bold text-red-500 uppercase ml-1 mt-1">{errors.email.message}</p>}
      </div>
      <Button type="submit" className="w-full h-14 bg-[#ED2100] hover:bg-[#C41B00] text-white font-black rounded-2xl text-sm uppercase tracking-wider shadow-md shadow-red-500/10 group transition-all">
        PRÓXIMO <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </form>
  );
}

// ═══════════════════════════════════════════
// STEP 2: Address
// ═══════════════════════════════════════════
function StepAddress({ onNext, onBack, defaultValues }: { onNext: (data: AddressData) => void; onBack: () => void; defaultValues?: Partial<AddressData> }) {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<AddressData>({
    resolver: zodResolver(addressSchema),
    defaultValues,
  });
  const [states, setStates] = useState<IBGEState[]>([]);
  const [cities, setCities] = useState<IBGECity[]>([]);
  const [loadingCep, setLoadingCep] = useState(false);
  const watchState = watch('state');

  useEffect(() => {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
      .then((r) => r.json()).then((data) => setStates(data));
  }, []);

  useEffect(() => {
    if (watchState && watchState.length === 2) {
      setCities([]);
      fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${watchState}/municipios?orderBy=nome`)
        .then((r) => r.json()).then((data) => setCities(data));
    }
  }, [watchState]);

  const searchCep = useCallback(async () => {
    const cep = watch('zipCode')?.replace(/\D/g, '');
    if (!cep || cep.length < 8) return;
    setLoadingCep(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setValue('street', data.logradouro || '', { shouldValidate: true });
        setValue('neighborhood', data.bairro || '', { shouldValidate: true });
        setValue('city', data.localidade || '', { shouldValidate: true });
        setValue('state', data.uf || '', { shouldValidate: true });
      }
    } catch { /* ViaCEP unavailable */ }
    setLoadingCep(false);
  }, [watch, setValue]);

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-4">
      <div className="grid grid-cols-[1fr_auto] gap-3">
        <div className="space-y-1">
          <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1.5 block ml-1">CEP</Label>
          <Input
            {...register('zipCode')}
            placeholder="00000-000"
            maxLength={9}
            onChange={(e) => {
              setValue('zipCode', cepMask(e.target.value), { shouldValidate: true, shouldDirty: true });
            }}
            className="h-12 rounded-xl bg-gray-50 border-gray-200 focus-visible:ring-[#3B82F6]/20"
          />
          {errors.zipCode && <p className="text-[10px] font-bold text-red-500 uppercase ml-1 mt-1">{errors.zipCode.message}</p>}
        </div>
        <div className="flex items-start pt-[26px]">
          <Button type="button" onClick={searchCep} disabled={loadingCep} variant="outline" className="h-12 w-12 rounded-xl border-gray-200 bg-gray-50 hover:bg-gray-100 p-0 text-[#3B82F6]">
            {loadingCep ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_90px] gap-3">
        <div className="space-y-1">
          <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1.5 block ml-1">Rua</Label>
          <Input {...register('street')} placeholder="Rua / Av. ..." className="h-12 rounded-xl bg-gray-50 border-gray-200 focus-visible:ring-[#3B82F6]/20" />
          {errors.street && <p className="text-[10px] font-bold text-red-500 uppercase ml-1 mt-1">{errors.street.message}</p>}
        </div>
        <div className="space-y-1">
          <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1.5 block ml-1">Nº</Label>
          <Input {...register('number')} placeholder="123" className="h-12 rounded-xl bg-gray-50 border-gray-200 focus-visible:ring-[#3B82F6]/20" />
          {errors.number && <p className="text-[10px] font-bold text-red-500 uppercase ml-1 mt-1">{errors.number.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1.5 block ml-1">Bairro</Label>
          <Input {...register('neighborhood')} placeholder="Centro" className="h-12 rounded-xl bg-gray-50 border-gray-200 focus-visible:ring-[#3B82F6]/20" />
          {errors.neighborhood && <p className="text-[10px] font-bold text-red-500 uppercase ml-1 mt-1">{errors.neighborhood.message}</p>}
        </div>
        <div className="space-y-1">
          <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1.5 block ml-1">Complemento</Label>
          <Input {...register('complement')} placeholder="Apto..." className="h-12 rounded-xl bg-gray-50 border-gray-200 focus-visible:ring-[#3B82F6]/20" />
        </div>
      </div>

      <div className="grid grid-cols-[110px_1fr] gap-3 pb-4">
        <div className="space-y-1">
          <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1.5 block ml-1">Estado</Label>
          <select
            {...register('state')}
            className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 appearance-none"
            style={{ backgroundImage: 'url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3E%3Cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'m6 8 4 4 4-4\'/%3E%3C/svg%3E")', backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
          >
            <option value="">UF</option>
            {states.map((s) => (
              <option key={s.id} value={s.sigla}>{s.sigla}</option>
            ))}
          </select>
          {errors.state && <p className="text-[10px] font-bold text-red-500 uppercase ml-1 mt-1">{errors.state.message}</p>}
        </div>
        <div className="space-y-1">
          <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1.5 block ml-1">Cidade</Label>
          <select
            {...register('city')}
            className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 appearance-none"
            style={{ backgroundImage: 'url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3E%3Cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'m6 8 4 4 4-4\'/%3E%3C/svg%3E")', backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
          >
            <option value="">Selecione a cidade</option>
            {cities.map((c) => (
              <option key={c.id} value={c.nome}>{c.nome}</option>
            ))}
          </select>
          {errors.city && <p className="text-[10px] font-bold text-red-500 uppercase ml-1 mt-1">{errors.city.message}</p>}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="button" onClick={onBack} variant="outline" className="flex-1 h-14 rounded-2xl font-black text-sm border-2 border-gray-200 hover:bg-gray-50">
          <ChevronLeft size={18} className="mr-1" /> VOLTAR
        </Button>
        <Button type="submit" className="flex-[2] h-14 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-black rounded-2xl text-sm uppercase tracking-wider shadow-md shadow-blue-500/10 group transition-all">
          PRÓXIMO <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </form>
  );
}

// ═══════════════════════════════════════════
// STEP 3: Phone
// ═══════════════════════════════════════════
function StepPhone({ onNext, onBack, defaultValues }: { onNext: (data: PhoneData) => void; onBack: () => void; defaultValues?: Partial<PhoneData> }) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<PhoneData>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { ddi: '+55', ...defaultValues },
  });

  const DDI_OPTIONS = [
    { value: '+55', label: '🇧🇷 +55 (Brasil)' },
    { value: '+1', label: '🇺🇸 +1 (EUA)' },
    { value: '+351', label: '🇵🇹 +351 (Portugal)' },
    { value: '+54', label: '🇦🇷 +54 (Argentina)' },
    { value: '+598', label: '🇺🇾 +598 (Uruguai)' },
    { value: '+595', label: '🇵🇾 +595 (Paraguai)' },
  ];

  const DDD_OPTIONS = [
    '11','12','13','14','15','16','17','18','19', // SP
    '21','22','24', // RJ
    '27','28', // ES
    '31','32','33','34','35','37','38', // MG
    '41','42','43','44','45','46', // PR
    '47','48','49', // SC
    '51','53','54','55', // RS
    '61', // DF
    '62','64', // GO
    '63', // TO
    '65','66', // MT
    '67', // MS
    '68', // AC
    '69', // RO
    '71','73','74','75','77', // BA
    '79', // SE
    '81','87', // PE
    '82', // AL
    '83', // PB
    '84', // RN
    '85','88', // CE
    '86','89', // PI
    '91','93','94', // PA
    '92','97', // AM
    '95', // RR
    '96', // AP
    '98','99', // MA
  ];

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-5">
      <div className="space-y-1">
        <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1.5 block ml-1">DDI (Código do País)</Label>
        <select
          {...register('ddi')}
          className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 appearance-none"
          style={{ backgroundImage: 'url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3E%3Cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'m6 8 4 4 4-4\'/%3E%3C/svg%3E")', backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
        >
          {DDI_OPTIONS.map((d) => (
            <option key={d.value} value={d.value}>{d.label}</option>
          ))}
        </select>
        {errors.ddi && <p className="text-[10px] font-bold text-red-500 uppercase ml-1 mt-1">{errors.ddi.message}</p>}
      </div>

      <div className="space-y-1">
        <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1.5 block ml-1">DDD</Label>
        <select
          {...register('ddd')}
          className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 appearance-none"
          style={{ backgroundImage: 'url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3E%3Cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'m6 8 4 4 4-4\'/%3E%3C/svg%3E")', backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
        >
          <option value="">Selecione o DDD</option>
          {DDD_OPTIONS.map((d) => (
            <option key={d} value={d}>({d})</option>
          ))}
        </select>
        {errors.ddd && <p className="text-[10px] font-bold text-red-500 uppercase ml-1 mt-1">{errors.ddd.message}</p>}
      </div>

      <div className="space-y-1 pb-4">
        <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1.5 block ml-1">Número</Label>
        <div className="relative">
          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8B5CF6]" />
          <Input
            {...register('number')}
            placeholder="99999-9999"
            maxLength={10}
            onChange={(e) => {
              setValue('number', phoneMask(e.target.value), { shouldValidate: true, shouldDirty: true });
            }}
            className="pl-11 h-12 rounded-xl bg-gray-50 border-gray-200 focus-visible:ring-[#8B5CF6]/20"
          />
        </div>
        {errors.number && <p className="text-[10px] font-bold text-red-500 uppercase ml-1 mt-1">{errors.number.message}</p>}
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="button" onClick={onBack} variant="outline" className="flex-1 h-14 rounded-2xl font-black text-sm border-2 border-gray-200">
          <ChevronLeft size={18} className="mr-1" /> VOLTAR
        </Button>
        <Button type="submit" className="flex-[2] h-14 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-black rounded-2xl text-sm uppercase tracking-wider shadow-md shadow-purple-500/10 group transition-all">
          PRÓXIMO <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </form>
  );
}

// ═══════════════════════════════════════════
// STEP 4: Access
// ═══════════════════════════════════════════
function StepAccess({ onSubmit, onBack, loading }: { onSubmit: (data: AccessData) => void; onBack: () => void; loading: boolean }) {
  const { register, handleSubmit, formState: { errors } } = useForm<AccessData>({
    resolver: zodResolver(accessSchema),
  });
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-1">
        <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1.5 block ml-1">Senha</Label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500" />
          <Input {...register('password')} type={showPw ? 'text' : 'password'} placeholder="••••••••" className="pl-11 pr-11 h-12 rounded-xl bg-gray-50 border-gray-200 focus-visible:ring-emerald-500/20" />
          <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.password && <p className="text-[10px] font-bold text-red-500 uppercase ml-1 mt-1">{errors.password.message}</p>}
      </div>

      <div className="space-y-1 pb-4">
        <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1.5 block ml-1">Confirmar Senha</Label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500" />
          <Input {...register('confirmPassword')} type={showConfirm ? 'text' : 'password'} placeholder="••••••••" className="pl-11 pr-11 h-12 rounded-xl bg-gray-50 border-gray-200 focus-visible:ring-emerald-500/20" />
          <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-[10px] font-bold text-red-500 uppercase ml-1 mt-1">{errors.confirmPassword.message}</p>}
      </div>

      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
        <p className="text-[11px] font-bold text-amber-700 leading-relaxed">
          🔒 Sua senha será protegida com Argon2 e usaremos UUIDs em conexões para segurança máxima.
        </p>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="button" onClick={onBack} variant="outline" className="flex-1 h-14 rounded-2xl font-black text-sm border-2 border-gray-200">
          <ChevronLeft size={18} className="mr-1" /> VOLTAR
        </Button>
        <Button type="submit" disabled={loading} className="flex-[2] h-14 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl text-sm uppercase tracking-wider shadow-md shadow-emerald-500/10 group transition-all">
          {loading ? (
            <><Loader2 size={18} className="mr-2 animate-spin" /> CADASTRANDO...</>
          ) : (
            <><Check size={18} className="mr-2" /> CRIAR CONTA</>
          )}
        </Button>
      </div>
    </form>
  );
}

// ═══════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════
export default function RegisterPage() {
  const [step, setStep] = useState(0);
  const [personalData, setPersonalData] = useState<PersonalInfoData | null>(null);
  const [addressData, setAddressData] = useState<AddressData | null>(null);
  const [phoneData, setPhoneData] = useState<PhoneData | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const router = useRouter();
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: async (payload: any) => {
      const response = await api.post('/auth/register', payload);
      return response.data;
    },
    onSuccess: (data) => {
      dispatch(setCredentials({
        user: data.user,
        token: data.access_token
      }));
      localStorage.setItem('token', data.access_token);
      router.push('/locations');
    },
    onError: (err: any) => {
      setServerError(err?.response?.data?.message || err.message || 'Erro ao cadastrar.');
    }
  });

  const handleFinalSubmit = (accessData: AccessData) => {
    setServerError(null);
    const payload = {
      name: personalData!.name,
      cpf: personalData!.cpf,
      email: personalData!.email,
      password: accessData.password,
      phones: phoneData ? [{ ddi: phoneData.ddi, ddd: phoneData.ddd, number: phoneData.number.replace(/\D/g, '') }] : [],
      addresses: addressData ? [{
        zipCode: addressData.zipCode,
        street: addressData.street,
        number: addressData.number,
        complement: addressData.complement || '',
        neighborhood: addressData.neighborhood,
        city: addressData.city,
        state: addressData.state,
        country: 'Brasil',
      }] : [],
    };
    mutation.mutate(payload);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 animate-in fade-in duration-500">
      <Card className="w-full max-w-xl border-gray-100 shadow-2xl shadow-gray-200/60 rounded-[3rem] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">
          {/* Side panel */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white relative overflow-hidden hidden lg:flex flex-col justify-between">
            <div className="relative z-10">
              <ShieldCheck size={40} className="mb-6 opacity-40" />
              <h3 className="text-2xl font-black italic uppercase leading-none mb-3">
                Junte-se ao<br />Sergipe<br /><span className="text-[#ED2100]">Invisível.</span>
              </h3>
              <p className="opacity-60 text-xs font-medium leading-relaxed">
                Preencha seus dados em 4 etapas rápidas e comece a explorar.
              </p>
            </div>
            {/* Step progress */}
            <div className="space-y-4 relative z-10 mt-8">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                const isActive = i === step;
                const isDone = i < step;
                return (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-white/10' : ''}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black transition-all
                      ${isDone ? 'bg-emerald-500 text-white' : isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-white/30'}`}>
                      {isDone ? <Check size={14} /> : <Icon size={14} />}
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-white' : isDone ? 'text-emerald-400' : 'text-white/30'}`}>
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-[#ED2100]/10 rounded-full blur-3xl" />
          </div>

          {/* Form panel */}
          <div className="p-8 lg:p-10">
            <CardHeader className="p-0 mb-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">Etapa {step + 1} de 4</span>
              </div>
              <CardTitle className="text-xl font-bold text-gray-900 uppercase tracking-tight">
                {STEPS[step].label}
              </CardTitle>
            </CardHeader>

            {/* Mobile step indicator */}
            <div className="flex gap-1.5 mb-6 lg:hidden">
              {STEPS.map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full flex-1 transition-all duration-500 ${i <= step ? 'bg-[#ED2100]' : 'bg-gray-200'}`} />
              ))}
            </div>

            <CardContent className="p-0">
              {serverError && (
                <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-xl text-center mb-5">
                  {serverError}
                </div>
              )}

              {step === 0 && (
                <StepPersonal
                  onNext={(data) => { setPersonalData(data); setStep(1); }}
                  defaultValues={personalData || undefined}
                />
              )}
              {step === 1 && (
                <StepAddress
                  onNext={(data) => { setAddressData(data); setStep(2); }}
                  onBack={() => setStep(0)}
                  defaultValues={addressData || undefined}
                />
              )}
              {step === 2 && (
                <StepPhone
                  onNext={(data) => { setPhoneData(data); setStep(3); }}
                  onBack={() => setStep(1)}
                  defaultValues={phoneData || undefined}
                />
              )}
              {step === 3 && (
                <StepAccess
                  onSubmit={handleFinalSubmit}
                  onBack={() => setStep(2)}
                  loading={mutation.isPending}
                />
              )}
            </CardContent>

            <p className="text-center text-xs font-bold text-gray-400 pt-6">
              Já tem uma conta? <Link href="/auth/login" className="text-[#ED2100] font-bold hover:underline">Entre aqui</Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
