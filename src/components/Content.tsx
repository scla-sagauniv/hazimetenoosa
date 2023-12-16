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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { useNavigate } from "react-router-dom";
import { useState } from "react"
import { useStore } from "@/states/state";

export const Content = () => {
    const selected = useStore((state) => state.selected)
    const setSelected = useStore((state) => state.setSelected);
    const [hasUSB, setHasUSB] = useState<boolean>(true)

    const changeTabNormal = () => {
        setSelected(false);
    }

    const changeTabSecret = () => {
        setSelected(true);
    }

    const navigate = useNavigate();

    const handleLogoutButton = () => {
        navigate("/");
      };

  return (
    <div className="flex justify-center items-center h-screen">
        <Tabs defaultValue="normal" className="w-full">
            <div className="flex">
            <TabsList className="grid w-[60%] grid-cols-2 justify-center bg-black">
                <TabsTrigger value="normal" onClick={changeTabNormal}>ノーマル</TabsTrigger>
                {hasUSB && <TabsTrigger value="secret" onClick={changeTabSecret}>シークレット</TabsTrigger>}
                {!hasUSB && <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <TabsTrigger value="normal" onClick={changeTabNormal}>シークレット</TabsTrigger>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>認証できませんでした</AlertDialogTitle>
                        <AlertDialogDescription>
                            USBで認証してください
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogAction>
                                <Button>OK</Button>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>}
            </TabsList>
            <Button className="ml-64" variant={`${selected ? 'outline' : 'default'}`} onClick={handleLogoutButton}>Log out</Button>
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
                <Card className="bg-black">
                <CardHeader>
                    <CardTitle className="text-white">タイトル</CardTitle>
                </CardHeader>
                <CardContent>
                    <Textarea placeholder="メモを入力してください．" className="h-96 bg-black text-white" />
                </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
  )
}
