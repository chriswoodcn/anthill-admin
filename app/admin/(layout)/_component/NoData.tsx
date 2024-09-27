import Icon from "@/components/icon";

export default function () {
  return (
    <div className="p-4 rounded border flex flex-col justify-center items-center w-full text-white-6 dark:text-black-6">
      <Icon name="nodata" />
      <div className="text-center text-sm">No Data</div>
    </div>
  );
}
