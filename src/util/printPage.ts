import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const print = (id: string, fileName = 'download.pdf') => {
    const element = document.getElementById(id);

    if (element) {
        html2canvas(element).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();

            pdf.addImage(imgData, 'JPEG', 0, 0);
            pdf.save(fileName);
        });
    }
};
