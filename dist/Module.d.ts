import { Contract } from './Contract';
import { IContext } from './PolymathAPI';
import { TransactionObject } from 'web3/eth/types';
import { IGenericContract } from './types';
interface IModuleContract<T extends IGenericContract> {
    methods: {
        securityToken(): TransactionObject<string>;
    } & T['methods'];
    getPastEvents: T['getPastEvents'];
}
export declare class Module<T extends IGenericContract> extends Contract<IModuleContract<T>> {
    protected tokenAddress: string | null;
    constructor({ address, abi, context, }: {
        address: string;
        abi: any[];
        context: IContext;
    });
    securityTokenAddress(): Promise<string>;
}
export {};
