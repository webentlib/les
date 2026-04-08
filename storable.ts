import { writable } from 'svelte/store'

export function storable(name, data=undefined) {
   // https://svelte.dev/playground/e6c0e3db7d064d43a7e4559b2862e1f7

   const store = writable(data);
   const { subscribe, set, update } = store;
   const isBrowser = typeof window !== 'undefined';

   isBrowser && localStorage[name] && set(JSON.parse(localStorage[name]));

   return {
      subscribe,
      set: n => {
         isBrowser && (localStorage[name] = JSON.stringify(n));
         set(n);
      },
      update: cb => {
         const updatedStore = cb(get(store));

         isBrowser && (localStorage[name] = JSON.stringify(updatedStore));
         set(updatedStore);
      }
   };
}