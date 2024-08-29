import { Component, OnInit } from '@angular/core';
import { BonEntreService } from '../../service/bon-entre.service';
import { BonEntree } from '../../modals/BonEntree';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BonEntreeDto } from '../../modals/DTO/BonEntreeDto';
import { LigneEntreeDto } from '../../modals/DTO/LigneEntreeDto';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { LigneEntree } from '../../modals/ligneEntree';

@Component({
  selector: 'app-facture',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './facture.component.html',
  styleUrl: './facture.component.scss'
})
export class FactureComponent  implements OnInit {
  listBonEntree : BonEntreeDto;
 
  constructor(
   private bonEntreeService:BonEntreService,
   private route: ActivatedRoute,

  ) { }

  ngOnInit(): void { 
     const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bonEntreeService.findById(id).subscribe((data: BonEntreeDto) => {
        this.listBonEntree = data;
      });

    }
  }
  getTotal(): number {
    if (!this.listBonEntree || !this.listBonEntree.ligneEntrees) {
      return 0;
    }
    return this.listBonEntree.ligneEntrees.reduce((total, ligne) => {
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
