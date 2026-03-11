import { HttpTypes } from "@medusajs/types"
import { CategoryNavbar } from "@/components/molecules"

export const Navbar = ({
  categories,
}: {
  categories: HttpTypes.StoreProductCategory[]
}) => {
  return (
    <div className="hidden md:flex border-b py-3 px-6">
      <CategoryNavbar categories={categories} />
    </div>
  )
}
