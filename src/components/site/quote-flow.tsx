'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useDictionary } from '@/contexts/dictionary-context';
import { useParams } from 'next/navigation';
import { submitInquiry } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

type QuoteContextValue = {
  openQuote: () => void;
  closeQuote: () => void;
};

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function useQuoteFlow() {
  const v = useContext(QuoteContext);
  if (!v) throw new Error('useQuoteFlow must be used within QuoteFlowProvider');
  return v;
}

export function QuoteFlowProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const openQuote = useCallback(() => setOpen(true), []);
  const closeQuote = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ openQuote, closeQuote }),
    [openQuote, closeQuote],
  );

  return (
    <QuoteContext.Provider value={value}>
      {children}
      <QuickQuoteDialog open={open} onOpenChange={setOpen} />
    </QuoteContext.Provider>
  );
}

function choiceBtn(active: boolean, onClick: () => void, label: string) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-xl border-2 px-4 py-3 text-center text-sm font-semibold transition-colors md:text-base',
        active
          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-sm dark:bg-emerald-950/40'
          : 'border-muted bg-background hover:border-emerald-500/50',
      )}
    >
      {label}
    </button>
  );
}

function QuickQuoteDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const t = useDictionary();
  const q = t.QuickQuote;
  const params = useParams();
  const locale = (params?.locale as string) || 'ru';
  const { toast } = useToast();

  const [step, setStep] = useState(1);
  const [cleaningType, setCleaningType] = useState<string>('');
  const [rooms, setRooms] = useState<string>('');
  const [placeType, setPlaceType] = useState<string>('');
  const [whenNeed, setWhenNeed] = useState<string>('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!open) {
      setStep(1);
      setCleaningType('');
      setRooms('');
      setPlaceType('');
      setWhenNeed('');
      setName('');
      setPhone('');
      setSubmitting(false);
      setDone(false);
    }
  }, [open]);

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const canNext1 = Boolean(cleaningType);
  const canNext2 = Boolean(rooms);
  const canNext3 = Boolean(placeType);
  const canNext4 = Boolean(whenNeed);
  const canSubmit = name.trim().length >= 2 && phone.replace(/\D/g, '').length >= 7;

  const buildServiceSummary = () => {
    const cleaningLabels: Record<string, string> = {
      general: q.q1_general,
      renovation: q.q1_renovation,
      maintenance: q.q1_maintenance,
    };
    const placeLabels: Record<string, string> = {
      home: q.q2_home,
      office: q.q2_office,
    };
    const whenLabels: Record<string, string> = {
      today: q.q3_today,
      tomorrow: q.q3_tomorrow,
      week: q.q3_week,
    };
    const roomsLabel = rooms === '3+' ? q.q2_rooms_3plus : rooms;
    return [
      `${q.summary_prefix}: ${q.summary_cleaning} — ${cleaningLabels[cleaningType] ?? cleaningType}`,
      `${q.summary_rooms}: ${roomsLabel}`,
      `${q.summary_place}: ${placeLabels[placeType] ?? placeType}`,
      `${q.summary_when}: ${whenLabels[whenNeed] ?? whenNeed}`,
    ].join(' | ');
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    const fd = new FormData();
    fd.set('name', name.trim());
    fd.set('phone', phone.trim());
    fd.set('service', buildServiceSummary());
    fd.set('locale', locale);
    fd.set('noRedirect', 'true');
    try {
      const res = await submitInquiry(fd);
      if (
        res &&
        typeof res === 'object' &&
        'success' in res &&
        res.success === false &&
        res.code === 'RATE_LIMIT'
      ) {
        toast({
          variant: 'destructive',
          title: t.ContactForm.rate_limit_toast_title,
          description: t.ContactForm.rate_limit_toast_description,
        });
        return;
      }
      if (res && typeof res === 'object' && 'success' in res && res.success === true) {
        setDone(true);
      }
    } catch {
      toast({
        variant: 'destructive',
        title: t.ContactForm.error_toast_title,
        description: t.ContactForm.error_toast_description,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[min(90vh,640px)] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="pr-8 text-left text-xl">
            {done ? q.thank_title : q.dialog_title}
          </DialogTitle>
        </DialogHeader>

        {!done && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>
                {q.step_of} {step} / {totalSteps}
              </span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
        )}

        {done ? (
          <p className="text-muted-foreground text-center text-sm leading-relaxed">
            {q.thank_body}
          </p>
        ) : (
          <div className="space-y-5 pt-1">
            {step === 1 && (
              <div className="space-y-3">
                <p className="font-semibold">{q.q1_title}</p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {(
                    [
                      ['general', q.q1_general],
                      ['renovation', q.q1_renovation],
                      ['maintenance', q.q1_maintenance],
                    ] as const
                  ).map(([v, label]) => (
                    <div key={v}>{choiceBtn(cleaningType === v, () => setCleaningType(v), label)}</div>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-3">
                <p className="font-semibold">{q.q2_rooms_title}</p>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      ['1', '1'],
                      ['2', '2'],
                      ['3+', q.q2_rooms_3plus],
                    ] as const
                  ).map(([v, label]) => (
                    <div key={v}>{choiceBtn(rooms === v, () => setRooms(v), label)}</div>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-3">
                <p className="font-semibold">{q.q2_place_title}</p>
                <div className="grid grid-cols-2 gap-2">
                  {(
                    [
                      ['home', q.q2_home],
                      ['office', q.q2_office],
                    ] as const
                  ).map(([v, label]) => (
                    <div key={v}>{choiceBtn(placeType === v, () => setPlaceType(v), label)}</div>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-3">
                <p className="font-semibold">{q.q3_title}</p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {(
                    [
                      ['today', q.q3_today],
                      ['tomorrow', q.q3_tomorrow],
                      ['week', q.q3_week],
                    ] as const
                  ).map(([v, label]) => (
                    <div key={v}>{choiceBtn(whenNeed === v, () => setWhenNeed(v), label)}</div>
                  ))}
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-4">
                <p className="font-medium leading-snug">{q.q4_title}</p>
                <div className="space-y-2">
                  <Label htmlFor="qq-name">{t.ContactForm.name_placeholder}</Label>
                  <Input
                    id="qq-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qq-phone">{t.ContactForm.phone_placeholder}</Label>
                  <Input
                    id="qq-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="tel"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
              {step > 1 ? (
                <Button type="button" variant="outline" size="sm" onClick={() => setStep((s) => s - 1)}>
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  {q.back}
                </Button>
              ) : (
                <span />
              )}

              {step < 5 ? (
                <Button
                  type="button"
                  size="sm"
                  disabled={
                    (step === 1 && !canNext1) ||
                    (step === 2 && !canNext2) ||
                    (step === 3 && !canNext3) ||
                    (step === 4 && !canNext4)
                  }
                  onClick={() => setStep((s) => Math.min(s + 1, 5))}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  {q.next}
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  size="sm"
                  disabled={!canSubmit || submitting}
                  onClick={handleSubmit}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {q.submitting}
                    </>
                  ) : (
                    q.submit
                  )}
                </Button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
