
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState, useEffect } from 'react';

const ads = [
  {
    id: 'intel-pc',
    name: 'Intel Ultra 9 PC Deal',
    imageUrl: 'https://placehold.co/300x50.png?text=Intel+Ultra+9+PC',
    dataAiHint: 'gaming computer',
    link: 'https://amzn.to/3Z41Cxe',
    cta: 'Shop Intel PC Deal'
  },
  {
    id: 'high-spec-pc',
    name: 'High-Spec RTX 5090 PC',
    imageUrl: 'https://placehold.co/300x50.png?text=RTX+5090+Desktop',
    dataAiHint: 'computer hardware',
    link: 'https://amzn.to/43wuHDQ',
    cta: 'Explore RTX 5090 PC'
  },
  {
    id: 'aliexpress', // Keeping one generic for now, or could be another tech ad
    name: 'AliExpress Finds',
    imageUrl: 'https://placehold.co/300x50.png?text=AliExpress+Finds',
    dataAiHint: 'gadgets electronics',
    link: '#', // Replace with actual AliExpress link if available
    cta: 'Explore AliExpress'
  }
];

export function AffiliateAd() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentAd, setCurrentAd] = useState(ads[0]);

  useEffect(() => {
    // Select a random ad on mount
    setCurrentAd(ads[Math.floor(Math.random() * ads.length)]);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <Card className="fixed bottom-4 right-4 w-full max-w-md p-3 shadow-xl z-50 bg-card/90 backdrop-blur-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Advertisement</p>
          <Link href={currentAd.link} target="_blank" rel="noopener noreferrer" className="block hover:opacity-80 transition-opacity">
            <Image
              src={currentAd.imageUrl}
              alt={currentAd.name}
              width={300}
              height={50}
              className="rounded my-1 object-contain"
              data-ai-hint={currentAd.dataAiHint}
            />
            <span className="text-sm font-medium text-primary">{currentAd.cta}</span>
          </Link>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsVisible(false)} className="h-6 w-6 text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close ad</span>
        </Button>
      </div>
    </Card>
  );
}
