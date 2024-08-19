import { Network } from "../types";
import type { ContractStatus, Transaction } from "./response";

const etherscanApiUrl = "https://api.etherscan.io/api";
const polygonscanApiUrl = "https://api.polygonscan.com/api";

export class ScanService {
  protected apiBaseUrl;
  protected apiKey;

  protected methods = {
    GET: "GET",
  };
  constructor(network: Network) {
    if (network === Network.Ethereum) {
      this.apiKey = process.env.ETHERSCAN_KEY;
      this.apiBaseUrl = etherscanApiUrl;
    } else if (network === Network.Polygon) {
      this.apiKey = process.env.POLYGONSCAN_KEY;
      this.apiBaseUrl = polygonscanApiUrl;
    } else {
      throw Error(
        `Network must be one of accpeted networks: ${JSON.stringify(
          Object.keys(Network)
        )}`
      );
    }
  }

  protected async request(url: string, options: RequestInit): Promise<any> {
    const response = await fetch(url, options);
    const data = await response.json();
    if (data.message === "NOTOK") {
      throw new Error(
        `Request failed with status ${data.status} (${data.message}) at ${url}`
      );
    }
    return data.result;
  }

  async fetchTransactions({
    address,
    page = 1,
  }: {
    address: string;
    page?: number;
  }): Promise<Transaction[]> {
    let url = `${this.apiBaseUrl}?module=account&action=txlist&address=${address}&page=${page}&offset=10&sort=desc&apikey=${this.apiKey}`;
    return await this.request(url, {
      method: this.methods.GET,
    });
  }

  async fetchContractStatus({
    hash,
  }: {
    hash: string;
  }): Promise<ContractStatus> {
    let url = `${this.apiBaseUrl}?module=transaction&action=getstatus&txhash=${hash}&apikey=${this.apiKey}`;
    return await this.request(url, {
      method: this.methods.GET,
    });
  }
}
