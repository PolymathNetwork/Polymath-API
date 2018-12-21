import { Contract } from './Contract';
import { IContext } from './PolymathAPI';
import { TransactionObject } from 'web3/eth/types';
import { ModuleTypes, IGenericContract } from './types';
interface IModuleRegistryContract extends IGenericContract {
    methods: {
        getModulesByTypeAndToken(moduleType: number, tokenAddress: string): TransactionObject<string[]>;
    };
}
export declare class ModuleRegistry extends Contract<IModuleRegistryContract> {
    constructor({ address, context }: {
        address: string;
        context: IContext;
    });
    getModulesByTypeAndToken(moduleType: ModuleTypes, tokenAddress: string): Promise<string[]>;
    /**
     * Retrieve a compatible module's factory address for a given
     * security token
     *
     * @throws an error if there is no compatible module with that name
     */
    getModuleFactoryAddress(moduleName: string, moduleType: ModuleTypes, tokenAddress: string): Promise<string>;
}
export {};
