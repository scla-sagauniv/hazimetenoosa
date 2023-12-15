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

export const Auth = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Tabs defaultValue="signin" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signin">Sign in</TabsTrigger>
        <TabsTrigger value="signup">Sign up</TabsTrigger>
      </TabsList>
      <TabsContent value="signin">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-center">Sign in</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">E-mail</Label>
              <CardDescription>
                Please enter your e-mail address
              </CardDescription>
              <Input type="email" id="email" placeholder="Email address" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <CardDescription>
                Please enter your password
              </CardDescription>
              <Input id="password" placeholder="Your password" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button>Sign in</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-center">Sign up</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="signup-email">E-mail</Label>
              <CardDescription>
                Please register your email address
              </CardDescription>
              <Input type="email" id="signup-email" placeholder="Email address" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="signup-password">Password</Label>
              <CardDescription>
                Please register your password
              </CardDescription>
              <Input id="signup-password" type="password" placeholder="Enter password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" placeholder="Confirm password" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button>Sign up</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
    </div>
  )
}
