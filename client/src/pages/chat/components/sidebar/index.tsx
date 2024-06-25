import { useAuth } from "@/store/auth/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleUser, Send } from "lucide-react";

const Sidebar = () => {
  const {
    authState: { user },
  } = useAuth();
  return (
    <aside className="w-64 h-full border-r">
      <div className="flex flex-col items-center gap-2 py-2 border">
        <Avatar className="w-16 h-16">
          <AvatarImage src="" alt="avatar" />
          <AvatarFallback className="font-medium">
            <CircleUser className="h-8 w-8" />
          </AvatarFallback>
        </Avatar>
        <div className="text-center">
          <p className="font-semibold">{user?.username}</p>
          <span className="text-muted-foreground">{user?.email}</span>
        </div>
      </div>

      <div className="p-2 flex flex-col gap-2">
        <SidebarItem />
        <SidebarItem />
        <SidebarItem />
        <SidebarItem />
      </div>
    </aside>
  );
};

function SidebarItem() {
  return (
    <div className="flex items-center border py-1 px-2 rounded-md">
      <Send className="h-4 w-4 mr-2" />
      <span>Sent</span>
    </div>
  );
}

export default Sidebar;
