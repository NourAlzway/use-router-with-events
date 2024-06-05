'use client';
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
  }


  return (
    <div>
      <h1 className="text-4xl">Contact Page</h1>
      <br />
      <p className="text-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur odio dicta deserunt veritatis nostrum fugiat dolores animi. Reprehenderit animi ut ab illo dolore tempora magni! Eos obcaecati eius ullam perspiciatis?
      </p>
      <br />
      <p>
        lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur odio dicta deserunt veritatis nostrum fugiat dolores animi. Reprehenderit animi ut ab illo dolore tempora magni! Eos obcaecati eius ullam perspiciatis?
      </p>
      <br />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleClick}>Return to home page</button>
    </div>
  );
};

export default ContactPage;
