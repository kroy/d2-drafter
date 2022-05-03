export default function convertToSteam32(steam64: bigint): number {
  const steam32ConversionConst: bigint = BigInt("76561197960265728");
  return Number(steam64 - steam32ConversionConst);
}