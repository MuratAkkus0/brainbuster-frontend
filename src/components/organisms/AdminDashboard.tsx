import { AppSidebar } from "@/components/molecules/AppSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UsersManagement } from "./UsersManagement";
import { QuestionsManagement } from "./QuestionsManagement";
import { Users, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminDashboard({ className }: { className?: string }) {
  return (
    <SidebarProvider className={cn("min-h-0 h-full relative", className)}>
      <AppSidebar />
      <SidebarInset className="overflow-y-auto">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          </div>
        </header>

        <div className="flex flex-1 flex-col p-4 md:p-6">
          <Tabs defaultValue="users" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Users
              </TabsTrigger>
              <TabsTrigger
                value="questions"
                className="flex items-center gap-2"
              >
                <HelpCircle className="h-4 w-4" />
                Questions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="mt-6">
              <UsersManagement />
            </TabsContent>

            <TabsContent value="questions" className="mt-6">
              <QuestionsManagement />
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
