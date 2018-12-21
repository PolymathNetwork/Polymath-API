import { Contract } from './Contract';
import { IContext } from './PolymathAPI';
import { TransactionObject } from 'web3/eth/types';
import { IGenericContract } from './types';

// This type should be obtained from a library (must match ABI)
interface IModuleContract<T extends IGenericContract> {
  methods: {
    securityToken(): TransactionObject<string>;
  } & T['methods'];
  getPastEvents: T['getPastEvents'];
}

export class Module<T extends IGenericContract> extends Contract<
  IModuleContract<T>
  > {
  protected tokenAddress: string | null = null;

  constructor({
    address,
    abi,
    context,
  }: {
      address: string;
      abi: any[];
      context: IContext;
    }) {
    super({ address, abi, context });
  }

  public async securityTokenAddress() {
    if (!this.tokenAddress) {
      this.tokenAddress = await this.contract.methods.securityToken().call();
    }

    return this.tokenAddress;
  }
}
