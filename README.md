# useRouterWithEvent React/Next.js Hook

[![npm version](https://img.shields.io/npm/v/use-router-with-events.svg)](https://www.npmjs.com/package/use-router-with-events)
[![npm downloads](https://img.shields.io/npm/dm/use-router-with-events.svg)](https://www.npmjs.com/package/use-router-with-events)
[![npm bundle size](https://img.shields.io/bundlephobia/min/use-router-with-events)](https://www.npmjs.com/package/use-router-with-events)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/use-router-with-events)](https://www.npmjs.com/package/use-router-with-events)
[![npm license](https://img.shields.io/npm/l/use-router-with-events)](https://www.npmjs.com/package/use-router-with-events)
[![npm types](https://img.shields.io/npm/types/use-router-with-events)](https://www.npmjs.com/package/use-router-with-events)

## Description

Since the release of Next.js 13, which introduced the `App` directory, a new `useRouter` hook from `next/navigation` was provided for handling routing. However, this new useRouter hook lacks the events that were available in the previous `useRouter` hook from `next/router` that is used in the `pages` directory, which is crucial for certain use cases. Consequently, this package was developed to add those events to the new useRouter hook, ensuring similar behavior and API to the old useRouter hook.

This package provides a hook called `useRouterWithEvents`, which is compatible with both `Next.js 13` and `Next.js 14`.

## Installation

```bash
npm install use-router-with-events
```

## Usage

### - stopping the route change/ask the user for confirmation before leaving the page:

```tsx
"use client";
import useRouterWithEvents from "use-router-with-events";

const ContactPage = () => {
  const router = useRouterWithEvents();

  const handleClick = () => {
    // ask the user if they are sure they want to leave the page,
    // onRouterStart event will be triggered, if it returns false, the navigation will be canceled.
    router.events.onRouteStart = () => {
      /**
       * here you can add your custom logic, for example, show a modal to ask the user if they are sure they want to leave the page.
       * the logic should return a boolean value, if it returns false, the navigation will be canceled.
       */
      return confirm("Are you sure you want to leave this page?");
    };

    // navigate to the home page
    router.push("/");
  };

  return (
    <div>
      ....
      <button className="..." onClick={handleClick}>
        Return to home page
      </button>
    </div>
  );
};

export default ContactPage;
```

#### notes:

- the `onRouteStart` event should return a boolean value, if it returns `false`, the navigation will be canceled.
- the `onRouteStart` event is triggered before the navigation starts.
- the `onRouterStart` event is only triggered in the current scope, it will not be triggered in other components.

---

### - add a logic after the router change:

```tsx
"use client";
import useRouterWithEvents from "use-router-with-events";

const PortfolioPage = () => {
  const router = useRouterWithEvents();

  const handleClick = () => {
    // we can use the onRouteComplete event to track the route change after the navigation is completed,
    // for example, we can send an event to Google Analytics.
    router.events.onRouteComplete = () => {
      /**
       * here you can add your custom logic, for example, send an event to Google Analytics.
       *
       */
      (window as any).gtag = {
        event: "page_view",
        data: {
          page_path: "/about",
          page_title: "About Page",
          send_to: "UA-XXXXX-Y",
        },
      };
    };

    // navigate to the about page
    router.push("/about");

    // we can test the logic by checking the `window.gtag` in the console.
  };

  return (
    <div>
      ...
      <button className="..." onClick={handleClick}>
        Learn more about me on the about page
      </button>
    </div>
  );
};

export default PortfolioPage;
```

---

### - interrupt the Link component navigation form a child component:

```tsx
// ChildComponent.tsx
import React, { useEffect } from "react";
import useRouterWithEvents from "use-router-with-events";

/**
 * Note: this example won't work if we didn't add onClick event to the Link in the Navbar component,
 * please check /src/app/components/Navbar.tsx
 */

const Avatar = () => {
  const router = useRouterWithEvents();

  /**
   * here we can interrupt the route from child component,
   * for example, we can show a modal to confirm the navigation.
   * in this case, we have to register the RouteStart event in the router instance,
   * the event should throw an error if the navigation should be canceled.
   */
  useEffect(() => {
    // listen if routeStart event is emitted
    router.events.on("routeStart", () => {
      const result = confirm("Are you sure you want to leave this page?");

      if (!result) {
        // throw an error to cancel the navigation
        throw new Error("Navigation canceled");
      }
    });

    return () => {
      // remove the routeStart event listener on the page/component unmount, otherwise, it will be triggered on every navigation.
      router.events.off("routeStart");
    };
  }, []);

  return (
    <div>
      <img
        src="https://eu.ui-avatars.com/api/?name=John+Doe&size=250"
        alt="avatar"
      />
    </div>
  );
};

export default Avatar;
```

```tsx

// NavbarComponent.tsx
'use client';

import Link from "next/link";
import React, { useState } from "react";
import useRouterWithEvents from "use-router-with-events";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const router = useRouterWithEvents();

  const links = [...];

  return (
    <div className="...">
      <ul className="...">
        {links.map(({ id, link, href }) => (
          <li
            key={id}
            className="..."
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
    </div>
  );
};

export default Navbar;
```

#### notes:

- the `on('routeStart')` event should throw an error if the navigation should be canceled.
- the `on('routeStart')` event is triggered before the navigation starts.
- the `off('routeStart')` event should be called on the page/component unmount, otherwise, it will be triggered on every navigation.
- we should prevent the default behavior of the link and use the `router.push` method to navigate to the page.

---

## API

```typescript
useRouterWithEvents(): RouterWithEvents;

type RouterWithEvents = AppRouterInstance & {
    events: EventsHandler & {
        onRouteStart?: () => boolean;
        onRouteComplete?: () => void;
    };
};

type EventsTypes = "routeStart" | "routeComplete" | "routeError";

declare class EventsHandler {
    private static _instance;
    private constructor();
    static get getInstance(): EventsHandler;
    handlers: Record<EventsTypes, Function | undefined>;
    on(event: EventsTypes, handler: Function): void;
    off(event: EventsTypes): void;
    emit(event: EventsTypes, ...args: any[]): void;
}

```

## Example

check the full example in the [examples] folder

## License

This project is licensed under the MIT License.

## Contributing

Contributions are always welcome!, if you have any ideas, just open an issue and tell me what you think :) .
