// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  EthereumCall,
  EthereumEvent,
  SmartContract,
  EthereumValue,
  JSONValue,
  TypedMap,
  Entity,
  EthereumTuple,
  Bytes,
  Address,
  BigInt,
  CallResult
} from "@graphprotocol/graph-ts";

export class AddCollateral extends EthereumEvent {
  get params(): AddCollateral__Params {
    return new AddCollateral__Params(this);
  }
}

export class AddCollateral__Params {
  _event: AddCollateral;

  constructor(event: AddCollateral) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get healthBefore(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get healthAfter(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class AddDebt extends EthereumEvent {
  get params(): AddDebt__Params {
    return new AddDebt__Params(this);
  }
}

export class AddDebt__Params {
  _event: AddDebt;

  constructor(event: AddDebt) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get debtShare(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class Approval extends EthereumEvent {
  get params(): Approval__Params {
    return new Approval__Params(this);
  }
}

export class Approval__Params {
  _event: Approval;

  constructor(event: Approval) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get spender(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get value(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Kill extends EthereumEvent {
  get params(): Kill__Params {
    return new Kill__Params(this);
  }
}

export class Kill__Params {
  _event: Kill;

  constructor(event: Kill) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get killer(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get owner(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get posVal(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get debt(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get prize(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }

  get left(): BigInt {
    return this._event.parameters[6].value.toBigInt();
  }
}

export class OwnershipTransferred extends EthereumEvent {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class RemoveDebt extends EthereumEvent {
  get params(): RemoveDebt__Params {
    return new RemoveDebt__Params(this);
  }
}

export class RemoveDebt__Params {
  _event: RemoveDebt;

  constructor(event: RemoveDebt) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get debtShare(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class Transfer extends EthereumEvent {
  get params(): Transfer__Params {
    return new Transfer__Params(this);
  }
}

export class Transfer__Params {
  _event: Transfer;

  constructor(event: Transfer) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get value(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Work extends EthereumEvent {
  get params(): Work__Params {
    return new Work__Params(this);
  }
}

export class Work__Params {
  _event: Work;

  constructor(event: Work) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get loan(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class Vault__positionInfoResult {
  value0: BigInt;
  value1: BigInt;

  constructor(value0: BigInt, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, EthereumValue> {
    let map = new TypedMap<string, EthereumValue>();
    map.set("value0", EthereumValue.fromUnsignedBigInt(this.value0));
    map.set("value1", EthereumValue.fromUnsignedBigInt(this.value1));
    return map;
  }
}

export class Vault__positionsResult {
  value0: Address;
  value1: Address;
  value2: BigInt;

  constructor(value0: Address, value1: Address, value2: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }

  toMap(): TypedMap<string, EthereumValue> {
    let map = new TypedMap<string, EthereumValue>();
    map.set("value0", EthereumValue.fromAddress(this.value0));
    map.set("value1", EthereumValue.fromAddress(this.value1));
    map.set("value2", EthereumValue.fromUnsignedBigInt(this.value2));
    return map;
  }
}

export class Vault extends SmartContract {
  static bind(address: Address): Vault {
    return new Vault("Vault", address);
  }

  POSITION_ID(): BigInt {
    let result = super.call("POSITION_ID", []);

    return result[0].toBigInt();
  }

  try_POSITION_ID(): CallResult<BigInt> {
    let result = super.tryCall("POSITION_ID", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBigInt());
  }

  STRATEGY(): Address {
    let result = super.call("STRATEGY", []);

    return result[0].toAddress();
  }

  try_STRATEGY(): CallResult<Address> {
    let result = super.tryCall("STRATEGY", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toAddress());
  }

  _IN_EXEC_LOCK(): BigInt {
    let result = super.call("_IN_EXEC_LOCK", []);

    return result[0].toBigInt();
  }

  try__IN_EXEC_LOCK(): CallResult<BigInt> {
    let result = super.tryCall("_IN_EXEC_LOCK", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBigInt());
  }

  allowance(owner: Address, spender: Address): BigInt {
    let result = super.call("allowance", [
      EthereumValue.fromAddress(owner),
      EthereumValue.fromAddress(spender)
    ]);

    return result[0].toBigInt();
  }

  try_allowance(owner: Address, spender: Address): CallResult<BigInt> {
    let result = super.tryCall("allowance", [
      EthereumValue.fromAddress(owner),
      EthereumValue.fromAddress(spender)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBigInt());
  }

  approve(spender: Address, amount: BigInt): boolean {
    let result = super.call("approve", [
      EthereumValue.fromAddress(spender),
      EthereumValue.fromUnsignedBigInt(amount)
    ]);

    return result[0].toBoolean();
  }

  try_approve(spender: Address, amount: BigInt): CallResult<boolean> {
    let result = super.tryCall("approve", [
      EthereumValue.fromAddress(spender),
      EthereumValue.fromUnsignedBigInt(amount)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBoolean());
  }

  balanceOf(account: Address): BigInt {
    let result = super.call("balanceOf", [EthereumValue.fromAddress(account)]);

    return result[0].toBigInt();
  }

  try_balanceOf(account: Address): CallResult<BigInt> {
    let result = super.tryCall("balanceOf", [
      EthereumValue.fromAddress(account)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBigInt());
  }

  config(): Address {
    let result = super.call("config", []);

    return result[0].toAddress();
  }

  try_config(): CallResult<Address> {
    let result = super.tryCall("config", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toAddress());
  }

  debtShareToVal(debtShare: BigInt): BigInt {
    let result = super.call("debtShareToVal", [
      EthereumValue.fromUnsignedBigInt(debtShare)
    ]);

    return result[0].toBigInt();
  }

  try_debtShareToVal(debtShare: BigInt): CallResult<BigInt> {
    let result = super.tryCall("debtShareToVal", [
      EthereumValue.fromUnsignedBigInt(debtShare)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBigInt());
  }

  debtToken(): Address {
    let result = super.call("debtToken", []);

    return result[0].toAddress();
  }

  try_debtToken(): CallResult<Address> {
    let result = super.tryCall("debtToken", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toAddress());
  }

  debtValToShare(debtVal: BigInt): BigInt {
    let result = super.call("debtValToShare", [
      EthereumValue.fromUnsignedBigInt(debtVal)
    ]);

    return result[0].toBigInt();
  }

  try_debtValToShare(debtVal: BigInt): CallResult<BigInt> {
    let result = super.tryCall("debtValToShare", [
      EthereumValue.fromUnsignedBigInt(debtVal)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBigInt());
  }

  decimals(): i32 {
    let result = super.call("decimals", []);

    return result[0].toI32();
  }

  try_decimals(): CallResult<i32> {
    let result = super.tryCall("decimals", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toI32());
  }

  decreaseAllowance(spender: Address, subtractedValue: BigInt): boolean {
    let result = super.call("decreaseAllowance", [
      EthereumValue.fromAddress(spender),
      EthereumValue.fromUnsignedBigInt(subtractedValue)
    ]);

    return result[0].toBoolean();
  }

  try_decreaseAllowance(
    spender: Address,
    subtractedValue: BigInt
  ): CallResult<boolean> {
    let result = super.tryCall("decreaseAllowance", [
      EthereumValue.fromAddress(spender),
      EthereumValue.fromUnsignedBigInt(subtractedValue)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBoolean());
  }

  fairLaunchPoolId(): BigInt {
    let result = super.call("fairLaunchPoolId", []);

    return result[0].toBigInt();
  }

  try_fairLaunchPoolId(): CallResult<BigInt> {
    let result = super.tryCall("fairLaunchPoolId", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBigInt());
  }

  increaseAllowance(spender: Address, addedValue: BigInt): boolean {
    let result = super.call("increaseAllowance", [
      EthereumValue.fromAddress(spender),
      EthereumValue.fromUnsignedBigInt(addedValue)
    ]);

    return result[0].toBoolean();
  }

  try_increaseAllowance(
    spender: Address,
    addedValue: BigInt
  ): CallResult<boolean> {
    let result = super.tryCall("increaseAllowance", [
      EthereumValue.fromAddress(spender),
      EthereumValue.fromUnsignedBigInt(addedValue)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBoolean());
  }

  lastAccrueTime(): BigInt {
    let result = super.call("lastAccrueTime", []);

    return result[0].toBigInt();
  }

  try_lastAccrueTime(): CallResult<BigInt> {
    let result = super.tryCall("lastAccrueTime", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBigInt());
  }

  name(): string {
    let result = super.call("name", []);

    return result[0].toString();
  }

  try_name(): CallResult<string> {
    let result = super.tryCall("name", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toString());
  }

  nextPositionID(): BigInt {
    let result = super.call("nextPositionID", []);

    return result[0].toBigInt();
  }

  try_nextPositionID(): CallResult<BigInt> {
    let result = super.tryCall("nextPositionID", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBigInt());
  }

  owner(): Address {
    let result = super.call("owner", []);

    return result[0].toAddress();
  }

  try_owner(): CallResult<Address> {
    let result = super.tryCall("owner", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toAddress());
  }

  pendingInterest(value: BigInt): BigInt {
    let result = super.call("pendingInterest", [
      EthereumValue.fromUnsignedBigInt(value)
    ]);

    return result[0].toBigInt();
  }

  try_pendingInterest(value: BigInt): CallResult<BigInt> {
    let result = super.tryCall("pendingInterest", [
      EthereumValue.fromUnsignedBigInt(value)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBigInt());
  }

  positionInfo(id: BigInt): Vault__positionInfoResult {
    let result = super.call("positionInfo", [
      EthereumValue.fromUnsignedBigInt(id)
    ]);

    return new Vault__positionInfoResult(
      result[0].toBigInt(),
      result[1].toBigInt()
    );
  }

  try_positionInfo(id: BigInt): CallResult<Vault__positionInfoResult> {
    let result = super.tryCall("positionInfo", [
      EthereumValue.fromUnsignedBigInt(id)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(
      new Vault__positionInfoResult(value[0].toBigInt(), value[1].toBigInt())
    );
  }

  positions(param0: BigInt): Vault__positionsResult {
    let result = super.call("positions", [
      EthereumValue.fromUnsignedBigInt(param0)
    ]);

    return new Vault__positionsResult(
      result[0].toAddress(),
      result[1].toAddress(),
      result[2].toBigInt()
    );
  }

  try_positions(param0: BigInt): CallResult<Vault__positionsResult> {
    let result = super.tryCall("positions", [
      EthereumValue.fromUnsignedBigInt(param0)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(
      new Vault__positionsResult(
        value[0].toAddress(),
        value[1].toAddress(),
        value[2].toBigInt()
      )
    );
  }

  reservePool(): BigInt {
    let result = super.call("reservePool", []);

    return result[0].toBigInt();
  }

  try_reservePool(): CallResult<BigInt> {
    let result = super.tryCall("reservePool", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBigInt());
  }

  symbol(): string {
    let result = super.call("symbol", []);

    return result[0].toString();
  }

  try_symbol(): CallResult<string> {
    let result = super.tryCall("symbol", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toString());
  }

  token(): Address {
    let result = super.call("token", []);

    return result[0].toAddress();
  }

  try_token(): CallResult<Address> {
    let result = super.tryCall("token", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toAddress());
  }

  totalSupply(): BigInt {
    let result = super.call("totalSupply", []);

    return result[0].toBigInt();
  }

  try_totalSupply(): CallResult<BigInt> {
    let result = super.tryCall("totalSupply", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBigInt());
  }

  totalToken(): BigInt {
    let result = super.call("totalToken", []);

    return result[0].toBigInt();
  }

  try_totalToken(): CallResult<BigInt> {
    let result = super.tryCall("totalToken", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBigInt());
  }

  transfer(recipient: Address, amount: BigInt): boolean {
    let result = super.call("transfer", [
      EthereumValue.fromAddress(recipient),
      EthereumValue.fromUnsignedBigInt(amount)
    ]);

    return result[0].toBoolean();
  }

  try_transfer(recipient: Address, amount: BigInt): CallResult<boolean> {
    let result = super.tryCall("transfer", [
      EthereumValue.fromAddress(recipient),
      EthereumValue.fromUnsignedBigInt(amount)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBoolean());
  }

  transferFrom(sender: Address, recipient: Address, amount: BigInt): boolean {
    let result = super.call("transferFrom", [
      EthereumValue.fromAddress(sender),
      EthereumValue.fromAddress(recipient),
      EthereumValue.fromUnsignedBigInt(amount)
    ]);

    return result[0].toBoolean();
  }

  try_transferFrom(
    sender: Address,
    recipient: Address,
    amount: BigInt
  ): CallResult<boolean> {
    let result = super.tryCall("transferFrom", [
      EthereumValue.fromAddress(sender),
      EthereumValue.fromAddress(recipient),
      EthereumValue.fromUnsignedBigInt(amount)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBoolean());
  }

  vaultDebtShare(): BigInt {
    let result = super.call("vaultDebtShare", []);

    return result[0].toBigInt();
  }

  try_vaultDebtShare(): CallResult<BigInt> {
    let result = super.tryCall("vaultDebtShare", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBigInt());
  }

  vaultDebtVal(): BigInt {
    let result = super.call("vaultDebtVal", []);

    return result[0].toBigInt();
  }

  try_vaultDebtVal(): CallResult<BigInt> {
    let result = super.tryCall("vaultDebtVal", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBigInt());
  }
}

export class AddCollateralCall extends EthereumCall {
  get inputs(): AddCollateralCall__Inputs {
    return new AddCollateralCall__Inputs(this);
  }

  get outputs(): AddCollateralCall__Outputs {
    return new AddCollateralCall__Outputs(this);
  }
}

export class AddCollateralCall__Inputs {
  _call: AddCollateralCall;

  constructor(call: AddCollateralCall) {
    this._call = call;
  }

  get id(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get goRogue(): boolean {
    return this._call.inputValues[2].value.toBoolean();
  }

  get data(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }
}

export class AddCollateralCall__Outputs {
  _call: AddCollateralCall;

  constructor(call: AddCollateralCall) {
    this._call = call;
  }
}

export class ApproveCall extends EthereumCall {
  get inputs(): ApproveCall__Inputs {
    return new ApproveCall__Inputs(this);
  }

  get outputs(): ApproveCall__Outputs {
    return new ApproveCall__Outputs(this);
  }
}

export class ApproveCall__Inputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }

  get spender(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class ApproveCall__Outputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class DecreaseAllowanceCall extends EthereumCall {
  get inputs(): DecreaseAllowanceCall__Inputs {
    return new DecreaseAllowanceCall__Inputs(this);
  }

  get outputs(): DecreaseAllowanceCall__Outputs {
    return new DecreaseAllowanceCall__Outputs(this);
  }
}

export class DecreaseAllowanceCall__Inputs {
  _call: DecreaseAllowanceCall;

  constructor(call: DecreaseAllowanceCall) {
    this._call = call;
  }

  get spender(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get subtractedValue(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class DecreaseAllowanceCall__Outputs {
  _call: DecreaseAllowanceCall;

  constructor(call: DecreaseAllowanceCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class DepositCall extends EthereumCall {
  get inputs(): DepositCall__Inputs {
    return new DepositCall__Inputs(this);
  }

  get outputs(): DepositCall__Outputs {
    return new DepositCall__Outputs(this);
  }
}

export class DepositCall__Inputs {
  _call: DepositCall;

  constructor(call: DepositCall) {
    this._call = call;
  }

  get amountToken(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class DepositCall__Outputs {
  _call: DepositCall;

  constructor(call: DepositCall) {
    this._call = call;
  }
}

export class IncreaseAllowanceCall extends EthereumCall {
  get inputs(): IncreaseAllowanceCall__Inputs {
    return new IncreaseAllowanceCall__Inputs(this);
  }

  get outputs(): IncreaseAllowanceCall__Outputs {
    return new IncreaseAllowanceCall__Outputs(this);
  }
}

export class IncreaseAllowanceCall__Inputs {
  _call: IncreaseAllowanceCall;

  constructor(call: IncreaseAllowanceCall) {
    this._call = call;
  }

  get spender(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get addedValue(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class IncreaseAllowanceCall__Outputs {
  _call: IncreaseAllowanceCall;

  constructor(call: IncreaseAllowanceCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class InitializeCall extends EthereumCall {
  get inputs(): InitializeCall__Inputs {
    return new InitializeCall__Inputs(this);
  }

  get outputs(): InitializeCall__Outputs {
    return new InitializeCall__Outputs(this);
  }
}

export class InitializeCall__Inputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }

  get _config(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _token(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _name(): string {
    return this._call.inputValues[2].value.toString();
  }

  get _symbol(): string {
    return this._call.inputValues[3].value.toString();
  }

  get _decimals(): i32 {
    return this._call.inputValues[4].value.toI32();
  }

  get _debtToken(): Address {
    return this._call.inputValues[5].value.toAddress();
  }
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class KillCall extends EthereumCall {
  get inputs(): KillCall__Inputs {
    return new KillCall__Inputs(this);
  }

  get outputs(): KillCall__Outputs {
    return new KillCall__Outputs(this);
  }
}

export class KillCall__Inputs {
  _call: KillCall;

  constructor(call: KillCall) {
    this._call = call;
  }

  get id(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class KillCall__Outputs {
  _call: KillCall;

  constructor(call: KillCall) {
    this._call = call;
  }
}

export class ReduceReserveCall extends EthereumCall {
  get inputs(): ReduceReserveCall__Inputs {
    return new ReduceReserveCall__Inputs(this);
  }

  get outputs(): ReduceReserveCall__Outputs {
    return new ReduceReserveCall__Outputs(this);
  }
}

export class ReduceReserveCall__Inputs {
  _call: ReduceReserveCall;

  constructor(call: ReduceReserveCall) {
    this._call = call;
  }

  get value(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class ReduceReserveCall__Outputs {
  _call: ReduceReserveCall;

  constructor(call: ReduceReserveCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends EthereumCall {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RequestFundsCall extends EthereumCall {
  get inputs(): RequestFundsCall__Inputs {
    return new RequestFundsCall__Inputs(this);
  }

  get outputs(): RequestFundsCall__Outputs {
    return new RequestFundsCall__Outputs(this);
  }
}

export class RequestFundsCall__Inputs {
  _call: RequestFundsCall;

  constructor(call: RequestFundsCall) {
    this._call = call;
  }

  get targetedToken(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class RequestFundsCall__Outputs {
  _call: RequestFundsCall;

  constructor(call: RequestFundsCall) {
    this._call = call;
  }
}

export class SetFairLaunchPoolIdCall extends EthereumCall {
  get inputs(): SetFairLaunchPoolIdCall__Inputs {
    return new SetFairLaunchPoolIdCall__Inputs(this);
  }

  get outputs(): SetFairLaunchPoolIdCall__Outputs {
    return new SetFairLaunchPoolIdCall__Outputs(this);
  }
}

export class SetFairLaunchPoolIdCall__Inputs {
  _call: SetFairLaunchPoolIdCall;

  constructor(call: SetFairLaunchPoolIdCall) {
    this._call = call;
  }

  get _poolId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetFairLaunchPoolIdCall__Outputs {
  _call: SetFairLaunchPoolIdCall;

  constructor(call: SetFairLaunchPoolIdCall) {
    this._call = call;
  }
}

export class TransferCall extends EthereumCall {
  get inputs(): TransferCall__Inputs {
    return new TransferCall__Inputs(this);
  }

  get outputs(): TransferCall__Outputs {
    return new TransferCall__Outputs(this);
  }
}

export class TransferCall__Inputs {
  _call: TransferCall;

  constructor(call: TransferCall) {
    this._call = call;
  }

  get recipient(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class TransferCall__Outputs {
  _call: TransferCall;

  constructor(call: TransferCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class TransferFromCall extends EthereumCall {
  get inputs(): TransferFromCall__Inputs {
    return new TransferFromCall__Inputs(this);
  }

  get outputs(): TransferFromCall__Outputs {
    return new TransferFromCall__Outputs(this);
  }
}

export class TransferFromCall__Inputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }

  get sender(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get recipient(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class TransferFromCall__Outputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class TransferOwnershipCall extends EthereumCall {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class UpdateConfigCall extends EthereumCall {
  get inputs(): UpdateConfigCall__Inputs {
    return new UpdateConfigCall__Inputs(this);
  }

  get outputs(): UpdateConfigCall__Outputs {
    return new UpdateConfigCall__Outputs(this);
  }
}

export class UpdateConfigCall__Inputs {
  _call: UpdateConfigCall;

  constructor(call: UpdateConfigCall) {
    this._call = call;
  }

  get _config(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class UpdateConfigCall__Outputs {
  _call: UpdateConfigCall;

  constructor(call: UpdateConfigCall) {
    this._call = call;
  }
}

export class WithdrawCall extends EthereumCall {
  get inputs(): WithdrawCall__Inputs {
    return new WithdrawCall__Inputs(this);
  }

  get outputs(): WithdrawCall__Outputs {
    return new WithdrawCall__Outputs(this);
  }
}

export class WithdrawCall__Inputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }

  get share(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class WithdrawCall__Outputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }
}

export class WithdrawReserveCall extends EthereumCall {
  get inputs(): WithdrawReserveCall__Inputs {
    return new WithdrawReserveCall__Inputs(this);
  }

  get outputs(): WithdrawReserveCall__Outputs {
    return new WithdrawReserveCall__Outputs(this);
  }
}

export class WithdrawReserveCall__Inputs {
  _call: WithdrawReserveCall;

  constructor(call: WithdrawReserveCall) {
    this._call = call;
  }

  get to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get value(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class WithdrawReserveCall__Outputs {
  _call: WithdrawReserveCall;

  constructor(call: WithdrawReserveCall) {
    this._call = call;
  }
}

export class WorkCall extends EthereumCall {
  get inputs(): WorkCall__Inputs {
    return new WorkCall__Inputs(this);
  }

  get outputs(): WorkCall__Outputs {
    return new WorkCall__Outputs(this);
  }
}

export class WorkCall__Inputs {
  _call: WorkCall;

  constructor(call: WorkCall) {
    this._call = call;
  }

  get id(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get worker(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get principalAmount(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get borrowAmount(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get maxReturn(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }

  get data(): Bytes {
    return this._call.inputValues[5].value.toBytes();
  }
}

export class WorkCall__Outputs {
  _call: WorkCall;

  constructor(call: WorkCall) {
    this._call = call;
  }
}
