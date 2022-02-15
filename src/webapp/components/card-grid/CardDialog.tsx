import { ConfirmationDialog } from "@eyeseetea/d2-ui-components";
import { Counter } from "../../pages/counter/Counter";

export const CardDialog: React.FC<CardDialogProps> = props => {
    const { isOpen, name, onOk } = props;

    return (
        <ConfirmationDialog
            isOpen={isOpen}
            title={"Counter for " + name}
            description={"Direct access to the counter"}
            cancelText={"Close"}
            disableSave={true}
            onCancel={onOk}
        >
            <Counter name={name} />
        </ConfirmationDialog>
    );
};

interface CardDialogProps {
    isOpen: boolean;
    name: string;
    onOk: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
