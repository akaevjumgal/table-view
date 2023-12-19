/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Option, Typography } from "@material-tailwind/react";

import styles from "./Table.module.scss";
import { cn } from "@/classnames";
import { TableActions } from "../..";
import { User, editDraft } from "@/entities/User";
import { useAppDispatch } from "@/app/providers/store";
import { AppInput } from "@/shared/ui/Input/Input";
import { ChangeEvent, Fragment } from "react";
import { AppSelect } from "@/shared/ui/Select/Select";
import { CITIES } from "@/features/EditForm";

interface Props {
  headItems: string[];
  dataItems: User[];
  isEdit?: boolean;
  className?: string;
  title?: string;
  draftId?: number;
}

export const AppTable: React.FC<Props> = ({
  headItems,
  dataItems,
  isEdit = false,
  className,
  title,
  draftId,
}) => {
  const dispatch = useAppDispatch();

  const onChange = (id: number) => (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      editDraft({
        userId: id,
        draftId,
        name: e.target.name,
        value: e.target.value,
      })
    );
  };

  const onChangeCity =
    (id: number) =>
    (value: string = "") => {
      dispatch(editDraft({ userId: id, draftId, name: "city", value }));
    };

  const column = (column: User) => {
    const classes = styles.table__body__cell;
    const isDraft = draftId !== undefined;

    return (
      <tr key={column.userId} className="h-[2rem]">
        <td className={classes}>
          <AppInput
            name="name"
            maxLength={48}
            value={column.name}
            onChange={onChange(column.userId)}
            readOnly={isDraft}
            cell
          />
        </td>
        <td className={classes}>
          <AppInput
            name="surname"
            maxLength={48}
            value={column.surname}
            onChange={onChange(column.userId)}
            readOnly={isDraft}
            cell
          />
        </td>
        <td className={classes}>
          <AppInput
            inputMode="numeric"
            maxLength={2}
            name="age"
            value={column.age}
            onChange={onChange(column.userId)}
            readOnly={isDraft}
            cell
          />
        </td>
        <td className={cn(classes, "px-0")}>
          {isDraft ? (
            <AppInput className="px-3" value={column.city} readOnly cell />
          ) : (
            <AppSelect
              containerProps={{
                className: "min-w-[7.5rem] sm:min-w-[12.5rem]",
              }}
              name="city"
              value={column.city}
              onChange={onChangeCity(column.userId)}
              cell
            >
              {CITIES.map((city) => (
                <Option key={city} value={city}>
                  {city}
                </Option>
              ))}
            </AppSelect>
          )}
        </td>
        {isEdit && (
          <td className={cn(classes, "w-1/5")}>
            <TableActions record={column} draftId={draftId} />
          </td>
        )}
      </tr>
    );
  };

  if (!dataItems.length) {
    return null;
  }

  return (
    <Fragment>
      {title && <Typography className="mt-4 mb-2">{title}</Typography>}
      <Card className={cn("w-full bg-white rounded", className)}>
        <table className={cn(styles.table, "w-full table-auto text-left")}>
          <thead className={styles.table__head}>
            <tr>
              {headItems.map((head, idx) => (
                <th key={head + idx} className={styles.table__item}>
                  <Typography>{head}</Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={styles.table__body}>{dataItems.map(column)}</tbody>
        </table>
      </Card>
    </Fragment>
  );
};
