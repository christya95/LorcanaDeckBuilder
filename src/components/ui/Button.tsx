import { Link } from 'react-router-dom';
import { cn } from '../../lib/cn';
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  to?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'default' | 'sm';
};

const variants: Record<string, string> = {
  primary: 'bg-gold text-midnight hover:bg-gold/90',
  secondary: 'bg-royal text-stardust hover:bg-royal/80',
  ghost: 'bg-transparent text-stardust hover:bg-white/10',
};

const sizes: Record<string, string> = {
  default: 'px-4 py-2 text-sm',
  sm: 'px-2 py-1 text-xs',
};

export default function Button({ to, children, className, variant = 'primary', size = 'default', ...props }: PropsWithChildren<ButtonProps>) {
  const cls = cn(
    'rounded-full font-semibold transition-colors shadow-soft focus:outline-none focus:ring-2 focus:ring-gold/50',
    variants[variant],
    sizes[size],
    className
  );
  if (to) {
    return (
      <Link to={to} className={cls} {...(props as any)}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
