import { AccountInterface } from "starknet";
import { ClientComponents } from "./createClientComponents";
import { ContractComponents } from "./generated/contractModels";
import type { IWorld } from "./generated/contractSystems";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
  { client }: { client: IWorld },
  contractComponents: ContractComponents,
  { Player, Registry, League, Slot }: ClientComponents,
) {
  const create = async (account: AccountInterface) => {
    try {
      const { transaction_hash } = await client.maker.create({
        account,
      });

      console.log(
        await account.waitForTransaction(transaction_hash, {
          retryInterval: 100,
        }),
      );
    } catch (e) {
      console.log(e);
    };
  };

  const subscribe = async (account: AccountInterface) => {
    try {
      const { transaction_hash } = await client.maker.subscribe({
        account,
      });
    } catch (e) {
      console.log(e);
    };
  };

  const unsubscribe = async (account: AccountInterface) => {
    try {
      const { transaction_hash } = await client.maker.unsubscribe({
        account,
      });
    } catch (e) {
      console.log(e);
    };
  }

  const fight = async (account: AccountInterface) => {
    try {
      const { transaction_hash } = await client.maker.fight({
        account,
      });
    } catch (e) {
      console.log(e);
    };
  }

  return {
    create,
    subscribe,
    unsubscribe,
    fight,
  };
}
