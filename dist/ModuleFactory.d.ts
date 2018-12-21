import { Contract } from './Contract';
import { IContext } from './PolymathAPI';
import { TransactionObject } from 'web3/eth/types';
import { IGenericContract } from './types';
interface IModuleFactoryContract extends IGenericContract {
    methods: {
        name(): TransactionObject<string>;
    };
}
export declare class ModuleFactory extends Contract<IModuleFactoryContract> {
    constructor({ address, context }: {
        address: string;
        context: IContext;
    });
    name(): Promise<string>;
}
export {};
