export interface DiagnosisInfo {
  diseaseName: string;
  confidence: number;
  causes: string[];
  precautions: string[];
  remedies: string[];
  foodHabits: string[];
  medicines: string[];
}

const brainDiseases: DiagnosisInfo[] = [
  {
    diseaseName: "Glioma Tumor",
    confidence: 92.4,
    causes: [
      "Genetic mutations in glial cells",
      "Exposure to ionizing radiation",
      "Family history of brain tumors",
      "Certain genetic syndromes (e.g., neurofibromatosis)",
    ],
    precautions: [
      "Regular follow-up MRI scans",
      "Avoid exposure to unnecessary radiation",
      "Maintain a healthy immune system",
      "Monitor neurological symptoms closely",
    ],
    remedies: [
      "Surgical resection when possible",
      "Radiation therapy (external beam or stereotactic)",
      "Chemotherapy with temozolomide",
      "Targeted therapy based on molecular markers",
    ],
    foodHabits: [
      "Anti-inflammatory foods (turmeric, ginger, berries)",
      "Omega-3 rich foods (salmon, walnuts, flaxseeds)",
      "Leafy greens and cruciferous vegetables",
      "Avoid processed foods and excess sugar",
    ],
    medicines: [
      "Temozolomide (chemotherapy agent)",
      "Bevacizumab (anti-angiogenic therapy)",
      "Dexamethasone (to reduce brain swelling)",
      "Levetiracetam (anti-seizure medication)",
    ],
  },
  {
    diseaseName: "Meningioma",
    confidence: 88.7,
    causes: [
      "Abnormal growth of meningeal cells",
      "Previous radiation to the head",
      "Hormonal factors (more common in women)",
      "Genetic condition: Neurofibromatosis type 2",
    ],
    precautions: [
      "Regular neurological examinations",
      "Monitoring tumor growth with periodic MRI",
      "Managing stress and getting adequate rest",
      "Reporting new headaches or vision changes promptly",
    ],
    remedies: [
      "Observation (watchful waiting) for small tumors",
      "Surgical removal for symptomatic tumors",
      "Stereotactic radiosurgery (Gamma Knife)",
      "Fractionated radiation therapy",
    ],
    foodHabits: [
      "Foods rich in antioxidants (blueberries, dark chocolate)",
      "Vitamin D-rich foods (fortified milk, eggs)",
      "Green tea for its neuroprotective properties",
      "Adequate hydration throughout the day",
    ],
    medicines: [
      "Hydroxyurea (for recurrent meningiomas)",
      "Anti-epileptic drugs if seizures occur",
      "Corticosteroids for reducing edema",
      "Pain management medications as needed",
    ],
  },
  {
    diseaseName: "Pituitary Adenoma",
    confidence: 85.3,
    causes: [
      "Mutations in pituitary cells",
      "Hormonal imbalances",
      "Hereditary conditions (e.g., MEN1 syndrome)",
      "Unknown idiopathic factors",
    ],
    precautions: [
      "Regular hormonal level monitoring",
      "Annual eye examinations for visual field assessment",
      "Follow-up MRI scans every 6-12 months",
      "Report changes in vision or headache patterns",
    ],
    remedies: [
      "Transsphenoidal surgery",
      "Medication to control hormone production",
      "Radiation therapy for residual tumor",
      "Hormone replacement therapy if needed",
    ],
    foodHabits: [
      "Calcium and vitamin D rich foods for bone health",
      "Balanced protein intake",
      "Foods supporting thyroid function (iodine-rich)",
      "Limit caffeine and alcohol consumption",
    ],
    medicines: [
      "Cabergoline or Bromocriptine (dopamine agonists)",
      "Octreotide (somatostatin analog)",
      "Levothyroxine (thyroid hormone replacement)",
      "Hydrocortisone (cortisol replacement)",
    ],
  },
];

