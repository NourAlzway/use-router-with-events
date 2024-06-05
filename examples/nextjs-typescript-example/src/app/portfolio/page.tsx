'use client'
import useRouterWithEvents from 'use-router-with-events';

const PortfolioPage = () => {
  const router = useRouterWithEvents();

  const handleClick = () => {
    // we can use the onRouteComplete event to track the route change after the navigation is completed, for example, we can send an event to google analytics.
    router.events.onRouteComplete = () => {
      /**
       * here you can add your custom logic, for example, send an event to google analytics.
       *
       */
      (window as any).gtag = {
        "event": "page_view",
        "data": {
          page_path: "/about",
          page_title: "About Page",
          send_to: "UA-XXXXX-Y",
        }
      };
    };

    // navigate to the about page
    router.push("/about");

    // we can test the logic by checking the `window.gtag` in the console
  }


  return (
    <div>
      <h1 className="text-4xl">Portfolio Page</h1>
      <span> here you can find my projects</span>
      <br />     <br />
      <p className="text-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur odio dicta deserunt veritatis nostrum fugiat dolores animi. Reprehenderit animi ut ab illo dolore tempora magni! Eos obcaecati eius ullam perspiciatis?
      </p>
      <br />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleClick}>Learn more about me in the about page</button>
    </div>
  );
}

export default PortfolioPage