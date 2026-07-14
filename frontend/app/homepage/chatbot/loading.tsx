import { AnimatedPxlKitIcon } from "@pxlkit/core";
import { LoadingCircle } from "@pxlkit/feedback";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center pb-50">
      <div className="p-10 w-fit">
        <div className="p-5">
          {/* <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500">

            </div> */}
          Loading... <AnimatedPxlKitIcon icon={LoadingCircle} size={32} />
        </div>
      </div>
    </div>
  );
}
