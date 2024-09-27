import { Transfer, Approval } from "../generated/schema";
import { Transfer as TransferEvent, Approval as ApprovalEvent } from "../generated/AXS/AXS";

export function handleTransfer(event: TransferEvent): void {
  let transfer = new Transfer(event.transaction.hash.toHex());
  transfer.from = event.params._from;
  transfer.to = event.params._to;
  transfer.value = event.params._value;
  transfer.contract = "AXS";
  transfer.timestamp = event.block.timestamp;
  transfer.save();
}

export function handleApproval(event: ApprovalEvent): void {
  let approval = new Approval(event.transaction.hash.toHex());
  approval.owner = event.params._owner;
  approval.spender = event.params._spender;
  approval.value = event.params._value;
  approval.contract = "AXS";
  approval.timestamp = event.block.timestamp;
  approval.save();
}
