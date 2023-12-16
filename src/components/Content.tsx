import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useNavigate } from "react-router-dom";

export const Content = () => {
    const navigate = useNavigate();

    const handleLogoutButton = () => {
        navigate("/");
      };

  return (
    <div className="flex justify-center items-center h-screen">
        <Tabs defaultValue="normal" className="w-full">
            <div className="flex">
            <TabsList className="grid w-[60%] grid-cols-2 justify-center">
                <TabsTrigger value="normal">ノーマル</TabsTrigger>
                <TabsTrigger value="secret">シークレット</TabsTrigger>
            </TabsList>
            <Button className="ml-64" onClick={handleLogoutButton}>Log out</Button>
            </div>
            <TabsContent value="normal">
                <Card>
                <CardHeader>
                    <CardTitle>タイトル</CardTitle>
                </CardHeader>
                <CardContent>
                    <Textarea placeholder="メモを入力してください．" className="h-96" />
                </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="secret">
                <Card>
                <CardHeader>
                    <CardTitle>タイトル</CardTitle>
                </CardHeader>
                <CardContent>
                    <Textarea placeholder="メモを入力してください．" className="h-96" />
                </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
  )
}
