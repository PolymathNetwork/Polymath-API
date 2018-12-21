import BigNumber from 'bignumber.js';
import { Module } from './Module';
import { IContext } from './PolymathAPI';
import { TransactionObject } from 'web3/eth/types';
import { IGenericContract, IDividend } from './types';
interface InternalDividend {
    checkpointId: number;
    created: number;
    maturity: number;
    expiry: number;
    amount: number;
    claimedAmount: number;
    totalSupply: number;
    reclaimed: boolean;
    dividendWithheld: number;
    dividendWithheldReclaimed: number;
    name: string;
}
interface IDividendCheckpointContract<T extends IGenericContract> {
    methods: {
        getDividendIndex(checkpointId: number): TransactionObject<number[]>;
        dividends(index: number): TransactionObject<InternalDividend>;
        setWithholding(investors: string[], percentages: BigNumber[]): TransactionObject<void>;
        reclaimDividend(dividendIndex: number): TransactionObject<void>;
        withdrawWithholding(dividendIndex: number): TransactionObject<void>;
    } & T['methods'];
    getPastEvents: T['getPastEvents'];
}
export declare class DividendCheckpoint<T extends IGenericContract = IGenericContract> extends Module<IDividendCheckpointContract<T>> {
    constructor({ address, abi, context, }: {
        address: string;
        abi: any[];
        context: IContext;
    });
    getDividends(): Promise<IDividend[]>;
    setWithholding(investors: string[], percentages: number[]): import("web3/promiEvent").default<void>;
    reclaimDividend(dividendIndex: number): Promise<void>;
    withdrawWithholding(dividendIndex: number): Promise<void>;
}
export {};
