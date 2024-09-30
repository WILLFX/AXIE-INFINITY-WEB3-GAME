import { Transfer, Player } from "../../generated/schema";
import { Transfer as TransferEvent, Approval as ApprovalEvent } from "../../generated/AXS/AXS";
import { BigInt, Bytes } from "@graphprotocol/graph-ts"; // Add Bytes import here

export function handleTransfer(event: TransferEvent): void {
  let playerFrom = Player.load(event.params._from.toHex());
  if (!playerFrom) {
    playerFrom = new Player(event.params._from.toHex());
    playerFrom.totalTransferred = BigInt.fromI32(0);
  }

  let playerTo = Player.load(event.params._to.toHex());
  if (!playerTo) {
    playerTo = new Player(event.params._to.toHex());
    playerTo.totalTransferred = BigInt.fromI32(0);
  }

  // Update totalTransferred for the 'from' player
  playerFrom.totalTransferred = playerFrom.totalTransferred.plus(event.params._value);
  playerFrom.save();

  // Update totalTransferred for the 'to' player
  playerTo.totalTransferred = playerTo.totalTransferred.plus(event.params._value);
  playerTo.save();

  // Save the transfer entity
  let transfer = new Transfer(event.transaction.hash.toHex() + '-' + event.logIndex.toString());
  transfer.from = Bytes.fromHexString(playerFrom.id) as Bytes;
  transfer.to = Bytes.fromHexString(playerTo.id) as Bytes;
  
  transfer.value = event.params._value;
  transfer.contract = "AXS"; // or "SLP" in slp.ts
  transfer.timestamp = event.block.timestamp;
  transfer.save();
  
}
