import { ReactNode } from 'react';

export interface NavigationItem {
  id: number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  active?: boolean;
}

export interface SideBarContentProps {
  handleClick: (id: number) => void;
  topNaviLinks: NavigationItem[];
}

export interface LayoutProps {
  children: ReactNode;
}