export function buildTransactionDrillUrl(params: {
  locationClassification?: number | null;
  locationSubclassification?: number | null;
  locationClassificationNull?: boolean;
  dateFrom?: string;
  dateTo?: string;
  account?: number;
  accountType?: string;
  excludedAccountType?: string;
  locationClassificationType?: string;
}): string {
  const sp = new URLSearchParams();
  if (params.locationClassification)
    sp.set("location_classification", String(params.locationClassification));
  if (params.locationSubclassification)
    sp.set("location_subclassification", String(params.locationSubclassification));
  if (params.locationClassificationNull)
    sp.set("location_classification_null", "true");
  if (params.dateFrom) sp.set("transaction_date_from", params.dateFrom);
  if (params.dateTo) sp.set("transaction_date_to", params.dateTo);
  if (params.account) sp.set("account", String(params.account));
  if (params.accountType) sp.set("account_type", params.accountType);
  if (params.excludedAccountType) sp.set("excluded_account_type", params.excludedAccountType);
  if (params.locationClassificationType)
    sp.set("location_classification_type", params.locationClassificationType);
  return `/admin/transactions?${sp.toString()}`;
}
