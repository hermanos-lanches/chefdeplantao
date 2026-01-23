import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Skeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("animate-pulse rounded-md bg-white/10", className)} />
  );
};

export const JobCardSkeleton = () => (
  <div className="p-4 border border-white/10 rounded-2xl bg-[#1c1c1e] space-y-3">
    <div className="flex items-center space-x-3">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
    <Skeleton className="h-4 w-full" />
    <div className="flex justify-between items-center pt-2">
      <Skeleton className="h-6 w-20" />
      <Skeleton className="h-8 w-24 rounded-lg" />
    </div>
  </div>
);

export const ProfileHeaderSkeleton = () => (
  <div className="flex flex-col items-center space-y-4 p-6">
    <Skeleton className="h-24 w-24 rounded-full" />
    <div className="space-y-2 flex flex-col items-center">
      <Skeleton className="h-6 w-48" />
      <Skeleton className="h-4 w-32" />
    </div>
  </div>
);
