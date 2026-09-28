/* ----------------------------------------------------------------
   Contenu du sondage : étapes et questions.
   Types : "single" (choix unique), "multi" (choix multiples),
           "scale" (échelle 1–5, avec `ends`), "short" / "long" (texte libre).
   `showIf: [name, value]` affiche la question seulement si la réponse `name` vaut `value`
   (ou l'une des valeurs, si `value` est un tableau).
----------------------------------------------------------------- */
export const STEPS = [
  {
    title: "Les faits et vos démarches",
    short: "Les faits",
    icon: "document",
    questions: [
      {
        name: "victim", type: "single",
        label: "Avez-vous déjà été victime du vol ou de la perte d'un bien (téléphone, ordinateur, moto, voiture, terrain) ?",
        options: [["self", "Oui, moi-même"], ["close_one", "Oui, un proche"], ["never", "Non, jamais"]],
      },
      {
        name: "asset_type", type: "single",
        label: "Si oui, de quel type de bien s'agissait-il ?",
        options: [["phone", "Téléphone"], ["computer", "Ordinateur"], ["moto", "Moto"], ["car", "Voiture"], ["land", "Terrain"], ["other", "Autre"]],
      },
      {
        name: "action_taken", type: "single",
        label: "Qu'avez-vous fait après les faits ?",
        options: [["police", "Déclaration à la police"], ["own_means", "Recherche par mes propres moyens"], ["nothing", "Rien, je n'ai pas su quoi faire"], ["other", "Autre"]],
      },
      {
        name: "bought_used", type: "single",
        label: "Avez-vous déjà acheté un bien d'occasion (téléphone, ordinateur, moto, voiture) ?",
        options: [["always", "Oui, toujours"], ["often", "Oui, souvent"], ["once_or_twice", "Oui, une ou deux fois"], ["never", "Jamais"]],
      },
    ],
  },
  {
    title: "Vérification et suite",
    short: "Vérification",
    icon: "search",
    questions: [
      {
        name: "had_verification_means", type: "single",
        label: "Aviez-vous un moyen simple de vérifier ce doute au moment de l'achat ?",
        options: [["yes", "Oui"], ["no", "Non"], ["did_not_know", "Je ne savais pas que c'était possible"]],
      },
      {
        name: "would_use_verification", type: "single",
        label: "Si un moyen simple existait pour vérifier l'origine d'un bien avant de l'acheter (en quelques secondes, avec juste un numéro de série ou une plaque), l'utiliseriez-vous ?",
        options: [["certainly", "Certainement"], ["probably", "Probablement"], ["unlikely", "Peu probable"], ["no", "Non"]],
      },
      {
        name: "theft_frequent", type: "single",
        label: "Diriez-vous que le vol de biens (téléphones, motos, voitures) est un problème fréquent là où vous vivez ?",
        options: [["yes", "Oui"], ["no", "Non"]],
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
        label: "Souhaitez-vous être tenu informé des résultats de ce sondage et des suites données ?",
        options: [["yes", "Oui"], ["no", "Non"]],
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
