import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export const Content = () => {
  return (
    <div className="flex justify-center items-center h-screen">
        <Tabs defaultValue="normal" className="w-full">
            <TabsList className="grid w-[60%] grid-cols-2 justify-center">
                <TabsTrigger value="normal">ノーマル</TabsTrigger>
                <TabsTrigger value="secret">シークレット</TabsTrigger>
            </TabsList>
            <TabsContent value="normal">
                <Card>
                <CardHeader>
                    <CardTitle>タイトル</CardTitle>
                </CardHeader>
                <CardContent>
                    <Textarea placeholder="メモを入力してください．" />
                </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="secret">
                <Card>
                <CardHeader>
                    <CardTitle>タイトル</CardTitle>
                </CardHeader>
                <CardContent>
                    <Textarea placeholder="メモを入力してください．" />
                </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
  )
}
