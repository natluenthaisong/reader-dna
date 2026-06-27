import type { Metadata } from 'next';
import archetypesData from '../../../../content/archetypes.json';
import ResultClient from './ResultClient';

// Next.js 15+ allows params to be a Promise, but typically can also work as sync. 
// Standard typing for page params in Next.js App Router:
type Props = {
  params: Promise<{ id: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const archetype = archetypesData.archetypes.find((a) => a.id === id);
  if (!archetype) return { title: 'Not Found' };
  
  return {
    title: `Reader DNA: ${archetype.thai_name}`,
    description: archetype.summary,
    openGraph: {
      images: [`/api/og?archetype=${id}`],
    },
  };
}

export default async function ResultPage({ params }: Props) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const archetype = archetypesData.archetypes.find((a) => a.id === id);

  return <ResultClient archetype={archetype} />;
}
