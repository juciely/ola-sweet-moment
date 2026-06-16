import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, KeyRound, AlertCircle } from 'lucide-react';

export const Route = createFileRoute('/reset-password')({
  component: ResetPassword,
});

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase recovery link puts tokens in URL hash; the SDK auto-processes it
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') {
        setReady(true);
      }
    });
    // Fallback: if already signed in / hash processed before mount
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 6) return setError('A senha deve ter ao menos 6 caracteres.');
    if (password !== confirm) return setError('As senhas não coincidem.');
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) return setError(error.message);
    setSuccess(true);
    setTimeout(() => navigate({ to: '/admin' }), 1500);
  };

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-6">
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-10 flex flex-col items-center">
          <img src="/logo.png" alt="Elite+" className="w-48 mb-4" />
        </div>
        <div className="bg-[#111] border border-white/5 p-8 rounded-[32px] shadow-2xl">
          <h2 className="text-white font-bebas text-2xl uppercase mb-2">Definir nova senha</h2>
          <p className="text-[#555] text-xs font-inter leading-relaxed mb-8">
            {ready
              ? 'Escolha uma nova senha para acessar o painel.'
              : 'Abra esta página pelo link enviado no seu email. Aguardando validação...'}
          </p>

          {success ? (
            <div className="text-[#d7f803] text-sm">Senha atualizada! Redirecionando...</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[11px] text-[#666] font-bold uppercase tracking-[1px]">Nova senha</label>
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={!ready}
                  className="w-full bg-[#161616] border border-[#222] rounded-xl px-5 py-4 text-white focus:border-[#d7f803] outline-none disabled:opacity-50"
                  placeholder="••••••••"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[11px] text-[#666] font-bold uppercase tracking-[1px]">Confirmar senha</label>
                <input
                  required
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  disabled={!ready}
                  className="w-full bg-[#161616] border border-[#222] rounded-xl px-5 py-4 text-white focus:border-[#d7f803] outline-none disabled:opacity-50"
                  placeholder="••••••••"
                />
              </div>
              {error && (
                <div className="flex items-start gap-3 text-[#FF4444] text-xs bg-[#FF4444]/10 p-4 rounded-xl border border-[#FF4444]/20">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}
              <button
                disabled={loading || !ready}
                className="w-full bg-[#d7f803] text-[#0A0A0A] font-black uppercase tracking-[1px] py-5 rounded-full transition-all hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><KeyRound className="w-5 h-5" /> SALVAR NOVA SENHA</>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
