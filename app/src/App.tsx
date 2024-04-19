import { useComponentValue } from "@dojoengine/react";
import { Entity } from "@dojoengine/recs";
import { useCallback, useMemo, useState } from "react";
import "./App.css";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useDojo } from "./dojo/useDojo";
import { Button } from "./components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import Registry from "./components/Registry";
import { shortString } from "starknet";

function App() {
  const {
    setup: {
      systemCalls: { create, subscribe, unsubscribe, fight },
      clientComponents: {
        Player: PlayerModel,
        Registry: RegistryModel,
        League: LeagueModel,
        Slot: SlotModel,
      },
    },
    account: { account },
  } = useDojo();

  const [name, setName] = useState("");

  // Player
  const playerKey = useMemo(() => {
    return getEntityIdFromKeys([BigInt(0), BigInt(account.address)]) as Entity;
  }, [account]);
  const player = useComponentValue(PlayerModel, playerKey);

  // Registry
  const registryKey = getEntityIdFromKeys([BigInt(0)]) as Entity;
  const registry = useComponentValue(RegistryModel, registryKey);

  // League
  const leagueKey = useMemo(() => {
    return getEntityIdFromKeys([
      BigInt(0),
      BigInt(player?.league_id || 0),
    ]) as Entity;
  }, [player]);
  const league = useComponentValue(LeagueModel, leagueKey);

  // Slot
  const slotKey = useMemo(() => {
    return getEntityIdFromKeys([
      BigInt(0),
      BigInt(player?.league_id || 0),
      BigInt(player?.index || 0),
    ]) as Entity;
  }, [player]);
  const slot = useComponentValue(SlotModel, slotKey);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 w-full items-center">
        <h1>Matchmaker</h1>
        <div className="flex flex-col justify-center items-center gap-2 my-4">
          <p>Account: {`${account.address.slice(0, 5)}...`}</p>
          <p>
            Player:{" "}
            {player
              ? shortString.decodeShortString(player.name.toString())
              : ""}
          </p>
          <p>ELO: {player?.rating}</p>
          <p>Registry: {registry?.id}</p>
          <p>League: {league?.id}</p>
          <p>Slot: {slot?.index}</p>
        </div>
        <div className="flex gap-4">
          <Input
            className="w-56"
            disabled={!!player}
            type="pseudo"
            placeholder="Name"
            onChange={handleChange}
          />
          <Button disabled={!!player} onClick={() => create(account, name)}>
            Create
          </Button>
        </div>
        <div className="flex justify-center items-center gap-4">
          <Button
            disabled={!player || !!player.league_id}
            onClick={() => subscribe(account)}
          >
            Subscribe
          </Button>
          <Button
            disabled={!player || !player.league_id}
            onClick={() => unsubscribe(account)}
          >
            Unsubscribe
          </Button>
          <Button
            disabled={!player || !player.league_id}
            onClick={() => fight(account)}
          >
            Fight
          </Button>
        </div>
      </div>
      <Registry />
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
