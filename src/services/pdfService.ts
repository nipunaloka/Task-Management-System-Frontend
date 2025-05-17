import { jsPDF } from "jspdf";
import { format } from "date-fns";
import { Task } from "../types";

export const pdfService = {
  generateTaskReport: async (tasks: Task[]): Promise<Blob> => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Task Management Report", 14, 20);
    doc.setFontSize(11);
    doc.setTextColor(100);

    const currentDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    doc.text(`Generated on: ${currentDate}`, 14, 30);

    doc.text(`Total Tasks: ${tasks.length}`, 14, 40);
    doc.text(`Pending: ${tasks.filter(t => t.status === "Pending").length}`, 14, 47);
    doc.text(`In Progress: ${tasks.filter(t => t.status === "In Progress").length}`, 14, 54);
    doc.text(`Completed: ${tasks.filter(t => t.status === "Done").length}`, 14, 61);

    let y = 70;
    doc.setFontSize(12);
    doc.text("Title", 14, y);
    doc.text("Assigned To", 80, y);
    doc.text("Deadline", 130, y);
    doc.text("Status", 170, y);

    y += 6;
    tasks.forEach((task, _id) => {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
      doc.setFontSize(10);
      doc.text(task.title, 14, y);
      doc.text(task.assignedTo, 80, y);
      doc.text(format(new Date(task.deadline), "MMM dd, yyyy"), 130, y);
      doc.text(task.status, 170, y);
      y += 8;
    });

    // Return blob of the PDF
    return doc.output("blob");
  }
};
