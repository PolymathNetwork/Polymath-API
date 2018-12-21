import { ModuleFactoryAbi } from './abis/ModuleFactoryAbi';
import { Contract } from './Contract';
import { IContext } from './PolymathAPI';
import { TransactionObject } from 'web3/eth/types';
import { IGenericContract } from './types';

// This type should be obtained from a library (must match ABI)
interface IModuleFactoryContract extends IGenericContract {
  methods: {
    name(): TransactionObject<string>;
  };
}

export class ModuleFactory extends Contract<IModuleFactoryContract> {
  constructor({ address, context }: { address: string; context: IContext }) {
    super({ address, abi: ModuleFactoryAbi.abi, context });
  }

  public async name() {
    return this.contract.methods.name().call();
  }
}
