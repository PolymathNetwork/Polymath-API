import { constants } from './shared';
import { HttpProvider } from 'web3/providers';
import { PolyToken } from './PolyToken';
import { PolymathRegistry } from './PolymathRegistry';
import { SecurityTokenRegistry } from './SecurityTokenRegistry';
import { ModuleRegistry } from './ModuleRegistry';
interface IParams {
    provider?: string | HttpProvider;
    privateKey?: string;
}
export interface IContext extends PolymathAPI {
    polymathRegistry: PolymathRegistry;
    polyToken: PolyToken;
    securityTokenRegistry: SecurityTokenRegistry;
    moduleRegistry: ModuleRegistry;
    isTestnet: () => boolean;
}
export declare class PolymathAPI {
    polymathRegistry?: PolymathRegistry;
    polyToken?: PolyToken;
    securityTokenRegistry?: SecurityTokenRegistry;
    moduleRegistry?: ModuleRegistry;
    private networkId;
    constructor(params?: IParams);
    isTestnet(): boolean;
    getAccount(): Promise<string | undefined>;
    initialize({ polymathRegistryAddress, }: {
        polymathRegistryAddress: string;
    }): Promise<void>;
    getNetworkId(): constants.NetworkIds;
    private getBrowserProvider;
}
export {};
