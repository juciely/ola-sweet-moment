import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from '@tanstack/react-router';
import { AlertCircle, Loader2 } from 'lucide-react';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      navigate({ to: '/admin/dashboard' });
    } catch (err: any) {
      console.error('Login error:', err);
      setError('Email ou senha incorretos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-6">
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-10">
          <h1 className="font-bebas text-[48px] text-[#AAFF00] leading-none mb-2">ELITE+</h1>
          <p className="font-inter text-[11px] text-[#444] font-bold tracking-[4px] uppercase">PERFORMANCE</p>
        </div>

        <div className="bg-[#111] border border-white/5 p-8 rounded-[24px] shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-[11px] text-[#666] font-bold uppercase tracking-[1px]">Email</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#161616] border border-[#222] rounded-xl px-5 py-4 text-white focus:border-[#AAFF00] outline-none transition-all placeholder-[#444]"
                placeholder="seu@email.com"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[11px] text-[#666] font-bold uppercase tracking-[1px]">Senha</label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#161616] border border-[#222] rounded-xl px-5 py-4 text-white focus:border-[#AAFF00] outline-none transition-all placeholder-[#444]"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-[#FF4444] text-sm bg-[#FF4444]/10 p-4 rounded-xl border border-[#FF4444]/20 animate-fade-in">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            <button
              disabled={loading}
              className="w-full bg-[#AAFF00] text-[#0A0A0A] font-black uppercase tracking-[1px] py-5 rounded-full transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'ENTRAR'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
