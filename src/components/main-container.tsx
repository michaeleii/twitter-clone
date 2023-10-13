import { twMerge } from "tailwind-merge";

type MainContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function MainContainer({
  children,
  className,
}: MainContainerProps) {
  return (
    <main className={twMerge("max-w-xl mx-auto p-5 mt-20", className)}>
      {children}
    </main>
  );
}
