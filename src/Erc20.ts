import { TransactionObject } from 'web3/eth/types';
import { Contract } from './Contract';
import { IContext } from './PolymathAPI';
import { ERC20Abi } from './abis/ERC20Abi';
import { IGenericContract } from './types';

interface IErc20Contract extends IGenericContract {
  methods: {
    symbol(): TransactionObject<string>;
  };
}

export class Erc20 extends Contract<IErc20Contract> {
  constructor({ address, context }: { address: string; context: IContext }) {
    super({ address, abi: ERC20Abi.abi, context });
  }

  public async symbol() {
    let symbol = null;
    try {
      symbol = await this.contract.methods.symbol().call();
    } catch (err) {
      // do nothing
    }

    return symbol;
  }
}
