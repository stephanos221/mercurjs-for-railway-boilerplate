'use client';

import { HttpTypes } from '@medusajs/types';
import {
  CategoryNavbar,
  HeaderCategoryNavbar,
} from '@/components/molecules';
import { CloseIcon, HamburgerMenuIcon } from '@/icons';
import { useState } from 'react';

export const MobileNavbar = ({
  childrenCategories,
  parentCategories,
}: {
  childrenCategories: HttpTypes.StoreProductCategory[];
  parentCategories: HttpTypes.StoreProductCategory[];
}) => {
  const [openMenu, setOpenMenu] = useState(false);

  const closeMenuHandler = () => {
    setOpenMenu(false);
  };

  return (
    <>
      <button
        onClick={() => setOpenMenu(true)}
        aria-label="Open menu"
        className="flex items-center justify-center"
      >
        <HamburgerMenuIcon />
      </button>

      {openMenu && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-30"
            onClick={closeMenuHandler}
          />

          {/* Sliding sidebar */}
          <div className="fixed top-0 left-0 h-full w-72 bg-primary z-40 shadow-xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <span className="font-semibold text-lg">Categories</span>
              <button onClick={closeMenuHandler} aria-label="Close menu">
                <CloseIcon size={20} />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 p-2">
              <HeaderCategoryNavbar
                onClose={closeMenuHandler}
                categories={parentCategories}
              />
              <div className="border-t mt-2 pt-2">
                <CategoryNavbar
                  onClose={closeMenuHandler}
                  categories={childrenCategories}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
