/* 
AppRouter hook with events implementation for Next.js 
by Nouraldeen Alzway
[Github]: https://github.com/NourAlzway
*/

import type { AppRouterInstance, NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';

type RouterWithEvents = AppRouterInstance & {
    events: {
        onRouteStart?: () => boolean;
        onRouteComplete?: () => void;
    };
};

const injectEvents = (router: RouterWithEvents, callback: () => void) => {
    const { events } = router;
    // when onRouteStart is defined and returns false, stop the navigation
    if (events.onRouteStart && events.onRouteStart() === false) {
        return;
    }

    // call the callback
    callback()

    // when onRouteComplete is defined, call it after the navigation is complete
    if (events.onRouteComplete) {
        events.onRouteComplete();
    }
}

const useRouterWithEvents = (): RouterWithEvents => {
    const nextRouter = useRouter();

    const router: RouterWithEvents = {
        ...nextRouter,
        events: {},
        /**
         * Original Navigate to the previous history entry functionality with events.
         */
        back: () => {
            injectEvents(router, () => {
                // navigate back
                nextRouter.back();
            });

        },
        /**
         * Original Refresh the current page functionality with events.
         */
        refresh: () => {
            injectEvents(router, () => {
                // refresh the page
                nextRouter.refresh();
            });
        },
        /**
         * Original Navigate to the next history entry functionality with events.
         */
        forward: () => {
            injectEvents(router, () => {
                // navigate forward
                nextRouter.forward();
            });
        },
        /**
         * Original Navigate to the provided href functionality with events.
         */
        push: (href: string, options?: NavigateOptions) => {
            injectEvents(router, () => {
                // navigate to the path
                nextRouter.push(href, options);
            });
        },
        /**
         * Original Navigate to the provided href functionality with events.
         */
        replace: (href: string, options?: NavigateOptions) => {
            injectEvents(router, () => {
                // replace the path
                nextRouter.replace(href, options);
            });
        },
        /**
         * Original Prefetch the provided href functionality with events.
         */
        prefetch: (href: string, options?: any) => {
            injectEvents(router, () => {
                // prefetch the path
                nextRouter.prefetch(href, options);
            });
        },
    }

    return router;
};

export default useRouterWithEvents;