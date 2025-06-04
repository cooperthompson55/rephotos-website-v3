'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

interface VideoType {
  id: string;
  title: string;
  price: number;
  description: string;
}

interface Enhancement {
  id: string;
  title: string;
  price: number;
  description?: string;
  category: 'sound' | 'branding' | 'overlays';
  included?: boolean;
}

const videoTypes: VideoType[] = [
  {
    id: "property-highlights",
    title: "Property Highlights Video",
    price: 289.99,
    description: "Horizontal walkthrough (16:9), 1–2 minutes, MLS-ready"
  },
  {
    id: "social-media",
    title: "Social Media Reel",
    price: 229.99,
    description: "Vertical (9:16), 30–60 seconds, fast-paced and optimized for Reels/TikTok"
  },
  {
    id: "drone-aerial",
    title: "Drone Aerial Video",
    price: 159.99,
    description: "Cinematic aerial flyovers, 30–60 seconds"
  },
  {
    id: "slideshow",
    title: "Slideshow Video Tour",
    price: 99.99,
    description: "Photo-based video with light motion and music"
  }
];

const enhancements: Enhancement[] = [
  // Sound Design
  { 
    id: "background-music", 
    title: "Background Music", 
    price: 0, 
    description: "We pick a royalty-free track to match the home",
    category: 'sound',
    included: true
  },
  { 
    id: "sound-effects", 
    title: "Sound Effects", 
    price: 10, 
    description: "Ambient audio or subtle transition cues",
    category: 'sound' 
  },
  { 
    id: "voiceover", 
    title: "Voiceover Narration", 
    price: 15, 
    description: "Pro voice synced to the video",
    category: 'sound' 
  },
  
  // Graphics & Branding
  { 
    id: "titles", 
    title: "Titles & Labels", 
    price: 0, 
    description: "Start the video with the property address",
    category: 'branding',
    included: true
  },
  { 
    id: "agent-branding", 
    title: "Agent Branding", 
    price: 0, 
    description: "End with your logo, name, and contact details",
    category: 'branding',
    included: true
  },
  { 
    id: "captions", 
    title: "Captions/Subtitles", 
    price: 25, 
    description: "Great for narrated or voiceover videos",
    category: 'branding' 
  },
  { 
    id: "agent-intro", 
    title: "Agent Intro/Outro", 
    price: 40, 
    description: "Add your own recorded clip, shot, edited, and integrated",
    category: 'branding' 
  },
  
  // Overlays & Enhancements
  { 
    id: "lot-lines", 
    title: "Lot Lines", 
    price: 20, 
    description: "Show visual property boundaries in drone shots",
    category: 'overlays' 
  },
  { 
    id: "feature-callouts", 
    title: "Feature Callouts", 
    price: 20, 
    description: "Highlight unique features or amenities with animated tags",
    category: 'overlays' 
  }
];

