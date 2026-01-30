import * as React from 'react'

const IconPaths = {
  ArrowRight: <path d="M5 12h14M12 5l7 7-7 7" />,
  ArrowLeft: <path d="M19 12H5M12 19l-7-7 7-7" />,
  ArrowDown: <path d="M12 5v14M19 12l-7 7-7-7" />,
  GitBranch: <path d="M6 3v12M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 9a9 9 0 0 1-9 9" />,
  List: <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />,
  Search: <><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></>,
  Activity: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
  CheckCircle2: <><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></>,
  RefreshCw: <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8M21 3v5h-5M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16M3 21v-5h5" />,
  Workflow: <><rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/></>,
  CornerDownRight: <path d="m12 5 7 7-7 7M5 12h14" />,
  HelpCircle: <><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></>,
  X: <path d="M18 6 6 18M6 6l12 12" />,
  Check: <path d="M20 6 9 17l-5-5" />,
  Zap: <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />,
  Maximize2: <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />,
  Minimize2: <path d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7" />,
  Brain: <><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" /><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" /><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" /><path d="M17.599 6.5a3 3 0 0 0 .399-1.375" /><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" /><path d="M3.477 10.896a4 4 0 0 1 .585-.396" /><path d="M19.938 10.5a4 4 0 0 1 .585.396" /><path d="M6 18a4 4 0 0 1-1.967-.516" /><path d="M19.967 17.484A4 4 0 0 1 18 18" /></>
} as const;

type IconName = keyof typeof IconPaths;

interface IconProps {
  name: IconName
  className?: string
  size?: number
}

export const Icon: React.FC<IconProps> = ({ name, className = "", size = 24 }) => {
  if (!IconPaths[name]) return null;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {IconPaths[name]}
    </svg>
  );
};
