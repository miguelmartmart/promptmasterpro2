
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Lightbulb, Heart, UserCog, Settings, Sparkles, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { AffiliateAd } from '@/components/shared/affiliate-ad';
import { Separator } from '@/components/ui/separator';
import React, { useState, useEffect } from 'react';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/generate', label: 'Generate Prompt', icon: Lightbulb },
  { href: '/favorites', label: 'Favorites', icon: Heart },
  { href: '/admin', label: 'Admin', icon: UserCog },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMobile = useIsMobile(); 
  
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    // Show ad with ~8% probability on page navigation (when pathname changes)
    // This ensures it's not tied to every re-render, but to actual navigation events.
    if (Math.random() < 0.08) {
      setShowAd(true);
    } else {
      setShowAd(false);
    }
  }, [pathname]);


  return (
    <SidebarProvider defaultOpen={!isMobile} open={!isMobile}>
      <Sidebar collapsible="icon" variant="sidebar" side="left">
        <SidebarHeader className="p-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-sidebar-primary-foreground hover:text-sidebar-accent-foreground transition-colors">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="group-data-[collapsible=icon]:hidden">PromptCraft Pro</span>
          </Link>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} passHref legacyBehavior>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    tooltip={{ children: item.label, className: "group-data-[collapsible=icon]:block hidden" }}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4">
          <Link href="/settings" passHref legacyBehavior>
             <SidebarMenuButton tooltip={{ children: "Settings", className: "group-data-[collapsible=icon]:block hidden" }}>
                <Settings />
                <span>Settings</span>
              </SidebarMenuButton>
          </Link>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur-md px-4 md:px-6">
          <div className="flex items-center gap-2">
             <SidebarTrigger className="md:hidden" />
             <h1 className="text-xl font-semibold">
                {navItems.find(item => item.href === pathname)?.label || 'PromptCraft Pro'}
             </h1>
          </div>
          {/* Placeholder for user avatar/actions */}
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
        {showAd && <AffiliateAd />}
        <footer className="border-t p-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} PromptCraft Pro. 
          <Link href="/privacy" className="ml-2 hover:text-foreground">Privacy Policy</Link>
          <Link href="/terms" className="ml-2 hover:text-foreground">Terms of Service</Link>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
