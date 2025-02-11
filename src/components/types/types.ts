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
    age: string;
    className: string;
    mobile: string;
  };
  onSave: (updatedDetails: { name: string; age: string; className: string; mobile: string }) => void;
  refetch: () => void;
}