// PR3: accounts data adapter now points to extracted mock constants.
export async function getAccounts() {
  if (typeof accountRows !== 'undefined') return accountRows;
  return [];
}
