import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Article } from 'src/app/demo/modals/article';
import { ArticleService } from 'src/app/demo/service/article.service';

@Component({
  selector: 'app-listarticle',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './listarticle.component.html',
  styleUrl: './listarticle.component.scss'
})
export class ListarticleComponent  implements OnInit{
  listArticle:Article[];
  constructor(public articleService:ArticleService){}


  ngOnInit(): void {
this.articleService.getArticle().subscribe(
  (data:Article[])=> this.listArticle = data);
 }


}
