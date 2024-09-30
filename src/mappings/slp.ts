import { Transfer, Minter, Player } from "../../generated/schema";
import { BigInt, Bytes } from "@graphprotocol/graph-ts"; // Add Bytes import here
import {
  Transfer as TransferEvent,
  MinterAdded as MinterAddedEvent,
  MinterRemoved as MinterRemovedEvent
} from "../../generated/SLP/SLP";

export function handleTransfer(event: TransferEvent): void {
  // Create or load the 'from' player
  let playerFrom = Player.load(event.params._from.toHex());
  if (!playerFrom) {
    playerFrom = new Player(event.params._from.toHex());
    playerFrom.totalTransferred = BigInt.fromI32(0);
  }

  // Create or load the 'to' player
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
  transfer.contract = "SLP"; // or "SLP" in slp.ts
  transfer.timestamp = event.block.timestamp;
  transfer.save();
  
}

export function handleMinterAdded(event: MinterAddedEvent): void {
  let minter = new Minter(event.transaction.hash.toHex() + '-' + event.logIndex.toString());
  minter.address = event.params._minter;
  minter.contract = "SLP";
  minter.added = true;
  minter.timestamp = event.block.timestamp;
  minter.save();
}

export function handleMinterRemoved(event: MinterRemovedEvent): void {
  let minter = new Minter(event.transaction.hash.toHex() + '-' + event.logIndex.toString());
  minter.address = event.params._minter;
  minter.contract = "SLP";
  minter.added = false;
  minter.timestamp = event.block.timestamp;
  minter.save();
}
