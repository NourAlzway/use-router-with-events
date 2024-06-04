/* 
AppRouter hook with events implementation for Next.js 
by Nouraldeen Alzway
[Github]: https://github.com/NourAlzway
*/

import type {
  AppRouterInstance,
  NavigateOptions,
} from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import EventsHandler from "./events_handler";

type RouterWithEvents = AppRouterInstance & {
  events: EventsHandler & {
    onRouteStart?: () => boolean;
    onRouteComplete?: () => void;
  };
};

const injectEvents = (
  router: RouterWithEvents,
  link: string | null,
  callback: () => void
) => {
  const { events} = router;

  // emit the routeChangeStart event
  events.emit("routeStart", link);

  // when onRouteStart is defined and returns false, stop the navigation
  if (events.onRouteStart && events.onRouteStart() === false) {
    return;
  }

  // listen if routeError event is emitted
  events.on("routeError", (error: any) => {
    console.error(error);
    return;
  });

  // call the callback
  try {
    callback();
  } catch (error) {
    events.emit("routeError", error);
  }

  // emit the routeChangeComplete event
  events.emit("routeComplete", link);

  // when onRouteComplete is defined, call it after the navigation is complete
  if (events.onRouteComplete) {
    events.onRouteComplete();
  }
};

const useRouterWithEvents = (): RouterWithEvents => {
  const nextRouter = useRouter();

  const router: RouterWithEvents = {
    ...nextRouter,
    events: EventsHandler.getInstance,
    /**
     * Original Navigate to the previous history entry functionality with events.
     */
    back: () => {
      injectEvents(router, null, () => {
        // navigate back
        nextRouter.back();
      });
    },
    /**
     * Original Refresh the current page functionality with events.
     */
    refresh: () => {
      injectEvents(router, null, () => {
        // refresh the page
        nextRouter.refresh();
      });
    },
    /**
     * Original Navigate to the next history entry functionality with events.
     */
    forward: () => {
      injectEvents(router, null, () => {
        // navigate forward
        nextRouter.forward();
      });
    },
    /**
     * Original Navigate to the provided href functionality with events.
     */
    push: (href: string, options?: NavigateOptions) => {
      injectEvents(router, href, () => {
        // navigate to the path
        nextRouter.push(href, options);
      });
    },
    /**
     * Original Navigate to the provided href functionality with events.
     */
    replace: (href: string, options?: NavigateOptions) => {
      injectEvents(router, href, () => {
        // replace the path
        nextRouter.replace(href, options);
      });
    },
    /**
     * Original Prefetch the provided href functionality with events.
     */
    prefetch: (href: string, options?: any) => {
      injectEvents(router, href, () => {
        // prefetch the path
        nextRouter.prefetch(href, options);
      });
    },
  };

  return router;
};

export default useRouterWithEvents;
