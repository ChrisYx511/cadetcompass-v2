"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import AvatarMenu from "./AvatarMenu"
import Image from "next/image"

function NavMenu() {
  return (
    <div className="grid grid-cols-2">
      <div className="flex justify-start items-center">
        <Image
          src="/CdtCompass.png"
          alt="CadetCompass Logo"
          width="65"
          height="65"
        ></Image>
      </div>
      <div className="flex justify-end">
        <NavigationMenu className="m-3">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link className={navigationMenuTriggerStyle()} href="/main">
                Home
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                className={navigationMenuTriggerStyle()}
                href="/main/profile"
              >
                Profile
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                className={navigationMenuTriggerStyle()}
                href="/main/my-cadets"
              >
                My Cadets
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <AvatarMenu></AvatarMenu>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  )
}

export default NavMenu
