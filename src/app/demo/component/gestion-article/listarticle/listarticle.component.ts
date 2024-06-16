import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Article } from 'src/app/demo/modals/article';
import { ArticleService } from 'src/app/demo/service/article.service';

@Component({
  selector: 'app-listarticle',
  standalone: true,
  imports: [CommonModule,RouterModule,HttpClientModule, FormsModule],
  templateUrl: './listarticle.component.html',
  styleUrl: './listarticle.component.scss'
})
export class ListarticleComponent  implements OnInit{

  listArticle:Article[];
  code:string= '';

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

Search() {
  if (this.code != "") {
    this.listArticle = this.listArticle.filter(res => {
      return res.code.toLocaleLowerCase().match(this.code.toLocaleLowerCase());
    });
  } else if (this.code == "") {
    this.ngOnInit();
  }
}


}
