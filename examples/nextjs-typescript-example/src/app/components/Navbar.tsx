'use client';

import Link from "next/link";
import React, { useState } from "react";
import useRouterWithEvents from "use-router-with-events";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const router = useRouterWithEvents();

  const links = [
    {
      id: 1,
      link: "home",
      href: "/"
    },
    {
      id: 2,
      link: "about",
      href: "/about"
    },
    {
      id: 3,
      link: "portfolio",
      href: "/portfolio"
    },
    {
      id: 5,
      link: "contact",
      href: "/contact"
    },
  ];

  return (
    <div className="flex justify-between items-center w-full h-20 px-4 text-white bg-black fixed nav">
      <div>
        {/* <h1 className="text-5xl font-signature ml-2"><a className="link-underline hover:transition ease-in-out delay-150 hover:underline hover:decoration-solid" href="">Logo</a></h1> */}
        <h1 className="text-5xl font-signature ml-2">
          <a
            className="link-underline link-underline-black"
            href=""
            target="_blank"
            rel="noreferrer"
          >
            useRouterWithEvents()
          </a>
        </h1>
      </div>

      <ul className="hidden md:flex">
        {links.map(({ id, link, href }) => (
          <li
            key={id}
            className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline"
          >
            <Link href={href} onClick={(e) => {
              // we should prevent the default behavior of the link and use the router.push method to navigate to the page.
              e.preventDefault();
              router.push(href);
            }}>
              {link}
            </Link>
          </li>
        ))}
      </ul>

      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
      >

      </div>

      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
          {links.map(({ id, link }) => (
            <li
              key={id}
              className="px-4 cursor-pointer capitalize py-6 text-4xl"
            >
              <Link onClick={() => setNav(!nav)} href={link}>
                {link}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Navbar;