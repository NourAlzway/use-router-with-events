type EventsTypes = "routeStart" | "routeComplete" | "routeError";

class EventsHandler {
  private static _instance: EventsHandler;

  private constructor() {
    this.handlers = {
      routeStart: undefined,
      routeComplete: undefined,
      routeError: undefined,
    };
  }

  public static get getInstance() {
    // Return the instance if it exists, otherwise create a new one
    return this._instance || (this._instance = new this());
  }

  handlers: Record<EventsTypes, Function | undefined>;

  on(event: EventsTypes, handler: Function) {
    if (this.handlers[event]) {
      throw new Error(`Event ${event} already has a handler, please use off() to remove it first.`);
    }

    this.handlers[event] = handler;
  }

  off(event: EventsTypes) {
    if (this.handlers[event]) {
      this.handlers[event] = undefined;
    }
  }

  emit(event: EventsTypes, ...args: any[]) {
    if (this.handlers[event]) {
      const handler = this.handlers[event];
      handler?.(...args); // Call the handler
    }
  }
}

export default EventsHandler;
