import { IContext } from './PolymathAPI';
import { IGenericContract } from './types';
import { web3 } from './web3Client';

/**
 * Represents a smart contract, addresses should be retrieved before
 * instantiating a class.
 */
export abstract class Contract<T extends IGenericContract> {
  public address: string;
  protected contract: T;
  protected context: IContext;

  constructor({
    address,
    abi,
    context,
  }: {
      address: string;
      abi: any[];
      context: IContext;
    }) {
    this.address = address;
    this.context = context;
    this.contract = (new web3.eth.Contract(abi, address) as unknown) as T;
  }
}
