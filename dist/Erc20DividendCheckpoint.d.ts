import BigNumber from 'bignumber.js';
import { TransactionObject } from 'web3/eth/types';
import { DividendCheckpoint } from './DividendCheckpoint';
import { IContext } from './PolymathAPI';
import { IDividend, IGenericContract } from './types';
interface IErc20DividendCheckpointContract extends IGenericContract {
    methods: {
        createDividendWithCheckpointAndExclusions(maturity: number, expiry: number, tokenAddress: string, amount: BigNumber, checkpointId: number, excluded: string[], name: string): TransactionObject<void>;
        createDividendWithCheckpoint(maturity: number, expiry: number, tokenAddress: string, amount: BigNumber, checkpointId: number, name: string): TransactionObject<void>;
    };
}
export declare class Erc20DividendCheckpoint extends DividendCheckpoint<IErc20DividendCheckpointContract> {
    constructor({ address, context }: {
        address: string;
        context: IContext;
    });
    createDividend(maturityDate: Date, expiryDate: Date, tokenAddress: string, amount: number, checkpointId: number, name: string, excludedAddresses?: string[]): import("web3/promiEvent").default<void>;
    getDividends(): Promise<IDividend[]>;
}
export {};
