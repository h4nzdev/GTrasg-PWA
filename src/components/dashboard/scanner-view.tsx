'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import { UploadCloud, Recycle, Leaf, Trash2, Loader2, X } from 'lucide-react';
import type { ClassifyWasteItemOutput } from '@/ai/flows/ai-waste-segregation-scanner';
import { classifyWasteItem } from '@/ai/flows/ai-waste-segregation-scanner';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';

const categoryIcons = {
  biodegradable: <Leaf className="h-8 w-8 text-green-500" />,
  recyclable: <Recycle className="h-8 w-8 text-blue-500" />,
  residual: <Trash2 className="h-8 w-8 text-gray-500" />,
};

const categoryColors = {
  biodegradable: 'bg-green-500/10 text-green-500 border-green-500/20',
  recyclable: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  residual: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
}

export function ScannerView() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<ClassifyWasteItemOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const placeholderImage = PlaceHolderImages.find((img) => img.id === 'scanner-placeholder');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setResult(null);
    }
  };

  const handleScan = () => {
    if (!file) return;

    startTransition(async () => {
      try {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
          const base64 = reader.result as string;
          const classificationResult = await classifyWasteItem({ wasteItemPhotoDataUri: base64 });
          setResult(classificationResult);
        };
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to classify the item. Please try again.',
          variant: 'destructive',
        });
      }
    });
  };

  const clearSelection = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };


  return (
    <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Upload Waste Item</CardTitle>
          <CardDescription>Take a picture or upload an image of a waste item to classify it.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col items-center justify-center">
          <label htmlFor="file-upload" className="flex w-full flex-1 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-card hover:bg-muted/50">
            {preview ? (
              <div className="relative h-full w-full">
                <Image src={preview} alt="Preview" fill className="object-contain p-4" />
                <Button variant="ghost" size="icon" className="absolute right-2 top-2 rounded-full bg-background/50 backdrop-blur-sm" onClick={(e) => { e.preventDefault(); clearSelection();}}>
                    <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-sm text-muted-foreground">
                  <span className="font-semibold text-accent">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">PNG, JPG, or WEBP</p>
              </div>
            )}
          </label>
          <input id="file-upload" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
        </CardContent>
        <div className="p-6 pt-0">
          <Button onClick={handleScan} disabled={!file || isPending} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Scanning...
              </>
            ) : (
              'Scan Item'
            )}
          </Button>
        </div>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Classification Result</CardTitle>
          <CardDescription>AI-powered analysis of your waste item.</CardDescription>
        </CardHeader>
        <CardContent className="flex h-full flex-col items-center justify-center text-center">
          {isPending ? (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-16 w-16 animate-spin text-primary" />
              <p className="text-muted-foreground">Analyzing image...</p>
            </div>
          ) : result ? (
            <div className="flex flex-col items-center gap-4">
               <div className={cn("rounded-full p-4", categoryColors[result.classification])}>
                {categoryIcons[result.classification]}
              </div>
              <h3 className="text-2xl font-bold capitalize">{result.classification}</h3>
              <p className="text-muted-foreground">{result.explanation}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
                {placeholderImage && <Image src={placeholderImage.imageUrl} alt="Scan placeholder" width={150} height={150} className="opacity-10" data-ai-hint={placeholderImage.imageHint}/>}
                <p className="text-muted-foreground">Upload an image and click "Scan Item" to see the result.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
