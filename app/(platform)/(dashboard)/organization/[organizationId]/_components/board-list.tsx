import { FormPopover } from "@/components/form/form-popover";
import { Hint } from "@/components/ui/info-tool";
import { HelpCircle, User2 } from "lucide-react";

export const BoardList = () => {
    return (
      <div className="space-y-4">
        <div className="flex items-center font-semibold text-lg text-neutral-700">
          <User2 className="h-6 w-6 mr-2" />
          Boards
        </div>
        <div className="grid grid-cols-2 sm:gird-cols-3 lg:grid-cols-4 gap-4">
          <FormPopover
            sideOffset={10}
            side="right"
          >
            <div
              role="button"
              className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
            >
              <p className="text-sm">Create new board</p>
              <span className="text-xs">잔여 5</span>
              <Hint
                sideOffset={40}
                description={`무료 작업공간은 5개까지 제공됩니다.`}
                side="bottom"
              >
                <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
              </Hint>
            </div>
          </FormPopover>
        </div>
      </div>
    );
};