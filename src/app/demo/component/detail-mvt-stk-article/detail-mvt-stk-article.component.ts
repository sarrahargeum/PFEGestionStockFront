import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../service/article.service';
import { Article } from '../../modals/article';
import { ArticleDto } from '../../modals/DTO/ArticleDto';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { StockService } from '../../service/stock.service';
import { MVTStockDto } from '../../modals/DTO/MVTStockDto';

@Component({
  selector: 'app-detail-mvt-stk-article',
  
  templateUrl: './detail-mvt-stk-article.component.html',
  styleUrls: ['./detail-mvt-stk-article.component.scss']
})
export class DetailMvtStkArticleComponent implements OnInit {
  mvtStocks: MVTStockDto[] = [];
  stockReel: number;
  page: any = 1;
  constructor(
    private mvtStockService: StockService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idArticle = +params.get('id'); 
      if (idArticle) {
        this.loadMvtStocks(idArticle);
        this.loadStockReel(idArticle);

      } else {
        console.error('idArticle is undefined');
      }
    });
  }

  loadMvtStocks(idArticle: number): void {
    this.mvtStockService.mvtStkArticle(idArticle).subscribe(
      (data: MVTStockDto[]) => {
        this.mvtStocks = data;
        console.log(data);
      },
      error => {
        console.error('Error loading stock movements:', error);
      }
    );
  }

  loadStockReel(idArticle: number): void {
    this.mvtStockService.stockReelArticle(idArticle).subscribe(
      (data: number) => {
        this.stockReel = data;
      },
      (error) => {
        console.error('Error loading real stock quantity:', error);
      }
    );
  }
}