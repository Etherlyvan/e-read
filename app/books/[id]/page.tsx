import PdfViewer from '@/components/PdfViewer';
import React from 'react';
import { getBookById } from '@/lib/data';
import { notFound } from 'next/navigation';

type Dat = Promise<{ id: string }>;

const Book = async ({ params }: { params: Dat }) => {
  const { id } = await params;
  const data = await getBookById(id);
  if (!data) return notFound();
  const fileUrl = data.pdf ?? "";
  return (
    <div>
      <h1>PDF Viewer</h1>
      <PdfViewer fileUrl={fileUrl} />
    </div>
  );
}

export default Book;
