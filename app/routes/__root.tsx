import { createRootRoute } from '@tanstack/react-router'
import { Outlet, ScrollRestoration, useNavigate, useLocation } from '@tanstack/react-router'
import { Body, Head, Html, Meta, Scripts } from '@tanstack/start'
import * as React from 'react'

export const Route = createRootRoute({
  meta: () => [
    {
      charSet: 'utf-8',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      title: 'Workflow Explorer',
    },
  ],
  component: RootComponent,
})

function RootComponent() {
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <RootDocument>
      <Outlet />

      {/* Floating Cyberpunk AI Brain Button - Only on home page */}
      {isHome && (
        <button
          onClick={() => navigate({ to: '/', search: { view: 'ai' } })}
          className="fixed bottom-[25%] right-8 w-32 h-32 flex items-center justify-center hover:scale-110 transition-all duration-300 z-50 group"
          style={{ pointerEvents: 'auto' }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Atomic Rings - Blue */}
            <g style={{ transformOrigin: '100px 100px', animation: 'spin 20s linear infinite' }}>
              <ellipse cx="100" cy="100" rx="90" ry="40" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.7" />
              <ellipse cx="100" cy="100" rx="90" ry="40" fill="none" stroke="#60a5fa" strokeWidth="2" opacity="0.7" transform="rotate(60 100 100)" />
              <ellipse cx="100" cy="100" rx="90" ry="40" fill="none" stroke="#93c5fd" strokeWidth="2" opacity="0.7" transform="rotate(120 100 100)" />

              {/* Embedded icons on rings */}
              <circle cx="190" cy="100" r="4" fill="#3b82f6">
                <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
              </circle>
              <rect x="145" y="60" width="6" height="6" fill="#60a5fa">
                <animate attributeName="opacity" values="1;0.3;1" dur="2s" begin="0.3s" repeatCount="indefinite" />
              </rect>
              <polygon points="55,140 58,145 52,145" fill="#3b82f6">
                <animate attributeName="opacity" values="1;0.3;1" dur="2s" begin="0.6s" repeatCount="indefinite" />
              </polygon>
              <circle cx="55" cy="60" r="4" fill="#93c5fd">
                <animate attributeName="opacity" values="1;0.3;1" dur="2s" begin="0.9s" repeatCount="indefinite" />
              </circle>
            </g>

            {/* Wireframe Brain - Brown-Grey */}
            <g>
              {/* Left Hemisphere */}
              <path d="M 70 80 Q 60 70 55 60 Q 52 50 55 40 Q 60 30 70 25 Q 80 22 90 25"
                    fill="none" stroke="#78716c" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 70 80 Q 65 90 60 100 Q 58 110 60 120 Q 65 130 75 135"
                    fill="none" stroke="#78716c" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 90 25 Q 85 35 85 45 Q 85 55 88 65"
                    fill="none" stroke="#a8a29e" strokeWidth="2" strokeLinecap="round" />
              <path d="M 75 135 Q 82 130 88 120 Q 92 110 92 100"
                    fill="none" stroke="#a8a29e" strokeWidth="2" strokeLinecap="round" />

              {/* Right Hemisphere */}
              <path d="M 130 80 Q 140 70 145 60 Q 148 50 145 40 Q 140 30 130 25 Q 120 22 110 25"
                    fill="none" stroke="#78716c" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 130 80 Q 135 90 140 100 Q 142 110 140 120 Q 135 130 125 135"
                    fill="none" stroke="#78716c" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 110 25 Q 115 35 115 45 Q 115 55 112 65"
                    fill="none" stroke="#a8a29e" strokeWidth="2" strokeLinecap="round" />
              <path d="M 125 135 Q 118 130 112 120 Q 108 110 108 100"
                    fill="none" stroke="#a8a29e" strokeWidth="2" strokeLinecap="round" />

              {/* Central Connection */}
              <path d="M 92 100 Q 100 95 108 100"
                    fill="none" stroke="#57534e" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 88 65 Q 100 60 112 65"
                    fill="none" stroke="#57534e" strokeWidth="2" strokeLinecap="round" />

              {/* Neural nodes */}
              <circle cx="70" cy="80" r="2.5" fill="#78716c">
                <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="130" cy="80" r="2.5" fill="#78716c">
                <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" begin="0.2s" repeatCount="indefinite" />
              </circle>
              <circle cx="100" cy="95" r="2.5" fill="#57534e">
                <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" begin="0.4s" repeatCount="indefinite" />
              </circle>
              <circle cx="85" cy="45" r="2" fill="#a8a29e">
                <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" begin="0.6s" repeatCount="indefinite" />
              </circle>
              <circle cx="115" cy="45" r="2" fill="#a8a29e">
                <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" begin="0.8s" repeatCount="indefinite" />
              </circle>
            </g>
          </svg>

          <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            AI DIAGRAMS
          </span>
        </button>
      )}
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <Html lang="en">
      <Head>
        <Meta />
        <script src="https://cdn.tailwindcss.com"></script>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .hide-scrollbar::-webkit-scrollbar { display: none; }
              .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
              .fade-in { animation: fadeIn 0.5s ease-in-out; }
              @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
              @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `,
          }}
        />
      </Head>
      <Body className="bg-slate-50 text-slate-900">
        {children}
        <ScrollRestoration />
        <Scripts />
      </Body>
    </Html>
  )
}
