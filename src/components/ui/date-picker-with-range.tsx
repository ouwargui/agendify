'use client';

import {format, subDays} from 'date-fns';
import {Calendar as CalendarIcon} from 'lucide-react';
import {useState} from 'react';
import type {DateRange} from 'react-day-picker';

import {Button} from '@/components/ui/button';
import {Calendar, type CalendarProps} from '@/components/ui/calendar';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {cn} from '@/lib/shadcn/utils';

type Props = {
  containerProps?: React.HTMLAttributes<HTMLDivElement> | undefined;
  calendarProps?: CalendarProps | undefined;
  initialDateRange?: DateRange | undefined;
};

export function DatePickerWithRange(props: Props) {
  const [date, setDate] = useState<DateRange | undefined>(
    props.initialDateRange ?? {
      from: subDays(new Date(), 30),
      to: new Date(),
    },
  );

  return (
    <div className={cn('grid gap-2', props.containerProps?.className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'md:max-w-[300px] justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
