import Web3 from 'web3';
import { EtherDividendCheckpointAbi } from './abis/EtherDividendCheckpointAbi';
import { DividendCheckpoint } from './DividendCheckpoint';
import { toUnixTimestamp, toWei } from './utils';
import { TransactionObject } from 'web3/eth/types';
import { IContext } from './PolymathAPI';
import { IDividend, IGenericContract } from './types';

// This type should be obtained from a library (must match ABI)
interface IEtherDividendCheckpointContract extends IGenericContract {
  methods: {
    createDividendWithCheckpointAndExclusions(
      maturity: number,
      expiry: number,
      checkpointId: number,
      excluded: string[],
      name: string,
    ): TransactionObject<void>;
    createDividendWithCheckpoint(
      maturity: number,
      expiry: number,
      checkpointId: number,
      name: string,
    ): TransactionObject<void>;
  };
}

export class EtherDividendCheckpoint extends DividendCheckpoint<
  IEtherDividendCheckpointContract
  > {
  constructor({ address, context }: { address: string; context: IContext }) {
    super({ address, abi: EtherDividendCheckpointAbi.abi, context });
  }

  public async createDividend(
    maturityDate: Date,
    expiryDate: Date,
    amount: number,
    checkpointId: number,
    name: string,
    excludedAddresses?: string[],
  ) {
    const [maturity, expiry] = [maturityDate, expiryDate].map(toUnixTimestamp);
    const amountInWei = toWei(amount).valueOf();
    const nameInBytes = Web3.utils.asciiToHex(name);

    if (excludedAddresses) {
      return await this.contract.methods
        .createDividendWithCheckpointAndExclusions(
          maturity,
          expiry,
          checkpointId,
          excludedAddresses,
          nameInBytes,
        )
        .send({ value: amountInWei });
    }

    return await this.contract.methods
      .createDividendWithCheckpoint(maturity, expiry, checkpointId, nameInBytes)
      .send({ value: amountInWei });
  }

  public async getDividends() {
    const dividends = await super.getDividends();

    return dividends.map<IDividend>((dividend) => {
      const { currency, ...rest } = dividend;

      return {
        currency: 'ETH',
        ...rest,
      };
    });
  }
}
