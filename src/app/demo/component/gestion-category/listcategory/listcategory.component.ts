import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Category } from 'src/app/demo/modals/category';
import { CategoryService } from 'src/app/demo/service/CategoryService';

@Component({
  selector: 'app-listcategory',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './listcategory.component.html',
  styleUrls: ['./listcategory.component.scss']
})
export class ListcategoryComponent implements OnInit {
  listCategory: Category[];
  code: string = '';
  showModal = false;
  categoryForm: FormGroup;
  submitted = false;
  isEditMode = false;
  modalTitle = 'Ajouter Category';
  id: number | null = null;

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      code: ['', Validators.required],
      designation: ['', Validators.required]
    });
    this.refreshCategoryList();
  }

  refreshCategoryList() {
    this.categoryService.getCategory().subscribe(data => {
      this.listCategory = data;
    });
  }

  deleteClick(id: any) {
    if (confirm('Are you sure to delete this category?')) {
      this.categoryService.deleteCategory(id).subscribe(() => {
        this.refreshCategoryList();
      });
    }
  }

  Search() {
    if (this.code !== '') {
      this.listCategory = this.listCategory.filter(res => {
        return res.code.toLowerCase().includes(this.code.toLowerCase());
      });
    } else {
      this.refreshCategoryList();
    }
  }

  openModal(mode: 'add' | 'edit', categoryId?: number) {
    if (mode === 'add') {
      this.modalTitle = 'Ajouter Category';
      this.isEditMode = false;
      this.categoryForm.reset();
    } else if (mode === 'edit' && categoryId != null) {
      this.modalTitle = 'Modifier Category';
      this.isEditMode = true;
      this.id = categoryId;

      // Fetch category details to pre-fill the form
      this.categoryService.retrieveCategory(categoryId).subscribe(category => {
        this.categoryForm.patchValue({
          code: category.code,
          designation: category.designation
        });
      });
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.categoryForm.reset();
    this.submitted = false;
    this.isEditMode = false;
    this.id = null;
  }

  save() {
    this.submitted = true;
    if (this.categoryForm.invalid) {
      return;
    }

    if (!this.isEditMode) {
      // Add new category
      this.categoryService.postCategory(this.categoryForm.value).subscribe(() => {
        this.refreshCategoryList();
        this.closeModal();
      });
    } else {
      // Update existing category
      this.categoryService.updateCategory(this.id!, this.categoryForm.value).subscribe(() => {
        this.refreshCategoryList();
        this.closeModal();
      });
    }
  }

  get f() {
    return this.categoryForm.controls;
  }
}