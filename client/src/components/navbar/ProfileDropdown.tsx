import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { User2, Settings, CreditCard, LogOut, CircleUser } from "lucide-react";
import { useAuth } from "@/store/auth/AuthContext";
import LogOutDialog from "./LogOutDialog";

const ProfileDropdown = () => {
  const { authState } = useAuth();
  const defaultIconStyle = "mr-2 h-5 w-5";
  const defaultTextStyle = "text-base";
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="w-9 h-9">
            <AvatarImage src="" alt="avatar" />
            <AvatarFallback className="font-medium">
              <CircleUser className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col gap-1">
              <p className="text-base font-medium leading-none">{authState.user?.username}</p>
              <p className="text-sm leading-none text-muted-foreground">{authState.user?.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className={defaultTextStyle}>
              <User2 className={defaultIconStyle} />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className={defaultTextStyle}>
              <Settings className={defaultIconStyle} />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className={defaultTextStyle}>
              <CreditCard className={defaultIconStyle} />
              <span>Billing</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className={defaultTextStyle} onClick={() => setOpen(true)}>
              <LogOut className={defaultIconStyle} />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <LogOutDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default ProfileDropdown;
