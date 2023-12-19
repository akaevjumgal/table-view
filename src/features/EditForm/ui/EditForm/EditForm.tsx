import { User } from "@/entities/User";
import { AppInput } from "@/shared/ui/Input/Input";
import { AppSelect } from "@/shared/ui/Select/Select";
import { Button, Option } from "@material-tailwind/react";
import { FormikProps } from "formik";
import { CITIES } from "../../model/constants";

interface Props {
  form: FormikProps<User>;
}

export const EditForm: React.FC<Props> = ({ form }) => {
  return (
    <form onSubmit={form.handleSubmit}>
      <AppInput
        placeholder="Name"
        name="name"
        maxLength={48}
        value={form.values.name}
        onChange={form.handleChange}
        error={form.touched.name && form.errors.name}
      />
      <AppInput
        className="my-4"
        placeholder="Surname"
        maxLength={48}
        name="surname"
        value={form.values.surname}
        onChange={form.handleChange}
        error={form.touched.surname && form.errors.surname}
      />
      <AppInput
        inputMode="numeric"
        maxLength={2}
        className="mb-4"
        placeholder="Age"
        name="age"
        value={form.values.age}
        onChange={form.handleChange}
        error={form.touched.age && form.errors.age}
      />
      <AppSelect
        placeholder="City"
        label="City"
        name="city"
        value={form.values.city}
        onChange={(value) => form.handleChange<string>("city")(value || "")}
        error={form.touched.city && form.errors.city}
      >
        {CITIES.map((city) => (
          <Option key={city} value={city}>
            {city}
          </Option>
        ))}
      </AppSelect>
      <Button
        type="submit"
        fullWidth
        className={"h-[2.625rem] bg-[#1493FE] mt-5 rounded"}
      >
        Add
      </Button>
    </form>
  );
};
