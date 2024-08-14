import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';

type Props = {
  value: number;
  title: string;
  backgroundColor: string;
  modal?: () => JSX.Element;
};

const FinanceOverviewCard = ({
  value,
  title,
  backgroundColor,
  modal,
}: Props) => {
  return (
    <Card className={backgroundColor}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          {modal ? modal() : null}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="-mt-4 flex items-center gap-1 text-2xl font-bold text-neutral-900">
          <span className="text-lg">EGP</span> {value}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default FinanceOverviewCard;
