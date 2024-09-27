import { Transfer, Approval, Minter } from "../generated/schema";
import {
  Transfer as TransferEvent,
  Approval as ApprovalEvent,
  MinterAdded as MinterAddedEvent,
  MinterRemoved as MinterRemovedEvent
} from "../generated/SLP/SLP";

export function handleTransfer(event: TransferEvent): void {
  let transfer = new Transfer(event.transaction.hash.toHex());
  transfer.from = event.params._from;
  transfer.to = event.params._to;
  transfer.value = event.params._value;
  transfer.contract = "SLP";
  transfer.timestamp = event.block.timestamp;
  transfer.save();
}

export function handleApproval(event: ApprovalEvent): void {
  let approval = new Approval(event.transaction.hash.toHex());
  approval.owner = event.params._owner;
  approval.spender = event.params._spender;
  approval.value = event.params._value;
  approval.contract = "SLP";
  approval.timestamp = event.block.timestamp;
  approval.save();
}

export function handleMinterAdded(event: MinterAddedEvent): void {
  let minter = new Minter(event.transaction.hash.toHex());
  minter.address = event.params._minter;
  minter.contract = "SLP";
  minter.added = true;
  minter.timestamp = event.block.timestamp;
  minter.save();
}

export function handleMinterRemoved(event: MinterRemovedEvent): void {
  let minter = new Minter(event.transaction.hash.toHex());
  minter.address = event.params._minter;
  minter.contract = "SLP";
  minter.added = false;
  minter.timestamp = event.block.timestamp;
  minter.save();
}
