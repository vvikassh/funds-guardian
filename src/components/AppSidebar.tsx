import { 
  Home, 
  CreditCard, 
  History, 
  Target, 
  TrendingUp,
  Settings,
  PlusCircle
} from "lucide-react";
import { NavLink } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Make Payment", url: "/payment", icon: CreditCard },
  { title: "Transaction History", url: "/history", icon: History },
  { title: "Budget Management", url: "/budgets", icon: Target },
  { title: "Analytics", url: "/analytics", icon: TrendingUp },
];

const bottomItems = [
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const getNavClass = (isActive: boolean) =>
    isActive 
      ? "bg-primary text-primary-foreground font-medium shadow-sm" 
      : "hover:bg-accent text-muted-foreground hover:text-foreground";

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-card border-r">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-hover rounded-lg flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="text-lg font-semibold text-foreground">BudgetPay</h2>
                <p className="text-xs text-muted-foreground">Smart Finance</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup className="px-3 py-4">
          <SidebarGroupLabel className="text-muted-foreground text-xs font-medium px-3 mb-2">
            {!collapsed && "MAIN MENU"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end
                      className={({ isActive }) => 
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${getNavClass(isActive)}`
                      }
                    >
                      <item.icon className="w-4 h-4 shrink-0" />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Action */}
        {!collapsed && (
          <div className="px-6 py-4">
            <NavLink 
              to="/payment"
              className="flex items-center gap-3 w-full bg-gradient-to-r from-primary to-primary-hover text-primary-foreground px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 hover:shadow-lg hover:shadow-primary/25"
            >
              <PlusCircle className="w-4 h-4" />
              Quick Payment
            </NavLink>
          </div>
        )}

        {/* Bottom Section */}
        <div className="mt-auto p-3 border-t">
          <SidebarMenu>
            {bottomItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to={item.url}
                    className={({ isActive }) => 
                      `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${getNavClass(isActive)}`
                    }
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    {!collapsed && <span className="text-sm">{item.title}</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}