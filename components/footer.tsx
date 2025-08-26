import Link from "next/link"
import { PiggyBank } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-sage-900 text-sage-200 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-sage-500 flex items-center justify-center mr-3">
                <PiggyBank className="text-white" size={16} />
              </div>
              <h3 className="text-xl font-bold text-white">MAZA FINANCE</h3>
            </div>
            <p className="mb-4">Financial freedom starts young. We make it simple, smart, and fun.</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-sage-300 hover:text-white">
                Instagram
              </Link>
              <Link href="#" className="text-sage-300 hover:text-white">
                TikTok
              </Link>
              <Link href="#" className="text-sage-300 hover:text-white">
                Twitter
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-4">Features</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-white transition">
                  Expense Tracking
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  AI Finance Assistant
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Investment Games
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Financial Projections
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-white transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Financial Tips
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-4">Download App</h4>
            <p className="mb-4">Get Maza Finance on your mobile device</p>
            <div className="flex flex-col space-y-2">
              <button className="bg-sage-800 hover:bg-sage-700 px-4 py-2 rounded-lg text-left">App Store</button>
              <button className="bg-sage-800 hover:bg-sage-700 px-4 py-2 rounded-lg text-left">Play Store</button>
            </div>
          </div>
        </div>

        <div className="border-t border-sage-800 mt-12 pt-8 text-center">
          <p>&copy; 2024 Maza Finance. All rights reserved. Banking services provided by our partner banks.</p>
        </div>
      </div>
    </footer>
  )
}