const breastDiseases: DiagnosisInfo[] = [
  {
    diseaseName: "Invasive Ductal Carcinoma (IDC)",
    confidence: 91.2,
    causes: [
      "Mutations in breast duct cells (BRCA1, BRCA2 genes)",
      "Hormonal factors (prolonged estrogen exposure)",
      "Family history of breast cancer",
      "Obesity and sedentary lifestyle",
    ],
    precautions: [
      "Monthly breast self-examinations",
      "Annual mammograms after age 40",
      "Genetic counseling if family history is present",
      "Maintain a healthy weight and exercise regularly",
    ],
    remedies: [
      "Surgical options: lumpectomy or mastectomy",
      "Radiation therapy post-surgery",
      "Chemotherapy (neoadjuvant or adjuvant)",
      "Hormonal therapy (Tamoxifen, Aromatase inhibitors)",
    ],
    foodHabits: [
      "Cruciferous vegetables (broccoli, cauliflower, kale)",
      "Fiber-rich foods (whole grains, legumes)",
      "Limit alcohol consumption",
      "Soy products in moderation",
    ],
    medicines: [
      "Tamoxifen (hormone receptor-positive cancers)",
      "Trastuzumab (HER2-positive cancers)",
      "Cyclophosphamide (chemotherapy)",
      "Anastrozole (aromatase inhibitor)",
    ],
  },
  {
    diseaseName: "Fibroadenoma (Benign)",
    confidence: 94.1,
    causes: [
      "Hormonal changes (especially estrogen)",
      "Common in women under 30",
      "Hormonal fluctuations during pregnancy",
      "Use of oral contraceptives",
    ],
    precautions: [
      "Regular monitoring with ultrasound",
      "Watch for any size changes",
      "Clinical breast examination every 6 months",
      "No treatment needed in most cases",
    ],
    remedies: [
      "Observation and regular follow-ups",
      "Surgical excision if large or growing",
      "Cryoablation for small fibroadenomas",
      "Vacuum-assisted excision biopsy",
    ],
    foodHabits: [
      "Reduce caffeine intake",
      "Increase dietary fiber",
      "Omega-3 fatty acids (fish oil, chia seeds)",
      "Vitamin E rich foods (almonds, sunflower seeds)",
    ],
    medicines: [
      "Usually no medication required",
      "Pain relief with ibuprofen if tender",
      "Evening primrose oil (supplement)",
      "Vitamin E supplements may help with tenderness",
    ],
  },
  {
    diseaseName: "Ductal Carcinoma In Situ (DCIS)",
    confidence: 87.6,
    causes: [
      "Abnormal cell growth in milk ducts",
      "Genetic predisposition (BRCA mutations)",
      "Hormonal factors",
      "Previous chest radiation therapy",
    ],
    precautions: [
      "Regular mammographic screening",
      "Follow-up imaging every 6 months post-treatment",
      "Genetic testing if family history exists",
      "Discuss risk reduction strategies with oncologist",
    ],
    remedies: [
      "Lumpectomy with radiation therapy",
      "Mastectomy for extensive DCIS",
      "Hormonal therapy to reduce recurrence risk",
      "Active surveillance in low-risk cases",
    ],
    foodHabits: [
      "Anti-inflammatory diet (Mediterranean style)",
      "Green leafy vegetables daily",
      "Limit red meat and processed foods",
      "Turmeric and garlic for anti-cancer properties",
    ],
    medicines: [
      "Tamoxifen (5-year course for risk reduction)",
      "Raloxifene (alternative for postmenopausal women)",
      "No chemotherapy typically needed for DCIS",
      "Aromatase inhibitors in select cases",
    ],
  },
];

export function getDiseaseDetails(organType: "brain" | "breast", label: string): DiagnosisInfo {
  const diseases = organType === "brain" ? brainDiseases : breastDiseases;

  // Simple fuzzy matching or direct mapping
  const lowerLabel = label.toLowerCase();

  if (organType === "brain") {
    if (lowerLabel.includes("glioma")) return diseases.find(d => d.diseaseName.includes("Glioma")) || diseases[0];
    if (lowerLabel.includes("meningioma")) return diseases.find(d => d.diseaseName.includes("Meningioma")) || diseases[1];
    if (lowerLabel.includes("pituitary")) return diseases.find(d => d.diseaseName.includes("Pituitary")) || diseases[2];
    if (lowerLabel.includes("no tumor")) {
      return {
        diseaseName: "No Tumor Detected",
        confidence: 0,
        causes: ["N/A"],
        precautions: ["Maintain healthy lifestyle", "Regular checkups"],
        remedies: ["N/A"],
        foodHabits: ["Balanced diet"],
        medicines: ["N/A"]
      };
    }
  }

  if (organType === "breast") {
    if (lowerLabel.includes("benign")) return diseases.find(d => d.diseaseName.includes("Benign")) || diseases[1];
    if (lowerLabel.includes("malignant") || lowerLabel.includes("cancer")) return diseases.find(d => d.diseaseName.includes("Invasive")) || diseases[0];
  }

  // Default fallback if no match
  return {
    ...diseases[0],
    diseaseName: label // Use the label from API if we can't match rich data
  };
}
