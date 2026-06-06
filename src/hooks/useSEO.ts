import { useEffect } from 'react';
import { useSiteConfig } from './useSiteConfig';

export function useSEO(page: 'home' | 'agendar') {
  const { config, loading } = useSiteConfig();

  useEffect(() => {
    if (loading || !config) return;

    // Helper to get config or fallback
    const getVal = (key: string) => config[key] || '';

    // 1. Meta Tags based on page
    const title = page === 'home' ? getVal('seo_title_home') : getVal('seo_title_agendar');
    const description = page === 'home' ? getVal('seo_description_home') : getVal('seo_description_agendar');
    const canonical = page === 'home' ? getVal('seo_canonical_home') : getVal('seo_canonical_agendar');
    const keywords = getVal('seo_keywords');
    const ogImage = getVal('seo_og_image');
    
    // Local Business Data
    const localName = getVal('seo_local_name');
    const localAddress = getVal('seo_local_address');
    const localCity = getVal('seo_local_city');
    const localState = getVal('seo_local_state');
    const localZip = getVal('seo_local_zip');
    const localPhone = getVal('seo_local_phone');
    const localLat = getVal('seo_local_latitude');
    const localLng = getVal('seo_local_longitude');
    const gBusinessUrl = getVal('seo_google_business_url');

    // Update Title
    if (title) document.title = title;

    // Function to manage meta tags
    const setMeta = (name: string, content: string, attr: 'name' | 'property' = 'name') => {
      if (!content) return;
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
      return el;
    };

    // Standard Meta
    const metaTags: Array<Element | undefined> = [];
    metaTags.push(setMeta('description', description));
    metaTags.push(setMeta('keywords', keywords));
    metaTags.push(setMeta('robots', 'index, follow'));
    
    // Geo Tags
    metaTags.push(setMeta('geo.region', `BR-${localState}`));
    metaTags.push(setMeta('geo.placename', localCity));
    metaTags.push(setMeta('geo.position', `${localLat};${localLng}`));
    metaTags.push(setMeta('ICBM', `${localLat}, ${localLng}`));

    // Open Graph
    metaTags.push(setMeta('og:title', title, 'property'));
    metaTags.push(setMeta('og:description', description, 'property'));
    metaTags.push(setMeta('og:image', ogImage, 'property'));
    metaTags.push(setMeta('og:url', canonical, 'property'));
    metaTags.push(setMeta('og:type', 'website', 'property'));
    metaTags.push(setMeta('og:locale', 'pt_BR', 'property'));

    // Twitter
    metaTags.push(setMeta('twitter:card', 'summary_large_image'));
    metaTags.push(setMeta('twitter:title', title));
    metaTags.push(setMeta('twitter:description', description));
    metaTags.push(setMeta('twitter:image', ogImage));

    // Canonical
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl && canonical) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    if (canonicalEl) canonicalEl.setAttribute('href', canonical);

    // JSON-LD
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "HealthClub",
      "name": localName,
      "description": page === 'home' ? getVal('seo_description_home') : getVal('seo_description_agendar'),
      "url": getVal('seo_canonical_home'),
      "telephone": localPhone,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": localAddress,
        "addressLocality": localCity,
        "addressRegion": localState,
        "postalCode": localZip,
        "addressCountry": "BR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": localLat,
        "longitude": localLng
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "05:00",
          "closes": "22:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Saturday"],
          "opens": "05:30",
          "closes": "08:30"
        }
      ],
      "priceRange": "R$119-R$160",
      "image": ogImage,
      "sameAs": [gBusinessUrl].filter(Boolean)
    };

    let scriptEl = document.querySelector('script[type="application/ld+json"]#seo-jsonld');
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.setAttribute('type', 'application/ld+json');
      scriptEl.id = 'seo-jsonld';
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(jsonLd);

    // Cleanup
    return () => {
      // We don't necessarily want to remove title/description as it might flicker
      // but the specific dynamic tags can be managed
      scriptEl?.remove();
    };
  }, [page, config, loading]);
}
