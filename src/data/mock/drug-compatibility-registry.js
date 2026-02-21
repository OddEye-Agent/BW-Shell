// Drug compatibility registry mock (sourced from src/data/mock/drug-compatibility-registry.json)
(function () {
  const registry = {
    registryVersion: '0.1.0',
    legend: {
      compatible: { code: 'COMPATIBLE', shortCode: 'C', uiColor: 'green', description: 'Compatible' },
      incompatible: { code: 'INCOMPATIBLE', shortCode: 'I', uiColor: 'red', description: 'Incompatible' },
      variable: { code: 'VARIABLE', shortCode: 'V', uiColor: 'yellow', description: 'Variable / context dependent' },
      unknown: { code: 'UNKNOWN', shortCode: 'U', uiColor: 'light-blue', description: 'Unknown / not confirmed' }
    },
    drugs: [
      { id: 'acetylcysteine', label: 'Acetylcysteine' },
      { id: 'adrenaline', label: 'Adrenaline' },
      { id: 'alfentanil', label: 'Alfentanil' },
      { id: 'aminophylline', label: 'Aminophylline' },
      { id: 'amiodarone', label: 'Amiodarone' },
      { id: 'aprotinin', label: 'Aprotinin' },
      { id: 'atracurium', label: 'Atracurium' },
      { id: 'calcium-chloride', label: 'Calcium Chloride' },
      { id: 'calcium-gluconate', label: 'Calcium Gluconate' },
      { id: 'cisatracurium', label: 'Cisatracurium' },
      { id: 'clonidine', label: 'Clonidine' },
      { id: 'compound-sodium-lactate-solution-hartmanns', label: "Compound Sodium Lactate Solution (Hartmann's)" },
      { id: 'co-trimoxazole', label: 'Co-trimoxazole' },
      { id: 'disodium-hydrogen-phosphate', label: 'Disodium Hydrogen Phosphate' },
      { id: 'dobutamine', label: 'Dobutamine' },
      { id: 'dopamine', label: 'Dopamine' },
      { id: 'dopexamine', label: 'Dopexamine' },
      { id: 'drotrecogin-alfa-activated', label: 'Drotrecogin Alfa (Activated)' },
      { id: 'epoprostenol', label: 'Epoprostenol' },
      { id: 'esmolol', label: 'Esmolol' },
      { id: 'fentanyl', label: 'Fentanyl' },
      { id: 'furosemide', label: 'Furosemide' },
      { id: 'gentamicin', label: 'Gentamicin' },
      { id: 'glucose-4-sodium-chloride-0-18', label: 'Glucose 4% Sodium Chloride 0.18%' },
      { id: 'glucose-5', label: 'Glucose 5%' },
      { id: 'glyceryl-trinitrate-gtn', label: 'Glyceryl Trinitrate (GTN)' }
    ],
    aliases: {
      gtn: 'glyceryl-trinitrate-gtn',
      'glyceryl trinitrate': 'glyceryl-trinitrate-gtn',
      hartmanns: 'compound-sodium-lactate-solution-hartmanns',
      "hartmann's": 'compound-sodium-lactate-solution-hartmanns',
      'compound sodium lactate': 'compound-sodium-lactate-solution-hartmanns',
      'drotrecogin alfa': 'drotrecogin-alfa-activated'
    },
    pairs: {
      _schema: {
        symmetric: true,
        defaultStatus: 'UNKNOWN',
        entryShape: 'pairs[drugA][drugB] = { status, evidence, note? }'
      },
      acetylcysteine: {
        acetylcysteine: { status: 'COMPATIBLE', evidence: 'inferred', note: 'Self-pair default' },
        adrenaline: { status: 'UNKNOWN', evidence: 'unconfirmed' },
        alfentanil: { status: 'UNKNOWN', evidence: 'unconfirmed' }
      },
      adrenaline: {
        adrenaline: { status: 'COMPATIBLE', evidence: 'inferred', note: 'Self-pair default' },
        alfentanil: { status: 'UNKNOWN', evidence: 'unconfirmed' }
      },
      alfentanil: {
        alfentanil: { status: 'COMPATIBLE', evidence: 'inferred', note: 'Self-pair default' }
      }
    }
  };

  globalThis.drugCompatibilityRegistry = registry;
})();
