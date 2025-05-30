
"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Lightbulb, Heart, UserCog, Settings, Sparkles, Menu, LogIn, LogOut, ShieldQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/auth-context';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from '@/components/ui/skeleton';
import { AffiliateAd } from '@/components/shared/affiliate-ad';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const publicNavItems = [
  { href: '/', label: 'Home', icon: Home },
];

const authenticatedNavItems = [
  { href: '/generate', label: 'Generate Prompt', icon: Lightbulb },
  { href: '/favorites', label: 'Favorites', icon: Heart },
  { href: '/admin', label: 'Admin', icon: UserCog },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useIsMobile(); // Directly use the hook
  const { user, loadingAuth, signOutUser, signInWithGoogle } = useAuth();
  
  const [showAd, setShowAd] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setIsClient(true); // Component has mounted on client
    setCurrentYear(new Date().getFullYear()); // Set year on client mount
  }, []);

  useEffect(() => {
    // Determine if ad should be shown only on the client, after mount
    if (isClient) {
      setShowAd(Math.random() < 0.08);
    }
  }, [isClient, pathname]); // Re-evaluate on path change or when isClient becomes true

  const handleLogin = async () => {
    if (pathname === '/login') {
      await signInWithGoogle(); 
    } else {
      router.push('/login'); 
    }
  };

  const navItemsToDisplay = user ? [...publicNavItems, ...authenticatedNavItems] : publicNavItems;

  const UserAvatarButtonContent = () => {
    if (loadingAuth) {
      return <Skeleton className="h-10 w-10 rounded-full" />;
    }
    if (user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                <AvatarFallback>{user.displayName?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.displayName}</p>
                <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/settings')}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOutUser}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
    return (
      <Button onClick={handleLogin} variant="outline">
        <LogIn className="mr-2 h-4 w-4" /> Login
      </Button>
    );
  };
  
  const SidebarFooterLoginButton = () => {
    if(loadingAuth) {
      return <Skeleton className="h-10 w-full rounded-md" />;
    }
    if (!user) {
      return <Button onClick={handleLogin} className="w-full"><LogIn className="mr-2 h-4 w-4" />Login</Button>;
    }
    return null;
  }

  return (
    <SidebarProvider defaultOpen={!isMobile} open={!isMobile}>
      <Sidebar collapsible="icon" variant="sidebar" side="left">
        <SidebarHeader className="p-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-sidebar-primary-foreground hover:text-sidebar-accent-foreground transition-colors">
            <Image src="https://placehold.co/32x32.png?text=PCP" alt="PromptCraft Pro Logo" width={32} height={32} data-ai-hint="abstract geometric logo" className="group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8 rounded-sm"/>
            <span className="group-data-[collapsible=icon]:hidden">PromptCraft Pro</span>
          </Link>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarMenu>
            {navItemsToDisplay.map((item) => (
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
        <SidebarFooter className="p-4 flex flex-col gap-2">
           <Link href="/settings" passHref legacyBehavior>
             <SidebarMenuButton tooltip={{ children: "Settings", className: "group-data-[collapsible=icon]:block hidden" }} isActive={pathname === '/settings'}>
                <Settings />
                <span>Settings</span>
              </SidebarMenuButton>
          </Link>
          <div className="group-data-[collapsible=icon]:hidden">
            {isClient ? <SidebarFooterLoginButton /> : <Skeleton className="h-10 w-full rounded-md" />}
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur-md px-4 md:px-6">
          <div className="flex items-center gap-2">
             <SidebarTrigger className="md:hidden" />
             <h1 className="text-xl font-semibold">
                {navItemsToDisplay.find(item => item.href === pathname)?.label || 
                 (pathname.startsWith('/prompts/') ? 'Prompt Details' : 
                  pathname === '/login' ? 'Login' :
                  pathname === '/settings' ? 'Settings' :
                  pathname === '/account-deletion' ? 'Account Deletion' :
                  pathname === '/privacy' ? 'Privacy Policy' : 
                  pathname === '/terms' ? 'Terms of Service' : 
                  'PromptCraft Pro')}
             </h1>
          </div>
          {isClient ? <UserAvatarButtonContent /> : <Skeleton className="h-10 w-10 rounded-full" />}
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
        {isClient && showAd && <AffiliateAd />}
        <footer className="border-t p-4 text-center text-sm text-muted-foreground">
          © {currentYear} PromptCraft Pro. 
          <Link href="/privacy" className="ml-2 hover:text-foreground">Privacy Policy</Link>
          <Link href="/terms" className="ml-2 hover:text-foreground">Terms of Service</Link>
          <Link href="/account-deletion" className="ml-2 hover:text-foreground">Account Deletion</Link>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
