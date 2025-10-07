import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-6xl font-light text-foreground mb-4">404</h1>
        <h2 className="text-2xl font-medium text-foreground mb-2">
          Page Not Found
        </h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <Button className="bg-foreground hover:bg-foreground/90 text-background">
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
