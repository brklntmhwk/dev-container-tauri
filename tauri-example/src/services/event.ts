/* Functions that interact with custom events registered on Rust backend */

import { Event, listen } from "@tauri-apps/api/event";
import { createEvent } from "react-event-hook";

export const navigatePageEvent = createEvent("navigate_page")<string>();
export const refreshNotesEvent = createEvent("refresh_notes")();

export const listenToBackendEvents = async () => {
  const navigatePage = listen("page", (e: Event<string>) =>
    navigatePageEvent.emitNavigatePage(e.payload)
  );

  return Promise.all([navigatePage]);
};
