import type { ContractStatus, Transaction } from "./response";

export class EtherscanService {
  protected apiBaseUrl = "https://api.etherscan.io/api";
  protected apiKey = process.env.ETHERSCAN_KEY;

  protected methods = {
    GET: "GET",
  };

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

  async fetchBalance({ address }: { address: string }): Promise<bigint> {
    let url = `${this.apiBaseUrl}?module=account&action=balance&address=${address}&tag=latest&apikey=${this.apiKey}`;
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
