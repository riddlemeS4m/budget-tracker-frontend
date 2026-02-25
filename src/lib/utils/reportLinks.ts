export function buildTransactionDrillUrl(params: {
  locationClassification?: number | null;
  locationSubclassification?: number | null;
  dateFrom?: string;
  dateTo?: string;
  account?: number;
}): string {
  const sp = new URLSearchParams();
  if (params.locationClassification)
    sp.set("location_classification", String(params.locationClassification));
  if (params.locationSubclassification)
    sp.set("location_subclassification", String(params.locationSubclassification));
  if (params.dateFrom) sp.set("transaction_date_from", params.dateFrom);
  if (params.dateTo) sp.set("transaction_date_to", params.dateTo);
  if (params.account) sp.set("account", String(params.account));
  return `/admin/transactions?${sp.toString()}`;
}
