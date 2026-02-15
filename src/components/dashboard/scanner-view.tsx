'use client';

import { useState, useTransition, useEffect, useRef, type Dispatch, type SetStateAction } from 'react';
import { Image as GalleryIcon, Camera, History, X, Trash2, Loader2, MapPin, Info, Recycle, CheckCircle2 } from 'lucide-react';
import type { ClassifyWasteItemOutput } from '@/ai/flows/ai-waste-segregation-scanner';
import { classifyWasteItem } from '@/ai/flows/ai-waste-segregation-scanner';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import type { View } from '@/app/page';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

const categoryIcons = {
  biodegradable: <Recycle className="h-6 w-6 text-green-400" />,
  recyclable: <Recycle className="h-6 w-6 text-green-400" />,
  residual: <Trash2 className="h-6 w-6 text-green-400" />,
};

export function ScannerView({ setActiveView }: { setActiveView: Dispatch<SetStateAction<View>> }) {
  const [result, setResult] = useState<ClassifyWasteItemOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this app.',
        });
      }
    };
    getCameraPermission();
    
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [toast]);

  const handleScan = () => {
    if (!videoRef.current || !canvasRef.current || isPending) return;
    setResult(null);
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    if(context){
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUri = canvas.toDataURL('image/jpeg');
        
        startTransition(async () => {
            try {
                const classificationResult = await classifyWasteItem({ wasteItemPhotoDataUri: dataUri });
                setResult(classificationResult);
            } catch (error) {
                toast({
                title: 'Error',
                description: 'Failed to classify the item. Please try again.',
                variant: 'destructive',
                });
            }
        });
    }
  };

  const clearResult = () => {
    setResult(null);
  }

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-[#1C211F] text-white">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/50 to-transparent">
        <Button variant="ghost" size="icon" className="rounded-full bg-black/20 hover:bg-black/40" onClick={() => setActiveView('dashboard')}>
          <X className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-semibold">AI Trash Scanner</h1>
        <Button variant="ghost" size="icon" className="rounded-full bg-black/20 hover:bg-black/40" onClick={clearResult}>
          <Trash2 className="h-6 w-6" />
        </Button>
      </header>

      {/* Camera View */}
      <div className="relative flex-1 bg-black">
        <div className="absolute inset-0 overflow-hidden">
            <video ref={videoRef} className="h-full w-full object-cover" autoPlay muted playsInline />
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="w-full max-w-sm aspect-square rounded-2xl border-4 border-white/50 border-dashed" />
        </div>

        {isPending && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <Loader2 className="h-16 w-16 animate-spin text-green-500" />
          </div>
        )}
        
        {result && (
              <div className="absolute top-20 left-1/2 -translate-x-1/2">
                <Badge className="bg-green-500/80 text-white border-green-400 py-2 px-4 text-sm backdrop-blur-sm">
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    {result.classification === 'recyclable' ? 'Plastic' : result.classification.charAt(0).toUpperCase() + result.classification.slice(1)} Detected
                </Badge>
              </div>
        )}

        {hasCameraPermission === false && (
            <div className="absolute inset-0 flex items-center justify-center p-4">
                <Alert variant="destructive">
                    <AlertTitle>Camera Access Required</AlertTitle>
                    <AlertDescription>
                    Please allow camera access to use this feature.
                    </AlertDescription>
                </Alert>
            </div>
        )}
        <canvas ref={canvasRef} className="hidden"></canvas>
      </div>

      {/* Bottom Sheet */}
      <div className="bg-[#2A312E] p-6 rounded-t-3xl relative">
        {result ? (
            <div>
                <Badge variant="secondary" className="bg-green-500/20 text-green-300">CEBU WASTE GUIDE</Badge>
                <div className="flex justify-between items-center mt-2">
                    <h2 className="text-2xl font-bold capitalize">{result.classification === 'recyclable' ? 'Recyclable - Plastic' : result.classification}</h2>
                    <div className="bg-green-500/20 p-2 rounded-full">
                        {categoryIcons[result.classification] || <Recycle className="h-6 w-6 text-green-400" />}
                    </div>
                </div>
                <div className="mt-4 bg-black/20 p-4 rounded-lg flex items-start gap-3">
                    <Info className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0"/>
                    <div>
                        <h3 className="font-semibold">Preparation Instructions</h3>
                        <p className="text-sm text-gray-400">{result.explanation}</p>
                    </div>
                </div>
            </div>
        ) : (
            <div className="text-center text-gray-400 py-8">
                <p>Point your camera at an item to scan it.</p>
            </div>
        )}
        <div className="mt-6 flex justify-around items-center">
            <Button variant="ghost" className="flex flex-col h-auto text-gray-300 hover:text-white">
                <GalleryIcon className="h-6 w-6" />
                <span className="text-xs mt-1">GALLERY</span>
            </Button>
            <Button size="icon" className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 ring-4 ring-black/30" onClick={handleScan} disabled={isPending || hasCameraPermission !== true}>
                <Camera className="h-8 w-8" />
            </Button>
            <Button variant="ghost" className="flex flex-col h-auto text-gray-300 hover:text-white">
                <History className="h-6 w-6" />
                <span className="text-xs mt-1">HISTORY</span>
            </Button>
        </div>
        <div className="mt-6 flex justify-center items-center gap-2 text-sm text-green-400">
            <MapPin className="h-4 w-4" />
            <span>LAHUO, CEBU CITY</span>
        </div>
      </div>
    </div>
  );
}
