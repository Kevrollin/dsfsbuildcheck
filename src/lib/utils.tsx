export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
export function truncateAddress(address: string, length = 6): string {
  if (!address) return '';
  return `${address.slice(0, length)}...${address.slice(-length)}`;
}
