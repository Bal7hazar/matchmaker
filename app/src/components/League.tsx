import * as React from "react";
import { useMemo } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Slot from "./Slot";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { Entity, Has, HasValue } from "@dojoengine/recs";
import { useComponentValue, useEntityQuery } from "@dojoengine/react";
import { useDojo } from "@/dojo/useDojo";

interface LeagueProps {
  index: number;
  title: string;
  image: string;
}

const League = React.memo((props: LeagueProps) => {
  const { index, title, image } = props;
  const {
    setup: {
      clientComponents: { League: LeagueModel, Slot: SlotModel },
    },
  } = useDojo();

  const leagueKey = useMemo(() => {
    return getEntityIdFromKeys([BigInt(0), BigInt(index + 1)]) as Entity;
  }, [index]);
  const league = useComponentValue(LeagueModel, leagueKey);

  const slotKeys = useEntityQuery([
    Has(SlotModel),
    HasValue(SlotModel, { league_id: index + 1 }),
  ]);

  const leagueSize = useMemo(() => {
    return league ? league.size : 0;
  }, [league]);

  return (
    <Card>
      <CardHeader className="m-2 w-40 h-16 relative overflow-hidden rounded">
        <div
          className="absolute inset-0 bg-cover bg-center flex justify-center items-center"
          style={{
            backgroundImage: `url('${image}')`,
            transform: "scale(1.1)",
          }}
        ></div>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-between p-4">
        {slotKeys.map((entity, index) => (
          <div key={index} className="py-1 w-full">
            <Slot
              entity={entity}
              title={`0x${index}`}
              rating={0}
              size={leagueSize}
            />
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
});

export default League;
