import { cn } from "@/lib/utils";

type DetailCardProps = {
  children: React.ReactNode;
  className?: string;
};

type DetailCardBodyProps = {
  children: React.ReactNode;
  className?: string;
};

type DetailCardTitleProps = {
  children: React.ReactNode;
  className?: string;
};

type DetailCardContentProps = {
  children: React.ReactNode;
  className?: string;
};

type DetailCardImageProps = {
  src?: string;
  className?: string;
};

export const DetailCard = ({ children, className }: DetailCardProps) => (
  <div
    className={cn(
      "bg-background border max-h-full overflow-y-auto w-full rounded-xl p-6 flex flex-col gap-6 shadow-xl relative",
      className
    )}
  >
    {children}
  </div>
);

const DetailCardBody = ({ children, className }: DetailCardBodyProps) => (
  <div className={cn("flex flex-col gap-1", className)}>{children}</div>
);

const DetailCardTitle = ({ children, className }: DetailCardTitleProps) => (
  <p className={cn("font-bold", className)}>{children}</p>
);

const DetailCardContent = ({ children, className }: DetailCardContentProps) => (
  <p className={cn("text-sm", className)}>{children}</p>
);

const DetailCardImage = ({ src, className }: DetailCardImageProps) => (
  <>
    {src ? (
      <img
        className={cn("w-full object-cover rounded-xl", className)}
        src={src}
      />
    ) : null}
  </>
);

DetailCard.Body = DetailCardBody;
DetailCard.Title = DetailCardTitle;
DetailCard.Content = DetailCardContent;
DetailCard.Image = DetailCardImage;
