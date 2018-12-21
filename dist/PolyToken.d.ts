import BigNumber from 'bignumber.js';
import { TransactionObject } from 'web3/eth/types';
import { Contract } from './Contract';
import { IContext } from './PolymathAPI';
import { IGenericContract } from './types';
interface IPolyTokenContract extends IGenericContract {
    methods: {
        getTokens: (amount: BigNumber, recipient: string) => TransactionObject<boolean>;
        balanceOf: (address: string) => TransactionObject<string>;
        allowance: (tokenOwner: string, spender: string) => TransactionObject<string>;
        approve: (spender: string, amount: BigNumber) => TransactionObject<boolean>;
    };
}
export declare class PolyToken extends Contract<IPolyTokenContract> {
    private isTestnet;
    constructor({ address, context }: {
        address: string;
        context: IContext;
    });
    getTokens(amount: BigNumber, recipient: string): Promise<boolean>;
    balanceOf(address: string): Promise<string>;
    allowance(tokenOwner: string, spender: string): Promise<string>;
    approve(spender: string, amount: BigNumber): Promise<boolean>;
}
export {};
