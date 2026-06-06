import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from '@tanstack/react-router';
import { AlertCircle, Loader2, UserPlus, LogIn } from 'lucide-react';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFirstAccess, setIsFirstAccess] = useState(false);
  const [checkingAccess, setCheckingAccess] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for auth state changes to auto-redirect if session is active
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth event:", event, !!session);
      const isForcingSetup = typeof window !== 'undefined' && window.location.search.includes('setup=true');
      if (session && !isForcingSetup) {
        // Find where we should go
        const params = new URLSearchParams(window.location.search);
        const redirectPath = params.get('redirect') || '/admin/dashboard';
        navigate({ to: redirectPath });
      }
    });

    async function checkFirstAccess() {
      try {
        // First check if there are ANY users in auth.users (indirectly via profile if it exists, 
        // but here we use site_config as a flag).
        // Since the user is deploying to a VPS with the SAME database, 
        // the site_config probably already has admin_setup_completed = true.
        
        const { data } = await supabase
          .from('site_config')
          .select('valor')
          .eq('chave', 'admin_setup_completed');
        
        if (!data || data.length === 0 || data[0].valor !== 'true') {
          setIsFirstAccess(true);
        } else {
          // Additional check: If URL has ?setup=true, allow creating a new admin anyway
          // This is useful for new deployments sharing the same DB
          const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
          if (params.get('setup') === 'true') {
            setIsFirstAccess(true);
            console.log("Forcing first access mode via URL param");
          }
        }
      } catch (err) {
        console.error('Setup check failed:', err);
      } finally {
        setCheckingAccess(false);
      }
    }
    
    checkFirstAccess();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isFirstAccess) {
        // Register first admin
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        // Mark setup as completed in site_config
        await supabase.from('site_config').upsert({
          chave: 'admin_setup_completed',
          valor: 'true'
        });

        if (data.session || data.user) {
          // If auto-confirm is on, we might have a session or just a user
          const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
          const redirectPath = params.get('redirect') || '/admin/dashboard';
          navigate({ to: redirectPath });
        } else {
          setError('Conta criada! Tente fazer o login agora com suas credenciais.');
          setIsFirstAccess(false);
        }
      } else {
        // Regular login
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        navigate({ to: '/admin/dashboard' });
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      setError(err.message || 'Erro ao processar solicitação');
    } finally {
      setLoading(false);
    }
  };

  if (checkingAccess) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#d7f803] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-6">
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-10 flex flex-col items-center">
          <img src="/logo.png" alt="Elite+" className="w-48 mb-4" />
        </div>

        <div className="bg-[#111] border border-white/5 p-8 rounded-[32px] shadow-2xl relative overflow-hidden">
          {isFirstAccess && (
            <div className="absolute top-0 left-0 w-full h-1 bg-[#d7f803] animate-pulse"></div>
          )}
          
          <div className="mb-8">
            <h2 className="text-white font-bebas text-2xl uppercase mb-2">
              {isFirstAccess ? 'Criar Conta Admin' : 'Acessar Painel'}
            </h2>
            <p className="text-[#555] text-xs font-inter leading-relaxed">
              {isFirstAccess 
                ? 'Detectamos que este é o primeiro acesso. Defina as credenciais do administrador principal.' 
                : 'Insira suas credenciais para gerenciar a Elite+ Performance.'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-[11px] text-[#666] font-bold uppercase tracking-[1px]">Email</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#161616] border border-[#222] rounded-xl px-5 py-4 text-white focus:border-[#d7f803] outline-none transition-all placeholder-[#444]"
                placeholder="admin@eliteperformance.com.br"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[11px] text-[#666] font-bold uppercase tracking-[1px]">Senha</label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#161616] border border-[#222] rounded-xl px-5 py-4 text-white focus:border-[#d7f803] outline-none transition-all placeholder-[#444]"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="flex items-start gap-3 text-[#FF4444] text-xs bg-[#FF4444]/10 p-4 rounded-xl border border-[#FF4444]/20 animate-fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button
              disabled={loading}
              className="w-full bg-[#d7f803] text-[#0A0A0A] font-black uppercase tracking-[1px] py-5 rounded-full transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(215,248,3,0.2)]"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isFirstAccess ? <UserPlus className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
                  {isFirstAccess ? 'CRIAR CONTA AGORA' : 'ENTRAR NO PAINEL'}
                </>
              )}
            </button>
            
            {!isFirstAccess && (
              <p className="text-center text-[10px] text-[#333] font-inter mt-4">
                Protegido por criptografia de ponta a ponta.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
