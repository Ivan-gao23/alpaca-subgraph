import { BigDecimal, BigInt, Value ,log } from "@graphprotocol/graph-ts"
import {
  AddVault,
} from "../generated/VaultFactory/VaultFactory"
import {Token, Vault} from "../generated/schema"
import {Vault as VaultTemplate, VaultConfig} from "../generated/templates"
import {Vault as VaultBind} from "../generated/templates/Vault/Vault"
export function handleAddVault(event: AddVault): void {

  let vault = new Vault(event.params.vault.toHexString()) as Vault
  vault.borrowed = BigDecimal.fromString('0')
  vault.supply = BigDecimal.fromString('0')
  vault.totalPosition = BigInt.fromI32(0)
  vault.History = []

  let token = new Token(event.params.vault.toHexString())
  let vaultBind = VaultBind.bind(event.params.vault)

  let name = vaultBind.try_name()
  if (name.reverted) {
    token.name = "cannot get name from chain"
  }else{
    token.name = name.value
  }

  let symbol = vaultBind.try_symbol()
  if (symbol.reverted) {
    token.symbol = "cannot get symbol from chain"
  }else{
    token.symbol = symbol.value
  }

  let decimals = vaultBind.try_decimals()
  if (decimals.reverted) {
    token.decimals = BigInt.fromI32(0)
  } else {
    token.decimals = BigInt.fromI32(decimals.value)
  }
  token.save()

  VaultTemplate.create(event.params.vault)
  vault.token = event.params.vault.toHexString()
  vault.save()

  if(vaultBind.try_config().reverted){
    log.error('cannot get config address',[])
  }else{
    VaultConfig.create(vaultBind.try_config().value)
  }

}
