import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

export function NextAppointmentCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Next appointments</CardTitle>
        <CardDescription>
          You have 5 appointments remaining today
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3 items-center">
          <Avatar>
            <AvatarImage src="https://github.com/ouwargui.png" />
            <AvatarFallback>GD</AvatarFallback>
          </Avatar>
          <div className="flex-1 flex flex-col">
            <p className="">Guilherme D&apos;Alessandro</p>
            <span className="text-sm text-muted-foreground">Dentist</span>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <small className="text-sm font-medium leading-none">
                  In 30 min
                </small>
              </TooltipTrigger>
              <TooltipContent side="top" sideOffset={10} asChild>
                <span>14:30</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
}
