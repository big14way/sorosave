import freighter from "@stellar/freighter-api";

export async function isFreighterInstalled(): Promise<boolean> {
  try {
    const connected = await freighter.isConnected();
    return connected;
  } catch {
    return false;
  }
}

export async function connectWallet(): Promise<string | null> {
  try {
    const addressResult = await freighter.requestAccess();
    if (addressResult.error) {
      console.error("Freighter access denied:", addressResult.error);
      return null;
    }
    return addressResult.address;
  } catch (error) {
    console.error("Failed to connect wallet:", error);
    return null;
  }
}

export async function getPublicKey(): Promise<string | null> {
  try {
    const result = await freighter.getAddress();
    if (result.error) return null;
    return result.address;
  } catch {
    return null;
  }
}

export async function signTransaction(
  xdr: string,
  networkPassphrase: string
): Promise<string> {
  const result = await freighter.signTransaction(xdr, {
    networkPassphrase,
  });
  if (result.error) {
    throw new Error(`Failed to sign transaction: ${result.error}`);
  }
  return result.signedTxXdr;
}
