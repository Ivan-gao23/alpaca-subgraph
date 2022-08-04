import { BigInt,BigDecimal, Address} from "@graphprotocol/graph-ts"
import {
  Transfer,
  Work,
  AddDebt,
  RemoveDebt,
  Kill,
  AddCollateral
} from "../generated/templates/Vault/Vault"
import { Vault, User, Share, Position, Tx, Record, Worker, Token} from "../generated/schema"
import { log } from '@graphprotocol/graph-ts'
import {Vault as VaultBind} from "../generated/templates/Vault/Vault" 
import { IWorker } from "../generated/templates/Vault/IWorker"
import { ERC20 } from "../generated/templates/Vault/ERC20"
export function handleTransfer(event: Transfer): void {
	let vault = Vault.load(event.address.toHexString()) as Vault
	if (event.params.from == Address.fromString('0x0000000000000000000000000000000000000000')){
		let user = User.load(event.params.to.toHexString())
		if (user == null) {
			user = new User(event.params.to.toHexString())
		}
		user.save()
		let share = Share.load(event.address.toHexString() + event.params.to.toHexString())
		if (share == null) {
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
		if (share == null) {
            share = new Share(event.address.toHexString() + event.params.to.toHexString())
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
	let pos = Position.load(event.address.toHexString()+event.params.id.toHexString())
	let tx = new Tx(event.transaction.hash.toHexString()+"remove")
	tx.type = "RemoveDebt" 
	tx.hash = event.transaction.hash.toHexString()
	tx.amount = event.params.debtShare.toBigDecimal()
	tx.positionId = event.params.id
	tx.save()
	let vault = Vault.load(event.address.toHexString()) as Vault
	vault.borrowed = vault.borrowed.minus(event.params.debtShare.toBigDecimal())
	vault.save()
	if (pos == null) {
		log.error("pos{0} is null",[event.params.id.toHexString()])
	}else{
		pos.debtShare = pos.debtShare.minus(event.params.debtShare.toBigDecimal())
		pos.History = pos.History.concat([event.transaction.hash.toHexString()+"remove"])
		pos.save()
	}
}


export function handleWork(event: Work): void { 
	let vaultBind = VaultBind.bind(event.address)
	let vault = Vault.load(event.address.toHexString()) as Vault
	vault.totalPosition = event.params.id.plus(BigInt.fromString('1'))
	vault.borrowed = vault.borrowed.plus(event.params.loan.toBigDecimal())
	vault.save()

	let tx = new Tx(event.transaction.hash.toHexString()+"work")
	tx.type = "Work" 
	tx.hash = event.transaction.hash.toHexString()
	tx.amount = event.params.loan.toBigDecimal()
	tx.positionId = event.params.id
	tx.save()

	let pos = Position.load(event.address.toHexString() + event.params.id.toHexString())
	if (pos == null){
        pos = new Position(event.address.toHexString() + event.params.id.toHexString())
		pos.pair = "BNB-USDT"
		pos.debtShare = BigDecimal.fromString('0')
		pos.positionId = event.params.id
		if (vaultBind.try_positions(event.params.id).reverted){
			pos.worker = '0x0000000000000000000000000000000000000000'
			pos.owner =  '0x0000000000000000000000000000000000000000'
		}
		else{
			pos.worker = vaultBind.try_positions(event.params.id).value.value0.toHexString()

			pos.owner = vaultBind.try_positions(event.params.id).value.value1.toHexString()
		}
		pos.History = []
		pos.History = pos.History.concat([event.transaction.hash.toHexString()+"work"])
		pos.vault = event.address.toHexString()
	}else {
		pos.History = pos.History.concat([event.transaction.hash.toHexString()+"work"])
        pos.worker = vaultBind.try_positions(event.params.id).reverted ? '0x0000000000000000000000000000000000000003' : vaultBind.try_positions(event.params.id).value.value0.toHexString()

		pos.owner = vaultBind.try_positions(event.params.id).reverted ? '0x0000000000000000000000000000000000000000' : vaultBind.try_positions(event.params.id).value.value1.toHexString()
	}
    pos.save()
	
	let worker = Worker.load(pos.worker)
	let iworker = IWorker.bind(Address.fromString(pos.worker))
	if (worker == null){
	worker = new Worker(pos.worker)
	worker.baseToken = iworker.try_baseToken().reverted ? '0x0000000000000000000000000000000000000000' : iworker.try_baseToken().value.toHexString()

	worker.farmingToken = iworker.try_farmingToken().reverted ? '0x0000000000000000000000000000000000000001': iworker.try_farmingToken().value.toHexString()

	worker.lpToken = iworker.try_lpToken().reverted ? '0x0000000000000000000000000000000000000002' : iworker.try_lpToken().value.toHexString()

	}
	let baseToken = Token.load(worker.baseToken)
    if (baseToken == null) {
    baseToken = new Token(worker.baseToken)
   
	let bt = ERC20.bind(Address.fromString(worker.baseToken))
	baseToken.name = bt.try_name().reverted ? "cannot get name for basetoken" : bt.try_name().value

	baseToken.symbol = bt.try_symbol().reverted ? "cannot get symbol for basetoken" : bt.try_symbol().value

	baseToken.decimals = BigInt.fromString('18')
    }
	baseToken.save()

	let farmingToken = Token.load(worker.farmingToken)
    if (farmingToken == null) {
    farmingToken = new Token(worker.farmingToken)
	let ft = ERC20.bind(Address.fromString(worker.farmingToken))
	farmingToken.name = ft.try_name().reverted ? "cannot get name for farmingtoken":ft.try_name().value

	farmingToken.symbol = ft.try_symbol().reverted ? "cannot get symbol for farmingtoken":ft.try_symbol().value

	farmingToken.decimals =  BigInt.fromString('18')
    }

	farmingToken.save()

	let lpToken = Token.load(worker.lpToken)
    if (lpToken == null){
        lpToken = new Token(worker.lpToken)
        let lp = ERC20.bind(Address.fromString(worker.lpToken))
        lpToken.name = lp.try_name().reverted?"cannot get name for lptoken":lp.try_name().value
        
        lpToken.symbol = lp.try_symbol().reverted?"cannot get symbol for lptoken":lp.try_symbol().value
        
        lpToken.decimals = BigInt.fromString("18")
    }
	lpToken.save()
    worker.save()
	
}

export function handleAddCollateral(event: AddCollateral): void {
	let pos = Position.load(event.address.toHexString()+event.params.id.toHexString())
}

export function handleKill(event: Kill): void {
	let pos = Position.load(event.address.toHexString()+event.params.id.toHexString())
}
  