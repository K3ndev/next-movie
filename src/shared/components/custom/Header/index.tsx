import { useRef, useState, useEffect } from "react"
import Link from 'next/link';
import { Button } from "@/shared/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
  const [pendingVerification, setPendingVerification] = useState<boolean>(false)

  const [loadingIn, setLoadingIn] = useState(false)
  const [loadingUp, setLoadingUp] = useState(false)
  const [errMessage, setErrMessage] = useState<string>("")

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
  const { isLoaded: isLoadedIn, setActive: setActiveIn, signIn } = useSignIn()

  const LoginHandler = async (e: any) => {
    e.preventDefault()

    if (!isLoadedIn) {
      return;
    }

    try {
      setLoadingIn(true)
      const completeSignIn = await signIn.create({
        identifier: loginEmail!.current!.value,
        password: loginPassword!.current!.value,
      })

      if (completeSignIn.status !== "complete") {
        console.log('not complete')
      }

      if (completeSignIn.status === "complete") {
        setActiveIn({ session: completeSignIn.createdSessionId });
        setLoadingIn(false)
        setIsModal(false)
        setErrMessage("")
      }

    } catch (err: any) {
      if (err.errors[0].message) {
        setLoadingIn(false)
        setErrMessage(err.errors[0].message)
      }
    }
  }

  const CreateHandler = async (e: any) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      setLoadingUp(true)
      await signUp.create({
        emailAddress: createEmail!.current!.value,
        password: createPassword!.current!.value
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setPendingVerification(true)
    } catch (err: any) {
      if (err.errors[0].message) {
        setLoadingUp(false)
        setErrMessage(err.errors[0].message)
      }
    }
  }

  const verifyHandler = async (e: any) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }
    try {
      setLoadingUp(true)
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: code!.current!.value
      })

      if (completeSignUp.status !== 'complete') {
        console.log('not complete')
      }

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId })
        setLoadingUp(false)
        setIsModal(false)
        setPendingVerification(false)
        setErrMessage("")
      }
    } catch (err: any) {
      if (err.errors[0].message) {
        setLoadingUp(false)
        setErrMessage(err.errors[0].message)
      }
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
              if (loadingUp || loadingIn) {
                setIsModal(true)
                return;
              }
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
                  <DialogTitle>
                    {loadingIn === true || loadingUp === true &&
                      <svg aria-hidden="true" className="inline w-7 h-7 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-[#3758a3]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                      </svg>
                    }
                    Hello!
                  </DialogTitle>
                  {errMessage &&
                    <DialogDescription className="text-red-600">
                      {errMessage}
                    </DialogDescription>}
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
                          <Input id="loginEmail" disabled={loadingIn} type='email' ref={loginEmail} placeholder="email@sample.com" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="password">Password</Label>
                          <Input disabled={loadingIn} id="password" type='password' ref={loginPassword} placeholder="password" />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button disabled={loadingIn} onClick={LoginHandler}>Login</Button>
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
                          <Input disabled={loadingUp} id="createEmail" type="email" ref={createEmail} placeholder="email@sample.com" />
                        </div>
                          <div className="space-y-1">
                            <Label htmlFor="createPassword">Password</Label>
                            <Input disabled={loadingUp} id="createPassword" type="password" ref={createPassword} placeholder="password must contain 8 or more" />
                          </div></>}
                        {pendingVerification && <div className="space-y-1">
                          <Label htmlFor="code">Code</Label>
                          <Input disabled={loadingUp} id="code" type="text" ref={code} placeholder="code" />
                        </div>}
                      </CardContent>
                      <CardFooter>
                        {!pendingVerification && <Button disabled={loadingUp} onClick={CreateHandler}>Submit</Button>}
                        {pendingVerification && <Button disabled={loadingUp} onClick={verifyHandler}>Verify</Button>}
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
// todo! : remove any typescript keyword