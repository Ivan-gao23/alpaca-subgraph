import { Address, DataSourceTemplate } from "@graphprotocol/graph-ts";

export class Vault extends DataSourceTemplate {
  static create(address: Address): void {
    DataSourceTemplate.create("Pair", [address.toHex()]);
  }
}