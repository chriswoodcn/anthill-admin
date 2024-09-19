export default function (row: any, accessor: string) {
  if (row == undefined || row == null) return "--";
  if (!row[accessor]) return "--";
  return <div className="text-wrap break-all">{row[accessor]}</div>;
}
