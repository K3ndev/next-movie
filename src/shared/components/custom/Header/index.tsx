import { useRef, useState, useEffect } from "react"
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
import { useAuth, useSignUp, useSignIn } from "@clerk/nextjs";


export function Header() {
  const [isModal, setIsModal] = useState<boolean>(false)
  const [isModalFirstRender, setIsModalFirstRender] = useState<boolean>(false)
  const loginEmail = useRef<HTMLInputElement | null>(null)
  const loginPassword = useRef<HTMLInputElement | null>(null)
  const createEmail = useRef<HTMLInputElement | null>(null)
  const createPassword = useRef<HTMLInputElement | null>(null)
  const code = useRef<HTMLInputElement | null>(null)
  const [pendingVerification, setpendingVerification] = useState<boolean>(false)

  const [loadingIn, setLoadingIn] = useState(false)
  const [loadingUp, setLoadingUp] = useState(false)

  const [tabState, setTabState] = useState<string>("")

  const tabHandler = () => {

    if (tabState === "login") {
      setTabState("create")
    }
    if (tabState === "create") {
      setTabState("login")
    }
  }

  const { isSignedIn, signOut } = useAuth()
  const { isLoaded, setActive, signUp } = useSignUp()
  const {isLoaded: isLoadedIn, setActive: setActiveIn, signIn} = useSignIn()

  const LoginHandler = async(e:any) => {
    e.preventDefault()

    if (!isLoadedIn) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: loginEmail!.current!.value,
        password: loginPassword!.current!.value,
      })

      if(completeSignIn.status !== "complete"){
        console.log('not complete')
      }

      if(completeSignIn.status === "complete"){
        setActiveIn({ session: completeSignIn.createdSessionId });
        setIsModal(false)
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  const CreateHandler = async (e: any) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: createEmail!.current!.value,
        password: createPassword!.current!.value
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setpendingVerification(true)
    } catch (error) {
      console.log(error)
    }
  }

  const verifyHandler = async(e:any) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: code!.current!.value
      })

      if (completeSignUp.status !== 'complete'){
        console.log('not complete')
      }

      if (completeSignUp.status === 'complete'){
        console.log('complete')
        await setActive({session: completeSignUp.createdSessionId})
        setIsModal(false)
      }
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('m');


    if (searchParam === "create") {
      setIsModal(true)
      setTabState("create")
    }
    if (searchParam === "login") {
      setIsModal(true)
      setTabState("login")
    }
    

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isModalFirstRender) {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set('m', tabState);

      window.history.replaceState({}, '', `?${urlParams.toString()}`);
    }
    if (isModal) {
      setIsModalFirstRender(true)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabState])

  useEffect(() => {
    if (!isModal) {
      const urlParams = new URLSearchParams(window.location.search);

      if (urlParams.has('m')) {
        urlParams.delete('m');
        const newUrl = `${window.location.pathname}?${urlParams.toString()}`;

        window.history.replaceState({}, '', newUrl);
      }
    }
    if (isModal) {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set('m', tabState);

      window.history.replaceState({}, '', `?${urlParams.toString()}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModal])

  return (
    <header className="">
      <nav className="mx-auto max-w-7xl">
        <div className="flex justify-between p-7">
          <Link href="/">NextPokemon</Link>
          <div className='flex gap-2'>
            {!isSignedIn && <Dialog open={isModal} onOpenChange={() => {
              setIsModal(!isModal)
            }}>
              <DialogTrigger asChild>
                <Button onClick={() => {
                  setIsModalFirstRender(true)
                  if (tabState === "") {
                    setTabState("login")
                  }
                }}>Account</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Hello!</DialogTitle>
                </DialogHeader>
                <Tabs value={tabState} onValueChange={tabHandler} className="">
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
                          <Label htmlFor="loginEmail">Username</Label>
                          <Input id="loginEmail" type='email' ref={loginEmail} placeholder="email@sample.com" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="password">Password</Label>
                          <Input id="password" type='password' ref={loginPassword} placeholder="password" />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button onClick={LoginHandler}>Login</Button>
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
                        {!pendingVerification && <><div className="space-y-1">
                          <Label htmlFor="createEmail">Username</Label>
                          <Input id="createEmail" type="email" ref={createEmail} placeholder="email@sample.com" />
                        </div>
                          <div className="space-y-1">
                            <Label htmlFor="createPassword">Password</Label>
                            <Input id="createPassword" type="password" ref={createPassword} placeholder="password must contain 8 or more" />
                          </div></>}
                        {pendingVerification && <div className="space-y-1">
                          <Label htmlFor="code">Code</Label>
                          <Input id="code" type="text" ref={code} placeholder="code" />
                        </div>}
                      </CardContent>
                      <CardFooter>
                        {!pendingVerification && <Button onClick={CreateHandler}>Submit</Button>}
                        {pendingVerification && <Button onClick={verifyHandler}>Verify</Button>}
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>}
            {isSignedIn && <Button onClick={() => { 
              signOut()
              setIsModal(false)
             }}>Logout</Button>}
          </div>
        </div>
      </nav>
    </header>
  );
}

// todo! : aria-controls issue, are from dialog component
// todo! : when the user loggein there's a bug in modal thing