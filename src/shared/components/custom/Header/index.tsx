import { useRef } from "react"
import Link from 'next/link';
import { Button } from "@/shared/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs"


export function Header() {

  const loginUsername = useRef<HTMLInputElement | null>(null);
  const loginPassword = useRef<HTMLInputElement | null>(null)
  const createUsername = useRef<HTMLInputElement | null>(null);
  const createPassword = useRef<HTMLInputElement | null>(null)
  return (
    <header className="">
      <nav className="mx-auto max-w-7xl">
        <div className="flex justify-between p-7">
          <Link href="/">NextPokemon</Link>
          <div className='flex gap-2'>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Account</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Hello!</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="login" className="">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="create">Create Account</TabsTrigger>
                  </TabsList>
                  <TabsContent value="login">
                    <Card>
                      <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>
                          Login your account here. Click Login when you&apos;re done.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="space-y-1">
                          <Label htmlFor="username">Username</Label>
                          <Input id="username" type='text' ref={loginUsername} placeholder=""/>
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="password">Password</Label>
                          <Input id="password" type='password' ref={loginPassword}/>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button>Save changes</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  <TabsContent value="create">
                    <Card>
                      <CardHeader>
                        <CardTitle>Create an account</CardTitle>
                        <CardDescription>
                          Create your account here. Click Submit when you&apos;re done.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="space-y-1">
                          <Label htmlFor="createUsername">Username</Label>
                          <Input id="createUsername" type="text" ref={createUsername}/>
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="createPassword">Password</Label>
                          <Input id="createPassword" type="password" ref={createPassword}/>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button>Submit</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
            <Button onClick={()=> {console.log('hi')}}>Logout</Button>
          </div>
        </div>
      </nav>
    </header>
  );
}