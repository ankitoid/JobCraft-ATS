// PDF and document text extraction utility

export async function extractTextFromFile(file: File): Promise<string> {
  const fileType = file.type;
  const fileName = file.name.toLowerCase();

  // If plain text or markdown
  if (fileType.includes('text') || fileName.endsWith('.txt') || fileName.endsWith('.md')) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve((e.target?.result as string) || '');
      reader.onerror = (e) => reject(e);
      reader.readAsText(file);
    });
  }

  // If PDF
  if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      // Dynamically load pdfjs-dist in client
      const pdfjs = await import('pdfjs-dist');
      if (typeof window !== 'undefined') {
        pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
      }

      const loadingTask = pdfjs.getDocument({
        data: new Uint8Array(arrayBuffer),
        useSystemFonts: true,
      });

      const pdfDocument = await loadingTask.promise;
      let extractedPages: string[] = [];

      for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
        const page = await pdfDocument.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str || '')
          .join(' ');
        extractedPages.push(pageText);
      }

      return extractedPages.join('\n\n').trim();
    } catch (err) {
      console.error('Error parsing PDF file:', err);
      throw new Error('Failed to parse PDF text. Please ensure the file is not password-protected or corrupted.');
    }
  }

  throw new Error('Unsupported file format. Please upload a .pdf or .txt file.');
}
