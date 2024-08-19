import {Component, Input, OnInit} from '@angular/core';
import { LigneSortieDto } from '../../modals/DTO/ligneSortieDto';

@Component({
  selector: 'app-detail-cmd',
  templateUrl: './detail-cmd.component.html',
  styleUrls: ['./detail-cmd.component.scss']
})
export class DetailCmdComponent implements OnInit {

  @Input()
  ligneCommande: LigneSortieDto;

  constructor() { }

  ngOnInit(): void {
  }

}
