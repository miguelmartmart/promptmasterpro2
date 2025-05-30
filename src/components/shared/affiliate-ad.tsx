"use client";

import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState, useEffect } from 'react';

const ads = [
  {
    id: 'amazon',
    name: 'Amazon Deals',
    imageUrl: 'https://placehold.co/728x90.png?text=Amazon+Ad',
    dataAiHint: 'shopping sale',
    link: '#',
    cta: 'Shop Now on Amazon'
  },
  {
    id: 'shein',
    name: 'Shein Fashion',
    imageUrl: 'https://placehold.co/728x90.png?text=Shein+Ad',
    dataAiHint: 'fashion clothing',
    link: '#',
    cta: 'Discover Styles on Shein'
  },
  {
    id: 'aliexpress',
    name: 'AliExpress Finds',
    imageUrl: 'https://placehold.co/728x90.png?text=AliExpress+Ad',
    dataAiHint: 'gadgets electronics',
    link: '#',
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
