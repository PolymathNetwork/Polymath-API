import { TransactionObject } from 'web3/eth/types';
import { PolymathRegistryAbi } from './abis/PolymathRegistryAbi';
import { Contract } from './Contract';
import { IContext } from './PolymathAPI';
import { IGenericContract } from './types';

interface IPolymathRegistryContract extends IGenericContract {
  methods: {
    getAddress(contractName: string): TransactionObject<string>;
  };
}

export class PolymathRegistry extends Contract<IPolymathRegistryContract> {
  constructor({ address, context }: { address: string; context: IContext }) {
    super({ address, abi: PolymathRegistryAbi.abi, context });
  }
  public async getAddress(contractName: string): Promise<string> {
    return this.contract.methods.getAddress(contractName).call();
  }
}
