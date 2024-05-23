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
    id: 'user',
    title: 'UI Components',
    type: 'group',
    icon: 'icon-navigation',
    children: [
     {
        id: 'typography',
        title: 'Typography',
        type: 'item',
        classes: 'nav-item',
        url: '/typography',
        icon: 'ti ti-typography'
      },
     /*{
        id: 'Profil',
        title: 'Profil',
        type: 'item',
        classes: 'nav-item',
        url: '/user-profil',
        icon: 'ti ti-brush'
      },*/
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
      /*{
        id: 'tabler',
        title: 'Tabler',
        type: 'item',
        classes: 'nav-item',
        url: 'https://tabler-icons.io/',
        icon: 'ti ti-leaf',
        target: true,
        external: true
      }*/
    ]
  },
/*  {
    id: 'authentication',
    title: 'Authentication',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'login',
        title: 'Login',
        type: 'item',
        classes: 'nav-item',
        url: '/login',
        icon: 'ti ti-login',
        target: true,
        breadcrumbs: false
      },
      {
        id: 'register',
        title: 'Register',
        type: 'item',
        classes: 'nav-item',
        url: '/register',
        icon: 'ti ti-user-plus',
        target: true,
        breadcrumbs: false
      }
    ]
  },*/
  /*{
    id: 'other',
    title: 'Other',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'sample-page',
        title: 'Sample Page',
        type: 'item',
        url: '/sample-page',
        classes: 'nav-item',
        icon: 'ti ti-brand-chrome'
      }
    ]
  }*/
];
