
import { SlideContent } from './types';

export const SLIDES: SlideContent[] = [
  {
    id: 1,
    title: "PhenoGen AI",
    subtitle: "Democratizing Pediatric Genetics",
    content: [
      "70% of rare diseases manifest in childhood.",
      "Most have detectable facial phenotypic features.",
      "Access to clinical geneticists is a global bottleneck.",
      "Scaling expert-level dysmorphology through AI."
    ],
    imagePrompt: "A professional, cinematic, high-fidelity clinical branding image for 'PhenoGen AI'. The image features a futuristic medical interface showing a high-resolution 3D facial scan of a child being analyzed with genetic data overlays. Scientific, sterile, premium healthcare aesthetic. Surgical blue and soft white lighting.",
    visualType: 'hero'
  },
  {
    id: 2,
    title: "The Indian Workforce Crisis",
    subtitle: "Structural Scarcity of Experts",
    content: [
      "~47,000 Pediatricians vs ~200 Geneticists.",
      "Training programs provide <10 seats annually.",
      "Scaling via education is fundamentally slow.",
      "Technology is the only viable workforce multiplier."
    ],
    imagePrompt: "A high-end, realistic photo of a modern Indian pediatric clinic. A pediatrician is looking at a digital tablet with concern, while a mother and child wait. The lighting is soft and natural. Modern hospital environment, professional and empathetic atmosphere.",
    visualType: 'hero'
  },
  {
    id: 3,
    title: "A Structural Imbalance",
    subtitle: "The De Facto First-Line Evaluator",
    content: [
      "Ratio: 1 clinical geneticist for every ~235 pediatricians.",
      "Tier-2/3 cities operate without any in-house genetics expertise.",
      "Pediatricians act as primary evaluators without support.",
      "Current evaluations lack structured phenotypic decision tools."
    ],
    stats: [
      { label: "Specialist Ratio", value: "1:235", color: "bg-slate-700" }
    ],
    imagePrompt: "An abstract 3D data visualization representing professional scarcity. A single glowing golden medical icon surrounded by hundreds of smaller silver medical icons. Minimalist, high-end 3D rendering with shallow depth of field.",
    visualType: 'chart'
  },
  {
    id: 4,
    title: "Why This Gap Is Clinically Dangerous",
    subtitle: "The Diagnostic Odyssey",
    content: [
      "Average diagnostic delay: 5–7 years for rare diseases.",
      "Repeated non-targeted investigations and missed intervention.",
      "Increased healthcare costs and psychosocial burden.",
      "Subtle or evolving phenotypes often go unrecognized."
    ],
    stats: [
      { label: "Avg. Delay", value: "7 Years", color: "bg-orange-500" }
    ],
    imagePrompt: "A cinematic, moody 3D rendering of a child's silhouette walking through a long, foggy medical corridor with multiple closed doors. Representing the 'Diagnostic Odyssey'. High contrast, blue and orange tones.",
    visualType: 'text'
  },
  {
    id: 5,
    title: "Our Core Belief",
    subtitle: "Knowledge Equity in Genetics",
    content: [
      "Expertise should not be constrained by geography.",
      "AI can approximate complex dysmorphology pattern recognition.",
      "Scalable phenotypic analysis augments clinician reasoning.",
      "Tools must be embedded where the patient first presents."
    ],
    imagePrompt: "A futuristic digital map of India glowing with interconnected data nodes and neural network paths. Representing the flow of medical expertise across the country. High-tech, optimistic, blue bioluminescence.",
    visualType: 'text'
  },
  {
    id: 6,
    title: "Our Solution: AI Phenotyping",
    subtitle: "Computational Dysmorphology",
    content: [
      "Deep CNNs analyze subtle facial morphology.",
      "Standardized alignment pipelines control for pose/light.",
      "Comparison against learned representations of syndromes.",
      "Output: Ranked similarity list for hypothesis generation."
    ],
    imagePrompt: "Close-up of a high-tech medical monitor displaying a child's face with a glowing 3D computer vision mesh. Dots and lines highlighting facial landmarks (eyes, nose, mouth). Professional UI design, scientific visualization.",
    visualType: 'process'
  },
  {
    id: 7,
    title: "What the Product Does Today",
    subtitle: "Clinical Workflow Integration",
    content: [
      "Secure upload of pediatric facial images with consent.",
      "Automated face detection, alignment, and extraction.",
      "Generation of high-dimensional facial embeddings.",
      "Comparison with reference syndrome representations."
    ],
    imagePrompt: "A clinician's hands holding a premium medical tablet in a bright hospital setting. The screen shows a clean, modern dashboard with 'Face Upload' and 'AI Analysis' progress bars. Blurred background of a modern lab.",
    visualType: 'process'
  },
  {
    id: 8,
    title: "Clinical Importance of Facial Gestalt",
    subtitle: "The Earliest Diagnostic Clue",
    content: [
      "Facial dysmorphism is a cornerstone of clinical genetics.",
      "Syndromes often have recognizable patterns pre-testing.",
      "AI quantifies patterns objectively and consistently.",
      "Reduces inter-observer variability in clinical assessment."
    ],
    imagePrompt: "An artistic 3D representation of the human face as a topographic map made of white porcelain-like material. Different elevations and textures representing morphological patterns. Clean, high-end gallery aesthetic.",
    visualType: 'text'
  },
  {
    id: 9,
    title: "How the Technology Works",
    subtitle: "Deep Learning at Scale",
    content: [
      "Neural networks extract embeddings encoding morphology.",
      "Cosine distance metrics rank syndromic resemblance.",
      "Clinicians interpret similarity scores within context.",
      "Robust to diverse population backgrounds."
    ],
    imagePrompt: "A complex 3D visualization of a neural network where the connections form the faint shape of a human face in the center. Glowing data pulses moving through the synapses. Navy and cyan color palette.",
    visualType: 'process'
  },
  {
    id: 10,
    title: "The Expertise Multiplier Effect",
    subtitle: "Scaling Scarce Expertise",
    content: [
      "Workforce cannot scale proportionally through training.",
      "Embedding specialist reasoning into scalable software.",
      "Amplifies 200 specialists to support 47,000 pediatricians.",
      "Represents a >200× leverage of clinical knowledge."
    ],
    stats: [
      { label: "Knowledge Leverage", value: "235x", color: "bg-emerald-600" }
    ],
    imagePrompt: "A fractal geometric pattern where one single solid crystal in the center branches out into thousands of glowing shards. Representing the scaling of expertise. Minimalist, premium, sharp focus.",
    visualType: 'chart'
  },
  {
    id: 11,
    title: "Clinical Safety and Ethics",
    subtitle: "Regulatory-Aware Architecture",
    content: [
      "Non-diagnostic: Signal-only decision support.",
      "Clinician-in-the-loop: All outputs verified by pros.",
      "Data minimization and robust audit trails.",
      "Aligned with FDA CDS (Clinical Decision Support) guidance."
    ],
    imagePrompt: "A high-end 3D rendering of a translucent medical shield with a glowing white cross in the center. The shield is made of honeycomb digital patterns. Representing safety, ethics, and protection.",
    visualType: 'text'
  },
  {
    id: 12,
    title: "Value to Hospitals",
    subtitle: "Operational Efficiency",
    content: [
      "Earlier triage of suspected genetic cases.",
      "More focused genetics referrals improve efficiency.",
      "Reduction in non-targeted metabolic testing costs.",
      "Optimized patient pathways within the hospital."
    ],
    imagePrompt: "A bird's-eye view of a modern, clean hospital lobby with flowing lines of light on the floor showing efficient patient pathways. Ultra-modern architecture, surgical blue and bright white.",
    visualType: 'text'
  },
  {
    id: 13,
    title: "Value to Pediatricians",
    subtitle: "Reducing Cognitive Load",
    content: [
      "Structured support for evaluating dysmorphism.",
      "Reduced diagnostic uncertainty in primary care.",
      "Improved collaboration and targeted referral quality.",
      "Enhanced confidence in early-stage management."
    ],
    imagePrompt: "A close-up of a happy pediatrician in a white coat looking at a clear, easy-to-read medical report on a sleek laptop. The office is bright and professional. Symbolizing relief and clarity.",
    visualType: 'text'
  },
  {
    id: 14,
    title: "Market Opportunity",
    subtitle: "Global Scale, Local Impact",
    content: [
      "Initial target: India's 47,000 pediatrician network.",
      "Expanding genomic testing (WES/WGS) demand.",
      "Universal workforce constraints in LMICs.",
      "Infrastructure for the future of precision pediatrics."
    ],
    imagePrompt: "A sophisticated 3D isometric infographic showing a rising bar chart integrated with medical cross icons. Background is a map of emerging global markets in muted grey. Professional and financial aesthetic.",
    visualType: 'market'
  },
  {
    id: 15,
    title: "Business Model",
    subtitle: "Enterprise SaaS Integration",
    content: [
      "Enterprise SaaS deployed at hospital network level.",
      "Pricing: Aligned with clinical volume (per case).",
      "Interoperability: API integration with LIS and EHR.",
      "Scalable deployment via secure cloud infrastructure."
    ],
    imagePrompt: "A clean 3D diagram showing different cloud server blocks connecting to hospital icons via glowing blue lines. Labeled subtly with 'SaaS' and 'EHR Integration'. Minimalist, corporate technology style.",
    visualType: 'text'
  },
  {
    id: 16,
    title: "Competitive Landscape",
    subtitle: "Clinical-First Differentiation",
    content: [
      "Subjective manual assessment is non-scalable.",
      "Research tools lack clinical workflow UX.",
      "Our edge: Compliance, scalability, and clinician design.",
      "Proprietary datasets optimized for diverse populations."
    ],
    imagePrompt: "A premium comparison table floating in a 3D space with glass-morphism effects. One row is highlighted with a bright blue glow, representing PhenoGen's superior positioning. Modern and sharp.",
    visualType: 'text'
  },
  {
    id: 17,
    title: "Traction and Readiness",
    subtitle: "Validated and Pilot-Ready",
    content: [
      "Fully functional MVP validated end-to-end.",
      "UX shaped by direct senior clinician feedback.",
      "Architecture ready for prospective hospital pilots.",
      "Proof-of-concept demonstrated with reference data."
    ],
    imagePrompt: "A diverse team of medical professionals and software engineers in a modern office looking at a large screen showing successful test results. High-energy, collaborative, professional success vibe.",
    visualType: 'text'
  },
  {
    id: 18,
    title: "Long-Term Vision",
    subtitle: "Multimodal Precision Medicine",
    content: [
      "Phase 1: Facial Phenotyping entry point.",
      "Phase 2: HPO term and EHR integration.",
      "Phase 3: Genomic sequence data fusion.",
      "Global rare disease intelligence layer."
    ],
    imagePrompt: "A stunning 3D visualization of a DNA double helix where the rungs are made of digital circuits and data blocks. Glowing from within with a violet and blue gradient. Symbolizing the future of genetics.",
    visualType: 'text'
  },
  {
    id: 19,
    title: "Why Now?",
    subtitle: "Converging Technologies",
    content: [
      "CV has reached clinical-grade robustness.",
      "Testing volume outpacing specialist availability.",
      "Health systems seeking CDS for expertise gaps.",
      "Increased awareness of rare disease diagnostics."
    ],
    imagePrompt: "A high-concept image of a modern clock where the hands are made of DNA strands. The clock is set against a clean, white medical background. Representing that 'The Time is Now'.",
    visualType: 'text'
  },
  {
    id: 20,
    title: "The Ask",
    subtitle: "Expression of Interest",
    content: [
      "Raising capital for clinical pilot expansion.",
      "Investing in compliance and regulatory pathways.",
      "Empowering every pediatrician with insight.",
      "Join us in ending the diagnostic odyssey."
    ],
    imagePrompt: "A powerful, close-up photo of a professional handshake between two people in a modern glass-walled boardroom. The background shows a panoramic view of a medical city. Professional, trustworthy, corporate.",
    visualType: 'form'
  }
];
