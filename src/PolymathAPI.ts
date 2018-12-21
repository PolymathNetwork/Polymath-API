import Web3 from 'web3';
import Accounts from 'web3/eth/accounts';
import { web3 } from './web3Client';
import { constants } from './shared';
import { HttpProvider } from 'web3/providers';
import { PolyToken } from './PolyToken';
import { PolymathRegistry } from './PolymathRegistry';
import { SecurityTokenRegistry } from './SecurityTokenRegistry';
import { ModuleRegistry } from './ModuleRegistry';

interface IEthereumProvider extends HttpProvider {
  enable(): Promise<void>;
}

interface IParams {
  provider?: string | HttpProvider;
  privateKey?: string;
}

type Wallet = Accounts['wallet'];

interface IWeb3Wallet
  extends Wallet,
  Array<{
    address?: string;
  }> { }

export interface IContext extends PolymathAPI {
  polymathRegistry: PolymathRegistry;
  polyToken: PolyToken;
  securityTokenRegistry: SecurityTokenRegistry;
  moduleRegistry: ModuleRegistry;
  isTestnet: () => boolean;
}

export class PolymathAPI {
  public polymathRegistry?: PolymathRegistry;
  public polyToken?: PolyToken;
  public securityTokenRegistry?: SecurityTokenRegistry;
  public moduleRegistry?: ModuleRegistry;
  private networkId: constants.NetworkIds = -1;

  constructor(params: IParams = {}) {
    const { provider, privateKey } = params;
    let auxProvider: HttpProvider | null;
    if (!provider) {
      auxProvider = this.getBrowserProvider();
    } else if (typeof provider === 'string') {
      auxProvider = new Web3.providers.HttpProvider(provider);
    } else {
      auxProvider = provider;
    }

    if (auxProvider === null) {
      throw new Error(
        `No provider or provider URL was passed to the constructor and there is \
        no provider injected into the browser. If this instance is running in \
        a browser, make sure you have MetaMask installed and enabled.`,
      );
    }

    web3.setProvider(auxProvider);

    if (privateKey) {
      web3.eth.accounts.wallet.add(privateKey);
    }
  }

  public isTestnet() {
    return this.networkId !== 1;
  }

  public async getAccount() {
    const nodeAccounts = await web3.eth.getAccounts();
    const walletAccount = (web3.eth.accounts.wallet as IWeb3Wallet)[0] || {};

    return nodeAccounts[0] || walletAccount.address;
  }

  public async initialize({
    polymathRegistryAddress,
  }: {
      polymathRegistryAddress: string;
    }) {
    const context = this as IContext;

    this.polymathRegistry = new PolymathRegistry({
      address: polymathRegistryAddress,
      context,
    });

    // TODO @RafaelVidaurre: Paralelize or initialize lazily

    const polyTokenAddress = await this.polymathRegistry.getAddress(
      'PolyToken',
    );
    const securityTokenRegistryAddress = await this.polymathRegistry.getAddress(
      'SecurityTokenRegistry',
    );
    const moduleRegistryAddress = await this.polymathRegistry.getAddress(
      'ModuleRegistry',
    );

    this.polyToken = new PolyToken({
      address: polyTokenAddress,
      context,
    });

    this.securityTokenRegistry = new SecurityTokenRegistry({
      address: securityTokenRegistryAddress,
      context,
    });

    this.moduleRegistry = new ModuleRegistry({
      address: moduleRegistryAddress,
      context,
    });
  }

  public getNetworkId() {
    return this.networkId;
  }

  private getBrowserProvider() {
    if (!window) {
      return null;
    }

    const win = window as {
      web3?: Web3;
      ethereum?: IEthereumProvider;
    };

    const { ethereum, web3: w3 } = win;
    const isModern = !!ethereum;
    const isLegacy = !isModern && !!w3;

    if (isModern) {
      const web3Provider = ethereum as IEthereumProvider;
      return web3Provider;
    }
    if (isLegacy) {
      const web3Instance = w3 as Web3;
      return web3Instance.currentProvider as HttpProvider;
    }

    return null;
  }
}
