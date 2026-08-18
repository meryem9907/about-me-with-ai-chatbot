import Loader from "@/components/loader";

export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-background text-foreground">
      <Loader size="md" label="Loading" />
    </div>
  );
}
