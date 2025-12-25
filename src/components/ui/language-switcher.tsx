import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

export function LanguageSwitcher({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Globe className="w-4 h-4 text-muted-foreground mr-1" />
      <Button
        variant={language === 'mn' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('mn')}
        className={cn(
          "h-7 px-2 text-xs font-medium",
          language === 'mn' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
        )}
      >
        MN
      </Button>
      <Button
        variant={language === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('en')}
        className={cn(
          "h-7 px-2 text-xs font-medium",
          language === 'en' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
        )}
      >
        EN
      </Button>
    </div>
  );
}
