export interface PageData {
  title: string;
  description: string;
  layout?: string;
  activeNav?: string;
}

export interface NavItem {
  label: string;
  href: string;
  key: string;
  active?: boolean;
}
