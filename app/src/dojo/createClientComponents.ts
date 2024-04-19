import { overridableComponent } from "@dojoengine/recs";
import { ContractComponents } from "./generated/contractModels";

export type ClientComponents = ReturnType<typeof createClientComponents>;

export function createClientComponents({
  contractComponents,
}: {
  contractComponents: ContractComponents;
}) {
  return {
    ...contractComponents,
    // Player: overridableComponent(contractComponents.Player),
    // Registry: overridableComponent(contractComponents.Registry),
    // League: overridableComponent(contractComponents.League),
    // Slot: overridableComponent(contractComponents.Slot),
  };
}
