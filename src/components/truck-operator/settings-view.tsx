'use client';

import { useTheme } from 'next-themes';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useEffect, useState } from 'react';

export function SettingsView() {
  const { theme, setTheme } = useTheme();
  const [mapTheme, setMapTheme] = useState('standard');

  useEffect(() => {
    const savedMapTheme = localStorage.getItem('map-theme') || 'standard';
    setMapTheme(savedMapTheme);
  }, []);

  const handleMapThemeChange = (value: string) => {
    setMapTheme(value);
    localStorage.setItem('map-theme', value);
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <Card className="mx-auto max-w-2xl bg-card border-border text-card-foreground">
        <CardHeader>
          <CardTitle>Operator Settings</CardTitle>
          <CardDescription className="text-muted-foreground">
            Manage your navigation and interface preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2 rounded-lg border border-border p-4">
            <Label htmlFor="dark-mode" className="flex flex-col space-y-1">
              <span>Dark Mode</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Switch between high-contrast and low-light modes.
              </span>
            </Label>
            <Switch
              id="dark-mode"
              checked={theme === 'dark'}
              onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
              aria-label="Toggle dark mode"
            />
          </div>

          <div className="space-y-3 rounded-lg border border-border p-4">
            <Label className="text-base font-semibold">Route Map Theme</Label>
            <RadioGroup
              value={mapTheme}
              onValueChange={handleMapThemeChange}
              className="grid grid-cols-2 gap-4 pt-2"
            >
              <div>
                <RadioGroupItem
                  value="standard"
                  id="op-standard"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="op-standard"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                >
                  <div className="mb-2 h-16 w-full rounded border border-border bg-white flex items-center justify-center text-[10px] text-blue-600 font-bold">
                    STANDARD
                  </div>
                  <span className="text-sm font-medium">Standard</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="gray"
                  id="op-gray"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="op-gray"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                >
                  <div className="mb-2 h-16 w-full rounded border border-border bg-gray-400 flex items-center justify-center text-[10px] text-white font-bold shadow-inner">
                    GRAYSCALE
                  </div>
                  <span className="text-sm font-medium">Muted Gray</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
