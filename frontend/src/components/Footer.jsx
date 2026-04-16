import { Mail } from "lucide-react";

const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-[#020617] text-gray-400 pt-20 pb-8 border-t border-white/10 relative overflow-hidden">
      
      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500"></div>

      {/* Glow */}
      <div className="absolute bottom-20 left-0 w-40 h-40 bg-purple-500/20 blur-3xl rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Logo */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-xl">
              <span className="text-white font-bold text-lg">?</span>
            </div>
            <h2 className="text-xl font-semibold text-white">QuizApp</h2>
          </div>
          <p className="text-sm text-gray-400">
            Test your knowledge and learn something new every day.
          </p>
        </div>

        {/* Navigate */}
        <div>
          <h3 className="text-white font-semibold mb-4">Navigate</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-purple-400 cursor-pointer">Home</li>
            <li className="hover:text-purple-400 cursor-pointer">Leaderboard</li>
            <li className="hover:text-purple-400 cursor-pointer">Categories</li>
            <li className="hover:text-purple-400 cursor-pointer">About Us</li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-white font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-purple-400 cursor-pointer">Help Center</li>
            <li className="hover:text-purple-400 cursor-pointer">How it Works</li>
            <li className="hover:text-purple-400 cursor-pointer">Privacy Policy</li>
            <li className="hover:text-purple-400 cursor-pointer">Terms of Service</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-white font-semibold mb-4">Stay Connected</h3>

          <div className="flex gap-4 mb-4">
            <div className="p-2 rounded-full bg-white/10 hover:bg-purple-500 cursor-pointer transition-colors">
              <TwitterIcon />
            </div>
            <div className="p-2 rounded-full bg-white/10 hover:bg-purple-500 cursor-pointer transition-colors">
              <FacebookIcon />
            </div>
            <div className="p-2 rounded-full bg-white/10 hover:bg-purple-500 cursor-pointer transition-colors">
              <InstagramIcon />
            </div>
          </div>

          {/* Subscribe */}
          <div className="flex items-center bg-white/10 rounded-lg overflow-hidden">
            <div className="px-3 text-gray-400">
              <Mail size={16} />
            </div>
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent px-2 py-2 text-sm w-full text-white outline-none"
            />
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-sm text-white">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto mt-10 border-t border-white/10 pt-4 text-center text-sm">
        © 2026 QuizApp. All rights reserved.
      </div>
    </footer>
  );
}