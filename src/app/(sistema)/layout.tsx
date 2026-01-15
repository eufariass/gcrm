import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar />
            <div className="md:ml-64 transition-all duration-300">
                <Header />
                <main className="p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}
