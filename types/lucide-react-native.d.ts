declare module 'lucide-react-native' {
  import { ComponentType } from 'react';
  
  export interface IconProps {
    size?: number;
    color?: string;
    strokeWidth?: number;
    fill?: string;
  }
  
  export const Home: ComponentType<IconProps>;
  export const Calendar: ComponentType<IconProps>;
  export const Sparkles: ComponentType<IconProps>;
  export const Search: ComponentType<IconProps>;
  export const User: ComponentType<IconProps>;
  export const ChevronLeft: ComponentType<IconProps>;
  export const Circle: ComponentType<IconProps>;
}
