
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { X, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useState, useEffect } from 'react';

interface AdItem {
  id: string;
  productName: string;
  productImageUrl: string;
  dataAiHint: string;
  storeName: string;
  starRating: number; // e.g., 4.5
  link: string;
}

const ads: AdItem[] = [
  {
    id: 'intel-pc',
    productName: 'Intel Core Ultra 9 Gaming PC Deal',
    productImageUrl: 'https://placehold.co/200x150.png?text=Intel+Gaming+PC',
    dataAiHint: 'gaming computer',
    storeName: 'AMAZON.ES',
    starRating: 4,
    link: 'https://amzn.to/3Z41Cxe',
  },
  {
    id: 'high-spec-pc',
    productName: 'Ultra High End PC NVIDIA RTX 5090 32GB | Ryzen 7 7800X3D | 64GB DDR5 6000MHz | 2TB M.2 SSD | Win 11 Pro | MSI Wasserkühlung',
    productImageUrl: 'https://placehold.co/200x150.png?text=RTX+5090+PC',
    dataAiHint: 'computer hardware high-end',
    storeName: 'AMAZON.ES',
    starRating: 5,
    link: 'https://amzn.to/43wuHDQ',
  },
  {
    id: 'aliexpress-tech',
    productName: 'Latest Tech Gadgets & Deals on AliExpress',
    productImageUrl: 'https://placehold.co/200x150.png?text=AliExpress+Gadgets',
    dataAiHint: 'gadgets electronics',
    storeName: 'ALIEXPRESS.COM',
    starRating: 4,
    link: '#', // Replace with actual AliExpress link if available
  }
];

export function AffiliateAd() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentAd, setCurrentAd] = useState<AdItem>(ads[0]);

  useEffect(() => {
    setCurrentAd(ads[Math.floor(Math.random() * ads.length)]);
  }, []);

  if (!isVisible) {
    return null;
  }

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    let stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 text-yellow-400 fill-yellow-400" />);
    }
    // For simplicity, not implementing half-star yet, will treat as full or empty.
    // If you need half stars, we can use a different icon or SVG.
    for (let i = 0; i < 5 - fullStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }
    return stars.slice(0, 5); // Ensure only 5 stars
  };

  return (
    <Card className="fixed bottom-4 right-4 w-full max-w-xs p-3 shadow-xl z-50 bg-card/95 backdrop-blur-sm border border-border">
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsVisible(false)}
          className="absolute -top-1 -right-1 h-6 w-6 text-muted-foreground hover:text-foreground z-10 bg-card/80 hover:bg-card rounded-full"
        >
          <X className="h-3 w-3" />
          <span className="sr-only">Close ad</span>
        </Button>
        <Link href={currentAd.link} target="_blank" rel="noopener noreferrer" className="block group">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-md mb-2">
            <Image
              src={currentAd.productImageUrl}
              alt={currentAd.productName}
              width={200}
              height={150}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              data-ai-hint={currentAd.dataAiHint}
            />
          </div>
          <div className="flex items-center mb-1">
            {renderStars(currentAd.starRating)}
          </div>
          <p className="text-xs text-muted-foreground uppercase mb-0.5">{currentAd.storeName}</p>
          <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-3 leading-tight">
            {currentAd.productName}
          </h4>
        </Link>
        <p className="text-[0.6rem] text-muted-foreground/70 mt-1.5 text-right">Advertisement</p>
      </div>
    </Card>
  );
}
