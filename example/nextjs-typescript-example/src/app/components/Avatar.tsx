import React, { useEffect } from 'react'
import useRouterWithEvents from 'use-router-with-events';

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
    }
  }, [])

  return (
    <div>
      <img src="https://eu.ui-avatars.com/api/?name=John+Doe&size=250" alt="avatar" />
    </div>
  )
}

export default Avatar