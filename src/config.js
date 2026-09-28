/* Réglages du sondage */

/* API de collecte, lue dans VITE_SUBMIT_URL au moment du build Vite :
   - .env.development (npm run dev)   : http://localhost:8080/api/v1/survey/submissions
   - .env.production  (npm run build) : https://api.checkapp.ci/api/v1/survey/submissions
   Variable absente = soumission factice (réponses affichées dans la console).
   URL publique uniquement : ne jamais mettre de secret dans une variable VITE_*. */
export const SUBMIT_URL = import.meta.env.VITE_SUBMIT_URL || null;

/* Chaîne WhatsApp de la cause (bouton « Nous rejoindre » de la page de remerciement) */
export const WHATSAPP_CHANNEL_URL = "https://whatsapp.com/channel/0029Vb8rV531noyykLdZ3p13";

export const SHARE = {
  title: "Le vol, un crime permis ?",
  text: "Enquête privée · 2 minutes",
};
