import { translate } from "../client";
export function datatableColumnText(row: any, accessor: string) {
  if (row == undefined || row == null) return "--";
  if (!row[accessor]) return "--";
  return <div className="text-wrap break-all">{row[accessor]}</div>;
}
export function datatableColumnTranslateText(row: any, accessor: string) {
  if (row == undefined || row == null) return "--";
  if (!row[accessor]) return "--";
  return <div className="text-wrap break-all">{translate(row[accessor])}</div>;
}
