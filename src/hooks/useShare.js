import { useCallback } from "react";
import { SHARE } from "../config.js";

function fallbackCopy(text) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand("copy"); } catch { /* rien à faire */ }
  document.body.removeChild(ta);
}

/* « Copier le lien » (presse-papier, avec repli) et « Partager » (partage natif, sinon copie) */
export function useShare(toast) {
  const copyLink = useCallback(() => {
    const url = window.location.href;
    const done = () => toast("Lien copié !");
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(url).then(done, () => { fallbackCopy(url); done(); });
    } else {
      fallbackCopy(url);
      done();
    }
  }, [toast]);

  const share = useCallback(() => {
    if (navigator.share) {
      navigator.share({ ...SHARE, url: window.location.href })
        .catch((e) => { if (e && e.name !== "AbortError") copyLink(); });
    } else {
      copyLink();
    }
  }, [copyLink]);

  return { copyLink, share };
}
