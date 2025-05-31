"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

// Define types for options and state
interface Option {
  id: string;
  label: string;
  price: number;
  description?: string;
}

interface CustomVideoOptions {
  orientation: string;
  soundDesign: string[];
  voiceover: boolean;
  graphicsText: string[];
  agentIntroOutro: boolean;
  overlays: string[];
  additionalDuration: number; // in 30-second increments
}

const CustomVideoBuilder = () => {
  const [options, setOptions] = useState<CustomVideoOptions>({
    orientation: "horizontal",
    soundDesign: [],
    voiceover: false,
    graphicsText: [],
    agentIntroOutro: false,
    overlays: [],
    additionalDuration: 0,
  });

  const [totalPrice, setTotalPrice] = useState(0);

  // Define options data
  const orientationOptions: Option[] = [
    { id: "property_highlights", label: "Property Highlights Video", price: 319.99 },
    { id: "social_reel", label: "Social Media Reel", price: 229.99 },
    { id: "drone_aerial", label: "Drone Aerial Video", price: 159.99 },
  ];

  const soundDesignOptions: Option[] = [
    { id: "background_music", label: "Background Music", price: 0, description: "Send your own or let us choose" },
    { id: "sound_effects", label: "Sound Effects (Ambience, Abstracts, Motivated)", price: 5.00 },
  ];

  const voiceoverOption: Option = {
    id: "voiceover",
    label: "Professional narration synced to video",
    price: 7.00,
  };

  const graphicsTextOptions: Option[] = [
    { id: "titles", label: "Titles – Property address, features, or custom text", price: 0 },
    { id: "branding", label: "Branding – Agent name, logo, and contact info", price: 3.00 },
    { id: "captions", label: "Captions – On-screen text for dialogue", price: 10.00 },
  ];

  const agentIntroOutroOption: Option = {
    id: "agent_intro_outro",
    label: "Agent Intro/Outro – Add an on-camera intro or outro",
    price: 5.00,
  };

  const overlayOptions: (Option & { image: string })[] = [
    { id: "lot_lines", label: "Lot Lines – Visual property boundaries", price: 15.00, image: "/images/services/videography/lot_lines.gif" },
    { id: "site_plan", label: "Site Plan – Aerial overlay with structure labels", price: 10.00, image: "/images/services/videography/site_plan.gif" },
    { id: "feature_callouts", label: "Feature Callouts – Highlight amenities or details", price: 15.00, image: "/images/services/videography/feature.gif" },
  ];

  const additionalDurationPrice = 5.00; // per 30 seconds

  const orientationNotes: Record<string, string> = {
    property_highlights: "1–2 minutes, horizontal",
    social_reel: "30–60 seconds, vertical",
    drone_aerial: "30–60 seconds, aerial",
  };

  // Calculate total price
  useEffect(() => {
    let currentTotal = 0;

    // Orientation pricing logic
    const selectedOrientation = orientationOptions.find(opt => opt.id === options.orientation);
    if (selectedOrientation) {
      currentTotal += selectedOrientation.price;
    }

    // Sound Design
    options.soundDesign.forEach(sdId => {
      const selectedSound = soundDesignOptions.find(s => s.id === sdId);
      if (selectedSound) {
        currentTotal += selectedSound.price;
      }
    });

    // Voiceover
    if (options.voiceover) {
      currentTotal += voiceoverOption.price;
    }

    // Graphics & Text
    options.graphicsText.forEach(gtId => {
      const selectedGraphic = graphicsTextOptions.find(g => g.id === gtId);
      if (selectedGraphic) {
        currentTotal += selectedGraphic.price;
      }
    });
    
    // Agent Intro/Outro
    if (options.agentIntroOutro) {
        currentTotal += agentIntroOutroOption.price;
    }

    // Overlays
    options.overlays.forEach(oId => {
      const selectedOverlay = overlayOptions.find(o => o.id === oId);
      if (selectedOverlay) {
        currentTotal += selectedOverlay.price;
      }
    });

    // Additional Duration
    currentTotal += options.additionalDuration * additionalDurationPrice;

    setTotalPrice(currentTotal);
  }, [options]);

  const handleOrientationChange = (value: string) => {
    setOptions(prev => ({ ...prev, orientation: value }));
  };

  const handleSoundDesignChange = (id: string, checked: boolean) => {
    setOptions(prev => ({
      ...prev,
      soundDesign: checked
        ? [...prev.soundDesign, id]
        : prev.soundDesign.filter(item => item !== id),
    }));
  };

  const handleVoiceoverChange = (checked: boolean) => {
    setOptions(prev => ({ ...prev, voiceover: checked }));
  };

  const handleGraphicsTextChange = (id: string, checked: boolean) => {
    setOptions(prev => ({
      ...prev,
      graphicsText: checked
        ? [...prev.graphicsText, id]
        : prev.graphicsText.filter(item => item !== id),
    }));
  };
  
  const handleAgentIntroOutroChange = (checked: boolean) => {
    setOptions(prev => ({ ...prev, agentIntroOutro: checked }));
  };

  const handleOverlayChange = (id: string, checked: boolean) => {
    setOptions(prev => ({
      ...prev,
      overlays: checked
        ? [...prev.overlays, id]
        : prev.overlays.filter(item => item !== id),
    }));
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setOptions(prev => ({ ...prev, additionalDuration: isNaN(value) || value < 0 ? 0 : value }));
  };


  return (
    <Card className="w-full max-w-[1200px] mx-auto shadow-xl px-2 sm:px-6">
      <CardHeader className="bg-muted/50">
        <CardTitle className="text-2xl font-serif text-primary">Customize Your Video</CardTitle>
        <CardDescription className="text-muted-foreground">
          Enhance your video with custom features tailored to your listing. Select your preferences below.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-8">
        {/* Video Orientation */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-primary">Video Orientation</h3>
          <p className="text-sm text-muted-foreground">Choose how your video is formatted.</p>
          <RadioGroup value={options.orientation} onValueChange={handleOrientationChange} className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {orientationOptions.map(opt => (
              <Label
                key={opt.id}
                htmlFor={opt.id}
                className={`flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:border-primary/40 cursor-pointer ${options.orientation === opt.id ? "border-primary ring-2 ring-primary" : ""}`}
              >
                <RadioGroupItem value={opt.id} id={opt.id} className="sr-only" />
                <span>{opt.label}</span>
                {opt.id === "property_highlights" && <span className="text-xs text-muted-foreground mt-1">${319.99.toFixed(2)}</span>}
                {opt.id === "social_reel" && <span className="text-xs text-muted-foreground mt-1">${229.99.toFixed(2)}</span>}
                {opt.id === "drone_aerial" && <span className="text-xs text-muted-foreground mt-1">${159.99.toFixed(2)}</span>}
                <span className="text-xs text-muted-foreground mt-1">{orientationNotes[opt.id]}</span>
              </Label>
            ))}
          </RadioGroup>
        </div>

        <Separator />

        {/* Sound Design */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-primary">Sound Design</h3>
          {soundDesignOptions.map(opt => (
            <div key={opt.id} className="flex items-center space-x-3">
              <Checkbox
                id={opt.id}
                checked={options.soundDesign.includes(opt.id)}
                onCheckedChange={(checked) => handleSoundDesignChange(opt.id, !!checked)}
              />
              <Label htmlFor={opt.id} className="flex flex-col">
                <span>{opt.label} {opt.price > 0 && <span className="text-xs text-muted-foreground ml-1">(+${opt.price.toFixed(2)})</span>}</span>
                {opt.description && <span className="text-xs text-muted-foreground">{opt.description}</span>}
              </Label>
            </div>
          ))}
        </div>
        
        <Separator />

        {/* Voiceovers */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-primary">Voiceovers</h3>
          <div className="flex items-center space-x-3">
            <Checkbox
              id={voiceoverOption.id}
              checked={options.voiceover}
              onCheckedChange={(checked) => handleVoiceoverChange(!!checked)}
            />
            <Label htmlFor={voiceoverOption.id}>
              {voiceoverOption.label} 
              {voiceoverOption.price > 0 && <span className="text-xs text-muted-foreground ml-1">(+${voiceoverOption.price.toFixed(2)})</span>}
            </Label>
          </div>
        </div>

        <Separator />

        {/* Graphics & Text */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-primary">Graphics & Text</h3>
          {graphicsTextOptions.map(opt => (
            <div key={opt.id} className="flex items-center space-x-3">
              <Checkbox
                id={opt.id}
                checked={options.graphicsText.includes(opt.id)}
                onCheckedChange={(checked) => handleGraphicsTextChange(opt.id, !!checked)}
              />
              <Label htmlFor={opt.id}>
                {opt.label}
                {opt.price > 0 && <span className="text-xs text-muted-foreground ml-1">(+${opt.price.toFixed(2)})</span>}
              </Label>
            </div>
          ))}
          <div className="flex items-center space-x-3">
            <Checkbox
              id={agentIntroOutroOption.id}
              checked={options.agentIntroOutro}
              onCheckedChange={(checked) => handleAgentIntroOutroChange(!!checked)}
            />
            <Label htmlFor={agentIntroOutroOption.id}>
              {agentIntroOutroOption.label}
              {agentIntroOutroOption.price > 0 && <span className="text-xs text-muted-foreground ml-1">(+${agentIntroOutroOption.price.toFixed(2)})</span>}
            </Label>
          </div>
        </div>

        <Separator />

        {/* Overlays */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-primary">Overlays</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {overlayOptions.map(opt => {
              const selected = options.overlays.includes(opt.id);
              return (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => handleOverlayChange(opt.id, !selected)}
                  className={`group w-full flex flex-col items-center p-6 rounded-2xl border-2 transition-all shadow-md bg-white focus:outline-none cursor-pointer
                    ${selected ? "border-primary ring-2 ring-primary/30" : "border-muted hover:border-primary/40"}`}
                >
                  <div className="mb-4">
                    <Image
                      src={opt.image}
                      alt={opt.label}
                      width={160}
                      height={160}
                      className="rounded-xl object-cover border border-muted shadow-lg"
                    />
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="font-medium text-base text-primary text-center">{opt.label}</span>
                    {opt.price > 0 && (
                      <span className="text-xs text-muted-foreground">(+${opt.price.toFixed(2)})</span>
                    )}
                  </div>
                  <div className="mt-auto">
                    <span
                      className={`inline-block w-5 h-5 rounded-full border-2 ${selected ? "bg-primary border-primary" : "border-muted bg-white"}`}
                      aria-hidden="true"
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <Separator />

        {/* Total Price */}
        <div className="pt-6">
          <div className="flex justify-between items-center bg-secondary/10 p-4 rounded-lg">
            <span className="text-xl font-semibold text-primary">Estimated Total:</span>
            <span className="text-2xl font-bold text-primary">${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <div className="pt-6 text-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                Request Custom Video
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
                Final price will be confirmed upon review of your specific property and requirements.
            </p>
        </div>

      </CardContent>
    </Card>
  );
};

export default CustomVideoBuilder; 