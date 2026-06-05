import { useEffect, useCallback } from 'react';
import { useSiteConfig } from './useSiteConfig';
import { supabase } from '@/lib/supabase';

interface UTMs {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
}

declare global {
  interface Window {
    fbq: any;
    gtag: any;
    dataLayer: any[];
  }
}

export function useTracking() {
  const { config } = useSiteConfig();

  // 1. Initialize UTMs from URL to SessionStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);
    const utms: UTMs = {
      utm_source: urlParams.get('utm_source'),
      utm_medium: urlParams.get('utm_medium'),
      utm_campaign: urlParams.get('utm_campaign'),
      utm_content: urlParams.get('utm_content'),
      utm_term: urlParams.get('utm_term'),
    };

    if (Object.values(utms).some(v => v !== null)) {
      sessionStorage.setItem('elite_utms', JSON.stringify(utms));
    }
  }, []);

  // 2. Load Meta Pixel & Google Tag
  useEffect(() => {
    if (typeof window === 'undefined' || !config) return;

    const pixelAtivo = config.pixel_ativo === 'true';
    const metaPixelId = config.meta_pixel_id;
    const googleTagId = config.google_tag_id;

    // Load Meta Pixel
    if (pixelAtivo && metaPixelId && !window.fbq) {
      /* eslint-disable */
      (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
        if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)
      })(window, document,'script', 'https://connect.facebook.net/en_US/fbevents.js');
      window.fbq('init', metaPixelId);
      window.fbq('track', 'PageView');
    }

    // Load Google Tag
    if (googleTagId && !window.gtag) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${googleTagId}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function(...args: any[]){window.dataLayer.push(args);}
      window.gtag('js', new Date());
      window.gtag('config', googleTagId);
    }
  }, [config]);

  const getUtms = useCallback((): UTMs => {
    if (typeof window === 'undefined') return { utm_source: null, utm_medium: null, utm_campaign: null, utm_content: null, utm_term: null };
    const saved = sessionStorage.getItem('elite_utms');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return { utm_source: null, utm_medium: null, utm_campaign: null, utm_content: null, utm_term: null };
      }
    }
    return { utm_source: null, utm_medium: null, utm_campaign: null, utm_content: null, utm_term: null };
  }, []);

  const trackWhatsappClick = useCallback(async (plano?: string) => {
    const utms = getUtms();
    
    // Save conversion to DB
    try {
      await supabase.from('conversoes').insert([{
        tipo: 'clique_whatsapp',
        valor_plano: plano || null,
        ...utms
      }]);
    } catch (e) {
      console.error('Error tracking whatsapp click:', e);
    }

    // External pixels
    if (window.fbq) window.fbq('track', 'Contact', { content_name: plano });
    if (window.gtag) window.gtag('event', 'generate_lead', { method: 'WhatsApp', content: plano });
  }, [getUtms]);

  const trackLeadForm = useCallback(async (leadId: string, plano: string) => {
    const utms = getUtms();

    // Save conversion to DB
    try {
      await supabase.from('conversoes').insert([{
        tipo: 'lead_formulario',
        lead_id: leadId,
        valor_plano: plano,
        ...utms
      }]);
    } catch (e) {
      console.error('Error tracking lead form:', e);
    }

    // External pixels
    if (window.fbq) window.fbq('track', 'Lead', { content_name: plano });
    if (window.gtag) window.gtag('event', 'generate_lead', { method: 'Form', content: plano });
  }, [getUtms]);

  return { getUtms, trackWhatsappClick, trackLeadForm };
}
