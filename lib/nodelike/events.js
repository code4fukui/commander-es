export class EventEmitter {
  listeners = [];
  on(name, func) {
    console.log("on", name, func);
    this.listeners.push({ name, func });
  }
  emit(name, context) {
    //console.log("emit", name, context);
    console.log("emit", name);
    for (const l of this.listeners) {
      if (l.name == name) {
        l.func(context);
      }
    }
  }
  listenerCount(query) {
    console.log("listenerCount", query);
    let cnt = 0;
    for (const l of this.listeners) {
      if (l.name == query) {
        cnt++;
      }
    }
    return cnt;
  }
};
