import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Article } from 'src/app/demo/modals/article';
import { ArticleService } from 'src/app/demo/service/article.service';

@Component({
  selector: 'app-listarticle',
  standalone: true,
  imports: [CommonModule,RouterModule,HttpClientModule],
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


 
 refrechArticleList() {
  this.articleService.getArticle().subscribe(data => {
    this.listArticle = data;
    let arr = this.listArticle;
    console.log(this.listArticle);
  });

}

deleteClick(id) {
  if (confirm('Are you sure to delete this article')) {
    this.articleService.deleteArticle(id).subscribe(data => {

      this.refrechArticleList();
    })
  }
}




}
