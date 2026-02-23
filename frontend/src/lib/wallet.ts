import freighter from "@stellar/freighter-api";

export async function isFreighterInstalled(): Promise<boolean> {
  try {
    return await freighter.isConnected();
  } catch {
    return false;
  }
}

export async function connectWallet(): Promise<string | null> {
  try {
    const address = await freighter.requestAccess();
    return address;
  } catch (error) {
    console.error("Failed to connect wallet:", error);
    return null;
  }
}

export async function getPublicKey(): Promise<string | null> {
  try {
    return await freighter.getPublicKey();
  } catch {
    return null;
  }
}

export async function signTransaction(
  xdr: string,
  networkPassphrase: string
): Promise<string> {
  return await freighter.signTransaction(xdr, {
    networkPassphrase,
  });
}
