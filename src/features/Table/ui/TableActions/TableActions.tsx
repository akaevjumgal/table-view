import { Button } from "@material-tailwind/react";

import styles from "./TableActions.module.scss";
import { cn } from "@/classnames";
import { useAppDispatch } from "@/app/providers/store";
import { User, deleteUser, makeDraft, setEditingTo } from "@/entities/User";

interface Props {
  draftId?: number;
  record: User;
}

export const TableActions: React.FC<Props> = ({ record, draftId }) => {
  const dispatch = useAppDispatch();

  const openModal = () => {
    if (draftId !== undefined) {
      dispatch(makeDraft({ draftId, user: record }));
      dispatch(setEditingTo(true));
    }
  };

  const deleteRecord = () => {
    if (draftId !== undefined) {
      dispatch(deleteUser({ draftId, userId: record.userId }));
    }
  };

  return (
    <div className="flex items-center justify-around">
      <Button
        variant="text"
        className={cn(
          styles.table_actions__edit,
          "text-[#057AE3] hover:bg-transparent active:bg-transparent capitalize"
        )}
        size="sm"
        onClick={openModal}
      >
        Edit
      </Button>
      <Button
        variant="text"
        className={cn(
          styles.table_actions__delete,
          "text-[#B0263D] hover:bg-transparent active:bg-transparent capitalize"
        )}
        size="sm"
        onClick={deleteRecord}
      >
        Delete
      </Button>
    </div>
  );
};
