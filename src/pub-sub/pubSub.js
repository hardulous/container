import { v4 as uuidv4 } from "uuid";

class PubSub {
  constructor() {
    // To keep track of events the components is subscribing to ::
    this.events = {};

    // To keep track of published events without subscribers
    this.pendingEvents = {};
  }

  // A component can subscribe to the event to trigger changes when that event is triggered
  subscribe(evName, func) {
    this.events[evName] = this.events[evName] || [];

    // If subscribing for the first time then first create new subscribe object
    let id = uuidv4();
    let newSubObj = {
      id, // A unique id to un-subscribe event
      func, // A func to be executed when event is triggered
    };

    // Adding subscibe object for that event
    this.events[evName].push(newSubObj);

    // Check if there are pending published events for this subscribed event
    if (this.pendingEvents[evName]) {
      this.pendingEvents[evName].forEach((pendingEvent) => {
        func(pendingEvent.data);   
      });
      delete this.pendingEvents[evName];
      console.log(this.events)
    }

    return id; // Return unique id to be used to unsubscribe to that event
  }

  // To un-subscribe and no longer trigger changes when an event is triggered
  unsubscribe(evName, id) {
    // Un-subscribe based on unqiue id returned in subscribe() and that event
    if (this.events[evName] && id) {
      this.events[evName] = this.events[evName].filter(
        (subObj) => subObj.id !== id
      );
    }
  }

  // To trigger an event and send data to all subscribers for that event
  publish(evName, data) {
    if (this.events[evName]) {
      this.events[evName].forEach((subObj) => {
        subObj.func(data); // Calling all subscriber functions for that event with given parameters
      });
    } else {
      // If there are no subscribers at the moment, store the published event for future subscribers
      this.pendingEvents[evName] = this.pendingEvents[evName] || [];
      this.pendingEvents[evName].push({ data });
    }
  }
}

export default new PubSub(); // Exporting the instance of this pub sub class to be used in all microfrontend