export default function CustomizeVideoForm() {
  const [selectedVideo, setSelectedVideo] = useState<string>("");
  const [selectedEnhancements, setSelectedEnhancements] = useState<string[]>([]);
  const [openSections, setOpenSections] = useState({
    videoType: true,
    soundDesign: true,
    graphicsBranding: true,
    overlays: true
  });

  // Add background music by default when component mounts
  useEffect(() => {
    setSelectedEnhancements(prev => {
      if (!prev.includes("background-music")) {
        return [...prev, "background-music"];
      }
      return prev;
    });
  }, []);

  const calculateTotal = () => {
    const basePrice = videoTypes.find(v => v.id === selectedVideo)?.price || 0;
    const enhancementsTotal = selectedEnhancements.reduce((total, enhancementId) => {
      const enhancement = enhancements.find(e => e.id === enhancementId);
      return total + (enhancement?.price || 0);
    }, 0);
    return (basePrice + enhancementsTotal).toFixed(2);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Customize Your Video</h2>
      <p className="text-gray-600 mb-8">
        Pick your format and choose from optional upgrades. All videos include clean editing, royalty-free music, and fast delivery.
      </p>

      <Card>
        <CardContent className="p-6 space-y-8">
          {/* Video Type Selection */}
          <Collapsible
            open={openSections.videoType}
            onOpenChange={(isOpen) => setOpenSections(prev => ({ ...prev, videoType: isOpen }))}
          >
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between mb-4 hover:opacity-70 transition-opacity">
                <CardTitle>Choose a Video Type</CardTitle>
                <ChevronDown className={`h-6 w-6 transition-transform duration-200 ${openSections.videoType ? 'transform rotate-180' : ''}`} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 transition-all">
              <RadioGroup
                value={selectedVideo}
                onValueChange={setSelectedVideo}
                className="space-y-4"
              >
                {videoTypes.map((type) => (
                  <div key={type.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value={type.id} id={type.id} />
                    <Label htmlFor={type.id} className="flex-grow">
                      <div className="font-semibold">{type.title} – Starting at ${type.price}</div>
                      <div className="text-sm text-muted-foreground mt-1">{type.description}</div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CollapsibleContent>
          </Collapsible>

          <div className="h-px bg-border" />

          {/* Sound Design */}
          <Collapsible
            open={openSections.soundDesign}
            onOpenChange={(isOpen) => setOpenSections(prev => ({ ...prev, soundDesign: isOpen }))}
          >
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between mb-4 hover:opacity-70 transition-opacity">
                <CardTitle>Sound Design</CardTitle>
                <ChevronDown className={`h-6 w-6 transition-transform duration-200 ${openSections.soundDesign ? 'transform rotate-180' : ''}`} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 transition-all">
              {enhancements
                .filter(e => e.category === 'sound')
                .map((enhancement) => (
                  <div key={enhancement.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <Checkbox
                      id={enhancement.id}
                      checked={selectedEnhancements.includes(enhancement.id)}
                      onCheckedChange={(checked) => {
                        setSelectedEnhancements(prev =>
                          checked
                            ? [...prev, enhancement.id]
                            : prev.filter(id => id !== enhancement.id)
                        );
                      }}
                    />
                    <Label htmlFor={enhancement.id} className="flex-grow">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{enhancement.title}</span>
                        {enhancement.included ? (
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">Included</span>
                        ) : enhancement.price > 0 ? (
                          <span>(+${enhancement.price})</span>
                        ) : (
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">Free, Optional</span>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">{enhancement.description}</div>
                    </Label>
                  </div>
                ))}
            </CollapsibleContent>
          </Collapsible>

          <div className="h-px bg-border" />

          {/* Graphics & Branding */}
          <Collapsible
            open={openSections.graphicsBranding}
            onOpenChange={(isOpen) => setOpenSections(prev => ({ ...prev, graphicsBranding: isOpen }))}
          >
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between mb-4 hover:opacity-70 transition-opacity">
                <CardTitle>Graphics & Branding</CardTitle>
                <ChevronDown className={`h-6 w-6 transition-transform duration-200 ${openSections.graphicsBranding ? 'transform rotate-180' : ''}`} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 transition-all">
              {enhancements
                .filter(e => e.category === 'branding')
                .map((enhancement) => (
                  <div key={enhancement.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <Checkbox
                      id={enhancement.id}
                      checked={selectedEnhancements.includes(enhancement.id)}
                      onCheckedChange={(checked) => {
                        setSelectedEnhancements(prev =>
                          checked
                            ? [...prev, enhancement.id]
                            : prev.filter(id => id !== enhancement.id)
                        );
                      }}
                    />
                    <Label htmlFor={enhancement.id} className="flex-grow">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{enhancement.title}</span>
                        {enhancement.included ? (
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">Free, Optional</span>
                        ) : enhancement.price > 0 ? (
                          <span>(+${enhancement.price})</span>
                        ) : (
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">Free, Optional</span>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">{enhancement.description}</div>
                    </Label>
                  </div>
                ))}
            </CollapsibleContent>
          </Collapsible>

          <div className="h-px bg-border" />

          {/* Overlays & Enhancements */}
          <Collapsible
            open={openSections.overlays}
            onOpenChange={(isOpen) => setOpenSections(prev => ({ ...prev, overlays: isOpen }))}
          >
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between mb-4 hover:opacity-70 transition-opacity">
                <CardTitle>Overlays & Enhancements</CardTitle>
                <ChevronDown className={`h-6 w-6 transition-transform duration-200 ${openSections.overlays ? 'transform rotate-180' : ''}`} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 transition-all">
              {enhancements
                .filter(e => e.category === 'overlays')
                .map((enhancement) => (
                  <div key={enhancement.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <Checkbox
                      id={enhancement.id}
                      checked={selectedEnhancements.includes(enhancement.id)}
                      onCheckedChange={(checked) => {
                        setSelectedEnhancements(prev =>
                          checked
                            ? [...prev, enhancement.id]
                            : prev.filter(id => id !== enhancement.id)
                        );
                      }}
                    />
                    <Label htmlFor={enhancement.id} className="flex-grow">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{enhancement.title}</span>
                        {enhancement.price > 0 && <span>(+${enhancement.price})</span>}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">{enhancement.description}</div>
                    </Label>
                  </div>
                ))}
            </CollapsibleContent>
          </Collapsible>

          <div className="h-px bg-border" />

          {/* Total and Submit */}
          <div className="pt-4">
            <div className="flex justify-between items-center mb-6">
              <div className="text-xl font-semibold">Total:</div>
              <div className="text-2xl font-bold">${calculateTotal()}</div>
            </div>
            <Button 
              className="w-full"
              size="lg"
              disabled={!selectedVideo}
            >
              Continue to Booking
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 