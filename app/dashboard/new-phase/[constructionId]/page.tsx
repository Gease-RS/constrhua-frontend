'use client';

import { useParams } from 'next/navigation';

export default function NewPhasePage() {
  const { constructionId } = useParams();
  return <div>Nova fase para construção ID: {constructionId}</div>;
}
