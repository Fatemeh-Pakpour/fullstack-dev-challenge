import React, { memo, type FC } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import type { UnitType } from "@prisma/client";
import { Button } from "./ui/button";

interface CustomPopoverProps {
    unitTypes: UnitType[]
}

const CustomPopover: FC<CustomPopoverProps> = memo(({ unitTypes }) => {
    if (!unitTypes?.length) {
        return <div>-</div>
    }

    return (
        <Popover>
            <PopoverTrigger asChild >
                <Button variant="outline">{unitTypes.length}</Button>
            </PopoverTrigger>
            <PopoverContent className="w-60 bg-white text-slate-600 text-sm">
                <div className="space-y-2">
                    <h4 className="font-semibold leading-none">Unit-types</h4>
                    <p className="text-sm text-muted-foreground pb-2">
                        See all the unit-types.
                    </p>
                </div>
                <div>
                    <div className="grid grid-cols-2 font-medium">
                        <p>Name</p>
                        <p className="justify-self-center" >Length</p>
                        <hr className="w-48 my-2 bg-slate-400" />
                    </div>
                    {unitTypes.map((unitType, index) =>
                        <div key={index} className="grid grid-cols-2 text-xs" >
                            <p>{unitType?.name}</p>
                            <p className="justify-self-center">{unitType?.defaultLength}</p>
                        </div>
                    )}


                </div>
            </PopoverContent>
        </Popover >
    )

});

CustomPopover.displayName = "CustomPopover"
export { CustomPopover }


