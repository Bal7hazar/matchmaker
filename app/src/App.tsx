import { useComponentValue } from "@dojoengine/react";
import { Entity, Has, HasValue, QueryFragment } from "@dojoengine/recs";
import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useDojo } from "./dojo/useDojo";
import { useEntityQuery } from "@latticexyz/react";

function App() {
  const {
    setup: {
      systemCalls: { create, subscribe, unsubscribe, fight },
      clientComponents: { Player, Registry, League, Slot },
    },
    account: { account },
  } = useDojo();

  // Player
  const playerKey = useMemo(() => {
    return getEntityIdFromKeys([
      BigInt(0),
      BigInt(account.address),
    ]) as Entity;
  }, [account]);
  const player = useComponentValue(Player, playerKey);
  
  // Registry
  const registryKey = getEntityIdFromKeys([
    BigInt(0),
  ]) as Entity;
  const registry = useComponentValue(Registry, registryKey);

  // League
  const leagueKey = useMemo(() => {
    return getEntityIdFromKeys([
      BigInt(0),
      BigInt(player?.league_id || 0),
    ]) as Entity;
  }, [player]);
  const league = useComponentValue(League, leagueKey);

  // Slot
  const slotKey = useMemo(() => {
    return getEntityIdFromKeys([
      BigInt(0),
      BigInt(player?.league_id || 0),
      BigInt(player?.index || 0),
    ]) as Entity;
  }, [player]);
  const slot = useComponentValue(Slot, slotKey);
  
  return <div>
    <h1>Matchmaker</h1>
    <div className="flex  flex-col justify-center items-center gap-2 my-4">
      <p>Account: {account.address}</p>
      <p>Player: {`0x${player?.id.toString(16)}`}</p>
      <p>ELO: {player?.rating}</p>
      <p>Registry: {registry?.id}</p>
      <p>League: {league?.id}</p>
      <p>Slot: {slot?.index}</p>
    </div>
    <div className="flex justify-center items-center gap-4">
      <button onClick={() => create(account)}>Create</button>
      <button onClick={() => subscribe(account)}>Subscribe</button>
      <button onClick={() => unsubscribe(account)}>Unsubscribe</button>
      <button onClick={() => fight(account)}>Fight</button>
    </div>
  </div>
}

export default App;
