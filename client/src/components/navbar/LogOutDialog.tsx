import { useApi } from "@/hooks/api/useApi";
import { useAuth } from "@/store/auth/AuthContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useToast } from "../ui/use-toast";
const LogOutDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { dispatchLogOut } = useAuth();
  const { apiRequest } = useApi();
  const { toast } = useToast();
  const handleLogout = async () => {
    await apiRequest({
      config: {
        url: "/auth/logout",
        method: "POST",
      },
      handleSuccessResponse: dispatchLogOut,
      handleErrorResponse: (data) =>
        toast({ title: "Error", description: data, variant: "destructive", duration: 3000 }),
    });
  };
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you leaving?</AlertDialogTitle>
          <AlertDialogDescription>Are you sure you want to log out? All unsaved changes will be lost.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500 hover:bg-red-600" onClick={handleLogout}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogOutDialog;
