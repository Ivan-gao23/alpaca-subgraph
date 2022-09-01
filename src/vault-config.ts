import { BigInt,BigDecimal, Address} from "@graphprotocol/graph-ts"
import {
  SetWorkers
} from "../generated/templates/VaultConfig/ConfigurableInterestVaultConfig"
import { Vault, User, Share, Position, Tx, Record, Worker, Token} from "../generated/schema"
import { log } from '@graphprotocol/graph-ts'
import {Vault as VaultBind} from "../generated/templates/Vault/Vault" 
import { IWorker } from "../generated/templates/Vault/IWorker"
import { ERC20 } from "../generated/templates/Vault/ERC20"
export function handleSetWorkers(event: SetWorkers): void {
	let iworker = IWorker.bind(event.params.worker)
	let worker = Worker.load(event.params.worker.toHexString())
	if (worker == null){
	worker = new Worker(event.params.worker.toHexString())
	worker.baseToken = iworker.try_baseToken().reverted ? '0x0000000000000000000000000000000000000003' : iworker.try_baseToken().value.toHexString()

	worker.farmingToken = iworker.try_farmingToken().reverted ? '0x0000000000000000000000000000000000000004': iworker.try_farmingToken().value.toHexString()

	worker.lpToken = iworker.try_lpToken().reverted ? '0x0000000000000000000000000000000000000005' : iworker.try_lpToken().value.toHexString()

	}
	worker.save()
} 
