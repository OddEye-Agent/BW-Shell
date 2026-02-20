// PR3: admin tools data adapter now points to extracted mock constants.
export async function getAdminToolTabData() {
  if (typeof adminToolsTabs !== 'undefined') return adminToolsTabs;
  return [];
}
