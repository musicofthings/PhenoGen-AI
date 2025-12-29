
export interface SlideContent {
  id: number;
  title: string;
  subtitle?: string;
  content: string[];
  visualType?: 'text' | 'chart' | 'comparison' | 'process' | 'market' | 'form' | 'hero';
  stats?: { label: string; value: string; color?: string }[];
  imagePrompt: string;
}

export type ViewMode = 'present' | 'grid';
