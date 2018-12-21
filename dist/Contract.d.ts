import { IContext } from './PolymathAPI';
import { IGenericContract } from './types';
/**
 * Represents a smart contract, addresses should be retrieved before
 * instantiating a class.
 */
export declare abstract class Contract<T extends IGenericContract> {
    address: string;
    protected contract: T;
    protected context: IContext;
    constructor({ address, abi, context, }: {
        address: string;
        abi: any[];
        context: IContext;
    });
}
