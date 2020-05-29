import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const print = (
    id: string,
    fileName = 'download.pdf',
    landscape = false
) => {
    const element = document.getElementById(id);
    const orientation = landscape ? 'l' : 'p';
    
    if (element) {
        html2canvas(element, { width: 1400, height: 950 }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');

            var doc = new jsPDF(orientation, 'cm', [770, 1050]);
            doc.addImage(imgData, 'JPEG', 1, 1);
            doc.save(fileName);
        });
    }
};
