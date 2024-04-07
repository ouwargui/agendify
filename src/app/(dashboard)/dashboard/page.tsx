import {NextAppointmentCard} from '@/components/next-appointments-card';
import {} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import {} from '@/components/ui/card';
import {DatePickerWithRange} from '@/components/ui/date-picker-with-range';
import {DownloadIcon} from 'lucide-react';

export default async function Dashboard() {
  const shouldShowDownload = false;

  return (
    <main className="flex-1 flex flex-col px-4 sm:px-6 gap-4">
      <section className="flex flex-col gap-3 py-4 md:py-0 md:flex-row justify-between md:items-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Dashboard
        </h1>
        {shouldShowDownload && <DownloadButton />}
      </section>
      <section className="flex-1 grid gap-2">
        <NextAppointmentCard />
      </section>
    </main>
  );
}

function DownloadButton() {
  return (
    <div className="flex flex-col items-center xs:flex-row gap-3">
      <DatePickerWithRange
        containerProps={{className: 'w-full max-w-[300px]'}}
      />
      <Button
        variant="neutral"
        size="icon"
        className="hidden xs:flex items-center justify-center sm:hidden"
      >
        <DownloadIcon />
        <span className="sr-only">Download report</span>
      </Button>
      <Button
        variant="neutral"
        size="default"
        className="flex w-full max-w-[300px] xs:hidden sm:max-w-none sm:flex gap-2"
      >
        <DownloadIcon />
        Download
      </Button>
    </div>
  );
}
