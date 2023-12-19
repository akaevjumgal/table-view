import { EditForm } from "@/features/EditForm/ui/EditForm/EditForm";
import { AppTable } from "@/features/Table";
import { AppDialog } from "@/shared/ui/Dialog/Dialog";
import { useDraftTable } from "../../model/useDraftTable";
import {
  Button,
  ButtonGroup,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";

import deleteIcon from "@/assets/delete.svg";

const ORIGIN_TABLE_HEAD = ["Name", "Surname", "Age", "City"];
const DRAFT_TABLE_HEAD = [...ORIGIN_TABLE_HEAD, ""];

export const DraftTable = () => {
  const {
    users,
    userList,
    form,
    isEditing,
    toggleEdit,
    makeCopy,
    deleteLastTable,
  } = useDraftTable();

  return (
    <section className="flex items-center justify-center my-4">
      <div className="flex w-full flex-col lg:mx-10">
        <ButtonGroup className="justify-end items-center mb-3 static">
          <Tooltip content="Copy genuine table">
            <Button
              className="bg-[#1193FF] h-6 py-0 rounded"
              size="sm"
              onClick={makeCopy}
            >
              <Typography className="font-normal text-xs capitalize">
                Copy table
              </Typography>
            </Button>
          </Tooltip>
          <Tooltip content="Remove table from end of list">
            <IconButton
              fullWidth
              variant="text"
              className="bg-transparent shadow-none border-none hover:shadow-none ml-5"
              onClick={deleteLastTable}
            >
              <img src={deleteIcon} alt="Delete icon" />
            </IconButton>
          </Tooltip>
        </ButtonGroup>
        <div className="h-[90vh] overflow-y-auto">
          <AppTable dataItems={users} headItems={ORIGIN_TABLE_HEAD} />
          {userList.map((dataItems, idx) => (
            <AppTable
              key={idx}
              draftId={idx}
              title={`Draft (${idx + 1})`}
              dataItems={dataItems}
              headItems={DRAFT_TABLE_HEAD}
              isEdit
            />
          ))}
        </div>
        <AppDialog size="xs" open={isEditing} handler={toggleEdit}>
          <EditForm form={form} />
        </AppDialog>
      </div>
    </section>
  );
};
