// PR3: compliance data adapter now points to extracted mock constants.
export async function getComplianceArchive() {
  if (typeof complianceArchiveRows !== 'undefined') return complianceArchiveRows;
  return [];
}
