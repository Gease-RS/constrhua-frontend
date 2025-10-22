"use client"
import { CheckCircle, Circle, Link } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export function Timeline({ stages }: { stages: any[] }) {
  return (
    <div className="space-y-8">
      {stages.map((stage, index) => (
        <div key={index} className="flex gap-4">
          <div className="flex flex-col items-center">
            {stage.progress === 100 ? (
              <CheckCircle className="h-6 w-6 text-green-500" />
            ) : (
              <Circle className="h-6 w-6 text-gray-300" />
            )}
            {index < stages.length - 1 && (
              <div className="w-px h-full bg-gray-200 mt-2"></div>
            )}
          </div>
          
          <div className="flex-1 pb-8">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{stage.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{stage.description}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-500">
                    {stage.startDate || "Não iniciado"}
                  </span>
                  {stage.endDate && (
                    <>
                      <span>-</span>
                      <span className="text-gray-500">{stage.endDate}</span>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="font-medium">{stage.progress}%</span>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="#">Ver fotos ({stage.photos})</Link>
                </Button>
              </div>
            </div>
            
            <Progress value={stage.progress} className="h-2 mt-4" />
          </div>
        </div>
      ))}
    </div>
  )
}