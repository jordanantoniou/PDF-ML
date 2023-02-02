import { ComponentPropsWithoutRef, ReactNode } from 'react';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  title: string;
  subtitle: string;
  icon: ReactNode;
}

const Button = ({ title, subtitle, icon, ...rest }: ButtonProps) => {
  return (
    <button
      className="w-63 grid-col-button grid items-center gap-x-5 rounded-3xl border-2 bg-base-1 p-5 text-left text-text-1 hover:border-2 hover:border-accent focus:outline-none"
      {...rest}>
      <h1 className="font-bold">{title}</h1>
      <div className="h-10 w-10 justify-self-end p-1">{icon}</div>
      <p className="col-span-2 text-text-2 ">{subtitle}</p>
    </button>
  );
};

export { Button };
