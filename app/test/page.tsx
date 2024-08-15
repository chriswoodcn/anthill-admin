import { Checkbox } from "@mantine/core";
export default () => {
  return (
    <>
      <Checkbox defaultChecked label="I agree to sell my privacy" />;
      <input
        id="startDate"
        type="date"
        name="inv-date"
        className="form-input w-2/3 lg:w-[250px]"
      />
    </>
  );
};
