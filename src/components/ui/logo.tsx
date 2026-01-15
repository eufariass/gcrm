import { Building2 } from "lucide-react"

export function Logo({ className = "", size = "md" }: { className?: string, size?: "sm" | "md" | "lg" }) {
    const sizes = {
        sm: "w-6 h-6",
        md: "w-8 h-8",
        lg: "w-10 h-10"
    }

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <div className={`${sizes[size]} bg-gradient-to-br from-violet-600 to-purple-700 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/20`}>
                <Building2 className="text-white w-1/2 h-1/2" strokeWidth={2.5} />
            </div>
            <span className={`font-bold tracking-tight text-gray-900 ${size === 'sm' ? 'text-lg' : size === 'md' ? 'text-xl' : 'text-2xl'}`}>
                G-CRM
            </span>
        </div>
    )
}
