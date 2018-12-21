import { DividendCheckpoint } from './DividendCheckpoint';
import { TransactionObject } from 'web3/eth/types';
import { IContext } from './PolymathAPI';
import { IDividend, IGenericContract } from './types';
interface IEtherDividendCheckpointContract extends IGenericContract {
    methods: {
        createDividendWithCheckpointAndExclusions(maturity: number, expiry: number, checkpointId: number, excluded: string[], name: string): TransactionObject<void>;
        createDividendWithCheckpoint(maturity: number, expiry: number, checkpointId: number, name: string): TransactionObject<void>;
    };
}
export declare class EtherDividendCheckpoint extends DividendCheckpoint<IEtherDividendCheckpointContract> {
    constructor({ address, context }: {
        address: string;
        context: IContext;
    });
    createDividend(maturityDate: Date, expiryDate: Date, amount: number, checkpointId: number, name: string, excludedAddresses?: string[]): Promise<void>;
    getDividends(): Promise<IDividend[]>;
}
export {};
