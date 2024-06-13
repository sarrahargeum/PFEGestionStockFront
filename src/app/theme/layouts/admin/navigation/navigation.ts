import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";


export interface NavigationItem  {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  groupClasses?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  link?: string;
  description?: string;
  


}


export const NavigationItems: NavigationItem[] = [


  
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'default',
        title: 'Default',
        type: 'item',
        classes: 'nav-item',
        url: '/dashboard/default',
        icon: 'ti ti-dashboard',
        breadcrumbs: false
      }
    ]
  },
 
      {
        id: 'donnée',
        title: 'Donnée',
        type: 'group',
        icon: 'icon-navigation',
        children: [
          {
            id: 'Article',
            title: 'Article',
            type: 'item',
            classes: 'nav-item',
            url: '/listarticle',
            icon: 'ti ti-credit-card'
          },
          {
            id: 'Category',
            title: 'Category',
            type: 'item',
            classes: 'nav-item',
            url: '/listcategory',
            icon: 'ti ti-loader'
          },
         {
            id: 'User',
            title: 'User',
            type: 'item',
            classes: 'nav-item',
            url: '/listuser',
            icon: 'ti ti-brush'
          },
          {
            id: 'Fournisseur',
            title: 'Fournisseur',
            type: 'item',
            classes: 'nav-item',
            url: '/listfournisseur',
            icon: 'ti ti-brush'
          },
    ]
  },

  //bonLivraison 
  {
    id: 'Bon Livraison ',
    title: 'Bon Livraison ',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'Entrée',
        title: 'Entrée',
        type: 'item',
        classes: 'nav-item',
       // url: '/listarticle',
        icon: 'ti ti-credit-card'
      },
      {
        id: 'Sortie',
        title: 'Sortie',
        type: 'item',
        classes: 'nav-item',
      //  url: '/listcategory',
        icon: 'ti ti-loader'
      },

]

},

  
    
  

];
