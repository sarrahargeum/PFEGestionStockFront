import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Article } from 'src/app/demo/modals/article';
import { Category } from 'src/app/demo/modals/category';
import { ArticleService } from 'src/app/demo/service/article.service';
import { CategoryService } from 'src/app/demo/service/CategoryService';

@Component({
  selector: 'app-listcategory',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './listcategory.component.html',
  styleUrl: './listcategory.component.scss'
})
export class ListcategoryComponent implements OnInit {
 listCategory: Category[];
 code:string= '';


  constructor(private categoryService:CategoryService){}

  ngOnInit():void{
    this.categoryService.getCategory().subscribe(
      (data:Category[]) => this.listCategory = data);

  }
  refrechCatList() {
    this.categoryService.getCategory().subscribe(data => {
      this.listCategory = data;
      let arr = this.listCategory;
      console.log(this.listCategory);
    });

  }

  deleteClick(id) {
    if (confirm('Are you sure to delete this project')) {
      this.categoryService.deleteCategory(id).subscribe(data => {

        this.refrechCatList();
      })
    }
  }

  Search() {
    if (this.code != "") {
      this.listCategory = this.listCategory.filter(res => {
        return res.code.toLocaleLowerCase().match(this.code.toLocaleLowerCase());
      });
    } else if (this.code == "") {
      this.ngOnInit();
    }
  }

}
