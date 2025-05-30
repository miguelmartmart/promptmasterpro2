
"use client"; // Added this directive

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  // Placeholder states and handlers
  // In a real app, these would interact with context or localStorage
  const handleExportData = () => {
    alert("Data export functionality to be implemented.");
  };

  const handleImportData = () => {
    alert("Data import functionality to be implemented.");
  };

  const handleClearCache = () => {
    if (window.confirm("Are you sure you want to clear all locally stored data? This action cannot be undone.")) {
      localStorage.removeItem('promptCraftPro_prompts');
      localStorage.removeItem('promptCraftPro_favorites');
      alert("Local cache cleared. Please refresh the application.");
      window.location.reload(); // Force reload to reflect cleared state
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Manage your application preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode-toggle" className="text-base">
              Dark Mode
            </Label>
            <Switch id="dark-mode-toggle" checked={true} disabled aria-readonly/>
            {/* In a real app, this would toggle document.documentElement.classList.toggle('dark') 
                and save preference. Since theme is dark by default, it's checked and disabled. */}
          </div>
          <p className="text-sm text-muted-foreground">
            The application currently uses a dark theme by default. Light mode toggle can be implemented here.
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>Manage your local application data.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Button onClick={handleExportData} variant="outline" className="w-full sm:w-auto">Export My Data</Button>
            <p className="text-sm text-muted-foreground">Export your prompts and favorites to a JSON file (Feature coming soon).</p>
          </div>
          <div className="space-y-2">
            <Button onClick={handleImportData} variant="outline" className="w-full sm:w-auto">Import Data</Button>
            <p className="text-sm text-muted-foreground">Import prompts and favorites from a JSON file (Feature coming soon).</p>
          </div>
          <Separator />
           <div className="space-y-2">
            <Button onClick={handleClearCache} variant="destructive" className="w-full sm:w-auto">Clear Local Cache</Button>
            <p className="text-sm text-muted-foreground">
              This will remove all prompts and favorites stored in your browser. This action cannot be undone.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">PromptCraft Pro v1.0.0</p>
          <p className="text-muted-foreground">Your creative companion for AI prompts.</p>
        </CardContent>
      </Card>
    </div>
  );
}
