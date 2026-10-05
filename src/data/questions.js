/* ----------------------------------------------------------------
   Contenu du sondage : étapes et questions.
   Types : "single" (choix unique), "multi" (choix multiples),
           "scale" (échelle 1–5, avec `ends`), "short" / "long" (texte libre).
   `showIf: [name, value]` affiche la question seulement si la réponse `name` vaut `value`
   (ou l'une des valeurs, si `value` est un tableau).
   `followUp: { name, showIf, … }` ajoute un champ texte sous une question à choix unique,
   affiché seulement quand la réponse vaut `showIf` ; il est envoyé sous son propre `name`.
----------------------------------------------------------------- */
export const STEPS = [
  {
    title: "Expérience face au vol et à la perte de biens",
    short: "Les faits",
    icon: "document",
    questions: [
      {
        name: "theft_frequent", type: "single",
        label: "Le vol de biens est-il fréquent là où vous vivez ?",
        options: [["yes", "Oui"], ["no", "Non"]],
      },
      {
        name: "victim", type: "single",
        label: "Et vous, avez-vous déjà été victime du vol ou de la perte d'un bien (téléphone, ordinateur, moto, voiture, terrain) ?",
        options: [["self", "Oui, moi-même"], ["close_one", "Oui, un proche"], ["never", "Non, jamais"]],
      },
      {
        name: "asset_type", type: "multi",
        label: "Si oui, de quel type de bien s'agissait-il ?",
        hint: "Plusieurs réponses possibles.",
        options: [["phone", "Téléphone"], ["computer", "Ordinateur"], ["moto", "Moto"], ["car", "Voiture"], ["land", "Terrain"], ["other", "Autre"]],
      },
      {
        name: "action_taken", type: "single",
        label: "Suite à cela, qu'avez-vous fait ?",
        options: [["police", "Déclaration à la police"], ["own_means", "Recherche par mes propres moyens"], ["nothing", "Rien, je n'ai pas su quoi faire"], ["other", "Autre"]],
      },
    ],
  },
  {
    title: "Vérification de la provenance des biens",
    short: "Vérification",
    icon: "search",
    questions: [
      {
        name: "bought_used", type: "single",
        label: "Par ailleurs, avez-vous déjà acheté un bien d'occasion (téléphone, ordinateur, moto, voiture) ?",
        options: [["always", "Oui, toujours"], ["often", "Oui, souvent"], ["once_or_twice", "Oui, une ou deux fois"], ["never", "Jamais"]],
      },
      {
        name: "doubted_origin", type: "single",
        label: "Lors de cet achat, avez-vous déjà eu un doute sur la provenance du bien ?",
        options: [["yes", "Oui"], ["no", "Non"]],
      },
      {
        name: "had_verification_means", type: "single",
        label: "Si oui, aviez-vous un moyen simple de vérifier ce doute ?",
        options: [["yes", "Oui"], ["no", "Non"], ["did_not_know", "Je ne savais pas que c'était possible"]],
      },
      {
        name: "would_use_verification", type: "single",
        label: "Dans ce cas, s'il existait un moyen simple de vérifier l'origine d'un bien d'occasion, l'utiliseriez-vous ?",
        options: [["certainly", "Certainement"], ["probably", "Probablement"], ["unlikely", "Peu probable"], ["no", "Non"]],
      },
      // {
      //   name: "heaviest_impact", type: "single", showIf: ["victim", ["self", "close_one"]],
      //   label: "Quel a été l'impact le plus lourd pour vous ou votre proche ?",
      //   options: [
      //     ["financial", "Financier (perte d'argent)"],
      //     ["psychological", "Moral ou psychologique"],
      //     ["work", "Professionnel (travail, revenus)"],
      //     ["data", "Perte de données ou de documents"],
      //     ["other", "Autre"],
      //   ],
      // },
      {
        name: "keep_informed", type: "single",
        label: "Enfin, souhaitez-vous être tenu informé des résultats de ce sondage ?",
        options: [["yes", "Oui"], ["no", "Non"]],
      },
      {
        name: "share_phone", type: "single",
        label: "Souhaitez-vous nous laisser votre numéro de téléphone ?",
        options: [["yes", "Oui"], ["no", "Non"]],
        followUp: { name: "phone", showIf: "yes", label: "Votre numéro de téléphone", inputType: "tel", autoComplete: "tel", placeholder: "+225 07 00 00 00 00" },
      },
      // {
      //   name: "contact", type: "short", optional: true, autoComplete: "email", showIf: ["keep_informed", "yes"],
      //   label: "Votre numéro WhatsApp ou e-mail",
      //   hint: "Pour vous envoyer les résultats et vous ajouter au canal WhatsApp dédié à la cause.",
      //   placeholder: "+225 07 00 00 00 00 ou e-mail",
      // },
    ],
  },
];

/* Numérotation continue (1, 2, 3…) calculée à partir de l'ordre des étapes */
let n = 0;
STEPS.forEach((step) => step.questions.forEach((q) => { q.n = ++n; }));
export const TOTAL = n;
export const ALL_QUESTIONS = STEPS.flatMap((s) => s.questions);
