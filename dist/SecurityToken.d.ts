import { Contract } from './Contract';
import { TransactionObject } from 'web3/eth/types';
import BigNumber from 'bignumber.js';
import { DividendModuleTypes, IGenericContract } from './types';
import { IContext } from './PolymathAPI';
import { Erc20DividendCheckpoint } from './Erc20DividendCheckpoint';
import { EtherDividendCheckpoint } from './EtherDividendCheckpoint';
export interface IInvestorBalance {
    address: string;
    balance: BigNumber;
}
export interface ICheckpoint {
    id: number;
    investorBalances: IInvestorBalance[];
    totalSupply: BigNumber;
    createdAt: Date;
}
interface ISecurityTokenContract extends IGenericContract {
    methods: {
        createCheckpoint(): TransactionObject<number>;
        getCheckpointTimes(): TransactionObject<number[]>;
        totalSupplyAt(checkpointId: number): TransactionObject<number>;
        balanceOfAt(investorAddress: string, checkpointId: number): TransactionObject<number>;
        getInvestorsAt(checkpointId: number): TransactionObject<string[]>;
        currentCheckpointId(): TransactionObject<number>;
        addModule(address: string, data: string, maxCost: BigNumber, budget: BigNumber): TransactionObject<void>;
        getModulesByName(name: string): TransactionObject<string[]>;
    };
}
export declare class SecurityToken extends Contract<ISecurityTokenContract> {
    constructor({ address, context }: {
        address: string;
        context: IContext;
    });
    createCheckpoint(): Promise<number>;
    currentCheckpointId(): Promise<number>;
    addDividendsModule(type: DividendModuleTypes): Promise<void>;
    getErc20DividendModule(): Promise<Erc20DividendCheckpoint | null>;
    getEtherDividendModule(): Promise<EtherDividendCheckpoint | null>;
    getCheckpoints(): Promise<ICheckpoint[]>;
    private getModuleAddress;
}
export {};
