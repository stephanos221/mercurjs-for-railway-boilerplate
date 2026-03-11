import Image from "next/image"
import { HttpTypes } from "@medusajs/types"

import { CartDropdown, MobileNavbar, Navbar } from "@/components/cells"
import { HeartIcon } from "@/icons"
import { listCategories } from "@/lib/data/categories"
import { PARENT_CATEGORIES } from "@/const"
import { UserDropdown } from "@/components/cells/UserDropdown/UserDropdown"
import { retrieveCustomer } from "@/lib/data/customer"
import { getUserWishlists } from "@/lib/data/wishlist"
import { Wishlist } from "@/types/wishlist"
import { Badge } from "@/components/atoms"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { MessageButton } from "@/components/molecules/MessageButton/MessageButton"
import { NavbarSearch } from "@/components/molecules"

export const Header = async () => {
  const user = await retrieveCustomer()
  let wishlist: Wishlist[] = []
  if (user) {
    const response = await getUserWishlists()
    wishlist = response.wishlists
  }

  const wishlistCount = wishlist?.[0]?.products.length || 0

  const { categories, parentCategories } = (await listCategories({
    headingCategories: PARENT_CATEGORIES,
  })) as {
    categories: HttpTypes.StoreProductCategory[]
    parentCategories: HttpTypes.StoreProductCategory[]
  }

  return (
    <header>
      <div className="flex py-2 lg:px-8 px-4 items-center border-b">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <MobileNavbar
            parentCategories={parentCategories}
            childrenCategories={categories}
          />
          <LocalizedClientLink href="/" className="text-2xl font-bold">
            <Image
              src="/Logo.svg"
              width={126}
              height={40}
              alt="Logo"
              priority
            />
          </LocalizedClientLink>
        </div>

        {/* Middle: Search (takes all available space) */}
        <div className="hidden md:flex flex-1 px-4 justify-center">
          <NavbarSearch className="w-full max-w-md" />
        </div>

        {/* Right: User controls */}
        <div className="flex items-center justify-end gap-2 lg:gap-4 py-2 flex-shrink-0">
          {user && <MessageButton />}
          <UserDropdown user={user} />
          <LocalizedClientLink href="/user/wishlist" className="relative">
            <HeartIcon size={20} />
            {Boolean(wishlistCount) && (
              <Badge className="absolute -top-2 -right-2 w-4 h-4 p-0">
                {wishlistCount}
              </Badge>
            )}
          </LocalizedClientLink>
          <CartDropdown />
        </div>
      </div>

      {/* Bottom: Categories bar */}
      <Navbar categories={categories} />
    </header>
  )
}
