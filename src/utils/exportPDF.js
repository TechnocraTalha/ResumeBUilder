import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export const exportToPDF = async (element, filename = 'Resume.pdf') => {
  // Capture the perfectly scaled DOM element
  const canvas = await html2canvas(element, { scale: 3, useCORS: true, letterRendering: true });
  const imgData = canvas.toDataURL('image/jpeg', 1.0);
  
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  
  // Calculate proportional height based on the canvas aspect ratio
  const canvasRatio = canvas.height / canvas.width;
  const expectedHeight = pdfWidth * canvasRatio;
  
  if (expectedHeight > pdfHeight) {
    // If the content is taller than an A4 page, scale it down to fit exactly on ONE page
    const shrinkMaxWidth = pdfHeight / canvasRatio;
    const xOffset = (pdfWidth - shrinkMaxWidth) / 2; // Center horizontally
    pdf.addImage(imgData, 'JPEG', xOffset, 0, shrinkMaxWidth, pdfHeight);
  } else {
    // Fits normally on an A4 page
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, expectedHeight);
  }
  
  pdf.save(filename);
};
