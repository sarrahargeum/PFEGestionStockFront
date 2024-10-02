import { Component, OnInit } from '@angular/core';
import { BonSortieDto } from '../../../modals/DTO/BonSortieDto';
import { BonSortieService } from '../../../service/bon-sortie.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-factureclient',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './factureclient.component.html',
  styleUrl: './factureclient.component.scss'
})
export class FactureclientComponent implements OnInit {
  listBonSortie : BonSortieDto;
 
  constructor(
   private bonSortieService:BonSortieService,
   private route: ActivatedRoute,

  ) { }

  ngOnInit(): void { 
     const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bonSortieService.findById(id).subscribe((data: BonSortieDto) => {
        this.listBonSortie = data;
      });

    }
  }
  getTotal(): number {
    if (!this.listBonSortie || !this.listBonSortie.ligneSorties) {
      return 0;
    }
    return this.listBonSortie.ligneSorties.reduce((total, ligne) => {
      return total + (ligne.quantite * ligne.prixUnitaire);
    }, 0);
  }
  


 async generatePDF() {
    const element = document.getElementById('invoice'); 
    if (element) {
      const canvas = await html2canvas(element); 
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('facture.pdf');
    }
  }
}
