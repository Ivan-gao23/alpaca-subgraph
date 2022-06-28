import { BigInt,BigDecimal, Address} from "@graphprotocol/graph-ts"
import {
  Transfer,
  Work,
  AddDebt,
  RemoveDebt
} from "../generated/templates/Vault/Vault"
import { Vault, User, Share, Position, Tx, Record} from "../generated/schema"
import { log } from '@graphprotocol/graph-ts'
import {Vault as ValutFromTemplates} from "../generated/templates/Vault/Vault" 
export function handleTransfer(event: Transfer): void {
	let vault = Vault.load(event.address.toHexString()) as Vault
	if (event.params.from == Address.fromString('0x0000000000000000000000000000000000000000')){
		let user = User.load(event.params.to.toHexString())
		if (user == null) {
			user = new User(event.params.to.toHexString())
		}
		user.save()
		let share = Share.load(event.address.toHexString() + event.params.to.toHexString())
		if (share === null) {
			share = new Share(event.address.toHexString() + event.params.to.toHexString())
			share.vault = event.address.toHexString()
			share.user = event.params.to.toHexString()
			share.share = BigDecimal.fromString('0')
		}
		share.share = share.share.plus(event.params.value.toBigDecimal())
		vault.supply = vault.supply.plus(event.params.value.toBigDecimal())
		share.save()

		let record = new Record(event.transaction.hash.toHexString()+event.logIndex.toHexString())
		record.type = "Deposit"
		record.hash = event.transaction.hash.toHexString()
		record.amount = event.params.value.toBigDecimal()
		record.user = event.params.to.toHexString()
		record.save()

		vault.History = vault.History.concat([event.transaction.hash.toHexString()+event.logIndex.toHexString()])
		vault.save()
		
	}else if (event.params.to == Address.fromString('0x0000000000000000000000000000000000000000')){
		
		let share = Share.load(event.address.toHexString() + event.params.to.toHexString())
		if (share === null) {
			log.debug('given valut and user not exist', [])
			share = new Share(event.address.toHexString() + event.params.to.toHexString())
			share.vault = event.address.toHexString()
			share.user = event.params.to.toHexString()
			share.share = BigDecimal.fromString('0')
		}
		share.share = share.share.minus(event.params.value.toBigDecimal())
		vault.supply = vault.supply.minus(event.params.value.toBigDecimal())
		share.save()
		
		
		let record = new Record(event.transaction.hash.toHexString()+event.logIndex.toHexString())
		record.type = "Withdraw"
		record.hash = event.transaction.hash.toHexString()
		record.amount = event.params.value.toBigDecimal()
		record.user = event.params.to.toHexString()
		record.save()

		vault.History = vault.History.concat([event.transaction.hash.toHexString()+event.logIndex.toHexString()])
		vault.save()
	}
}
export function handleAddDebt(event: AddDebt): void {
	let pos = Position.load(event.address.toHexString()+event.params.id.toHexString()) as Position
	pos.debtShare = pos.debtShare.plus(event.params.debtShare.toBigDecimal())
	let tx = new Tx(event.transaction.hash.toHexString()+"add")
	tx.type = "AddDebt" 
	tx.hash = event.transaction.hash.toHexString()
	tx.amount = event.params.debtShare.toBigDecimal()
	tx.positionId = event.params.id
	tx.save()
	let vault = Vault.load(event.address.toHexString()) as Vault
	vault.borrowed = vault.borrowed.plus(event.params.debtShare.toBigDecimal())
	vault.save()
	pos.History = pos.History.concat([event.transaction.hash.toHexString()+"add"])
	pos.save()
}

export function handleRemoveDebt(event: RemoveDebt): void {
	let pos = Position.load(event.address.toHexString()+event.params.id.toHexString()) as Position
	pos.debtShare = pos.debtShare.minus(event.params.debtShare.toBigDecimal())
	let tx = new Tx(event.transaction.hash.toHexString()+"remove")
	tx.type = "RemoveDebt" 
	tx.hash = event.transaction.hash.toHexString()
	tx.amount = event.params.debtShare.toBigDecimal()
	tx.positionId = event.params.id
	tx.save()
	let vault = Vault.load(event.address.toHexString()) as Vault
	vault.borrowed = vault.borrowed.minus(event.params.debtShare.toBigDecimal())
	vault.save()
	pos.History = pos.History.concat([event.transaction.hash.toHexString()+"remove"])
	pos.save()
}


export function handleWork(event: Work): void {
	let vaultTemplate = ValutFromTemplates.bind(event.address)
	let vault = Vault.load(event.address.toHexString()) as Vault
	vault.totalPosition = event.params.id.plus(BigInt.fromI32(1))
	vault.borrowed = vault.borrowed.plus(event.params.loan.toBigDecimal())
	vault.save()

	let tx = new Tx(event.transaction.hash.toHexString()+"work")
	tx.type = "initialize" 
	tx.hash = event.transaction.hash.toHexString()
	tx.amount = event.params.loan.toBigDecimal()
	tx.positionId = event.params.id
	tx.save()

	let pos = new Position(event.address.toHexString() + event.params.id.toHexString())
	pos.vault = event.address.toHexString()
	pos.debtShare = event.params.loan.toBigDecimal()
	pos.positionId = event.params.id
	if (vaultTemplate.try_positions(event.params.id).reverted){
		pos.worker = Address.fromString('0x0000000000000000000000000000000000000000')
		pos.owner = Address.fromString('0x0000000000000000000000000000000000000000')
	}
	else{
		pos.worker = vaultTemplate.try_positions(event.params.id).value.value0
		pos.owner = vaultTemplate.try_positions(event.params.id).value.value1
	}
	pos.History = []
	pos.History = pos.History.concat([event.transaction.hash.toHexString()+"work"])
	pos.save()
}

  