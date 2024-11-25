'use client'

import { useState } from 'react'
import { Book, Camera, Home, Layout } from 'lucide-react'

import { CharacteristicsForm } from './components/characteristics-form'
import { Navigation } from './components/navigation'
import { type ReportSection } from '@/types/report'

const sections: ReportSection[] = [
  {
    id: "learning-readiness",
    icon: "home",
    label: "Lernbereitschaft",
    characteristics: [
      {
        label: "Konzentration",
        options: [
          "nicht berücksichtigen",
          "konzentriert",
          "gelegentlich unkonzentriert",
          "häufig unkonzentriert"
        ],
        value: ""
      },
      {
        label: "Arbeitseinstellung",
        options: [
          "nicht berücksichtigen",
          "fleißig",
          "gelegentlich oberflächliche Arbeitsweise",
          "oberflächliche Arbeitsweise"
        ],
        value: ""
      },
      {
        label: "Motivation",
        options: [
          "nicht berücksichtigen",
          "sehr motiviert",
          "gelegentlich unmotiviert",
          "häufig unmotiviert"
        ],
        value: ""
      },
      {
        label: "Selbstständigkeit",
        options: [
          "nicht berücksichtigen",
          "arbeitet sehr selbstständig",
          "braucht oft einen Anstoß von außen",
          "ist in freien Lernzeiten unproduktiv"
        ],
        value: ""
      },
      {
        label: "Organisation",
        options: [
          "nicht berücksichtigen",
          "gut organisiert",
          "braucht Unterstützung bei der Arbeitsorganisation",
          "ist unorganisiert"
        ],
        value: ""
      },
      {
        label: "Beteiligung",
        options: [
          "nicht berücksichtigen",
          "hohes Engagement im Unterricht",
          "im Unterricht eher zurückhaltende Beteiligung",
          "sollte sich im Unterricht mehr aktiv beteiligen"
        ],
        value: ""
      },
      {
        label: "Arbeitszeit",
        options: [
          "nicht berücksichtigen",
          "erledigt die gestellten Aufgaben zügig",
          "bearbeitet die gestellten Aufgaben in angemessenem Tempo",
          "braucht für die gestellten Aufgaben häufig mehr Zeit"
        ],
        value: ""
      }
    ]
  },
  {
    id: "confidence",
    icon: "camera",
    label: "Zuversicht",
    characteristics: []
  },
  {
    id: "mindfulness",
    icon: "layout",
    label: "Achtsamkeit",
    characteristics: []
  },
  {
    id: "appreciation",
    icon: "book",
    label: "Wertschätzung",
    characteristics: []
  }
]

export default function LearningReport() {
  const [activeSection, setActiveSection] = useState(sections[0])

  return (
    <div className="grid min-h-screen md:grid-cols-[240px_1fr]">
      <Navigation 
        sections={sections}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <main className="flex flex-col p-8">
        <CharacteristicsForm section={activeSection} />
      </main>
    </div>
  )
}

