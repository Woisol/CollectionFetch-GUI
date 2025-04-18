import { cn } from "@/lib/utils"

export default function Section({className, children }: { className?:string,children: React.ReactNode }) {
	return (
		<div className={cn("w-[200px] h-full p-3 bg-white rounded-2xl", className)}>
      {children}
    </div>

	);
  }