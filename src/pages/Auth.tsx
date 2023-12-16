import { useState } from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useNavigate } from "react-router-dom";
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
import { SigninInputs } from "@/types/index";
import { SignupInputs } from "@/types/index";

export const Auth = () => {
  const navigate = useNavigate();
  const [signinErrorMsg, setSigninErrorMsg] = useState("")
  const [signupErrorMsg, setSignupErrorMsg] = useState("")
  
  const {
    register: signinRegister,
    handleSubmit: signinHandleSubmit,
    reset: signinReset,
    formState: { errors: signinErrors }
} = useForm<SigninInputs>({
    mode: 'onChange',
});

const {
    register: signupRegister,
    handleSubmit: signupHandleSubmit,
    reset: signupReset,
    formState: { errors: signupErrors }
} = useForm<SignupInputs>({
    mode: 'onChange',
});

  const onSubmitSignin: SubmitHandler<SigninInputs> = (data) =>{
    if (data.email === "email@gmail.com" && data.password === "password"){  //仮ID・パスワード
        inSuccess();
    }else{
        inErrorMsg();
    }
    signinReset();
  };

  const onSubmitSignup: SubmitHandler<SignupInputs> = (data) =>{
    if (data.email === "email@gmail.com" && data.password === "password" && data.repassword === data.password){  //仮ID・パスワード
        upSuccess();
    }else{
        upErrorMsg();
    }
    signupReset();
  };

  const inSuccess = () => {
    setSigninErrorMsg("");
    navigate("/memo");
  }

  const inErrorMsg = () => {
    setSigninErrorMsg("ユーザーIDかパスワードが間違っています。");
  }

  const upSuccess = () => {
    setSigninErrorMsg("");
    navigate("/memo");
  }

  const upErrorMsg = () => {
    setSignupErrorMsg("ユーザーIDかパスワードが間違っています。");
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Tabs defaultValue="signin" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signin">Sign in</TabsTrigger>
        <TabsTrigger value="signup">Sign up</TabsTrigger>
      </TabsList>
      <TabsContent value="signin">
        <Card>
          <form onSubmit={signinHandleSubmit(onSubmitSignin)}>
            <CardHeader>
              <CardTitle className="flex justify-center">Sign in</CardTitle>
            </CardHeader>
            <CardDescription className="errorMsg">
              {signinErrorMsg}
            </CardDescription>
            <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="email">E-mail</Label>
                  <CardDescription>
                    Please enter your e-mail address
                  </CardDescription>
                  <Input type="email" id="email" placeholder="Email address" {...signinRegister('email')} />
                  <ErrorMessage
                    errors={signinErrors}
                    name="email"
                    render={({ message }) => <p className="text-red-500">{message}</p>}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <CardDescription>
                    Please enter your password
                  </CardDescription>
                  <Input type="password" id="password" placeholder="Your password" {...signinRegister('password')} />
                  <ErrorMessage
                      errors={signinErrors}
                      name="password"
                      render={({ message }) => <p className="text-red-500">{message}</p>}
                  />
                </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button type="submit">Sign in</Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
      <TabsContent value="signup">
        <Card>
          <form onSubmit={signupHandleSubmit(onSubmitSignup)}>
            <CardHeader>
              <CardTitle className="flex justify-center">Sign up</CardTitle>
            </CardHeader>
            <CardDescription className="errorMsg">
              {signupErrorMsg}
            </CardDescription>
            <CardContent className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="signup-email">E-mail</Label>
                <CardDescription>
                  Please register your email address
                </CardDescription>
                <Input type="email" id="signup-email" placeholder="Email address" {...signupRegister('email')} />
                <ErrorMessage
                    errors={signupErrors}
                    name="email"
                    render={({ message }) => <p className="text-red-500">{message}</p>}
                  />
              </div>
              <div className="space-y-1">
                <Label htmlFor="signup-password">Password</Label>
                <CardDescription>
                  Please register your password
                </CardDescription>
                <Input id="signup-password" type="password" placeholder="Enter password" {...signupRegister('password')} />
                <ErrorMessage
                    errors={signupErrors}
                    name="password"
                    render={({ message }) => <p className="text-red-500">{message}</p>}
                  />
              </div>
              <div className="space-y-1">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" placeholder="Confirm password" {...signupRegister('repassword')} />
                <ErrorMessage
                    errors={signupErrors}
                    name="repassword"
                    render={({ message }) => <p className="text-red-500">{message}</p>}
                  />
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button>Sign up</Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
    </div>
  )
}
