'use client'

import { useState } from 'react'
import OpenAI from 'openai'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { type ReportSection } from '@/types/report'

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Only use this for development. In production, use a backend API.
})

interface CharacteristicsFormProps {
  section: ReportSection
}

export function CharacteristicsForm({ section }: CharacteristicsFormProps) {
  const [characteristics, setCharacteristics] = useState(section.characteristics)
  const [additionalNotes, setAdditionalNotes] = useState('')
  const [reports, setReports] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleCharacteristicChange = (label: string, value: string) => {
    setCharacteristics(prev =>
      prev.map(c =>
        c.label === label ? { ...c, value } : c
      )
    )
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const selectedCharacteristics = characteristics
        .filter(c => c.value && c.value !== 'nicht berücksichtigen')
        .map(c => `${c.label}: ${c.value}`)
        .join('; ')

      const prompt = `Lösche alle Eingaben. Ich möchte, dass du wie ein Lehrer agierst. Ich gebe dir einige Merkmale von einem Schülers namens Ernst. 
      Du schreibst für Ernst einen Lernentwicklungsbericht, der dem Zeugnis beiliegt. Du schreibst keine direkte Anrede, auch nicht an die Eltern. 
      Verwende nie das Wort "wir". Schreibe nur über die Merkmale, die ich dir gebe. Bringe die Merkmale, die ich dir gebe, in eine sinnvolle Reihenfolge.
      Zur Terminologie: Statt Schüler schreibe "Lernpartner", statt Schülerin verwende "Lernpartnerin". 
      Vermeide das Wort "wir".
      Schreibe nur über Ernsts Merkmale, die ich dir gleich gebe. Erfinde keine Eigenschaften und Merkmale.
      Hier sind Ernsts Merkmale: ${selectedCharacteristics}${additionalNotes ? '; ' + additionalNotes : ''}.`

      const response = await openai.completions.create({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 300,
        n: 3,
        temperature: 0.7,
      })

      setReports(response.choices.map(choice => choice.text || ''))
    } catch (error) {
      console.error('Error generating report:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        {characteristics.map((characteristic) => (
          <Card key={characteristic.label}>
            <CardContent className="pt-6">
              <Label>{characteristic.label}</Label>
              <RadioGroup
                className="grid grid-cols-2 gap-4 pt-2 md:grid-cols-4"
                value={characteristic.value}
                onValueChange={(value) => handleCharacteristicChange(characteristic.label, value)}
              >
                {characteristic.options.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`${characteristic.label}-${option}`} />
                    <Label htmlFor={`${characteristic.label}-${option}`}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="pt-6">
          <Label>Weitere Aspekte</Label>
          <Textarea
            className="mt-2"
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
          />
        </CardContent>
      </Card>

      <Button 
        onClick={handleSubmit} 
        disabled={isLoading}
      >
        {isLoading ? 'Generiere Bericht...' : 'Erstelle LEB'}
      </Button>

      {reports.map((report, index) => (
        <Card key={index}>
          <CardContent className="pt-6">
            <h3 className="font-semibold">Vorschlag {index + 1}:</h3>
            <p className="mt-2 whitespace-pre-wrap">{report}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

