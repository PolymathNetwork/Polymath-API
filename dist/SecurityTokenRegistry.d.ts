import { TransactionObject } from 'web3/eth/types';
import BigNumber from 'bignumber.js';
import { Contract } from './Contract';
import { SecurityToken } from './SecurityToken';
import { IContext } from './PolymathAPI';
import { IGenericContract } from './types';
interface ISecurityTokenRegistryContract extends IGenericContract {
    methods: {
        registerTicker(owner: string, ticker: string, tokenName: string): TransactionObject<string>;
        getTickerRegistrationFee(): TransactionObject<string>;
        getSecurityTokenAddress(ticker: string): TransactionObject<string>;
    };
}
export declare class SecurityTokenRegistry extends Contract<ISecurityTokenRegistryContract> {
    constructor({ address, context }: {
        address: string;
        context: IContext;
    });
    registerTicker(owner: string, ticker: string, tokenName: string): Promise<string>;
    getTickerRegistrationFee(): Promise<BigNumber>;
    getSecurityToken(ticker: string): Promise<SecurityToken>;
}
export {};
