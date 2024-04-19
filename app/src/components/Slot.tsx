import * as React from "react";
import { useMemo } from "react";

import { Badge } from "@/components/ui/badge";
import { Entity } from "@dojoengine/recs";
import { useComponentValue } from "@dojoengine/react";
import { useDojo } from "@/dojo/useDojo";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { shortString } from "starknet";

interface SlotProps {
  entity: Entity;
  title: string;
  rating: number;
  size: number;
}

const Slot = React.memo((props: SlotProps) => {
  const { entity, title, rating, size } = props;
  const {
    setup: {
      clientComponents: { Player: PlayerModel, Slot: SlotModel },
    },
  } = useDojo();

  const slot = useComponentValue(SlotModel, entity);

  const playerKey = useMemo(() => {
    return getEntityIdFromKeys([
      BigInt(0),
      BigInt(slot?.player_id || 0),
    ]) as Entity;
  }, [slot]);

  const player = useComponentValue(PlayerModel, playerKey);

  const disabled = useMemo(() => {
    return slot ? slot.index >= size : true;
  }, [slot, size]);

  if (disabled) return null;

  return (
    <div className="flex justify-between w-full">
      <p>
        {player ? shortString.decodeShortString(player.name.toString()) : "?"}
      </p>
      <Badge>{player ? player.rating : "?"}</Badge>
    </div>
  );
});

export default Slot;
