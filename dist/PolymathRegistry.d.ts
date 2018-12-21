import { TransactionObject } from 'web3/eth/types';
import { Contract } from './Contract';
import { IContext } from './PolymathAPI';
import { IGenericContract } from './types';
interface IPolymathRegistryContract extends IGenericContract {
    methods: {
        getAddress(contractName: string): TransactionObject<string>;
    };
}
export declare class PolymathRegistry extends Contract<IPolymathRegistryContract> {
    constructor({ address, context }: {
        address: string;
        context: IContext;
    });
    getAddress(contractName: string): Promise<string>;
}
export {};
