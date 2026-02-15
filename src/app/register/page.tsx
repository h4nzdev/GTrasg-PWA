'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft, ArrowRight, User, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Progress } from '@/components/ui/progress';

const formSchema = z.object({
  fullName: z.string().min(1, { message: 'Full name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  mobileNumber: z.string().min(10, { message: 'Please enter a valid mobile number' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  barangay: z.string().min(1, { message: 'Barangay is required' }),
});

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      mobileNumber: '',
      password: '',
      barangay: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    // Simulate API call for registration
    setTimeout(() => {
      console.log('Registration values:', values);
      // For now, just navigate to login. In a real app, you'd go to a verification step.
      router.push('/');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#1C211F] text-white">
      <header className="flex-shrink-0 p-4">
        <Button variant="ghost" size="icon" onClick={() => router.push('/')}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </header>

      <main className="flex-1 flex flex-col items-center p-6 pt-0">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-right">
            <p className="text-xs font-bold text-gray-400">STEP 1 OF 2</p>
            <Progress value={50} className="mt-2 h-1 bg-transparent [&>div]:bg-[#34D399]" />
          </div>
          <div className="text-left mb-8">
            <h2 className="text-3xl font-bold">Join the Eco-Warriors</h2>
            <p className="text-gray-400 mt-1">
              Improve Cebu's waste management. Track collection trucks in real-time.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-400 text-xs">Full Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          placeholder="Juan dela Cruz"
                          className="bg-[#2A312E] border-gray-600 pl-10 text-white placeholder:text-gray-500"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-400 text-xs">Email Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          type="email"
                          placeholder="juan@example.com"
                          className="bg-[#2A312E] border-gray-600 pl-10 text-white placeholder:text-gray-500"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mobileNumber"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="text-gray-400 text-xs">Mobile Number</FormLabel>
                    <div className="flex gap-2">
                        <Input
                            readOnly
                            value="+63"
                            className="bg-[#2A312E] border-gray-600 text-white text-center w-1/4"
                        />
                        <FormControl>
                            <Input
                                type="tel"
                                placeholder="917 123 4567"
                                className="bg-[#2A312E] border-gray-600 text-white placeholder:text-gray-500 flex-1"
                                {...field}
                            />
                        </FormControl>
                    </div>
                    <FormMessage />
                    </FormItem>
                )}
                />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-400 text-xs">Create Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          className="bg-[#2A312E] border-gray-600 pl-10 pr-10 text-white placeholder:text-gray-500"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="barangay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-400 text-xs">Your Barangay</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your barangay"
                        className="bg-[#2A312E] border-gray-600 text-white placeholder:text-gray-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                size="lg"
                className="w-full h-12 bg-[#34D399] hover:bg-[#34D399]/90 text-black font-semibold text-base !mt-8"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <div className="flex items-center justify-center">
                    <span>Next: Verify Account</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </div>
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-8 text-center text-sm">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link href="/" className="font-semibold text-[#34D399] hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
