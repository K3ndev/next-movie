import { useRef, useState, useEffect } from "react"
import Link from 'next/link';
import { useRouter } from 'next/router';
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

  const [isModal, setIsModal] = useState<boolean>(false)
  const loginUsername = useRef<HTMLInputElement | null>(null);
  const loginPassword = useRef<HTMLInputElement | null>(null)
  const createUsername = useRef<HTMLInputElement | null>(null);
  const createPassword = useRef<HTMLInputElement | null>(null)

  const router = useRouter();
  const { modalState } = router.query;
  const [tabState, setTabState] = useState<string>("login")

  const tabHandler = () => {
    if(tabState === "login"){
      setTabState("create")
    } 
    if(tabState === "create") {
      setTabState("login")
    }
  }

  useEffect(() => {
    if(isModal){
      let queryParams = `modalState=${tabState}`;
      router.replace({
        pathname: router.pathname,
        query: queryParams,
      });
    } else {
      router.replace({
        pathname: router.pathname,
        query: {},
      }); 
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabState, isModal])

  useEffect(() => {
    if(modalState){
      setIsModal(true)
      if (typeof modalState === "string") {
        setTabState(modalState)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <header className="">
      <nav className="mx-auto max-w-7xl">
        <div className="flex justify-between p-7">
          <Link href="/">NextPokemon</Link>
          <div className='flex gap-2'>
            <Dialog open={isModal} onOpenChange={()=>{setIsModal(!isModal)}}>
              <DialogTrigger asChild>
                <Button>Account</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Hello!</DialogTitle>
                </DialogHeader>
                <Tabs value={tabState}  onValueChange={tabHandler} className="">
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

// todo! : aria-controls issue, are from dialog component