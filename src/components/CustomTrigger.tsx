import { auth } from "@/app/lib/firebase";
import {ArrowRightFromSquare, Gear, Persons} from "@gravity-ui/icons";
import {Avatar, Dropdown, Label} from "@heroui/react";
import { onAuthStateChanged, User } from "firebase/auth";
import Link from "next/link";
import { useEffect, useState } from "react";



   interface PropsCustomTrigger{ 
    
        handleSignOut:()=> void 
   }
export function CustomTrigger({handleSignOut}: PropsCustomTrigger) {  

    const [user,setUser]=useState <User | null>(null) 

    useEffect(()=>{
        const unsubcribe =onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
        }) 

        return ()=> unsubcribe()
    }
,[])
  return (
    <Dropdown>
      <Dropdown.Trigger className="rounded-full">
        <Avatar>
          <Avatar.Image
            alt={user?.displayName || "User"}
            src={user?.photoURL || "/default-avatar.png"}
          />
          <Avatar.Fallback delayMs={600}> {user?.displayName?.charAt(0) || "U"}</Avatar.Fallback>
        </Avatar>
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <div className="px-3 pt-3 pb-1">
          <div className="flex items-center gap-2">
            <Avatar size="sm">
              <Avatar.Image
               alt={user?.displayName || "User"}
                src={user?.photoURL || "/default-avatar.png"}></Avatar.Image>
              <Avatar.Fallback delayMs={600}>{user?.displayName?.charAt(0) || "U"}</Avatar.Fallback>
            </Avatar>
            <div className="flex flex-col gap-0">
              <p className="text-sm leading-5 font-medium">{user?.displayName || "User" }</p>
              <p className="text-xs leading-none text-muted">{user?.email}</p>
            </div>
          </div>
        </div>
        <Dropdown.Menu>
          <Dropdown.Item id="Home" textValue="Home">
           <Link href='/'>
            <Label>Home</Label>
           </Link>
          </Dropdown.Item>
          <Dropdown.Item id="dashboard" textValue="Dashboard"  > 
           <Link href="/dashboard" className="w-full">
            <Label>Dashboard</Label> 
            </Link>
          </Dropdown.Item>
        
          <Dropdown.Item id="logout" textValue="Logout" variant="danger" onClick={handleSignOut}>
            <div className="flex w-full items-center justify-between gap-2">
              <Label >Log Out</Label>
              <ArrowRightFromSquare className="size-3.5 text-danger" />
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}