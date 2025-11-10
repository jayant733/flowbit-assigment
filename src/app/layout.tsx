import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Flowbit Analytics",
  description: "Interactive Dashboard + Chat with Data",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-gray-50 text-gray-900">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r p-5 space-y-4">
          <h1 className="text-xl font-semibold">Flowbit</h1>
          <nav className="flex flex-col space-y-2">
            <Link href="/" className="hover:text-blue-600">📊 Dashboard</Link>
            <Link href="/chat" className="hover:text-blue-600">💬 Chat with Data</Link>
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </body>
    </html>
  );
}