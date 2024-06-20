export interface NavigationItem {
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
  path?:string;
  requiredRoles?: number[];
}

export const Admin: NavigationItem[] = [  
  {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'group',
        classes: 'nav-item',
        path: '/dashboard/default',
        icon: 'ti ti-dashboard',
      
  },
 
     
  {
    id: 'Article',
    title: 'Article',
    type: 'item',
    classes: 'nav-item',
    path: '/listarticle',
    icon: 'ti ti-credit-card'
  },
  {
    id: 'Category',
    title: 'Category',
    type: 'item',
    classes: 'nav-item',
    path: '/listcategory',
    icon: 'ti ti-loader'
  },
  {
    id: 'User',
    title: 'User',
    type: 'item',
    classes: 'nav-item',
    path: '/listuser',
    icon: 'ti ti-brush',
  },
  {
    id: 'Fournisseur',
    title: 'Fournisseur',
    type: 'item',
    classes: 'nav-item',
    path: '/listfournisseur',
    icon: 'ti ti-brush'
  },
  {
    id: 'Magasin',
    title: 'Magasin',
    type: 'item',
    classes: 'nav-item',
    path: '/listmagasin',
    icon: 'ti ti-loader'
  },
]
  

export const ChefMagasin: NavigationItem[] = [
  {
    id: 'Article',
    title: 'Article',
    type: 'item',
    classes: 'nav-item',
    path: '/listarticle',
    icon: 'ti ti-credit-card'
  },
  {
    id: 'Category',
    title: 'Category',
    type: 'item',
    classes: 'nav-item',
    path: '/listcategory',
    icon: 'ti ti-loader'
  },
 
];

export const Magasinier: NavigationItem[] = [
  {
    id: 'Article',
    title: 'Article',
    type: 'item',
    classes: 'nav-item',
    path: '/listarticle',
    icon: 'ti ti-credit-card'
  },
  {
    id: 'Category',
    title: 'Category',
    type: 'item',
    classes: 'nav-item',
    path: '/listcategory',
    icon: 'ti ti-loader'
  },
  
];

export const Client: NavigationItem[] = [
  {
    id: 'Article',
    title: 'Article',
    type: 'item',
    classes: 'nav-item',
    path: '/listarticle',
    icon: 'ti ti-credit-card'
  },
  {
    id: 'Category',
    title: 'Category',
    type: 'item',
    classes: 'nav-item',
    path: '/listcategory',
    icon: 'ti ti-loader'
  },
 
];
