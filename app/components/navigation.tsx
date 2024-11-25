import { Book, Camera, Home, Layout } from 'lucide-react'
import { cn } from '@/lib/utils'
import { type ReportSection } from '@/types/report'

const icons = {
  home: Home,
  camera: Camera,
  layout: Layout,
  book: Book
}

interface NavigationProps {
  sections: ReportSection[]
  activeSection: ReportSection
  onSectionChange: (section: ReportSection) => void
}

export function Navigation({ sections, activeSection, onSectionChange }: NavigationProps) {
  return (
    <div className="border-r bg-white">
      <div className="flex h-full flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 font-semibold">
          LEB
        </div>
        <nav className="grid gap-1 px-2">
          {sections.map((section) => {
            const Icon = icons[section.icon as keyof typeof icons]
            return (
              <button
                key={section.id}
                onClick={() => onSectionChange(section)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100",
                  activeSection.id === section.id && "bg-sky-100 text-gray-600"
                )}
              >
                <Icon className="h-5 w-5" />
                {section.label}
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

