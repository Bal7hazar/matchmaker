/* Autogenerated file. Do not edit manually. */

import { defineComponent, Type as RecsType, World } from "@dojoengine/recs";

export type ContractComponents = Awaited<
  ReturnType<typeof defineContractComponents>
>;

export function defineContractComponents(world: World) {
  return {
    League: (() => {
      return defineComponent(
        world,
        {
          registry_id: RecsType.Number,
          id: RecsType.Number,
          size: RecsType.Number,
        },
        {
          metadata: {
            name: "League",
            types: ["u32", "u8", "u32"],
            customTypes: [],
          },
        },
      );
    })(),
    Player: (() => {
      return defineComponent(
        world,
        {
          registry_id: RecsType.Number,
          id: RecsType.BigInt,
          name: RecsType.BigInt,
          league_id: RecsType.Number,
          index: RecsType.Number,
          rating: RecsType.Number,
        },
        {
          metadata: {
            name: "Player",
            types: ["u32", "contractaddress", "felt252", "u8", "u32", "u32"],
            customTypes: [],
          },
        },
      );
    })(),
    Registry: (() => {
      return defineComponent(
        world,
        { id: RecsType.Number, leagues: RecsType.BigInt },
        {
          metadata: {
            name: "Registry",
            types: ["u32", "felt252"],
            customTypes: [],
          },
        },
      );
    })(),
    Slot: (() => {
      return defineComponent(
        world,
        {
          registry_id: RecsType.Number,
          league_id: RecsType.Number,
          index: RecsType.Number,
          player_id: RecsType.BigInt,
        },
        {
          metadata: {
            name: "Slot",
            types: ["u32", "u8", "u32", "contractaddress"],
            customTypes: [],
          },
        },
      );
    })(),
  };
}
