'use client';

import Image from 'next/image';
import { PlusCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { reports } from '@/lib/data';
import { cn } from '@/lib/utils';

const statusVariants = {
  Pending: 'bg-yellow-400/20 text-yellow-500 border-yellow-400/30',
  'In Progress': 'bg-blue-400/20 text-blue-500 border-blue-400/30',
  Resolved: 'bg-green-400/20 text-green-500 border-green-400/30',
};

export function ReportsView() {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle>Community Reports</CardTitle>
          <CardDescription>
            Illegal dumping and missed pickups reported by the community.
          </CardDescription>
        </div>
        <Button className="ml-auto w-full sm:w-auto">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Report
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Reported</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt={report.image.description}
                    data-ai-hint={report.image.imageHint}
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src={report.image.imageUrl}
                    width="64"
                  />
                </TableCell>
                <TableCell className="font-medium">{report.title}</TableCell>
                <TableCell>{report.location}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn(statusVariants[report.status])}>
                    {report.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{report.reportedAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
