'use client';

import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export class ExportService {
    /**
     * Generates a bulk PDF report for a set of service orders.
     */
    static async exportOrdersToPDF(orders: any[], companyName: string) {
        const doc = new jsPDF() as any;

        doc.setFontSize(20);
        doc.text(`Relatório de Ordens de Serviço - ${companyName}`, 14, 22);

        const tableData = orders.map(o => [
            o.id,
            o.customer,
            o.service,
            o.technician,
            o.status,
            o.date
        ]);

        doc.autoTable({
            startY: 30,
            head: [['ID', 'Cliente', 'Serviço', 'Técnico', 'Status', 'Data']],
            body: tableData,
            theme: 'grid',
            headStyles: { fillColor: [79, 70, 229] }
        });

        doc.save(`Relatorio-${companyName}-${new Date().toISOString().split('T')[0]}.pdf`);
    }

    /**
     * Exports data as a CSV (compatible with XLSX).
     */
    static exportToCSV(data: any[], filename: string) {
        if (data.length === 0) return;

        const headers = Object.keys(data[0]);
        const csvRows = [
            headers.join(','),
            ...data.map(row => headers.map(header => JSON.stringify(row[header])).join(','))
        ];

        const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${filename}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
