import { AccountInterface } from "starknet";
import { ClientComponents } from "./createClientComponents";
import { ContractComponents } from "./generated/contractModels";
import type { IWorld } from "./generated/contractSystems";
import { shortString } from "starknet";
import { toast } from "sonner";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
  { client }: { client: IWorld },
  contractComponents: ContractComponents,
  { Player, Registry, League, Slot }: ClientComponents,
) {
  const extractedMessage = (message: string) => {
    return message.match(/\('([^']+)'\)/)?.[1];
  };

  const notify = (message: string, transaction: any) => {
    if (transaction.execution_status != "REVERTED") {
      toast.success(message);
    } else {
      toast.error(extractedMessage(transaction.revert_reason));
    }
  };

  const create = async (account: AccountInterface, playerName: string) => {
    try {
      const encoded = shortString.encodeShortString(playerName);
      const { transaction_hash } = await client.maker.create({
        account,
        playerName: encoded,
      });

      notify(
        "Player has been created.",
        await account.waitForTransaction(transaction_hash, {
          retryInterval: 100,
        }),
      );
    } catch (e) {
      console.log(e);
    }
  };

  const subscribe = async (account: AccountInterface) => {
    try {
      const { transaction_hash } = await client.maker.subscribe({
        account,
      });

      notify(
        "Player has subscribed to the registry.",
        await account.waitForTransaction(transaction_hash, {
          retryInterval: 100,
        }),
      );
    } catch (e) {
      console.log(e);
    }
  };

  const unsubscribe = async (account: AccountInterface) => {
    try {
      const { transaction_hash } = await client.maker.unsubscribe({
        account,
      });

      notify(
        "Player has unsubscribed to the registry.",
        await account.waitForTransaction(transaction_hash, {
          retryInterval: 100,
        }),
      );
    } catch (e) {
      console.log(e);
    }
  };

  const fight = async (account: AccountInterface) => {
    try {
      const { transaction_hash } = await client.maker.fight({
        account,
      });

      notify(
        "Player has fought.",
        await account.waitForTransaction(transaction_hash, {
          retryInterval: 100,
        }),
      );
    } catch (e) {
      console.log(e);
    }
  };

  return {
    create,
    subscribe,
    unsubscribe,
    fight,
  };
}
