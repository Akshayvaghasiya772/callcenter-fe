import Link from "next/link"
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
  Settings,
  ReceiptText
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { ModeToggle } from "./theme-switcher"
import { signOut, useSession } from "next-auth/react";
const Sidebar = ({children}) => {
  const router =useRouter();
  const [open, setOpen] = useState(false);
    useEffect(() => {
      setOpen(false)
    }, [router])


    const Sections=[
        {
          title:"Dashboard",
          isSame:true,
          href:"/",
          Icon:<Home className="h-4 w-4" />
        },
        {
          title:"Receipts",
          isSame:false,
          href:"/receipt",
          Icon:<ReceiptText className="h-4 w-4" />
        },
        {
          title:"Members",
          isSame:false,
          href:"/members",
          Icon:<Users className="h-4 w-4" />
        },
        {
          title:"Settings",
          isSame:true,
          href:"/setting",
          Icon:<Settings className="h-4 w-4" />
        },
      ]

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">Acme Inc</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {Sections?.map(({title,href,Icon,Extra,isSame=false},index)=>{
              const isActive=isSame?router.pathname===href:router.pathname.includes(href)
              return (
                <Link
                key={index}
                href={href}
                className={`flex items-center gap-3 rounded-lg  px-3 py-2 ${isActive?'bg-muted text-primary hover:text-muted-foreground':'text-muted-foreground hover:text-primary'} transition-all`}
              >
                {Icon}
              {title}
              </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </div>
    <div className="flex flex-col">
      <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
        <Sheet open={open}>
          <SheetTrigger asChild>
            <Button
              onClick={()=>(setOpen(true))}
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
         <SheetContent side="left" className="flex flex-col" setOpen={setOpen}>
            <nav className="grid gap-2 text-lg font-medium">
            <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
            {Sections?.map(({title,href,Icon,Extra,isSame=false},index)=>{
              const isActive=isSame?router.pathname===href:router.pathname.includes(href)
              return (
                <Link
                key={index}
                href={href}
                className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${isActive?'bg-muted text-foreground hover:text-muted-foreground':'text-muted-foreground hover:text-foreground'}`}
              >
                {Icon}
               {title}
               {Extra&&<Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                6
              </Badge>}
              </Link>
              )
            })}
            </nav>
         </SheetContent>
        </Sheet>
        <div className="w-full flex-1">
          <form>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
              />
            </div>
          </form>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={'/myaccount'}> <DropdownMenuLabel>My Account</DropdownMenuLabel></Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem  onClick={() => signOut()}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ModeToggle/>
      </header>
      {children}
    </div>
  </div>
  )
}

export default Sidebar