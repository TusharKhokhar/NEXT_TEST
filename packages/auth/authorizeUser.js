import prisma from "db";
import { ethers } from "ethers";

export function generateNonce() {
  return 10000 + Math.round(Math.random() * 10000);
}

export default async function authorizeUser(credentials) {
  try {
    const { signature, walletAddress } = credentials;

    if (!signature || !walletAddress) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { walletAddress },
    });

    if (!user) {
      return null;
    }

    // Verify digital signature
    const msg = `I am signing my one-time nonce: ${user.nonce}`;

    // We now are in possession of msg, publicAddress and signature. We
    // will use a helper from ethers.utils to extract the address from the signature
    const address = ethers.utils.verifyMessage(msg, signature);

    // The signature verification is successful if the address found with
    // ethers.utils.verifyMessage matches the initial publicAddress
    if (address.toLowerCase() !== walletAddress.toLowerCase()) {
      return null;
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { nonce: generateNonce() },
    });

    return user;
  } catch (e) {
    console.error("Failed to authorize", e);
  }

  return null;
}
