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
import { User2, Settings, CreditCard, LogOut } from "lucide-react";
import { useAppSelector } from "@/redux/store";
import LogOutDialog from "./LogOutDialog";

const ProfileDropdown = () => {
  const { user } = useAppSelector((state) => state.auth);
  const defaultIconStyle = "mr-2 h-5 w-5";
  const defaultTextStyle = "text-base";
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="w-9 h-9">
            <AvatarImage src="" alt="avatar" />
            <AvatarFallback className="bg-black text-white">
              {user?.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col gap-1">
              <p className="text-base font-medium leading-none">{user?.username}</p>
              <p className="text-sm leading-none text-muted-foreground">{user?.email}</p>
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
