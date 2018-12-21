import { TransactionObject } from 'web3/eth/types';
import { Contract } from './Contract';
import { IContext } from './PolymathAPI';
import { IGenericContract } from './types';
interface IErc20Contract extends IGenericContract {
    methods: {
        symbol(): TransactionObject<string>;
    };
}
export declare class Erc20 extends Contract<IErc20Contract> {
    constructor({ address, context }: {
        address: string;
        context: IContext;
    });
    symbol(): Promise<string | null>;
}
export {};
