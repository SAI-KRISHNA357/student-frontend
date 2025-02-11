export interface EnterDetailsProps {
  setTab: (tab: number) => void;
  setRefetch: (value: boolean) => void;
}

export interface ViewDetailsProps {
  refetchValue: boolean;
  setRefetch: (value: boolean) => void;
}

export interface EditDetailsProps {
  open: boolean;
  onClose: () => void;
  details: {
    id: number;
    name: string;
    age: number | undefined;
    className: string;
    mobile: number | undefined;
  };
  onSave: (updatedDetails: { name: string; age: number|undefined; className: string; mobile: number|undefined }) => void;
  refetch: () => void;
}