type LegalBlock =
  | {
      readonly type: "paragraph";
      readonly text: string;
    }
  | {
      readonly type: "list";
      readonly items: readonly string[];
    };

interface LegalSection {
  readonly title: string;
  readonly blocks: readonly LegalBlock[];
}

/** Une page de texte suivi : confidentialité, CGU, support. */
interface LegalDocument {
  readonly lastUpdated: string;
  /** Paragraphe d'accroche sous le titre, facultatif. */
  readonly intro?: string;
  readonly sections: readonly LegalSection[];
}

export type { LegalBlock, LegalSection, LegalDocument };
